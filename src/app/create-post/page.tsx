import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import CreatePostForm from '@/components/posts/CreatePostForm'

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Create New Post | Aman Blogs',
    description: 'Share your story with the community',
}

export default async function CreatePostPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login?redirect=/create-post')
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="max-w-3xl mx-auto animate-fade-in">
                <div className="mb-6 sm:mb-8">
                    <div className="inline-block mb-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center shadow-lg shadow-accent/50 float">
                            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
                        <span className="text-gradient">Create New Post</span>
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-lg">
                        Share your thoughts, stories, and insights with the community
                    </p>
                </div>

                <div className="card p-5 sm:p-8 shadow-2xl">
                    <CreatePostForm />
                </div>
            </div>
        </div>
    )
}
