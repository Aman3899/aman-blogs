import { getPosts } from '@/lib/api/posts'
import PostCard from '@/components/posts/PostCard'
import Pagination from '@/components/ui/Pagination'
import Link from 'next/link'

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60
export const dynamic = 'force-dynamic'

interface HomePageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1

  const { data: posts, total, hasMore, pageSize } = await getPosts(page)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-purple-600/10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-purple-600/10 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 border border-purple-600/30 animate-bounce-in">
                ✨ Welcome to the Community
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Discover Amazing</span>
              <br />
              <span className="text-foreground">Stories & Insights</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Join our vibrant community of writers and readers. Share your unique perspective and explore diverse content from talented creators worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup" className="btn-primary text-lg px-8 py-3">
                <span className="flex items-center gap-2">
                  🚀 Start Writing
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link href="#posts" className="btn-secondary text-lg px-8 py-3">
                <span className="flex items-center gap-2">
                  📖 Explore Posts
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 md:gap-12 mt-16 pt-8 border-t border-border/50">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-gradient">{total}+</div>
                <div className="text-sm text-muted-foreground">Posts Published</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-gradient">10k+</div>
                <div className="text-sm text-muted-foreground">Active Readers</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-gradient">100+</div>
                <div className="text-sm text-muted-foreground">Writers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div id="posts" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Latest Posts
          </h2>
          {page === 1 && (
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-purple-600/10 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 border border-purple-600/30 animate-pulse">
              🔥 Trending
            </span>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-flex items-center justify-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 mb-6">
              <svg
                className="w-24 h-24 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-foreground">No posts yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Be the first to share your story and inspire others in our community!
            </p>
            <Link href="/signup" className="btn-primary">
              <span>✍️ Create First Post</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>

            <Pagination
              currentPage={page}
              hasMore={hasMore}
              total={total}
              pageSize={pageSize}
            />
          </>
        )}
      </div>
    </div>
  )
}
