import Link from 'next/link'
import { BlogPost } from '@/types/database'
import { formatDate, formatRelativeDate } from '@/lib/utils'

interface PostCardProps {
    post: BlogPost
}

export default function PostCard({ post }: PostCardProps) {
    const authorName = post.profiles?.full_name || post.profiles?.email || 'Anonymous'

    return (
        <Link href={`/posts/${post.id}`}>
            <article className="card-hover p-6 animate-fade-in">
                <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-text-primary group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                    </h2>

                    <p className="text-text-secondary line-clamp-3">
                        {post.excerpt || post.body.substring(0, 200)}...
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                                {authorName[0].toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-text-primary">{authorName}</p>
                                <p className="text-xs text-text-secondary">
                                    {formatDate(post.published_date)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-accent">
                            <span className="text-sm">Read more</span>
                            <svg
                                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
}
