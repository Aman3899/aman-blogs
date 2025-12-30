'use client'

import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-lg bg-surface hover:bg-surface/80 border border-border transition-all duration-300 group"
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6">
                {/* Sun Icon */}
                <svg
                    className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
                        theme === 'light' 
                            ? 'opacity-100 rotate-0 scale-100' 
                            : 'opacity-0 rotate-90 scale-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>

                {/* Moon Icon */}
                <svg
                    className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
                        theme === 'dark' 
                            ? 'opacity-100 rotate-0 scale-100' 
                            : 'opacity-0 -rotate-90 scale-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            </div>
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity blur -z-10"></div>
        </button>
    )
}
