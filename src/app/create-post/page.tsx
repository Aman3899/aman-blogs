import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import CreatePostForm from '@/components/posts/CreatePostForm'

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
        <div className="container-custom py-12">
            <div className="max-w-3xl mx-auto animate-fade-in">
                <div className="mb-8">
                    <h1 className="text-gradient mb-4">Create New Post</h1>
                    <p className="text-text-secondary">
                        Share your thoughts, stories, and insights with the community
                    </p>
                </div>

                <div className="card p-8">
                    <CreatePostForm />
                </div>
            </div>
        </div>
    )
}
