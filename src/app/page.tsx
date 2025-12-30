import { getPosts } from '@/lib/api/posts'
import PostCard from '@/components/posts/PostCard'
import Pagination from '@/components/ui/Pagination'

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60

interface HomePageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1

  const { data: posts, total, hasMore, pageSize } = await getPosts(page)

  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-gradient mb-4">
          Welcome to Aman Blogs
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Discover amazing stories, insights, and perspectives from our community of writers
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-block p-6 rounded-full bg-surface mb-4">
            <svg
              className="w-16 h-16 text-text-secondary mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">No posts yet</h2>
          <p className="text-text-secondary">
            Be the first to share your story!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
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
  )
}
