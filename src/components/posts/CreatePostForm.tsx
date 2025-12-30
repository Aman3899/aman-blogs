'use client'

import { useState, useEffect } from 'react'
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
            const { data: newPost, error: createError } = await supabase
                .from('blog_posts')
                .insert({
                    title: data.title,
                    body: data.body,
                    author_id: user.id,
                } as any)
                .select()
                .single()

            if (createError) throw createError

            // Reset form
            reset()

            // Wait a bit to show the optimistic update
            setTimeout(() => {
                router.push(`/posts/${(newPost as any)?.id}`)
                router.refresh()
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
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/50 animate-slide-up">
                    <div className="flex items-center gap-2">
                        <div className="spinner border-green-500" />
                        <p className="text-success">Creating your post...</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                        Post Title
                    </label>
                    <input
                        {...register('title')}
                        type="text"
                        id="title"
                        className="input"
                        placeholder="Enter an engaging title..."
                    />
                    {errors.title && (
                        <p className="error-message">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="body" className="block text-sm font-medium mb-2">
                        Post Content
                    </label>
                    <textarea
                        {...register('body')}
                        id="body"
                        rows={12}
                        className="input resize-none"
                        placeholder="Share your story..."
                    />
                    {errors.body && (
                        <p className="error-message">{errors.body.message}</p>
                    )}
                    <p className="text-xs text-text-secondary mt-2">
                        The first 200 characters will be used as the excerpt
                    </p>
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50">
                        <p className="text-error text-sm">{error}</p>
                    </div>
                )}

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary flex-1 disabled:opacity-50"
                    >
                        <span className="flex items-center justify-center gap-2">
                            {loading && <div className="spinner" />}
                            {loading ? 'Publishing...' : 'Publish Post'}
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="btn-secondary"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
