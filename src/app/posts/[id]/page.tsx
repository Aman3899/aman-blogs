import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/api/posts'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import {
    Calendar,
    Clock,
    ChevronLeft,
    TrendingUp
} from 'lucide-react'
import PostActions from '@/components/posts/PostActions'

// Use dynamic rendering for authenticated pages
export const dynamic = 'force-dynamic'

interface PostPageProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PostPageProps) {
    const { id } = await params
    const post = await getPostById(id)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: `${post.title} | Aman Blogs`,
        description: post.excerpt || post.body.substring(0, 160),
    }
}

export default async function PostPage({ params }: PostPageProps) {
    const { id } = await params
    const post = await getPostById(id)

    if (!post) {
        notFound()
    }

    const authorName = post.profiles?.full_name || post.profiles?.email || 'Anonymous'
    const readTime = Math.ceil(post.body.split(/\s+/).length / 200)

    // Clean excerpt for the header - strictly 1 line max
    const displayExcerpt = post.excerpt
        ? post.excerpt.replace(/[#*`>]/g, '').trim().substring(0, 80) + (post.excerpt.length > 80 ? '...' : '')
        : null;

    return (
        <div className="min-h-screen pb-48 selection:bg-accent/20 selection:text-accent">
            {/* Immersive Reading Progress */}
            <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-50">
                <div
                    className="h-full bg-gradient-to-r from-accent via-purple-500 to-accent shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-500 ease-out"
                    style={{ width: '45%' }}
                />
            </div>

            {/* Cinematic Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-15%] left-[-5%] w-[60%] h-[60%] bg-accent/[0.02] blur-[160px] rounded-full" />
                <div className="absolute bottom-[5%] right-[-10%] w-[50%] h-[50%] bg-purple-600/[0.02] blur-[140px] rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-40" />
            </div>

            <div className="max-w-5xl mx-auto px-6 pt-28">
                {/* Minimalist Navigation Layer */}
                <nav className="mb-32 flex items-center justify-between animate-fade-in">
                    <Link
                        href="/"
                        className="group flex items-center gap-6"
                    >
                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-all duration-700 opacity-0 group-hover:opacity-100" />
                            <div className="relative w-12 h-12 rounded-2xl border border-border/40 bg-card/5 backdrop-blur-2xl group-hover:border-accent group-hover:bg-accent/5 transition-all duration-500 flex items-center justify-center shadow-2xl shadow-black/5 group-hover:-translate-x-1">
                                <ChevronLeft className="w-5 h-5 text-muted-foreground/40 group-hover:text-accent transition-colors" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-[9px] uppercase tracking-[0.4em] text-muted-foreground/30 group-hover:text-accent/60 transition-colors">Vol. 01</span>
                            <span className="font-serif italic text-sm text-muted-foreground/60 group-hover:text-foreground transition-colors">The Feed</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2">
                        <PostActions title={post.title} content={post.body} />
                    </div>
                </nav>

                <article className="animate-slide-up">
                    {/* Architectural Header */}
                    <header className="mb-40 text-center relative">
                        {displayExcerpt && (
                            <div className="mb-14 flex justify-center perspective-[1000px]">
                                <span className="inline-flex items-center gap-4 px-10 py-4 rounded-[2rem] bg-secondary/10 border border-border/20 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 backdrop-blur-sm hover:text-foreground hover:border-accent/20 transition-all duration-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                    {displayExcerpt}
                                </span>
                            </div>
                        )}

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-16 leading-[0.9] tracking-[-0.06em] text-foreground text-balance">
                            {post.title}
                        </h1>

                        {/* Signature Information Pill */}
                        <div className="inline-flex flex-wrap items-center justify-center gap-12 py-10 px-20 rounded-[4rem] bg-card/5 backdrop-blur-3xl border border-border/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] dark:shadow-none hover:border-accent/10 transition-colors duration-700">
                            <div className="flex items-center gap-6 group/author">
                                <div className="relative">
                                    <div className="absolute inset-[-8px] bg-gradient-to-br from-accent to-purple-600 rounded-full opacity-0 group-hover/author:opacity-20 transition-opacity blur-xl scale-110" />
                                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-accent to-purple-900 flex items-center justify-center text-white text-lg font-black ring-4 ring-background/50 shadow-2xl transition-transform group-hover/author:scale-105 duration-500">
                                        {authorName[0].toUpperCase()}
                                    </div>
                                </div>
                                <div className="text-left">
                                    <span className="block text-foreground text-xs font-black uppercase tracking-[0.1em] mb-0.5">{authorName}</span>
                                    <span className="text-[9px] text-muted-foreground/30 font-black uppercase tracking-[0.3em]">Signature Author</span>
                                </div>
                            </div>

                            <div className="w-px h-10 bg-gradient-to-b from-transparent via-border/20 to-transparent hidden lg:block" />

                            <div className="flex items-center gap-6 group/meta">
                                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-accent ring-1 ring-border/20 shadow-inner group-hover/meta:bg-accent/5 transition-colors duration-500">
                                    <Calendar className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="text-left">
                                    <span className="block text-foreground text-[11px] font-black uppercase tracking-[0.1em] mb-0.5">{formatDate(post.published_date)}</span>
                                    <span className="text-[9px] text-muted-foreground/30 font-black uppercase tracking-[0.3em]">Date Filed</span>
                                </div>
                            </div>

                            <div className="w-px h-10 bg-gradient-to-b from-transparent via-border/20 to-transparent hidden lg:block" />

                            <div className="flex items-center gap-6 group/meta">
                                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-accent ring-1 ring-border/20 shadow-inner group-hover/meta:bg-accent/5 transition-colors duration-500">
                                    <Clock className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="text-left">
                                    <span className="block text-foreground text-[11px] font-black uppercase tracking-[0.1em] mb-0.5">{readTime} min read</span>
                                    <span className="text-[9px] text-muted-foreground/30 font-black uppercase tracking-[0.3em]">Read Duration</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Immersive Reading Canvas */}
                    <main className="relative max-w-3xl mx-auto">
                        {/* Marginalia Decoration */}
                        <div className="absolute -left-32 top-0 h-full w-px bg-gradient-to-b from-accent/20 via-border/10 to-transparent hidden xl:block" />

                        <div className="prose prose-2xl prose-stone dark:prose-invert max-w-none
                            prose-headings:text-foreground prose-headings:font-black prose-headings:tracking-[-0.06em]
                            prose-h2:text-6xl prose-h2:mt-40 prose-h2:mb-16 prose-h2:border-b prose-h2:border-border/5 prose-h2:pb-8
                            prose-p:text-[1.45rem] prose-p:leading-[1.95] prose-p:text-foreground/90 prose-p:font-normal prose-p:mb-12
                            prose-a:text-accent prose-a:font-black prose-a:underline-offset-[16px] hover:prose-a:underline decoration-accent/30
                            prose-blockquote:border-l-[2px] prose-blockquote:border-accent prose-blockquote:bg-transparent prose-blockquote:pl-16 prose-blockquote:pr-0 prose-blockquote:py-4 prose-blockquote:italic prose-blockquote:text-5xl prose-blockquote:font-serif prose-blockquote:opacity-100 prose-blockquote:my-32 prose-blockquote:text-left prose-blockquote:leading-tight prose-blockquote:tracking-tight
                            prose-img:rounded-[5rem] prose-img:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.3)]
                            prose-code:text-accent prose-code:bg-accent/[0.03] prose-code:px-4 prose-code:py-2 prose-code:rounded-3xl prose-code:border prose-code:border-accent/10 prose-code:before:content-none prose-code:after:content-none prose-code:font-black prose-code:text-lg
                            prose-pre:bg-[#020202] prose-pre:rounded-[4rem] prose-pre:border prose-pre:border-border/10 prose-pre:p-16 prose-pre:shadow-2xl
                            prose-ul:list-disc prose-li:marker:text-accent/30 prose-li:mb-6
                            selection:bg-accent/10">

                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {post.body}
                            </ReactMarkdown>

                            {/* End of Story Marker */}
                            <div className="mt-48 flex flex-col items-center gap-8 animate-fade-in opacity-40 hover:opacity-100 transition-opacity">
                                <div className="w-px h-24 bg-gradient-to-b from-accent/50 to-transparent" />
                                <span className="font-serif italic text-2xl tracking-widest text-muted-foreground/40">The End</span>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        </div>
    )
}