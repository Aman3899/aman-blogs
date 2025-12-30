import { createClient as createServerClient } from '@/lib/supabase/server'
import { BlogPost, PaginatedResponse, CreatePostInput } from '@/types/database'

const POSTS_PER_PAGE = 5

export async function getPosts(page: number = 1): Promise<PaginatedResponse<BlogPost>> {
    const supabase = await createServerClient()
    const start = (page - 1) * POSTS_PER_PAGE
    const end = start + POSTS_PER_PAGE - 1

    // Get total count
    const { count } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })

    // Get paginated posts with author info
    const { data, error } = await supabase
        .from('blog_posts')
        .select(`
      *,
      profiles:author_id (
        full_name,
        email
      )
    `)
        .order('published_date', { ascending: false })
        .range(start, end)

    if (error) {
        console.error('Error fetching posts:', error)
        throw new Error('Failed to fetch posts')
    }

    return {
        data: data as BlogPost[],
        total: count || 0,
        page,
        pageSize: POSTS_PER_PAGE,
        hasMore: (count || 0) > end + 1
    }
}

export async function getPostById(id: string): Promise<BlogPost | null> {
    const supabase = await createServerClient()

    const { data, error } = await supabase
        .from('blog_posts')
        .select(`
      *,
      profiles:author_id (
        full_name,
        email,
        avatar_url
      )
    `)
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching post:', error)
        return null
    }

    return data as BlogPost
}

export async function createPost(input: CreatePostInput, authorId: string): Promise<BlogPost> {
    const supabase = await createServerClient()

    const { data, error } = await supabase
        .from('blog_posts')
        .insert({
            title: input.title,
            body: input.body,
            author_id: authorId
        } as any)
        .select(`
      *,
      profiles:author_id (
        full_name,
        email
      )
    `)
        .single()

    if (error) {
        console.error('Error creating post:', error)
        throw new Error('Failed to create post')
    }

    return data as BlogPost
}

export async function getRecentPostIds(limit: number = 10): Promise<string[]> {
    const supabase = await createServerClient()

    const { data, error } = await supabase
        .from('blog_posts')
        .select('id')
        .order('published_date', { ascending: false })
        .limit(limit)

    if (error) {
        console.error('Error fetching post IDs:', error)
        return []
    }

    return (data as any[]).map((post: any) => post.id)
}
