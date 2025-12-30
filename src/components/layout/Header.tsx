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
        <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${scrolled 
            ? 'bg-card/95 border-border/80 shadow-2xl shadow-purple-500/5' 
            : 'bg-card/80 border-border/50'
            }`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Left side - Logo & Navigation */}
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-gradient-to-r from-accent/20 via-purple-600/20 to-pink-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                <div className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/10 to-purple-600/10 dark:from-accent/20 dark:to-purple-600/20 rounded-xl border border-accent/30 group-hover:border-accent/50 transition-all">
                                    <span className="text-2xl">✨</span>
                                    <h1 className="text-lg md:text-xl font-bold">
                                        <span className="text-gradient">Aman</span>
                                        <span className="text-foreground ml-1">Blogs</span>
                                    </h1>
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Navigation - Next to logo */}
                        <div className="hidden lg:flex items-center gap-1">
                            <Link
                                href="/"
                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-all duration-200"
                            >
                                Home
                            </Link>

                            {user && (
                                <Link
                                    href="/create-post"
                                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-all duration-200 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Create</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Right side - Auth & Theme */}
                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />
                        {user ? (
                            <ProfileDropdown user={user} />
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
                                >
                                    Login
                                </Link>
                                <Link href="/signup" className="btn-primary px-4 py-2 text-sm">
                                    <span className="flex items-center gap-2">
                                        Sign Up
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
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
