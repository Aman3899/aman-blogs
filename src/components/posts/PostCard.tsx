'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { BlogPost } from '@/types/database'
import { formatDate, formatRelativeDate } from '@/lib/utils'

interface PostCardProps {
    post: BlogPost
}

export default function PostCard({ post }: PostCardProps) {
    const authorName = post.profiles?.full_name || post.profiles?.email || 'Anonymous'
    const wordCount = post.body.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200) // Average reading speed: 200 words/min

    const isNew = useMemo(() => {
        const sevenDaysAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
        return new Date(post.published_date) > sevenDaysAgo
    }, [post.published_date])

    return (
        <Link href={`/posts/${post.id}`} className="group block h-full">
            <article className="card-hover p-6 h-full flex flex-col">
                {/* Header with badges */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-purple-600/10 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 border border-purple-600/30">
                                📚 {readTime} min read
                            </span>
                            {isNew && (
                                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30 animate-pulse">
                                    ✨ New
                                </span>
                            )}
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-gradient transition-all duration-300 line-clamp-2 mb-3">
                            {post.title}
                        </h2>
                    </div>
                </div>

                {/* Excerpt */}
                <p className="text-muted-foreground line-clamp-3 mb-4 leading-relaxed flex-1">
                    {post.excerpt || post.body.substring(0, 200)}...
                </p>

                {/* Divider with gradient */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4"></div>

                {/* Author and Meta Info */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-accent to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-white text-sm font-bold ring-2 ring-surface">
                                {authorName[0].toUpperCase()}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">{authorName}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {formatRelativeDate(post.published_date)}
                            </p>
                        </div>
                    </div>

                    {/* Read more with animated arrow */}
                    <div className="flex items-center gap-2 text-accent group-hover:text-accent-light transition-colors">
                        <span className="text-sm font-semibold hidden sm:inline">Read</span>
                        <svg
                            className="w-5 h-5 transition-all duration-300 group-hover:translate-x-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/5 to-purple-600/5"></div>
                </div>
            </article>
        </Link>
    )
}
