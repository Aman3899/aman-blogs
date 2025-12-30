import { getPosts } from '@/lib/api/posts'
import PostCard from '@/components/posts/PostCard'
import Pagination from '@/components/ui/Pagination'
import SearchBar from '@/components/ui/SearchBar'
import Link from 'next/link'
import { Suspense } from 'react'

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60
export const dynamic = 'force-dynamic'

interface HomePageProps {
  searchParams: Promise<{ page?: string; q?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const query = params.q || ''

  const { data: posts, total, hasMore, pageSize } = await getPosts(page, query)

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
            {!query && (
              <div className="grid grid-cols-3 gap-6 md:gap-12 mt-16 pt-8 border-t border-border/50 transition-all duration-500">
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
            )}
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div id="posts" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              Latest Posts
            </h2>
            <p className="text-muted-foreground mt-2">Explore the newest stories from our community</p>
          </div>

          <div className="w-full md:w-auto md:min-w-[400px]">
            <Suspense fallback={<div className="h-12 bg-card/50 animate-pulse rounded-2xl w-full"></div>}>
              <SearchBar />
            </Suspense>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-flex items-center justify-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 mb-6 transition-transform hover:scale-105 duration-300">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-foreground">
              {query ? 'No matches found' : 'No posts yet'}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {query
                ? "We couldn't find any posts matching your search. Try different keywords or browse our trending topics."
                : "Be the first to share your story and inspire others in our community!"}
            </p>
            {query ? (
              <Link
                href="/"
                className="btn-secondary"
              >
                <span>✨ Clear Search</span>
              </Link>
            ) : (
              <Link href="/signup" className="btn-primary">
                <span>✍️ Create First Post</span>
              </Link>
            )}
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
