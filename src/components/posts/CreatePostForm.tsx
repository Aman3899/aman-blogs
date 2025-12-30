'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPostSchema, CreatePostFormData } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'
import { BlogPost } from '@/types/database'

export default function CreatePostForm() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [optimisticPost, setOptimisticPost] = useState<Partial<BlogPost> | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreatePostFormData>({
        resolver: zodResolver(createPostSchema),
    })

    const onSubmit = async (data: CreatePostFormData) => {
        setLoading(true)
        setError(null)

        try {
            const supabase = createClient()

            // Get current user
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                throw new Error('You must be logged in to create a post')
            }

            // Optimistic UI update
            setOptimisticPost({
                title: data.title,
                body: data.body,
                author_id: user.id,
            })

            // Create the post
            const { data: newPost, error: createError } = await (supabase
                .from('blog_posts')
                // @ts-expect-error - Supabase SSR type inference issue
                .insert({
                    title: data.title,
                    body: data.body,
                    author_id: user.id,
                })
                .select()
                .single())

            if (createError) throw createError
            if (!newPost) throw new Error('Failed to create post')

            // Reset form
            reset()

            // Wait a bit to show the optimistic update
            setTimeout(() => {
                // @ts-expect-error - Type comes from Supabase response
                if (newPost && newPost.id) {
                    // @ts-expect-error - Type comes from Supabase response
                    router.push(`/posts/${newPost.id}`)
                    router.refresh()
                }
            }, 500)
        } catch (err) {
            setOptimisticPost(null)
            setError(err instanceof Error ? err.message : 'Failed to create post')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            {optimisticPost && (
                <div className="p-4 rounded-xl bg-success/10 border-2 border-success/50 animate-slide-up">
                    <div className="flex items-center gap-3">
                        <div className="spinner border-success" />
                        <div>
                            <p className="text-success font-semibold">Creating your post...</p>
                            <p className="text-sm text-muted-foreground mt-0.5">Hang tight while we publish your masterpiece</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        Post Title
                    </label>
                    <input
                        {...register('title')}
                        type="text"
                        id="title"
                        className={`input ${errors.title ? 'border-destructive focus:border-destructive' : ''}`}
                        placeholder="Enter an engaging title..."
                    />
                    {errors.title && (
                        <p className="error-message">{errors.title.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="body" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Post Content
                    </label>
                    <textarea
                        {...register('body')}
                        id="body"
                        rows={14}
                        className={`input resize-none ${errors.body ? 'border-destructive focus:border-destructive' : ''}`}
                        placeholder="Share your story... ✨"
                    />
                    {errors.body && (
                        <p className="error-message">{errors.body.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        The first 200 characters will be used as the excerpt
                    </p>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-destructive/10 border-2 border-destructive/50 animate-shake">
                        <div className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-destructive shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-destructive text-sm font-medium">{error}</p>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-1"
                    >
                        <span className="flex items-center justify-center gap-2">
                            {loading && <div className="spinner" />}
                            {loading ? 'Publishing...' : '🚀 Publish Post'}
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="btn-secondary order-2 sm:order-2 px-8"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
