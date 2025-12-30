'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { BlogPost } from '@/types/database'
import { formatDate, formatRelativeDate } from '@/lib/utils'
import {
    Clock,
    Calendar,
    ArrowRight,
    Sparkles,
    BookOpen,
    User
} from 'lucide-react'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface PostCardProps {
    post: BlogPost
}

export default function PostCard({ post }: PostCardProps) {
    const authorName = post.profiles?.full_name || post.profiles?.email || 'Anonymous'
    const wordCount = post.body.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)

    const isNew = useMemo(() => {
        const sevenDaysAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
        return new Date(post.published_date) > sevenDaysAgo
    }, [post.published_date])

    const summaryContent = post.excerpt || post.body.substring(0, 160)

    return (
        <Link href={`/posts/${post.id}`} className="group block h-full">
            <article className="card-hover p-7 h-full flex flex-col relative overflow-hidden group">
                {/* Subtle Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150" />

                {/* Header with badges */}
                <div className="flex items-start justify-between mb-5 relative z-10">
                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg bg-accent/10 text-accent border border-accent/20">
                            <Clock className="w-3 h-3" />
                            {readTime} min read
                        </span>
                        {isNew && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg bg-green-500/10 text-green-600 border border-green-500/20 animate-pulse">
                                <Sparkles className="w-3 h-3" />
                                New
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex-1 relative z-10">
                    <h2 className="text-2xl font-black text-foreground group-hover:text-gradient transition-all duration-300 line-clamp-2 mb-4 leading-tight tracking-tight">
                        {post.title}
                    </h2>
                    <div className="text-muted-foreground line-clamp-3 mb-6 leading-relaxed flex-1 text-sm font-medium opacity-80 prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-p:my-0">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {summaryContent + (summaryContent.length >= 160 ? '...' : '')}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="pt-6 border-t border-border/50 flex flex-col gap-4 relative z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative group/avatar">
                                <div className="absolute -inset-1 bg-gradient-to-br from-accent to-purple-600 rounded-full blur-[2px] opacity-20 group-hover/avatar:opacity-100 transition-opacity duration-300" />
                                <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-white text-xs font-black ring-2 ring-background">
                                    {authorName[0].toUpperCase()}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-black text-foreground uppercase tracking-wider">{authorName}</p>
                                <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1 uppercase tracking-tighter">
                                    <Calendar className="w-2.5 h-2.5" />
                                    {formatRelativeDate(post.published_date)}
                                </p>
                            </div>
                        </div>

                        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-accent group-hover:text-accent group-hover:bg-accent/5 transition-all duration-300">
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent/10 transition-colors pointer-events-none" />
            </article>
        </Link>
    )
}

