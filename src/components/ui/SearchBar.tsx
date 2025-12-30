'use client'

import { useState, useEffect, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { Search, Loader2, X } from 'lucide-react'

export default function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
    const debouncedSearchTerm = useDebounce(searchTerm, 400) // Slightly faster debounce

    useEffect(() => {
        const currentQ = searchParams.get('q') || ''
        if (debouncedSearchTerm === currentQ) return

        const params = new URLSearchParams(searchParams.toString())
        if (debouncedSearchTerm) {
            params.set('q', debouncedSearchTerm)
            params.delete('page')
        } else {
            params.delete('q')
        }

        startTransition(() => {
            // Push to home page with search params
            router.push(`/?${params.toString()}`, { scroll: false })
        })
    }, [debouncedSearchTerm, router, searchParams])

    return (
        <div className="relative w-full group">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

            <div className="relative flex items-center">
                {/* Icon Container with higher z-index */}
                <div className="absolute left-5 flex items-center justify-center pointer-events-none transition-all duration-300 group-focus-within:scale-110 z-10">
                    {isPending ? (
                        <Loader2 className="w-5 h-5 text-purple-600 animate-spin" strokeWidth={3} />
                    ) : (
                        <Search className="w-5 h-5 text-foreground/60 group-focus-within:text-purple-600 transition-colors" strokeWidth={2.5} />
                    )}
                </div>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search titles or stories..."
                    className="w-full pl-14 pr-12 py-4 bg-card/60 backdrop-blur-2xl border border-border/80 rounded-[2rem] focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500/50 outline-none transition-all duration-500 placeholder:text-muted-foreground/40 text-base font-medium shadow-sm group-hover:shadow-purple-500/5 group-hover:border-purple-500/30 dark:bg-card/20 relative z-0"
                />

                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-5 p-1.5 rounded-full hover:bg-muted text-muted-foreground/40 hover:text-foreground transition-all duration-300 z-10"
                        title="Clear search"
                    >
                        <X className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                )}
            </div>
        </div>
    )
}
