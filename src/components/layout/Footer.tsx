import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-border/50 mt-20 bg-card/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gradient">✨ Aman Blogs</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            A modern platform for sharing stories, ideas, and insights with the world. Built with passion and cutting-edge technology.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-surface hover:bg-surface-hover rounded-lg transition-all hover:scale-110 border border-border/50 group"
                                aria-label="GitHub"
                            >
                                <svg className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-surface hover:bg-surface-hover rounded-lg transition-all hover:scale-110 border border-border/50 group"
                                aria-label="Twitter"
                            >
                                <svg className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-surface hover:bg-surface-hover rounded-lg transition-all hover:scale-110 border border-border/50 group"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-text-primary">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-sm text-text-secondary hover:text-accent transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all duration-300"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/create-post" className="text-sm text-text-secondary hover:text-accent transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all duration-300"></span>
                                    Create Post
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup" className="text-sm text-text-secondary hover:text-accent transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all duration-300"></span>
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Info */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-text-primary">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm text-text-secondary hover:text-accent transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all duration-300"></span>
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-text-secondary hover:text-accent transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all duration-300"></span>
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-text-secondary hover:text-accent transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all duration-300"></span>
                                    Cookie Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-text-secondary text-sm flex items-center gap-2">
                        <span>© {currentYear} Aman Blogs.</span>
                        <span className="hidden md:inline">Built with</span>
                        <span className="text-red-500 animate-pulse">❤️</span>
                        <span className="hidden md:inline">Next.js, Supabase & TailwindCSS</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-secondary">
                        <span className="px-3 py-1 bg-surface border border-border/50 rounded-full">
                            🚀 v1.0.0
                        </span>
                        <span className="px-3 py-1 bg-surface border border-border/50 rounded-full flex items-center gap-1">
                            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                            All systems operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
