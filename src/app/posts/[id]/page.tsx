import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/api/posts'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

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

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <article className="max-w-3xl mx-auto animate-fade-in">
                {/* Post Header */}
                <header className="mb-8">
                    <h1 className="mb-6">{post.title}</h1>

                    <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-white font-semibold shrink-0">
                            {authorName[0].toUpperCase()}
                        </div>
                        <div>
                            <p className="font-medium text-foreground">{authorName}</p>
                            <p className="text-sm text-muted-foreground">
                                Published on {formatDate(post.published_date)}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Post Content */}
                <div className="prose prose-lg max-w-none dark:prose-invert">
                    <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                        {post.body}
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-12 pt-8 border-t border-border">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back to all posts
                    </Link>
                </div>
            </article>
        </div>
    )
}
