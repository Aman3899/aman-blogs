'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPostSchema, CreatePostFormData } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'
import { BlogPost } from '@/types/database'
import dynamic from 'next/dynamic'
import {
    Type,
    FileText,
    Send,
    X,
    AlertCircle,
    Sparkles,
    Eye,
    Edit3
} from 'lucide-react'
import "easymde/dist/easymde.min.css"

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

export default function CreatePostForm() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [optimisticPost, setOptimisticPost] = useState<Partial<BlogPost> | null>(null)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreatePostFormData>({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            title: '',
            body: ''
        }
    })

    const mdeOptions = useMemo(() => ({
        spellChecker: false,
        placeholder: "Share your masterpiece with the world...",
        status: false,
        minHeight: "400px",
        autofocus: false,
        toolbar: [
            "bold", "italic", "heading", "|",
            "quote", "unordered-list", "ordered-list", "|",
            "link", "image", "|",
            "preview", "side-by-side", "fullscreen", "|",
            "guide"
        ] as any,
    }), [])

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
            }, 800)
        } catch (err) {
            setOptimisticPost(null)
            setError(err instanceof Error ? err.message : 'Failed to create post')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            {optimisticPost && (
                <div className="p-6 rounded-2xl bg-success/10 border border-success/20 animate-bounce-in shadow-lg shadow-success/5 flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full border-4 border-success/30 border-t-success animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-success" />
                        </div>
                    </div>
                    <div>
                        <p className="text-success font-black text-lg">Finishing touches...</p>
                        <p className="text-sm text-success/70 font-medium">Your masterpiece is being published to the stars.</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-3 group">
                    <label htmlFor="title" className="flex items-center gap-2 text-sm font-black text-foreground/80 uppercase tracking-widest pl-1 transition-colors group-focus-within:text-accent">
                        <Type className="w-4 h-4" />
                        Catchy Title
                    </label>
                    <div className="relative">
                        <input
                            {...register('title')}
                            type="text"
                            id="title"
                            className={`input text-lg font-bold py-4 px-5 bg-card/50 backdrop-blur-sm border-2 transition-all duration-300 ${errors.title
                                ? 'border-destructive focus:ring-destructive/20'
                                : 'border-border/50 focus:border-accent focus:ring-accent/20'
                                }`}
                            placeholder="e.g., The Future of Web Design"
                        />
                    </div>
                    {errors.title && (
                        <p className="error-message font-bold pl-1">{errors.title.message}</p>
                    )}
                </div>

                <div className="space-y-3 group">
                    <label className="flex items-center justify-between text-sm font-black text-foreground/80 uppercase tracking-widest pl-1 transition-colors group-focus-within:text-accent">
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Content Body
                        </div>
                        <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded font-bold">Markdown Supported</span>
                    </label>
                    <div className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-card/50 backdrop-blur-sm ${errors.body
                        ? 'border-destructive'
                        : 'border-border/50 focus-within:border-accent'
                        }`}>
                        <Controller
                            name="body"
                            control={control}
                            render={({ field }) => (
                                <SimpleMDE
                                    {...field}
                                    options={mdeOptions}
                                    className="prose-editor"
                                />
                            )}
                        />
                    </div>
                    {errors.body && (
                        <p className="error-message font-bold pl-1">{errors.body.message}</p>
                    )}
                </div>

                {error && (
                    <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 animate-shake flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                        <p className="text-destructive text-sm font-bold">{error}</p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary flex-[2] py-4 group relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                            {loading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            )}
                            {loading ? 'Publishing...' : 'Publish Masterpiece'}
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="btn-secondary flex-1 py-4 group hover:bg-destructive/5 hover:border-destructive/20 hover:text-destructive transition-all duration-300"
                    >
                        <span className="flex items-center justify-center gap-2 text-lg">
                            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                            Cancel
                        </span>
                    </button>
                </div>
            </form>

            <style jsx global>{`
                .prose-editor .editor-toolbar {
                    border: none;
                    border-bottom: 1px solid hsl(var(--border) / 0.5);
                    background: hsl(var(--secondary) / 0.3);
                    padding: 8px 12px;
                    opacity: 0.8;
                    transition: opacity 0.3s;
                }
                .prose-editor .editor-toolbar:hover {
                    opacity: 1;
                }
                .prose-editor .CodeMirror {
                    border: none;
                    background: transparent;
                    font-family: inherit;
                    font-size: 1.125rem;
                    padding: 20px;
                    color: hsl(var(--foreground));
                }
                .prose-editor .CodeMirror-cursor {
                    border-left: 2px solid hsl(var(--accent));
                }
                .prose-editor .editor-preview {
                    background: hsl(var(--background));
                    padding: 40px;
                }
                .prose-editor .editor-toolbar button {
                    color: hsl(var(--foreground)) !important;
                    border-radius: 6px;
                    margin: 0 2px;
                }
                .prose-editor .editor-toolbar button.active,
                .prose-editor .editor-toolbar button:hover {
                    background: hsl(var(--accent) / 0.1);
                    border-color: transparent;
                }
            `}</style>
        </div>
    )
}

