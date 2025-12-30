export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string | null
                    full_name: string | null
                    avatar_url: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            blog_posts: {
                Row: {
                    id: string
                    title: string
                    body: string
                    excerpt: string | null
                    author_id: string
                    published_date: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    body: string
                    author_id: string
                    published_date?: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    body?: string
                    author_id?: string
                    published_date?: string
                    created_at?: string
                    updated_at?: string
                }
            }
        }
    }
}

export interface BlogPost {
    id: string
    title: string
    body: string
    excerpt: string | null
    author_id: string
    published_date: string
    created_at: string
    updated_at: string
    profiles?: {
        full_name: string | null
        email: string | null
    }
}

export interface Profile {
    id: string
    email: string | null
    full_name: string | null
    avatar_url: string | null
    created_at: string
    updated_at: string
}

export interface CreatePostInput {
    title: string
    body: string
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    pageSize: number
    hasMore: boolean
}
