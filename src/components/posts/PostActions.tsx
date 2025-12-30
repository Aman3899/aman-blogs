'use client'

import { Share2, Check, Copy, Download, FileText, File as FilePdf } from 'lucide-react'
import { useState } from 'react'

interface PostActionsProps {
    title: string
    content: string
}

export default function PostActions({ title, content }: PostActionsProps) {
    const [copiedLink, setCopiedLink] = useState(false)
    const [copiedContent, setCopiedContent] = useState(false)
    const [showDownloadMenu, setShowDownloadMenu] = useState(false)

    const handleShare = async () => {
        const url = window.location.href
        if (navigator.share) {
            try {
                await navigator.share({ title, url })
            } catch (err) {
                console.log('Share failed:', err)
            }
        } else {
            try {
                await navigator.clipboard.writeText(url)
                setCopiedLink(true)
                setTimeout(() => setCopiedLink(false), 2000)
            } catch (err) {
                console.error('Failed to copy:', err)
            }
        }
    }

    const handleCopyContent = async () => {
        try {
            await navigator.clipboard.writeText(`${title}\n\n${content}`)
            setCopiedContent(true)
            setTimeout(() => setCopiedContent(false), 2000)
        } catch (err) {
            console.error('Failed to copy content:', err)
        }
    }

    const downloadTxt = () => {
        const element = document.createElement("a")
        const file = new Blob([`${title}\n\n${content}`], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = `${title.toLowerCase().replace(/\s+/g, '-')}.txt`
        document.body.appendChild(element)
        element.click()
        setShowDownloadMenu(false)
    }

    const downloadPdf = () => {
        window.print()
        setShowDownloadMenu(false)
    }

    return (
        <div className="flex items-center gap-3">
            {/* Copy Content Button */}
            <button
                onClick={handleCopyContent}
                className="group relative p-3 rounded-full border border-border/40 bg-card/10 backdrop-blur-md hover:border-accent hover:bg-accent/5 transition-all text-muted-foreground/40 hover:text-accent shadow-xl"
                title="Copy content"
            >
                {copiedContent ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copiedContent && (
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-accent text-white text-[9px] font-black uppercase tracking-widest rounded animate-bounce-in whitespace-nowrap">
                        Content Copied!
                    </span>
                )}
            </button>

            {/* Download Button with Menu */}
            <div className="relative">
                <button
                    onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                    className="p-3 rounded-full border border-border/40 bg-card/10 backdrop-blur-md hover:border-accent hover:bg-accent/5 transition-all text-muted-foreground/40 hover:text-accent shadow-xl"
                    title="Download"
                >
                    <Download className="w-4 h-4" />
                </button>
                {showDownloadMenu && (
                    <div className="absolute top-12 right-0 w-40 bg-background border border-border/40 rounded-2xl shadow-2xl p-2 z-[60] backdrop-blur-xl animate-fade-in">
                        <button onClick={downloadTxt} className="w-full flex items-center gap-3 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-accent hover:bg-accent/5 rounded-xl transition-all">
                            <FileText className="w-3.5 h-3.5" /> TXT File
                        </button>
                        <button onClick={downloadPdf} className="w-full flex items-center gap-3 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-accent hover:bg-accent/5 rounded-xl transition-all">
                            <FilePdf className="w-3.5 h-3.5" /> PDF Document
                        </button>
                    </div>
                )}
            </div>

            {/* Share Button */}
            <button
                onClick={handleShare}
                className="group relative p-3 rounded-full border border-border/40 bg-card/10 backdrop-blur-md hover:border-accent hover:bg-accent/5 transition-all text-muted-foreground/40 hover:text-accent shadow-xl"
                title="Share link"
            >
                {copiedLink ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
                {copiedLink && (
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-accent text-white text-[9px] font-black uppercase tracking-widest rounded animate-bounce-in whitespace-nowrap">
                        Link Copied!
                    </span>
                )}
            </button>
        </div>
    )
}
