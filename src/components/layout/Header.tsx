import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ProfileDropdown from '@/components/auth/ProfileDropdown'

export default async function Header() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <header className="sticky top-0 z-40 glass border-b border-border/50">
            <nav className="container-custom py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                            <div className="relative px-4 py-2 bg-surface rounded-lg">
                                <h1 className="text-2xl font-bold text-gradient">Aman Blogs</h1>
                            </div>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-text-secondary hover:text-text-primary transition-colors"
                        >
                            Home
                        </Link>

                        {user ? (
                            <ProfileDropdown user={user} />
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="text-text-secondary hover:text-text-primary transition-colors"
                                >
                                    Login
                                </Link>
                                <Link href="/signup" className="btn-primary">
                                    <span>Sign Up</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}
