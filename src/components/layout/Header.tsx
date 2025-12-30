'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import ProfileDropdown from '@/components/auth/ProfileDropdown'
import ThemeToggle from '@/components/theme/ThemeToggle'

export default function Header() {
    const [user, setUser] = useState<User | null>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const supabase = createClient()

        // Get initial user
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        // Handle scroll effect
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            subscription.unsubscribe()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${scrolled 
            ? 'bg-card/90 border-border/80 shadow-lg' 
            : 'bg-card/70 border-border/50'
            }`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-linear-to-r from-accent to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                            <div className="relative px-4 py-2 bg-card rounded-lg border border-border/50">
                                <h1 className="text-xl md:text-2xl font-bold text-gradient">✨ Aman Blogs</h1>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-muted-foreground hover:text-foreground transition-all duration-200 relative group"
                        >
                            <span>Home</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-accent to-purple-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    href="/create-post"
                                    className="text-muted-foreground hover:text-foreground transition-all duration-200 relative group flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Create</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-accent to-purple-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <ThemeToggle />
                                <ProfileDropdown user={user} />
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <ThemeToggle />
                                <Link
                                    href="/login"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Login
                                </Link>
                                <Link href="/signup" className="btn-primary">
                                    <span>Sign Up</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button and Theme Toggle */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-border/50 animate-slide-up">
                        <div className="flex flex-col gap-3">
                            <Link
                                href="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all text-sm"
                            >
                                🏠 Home
                            </Link>

                            {user ? (
                                <>
                                    <Link
                                        href="/create-post"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all flex items-center gap-2 text-sm"
                                    >
                                        ✍️ Create Post
                                    </Link>
                                    <div className="px-4 py-2.5 bg-card/50 rounded-lg border border-border/50">
                                        <p className="text-xs sm:text-sm text-muted-foreground mb-1">Signed in as</p>
                                        <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <button
                                        onClick={async () => {
                                            const supabase = createClient()
                                            await supabase.auth.signOut()
                                            setMobileMenuOpen(false)
                                        }}
                                        className="px-4 py-2.5 text-destructive hover:bg-destructive/10 rounded-lg transition-all text-left text-sm"
                                    >
                                        🚪 Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all text-sm"
                                    >
                                        🔐 Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="btn-primary w-full text-center"
                                    >
                                        <span>✨ Sign Up</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}
