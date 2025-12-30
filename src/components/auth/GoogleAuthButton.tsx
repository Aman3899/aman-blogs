'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function GoogleAuthButton() {
    const [loading, setLoading] = useState(false)

    const handleGoogleLogin = async () => {
        setLoading(true)

        try {
            const supabase = createClient()
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            })

            if (error) throw error
        } catch (err) {
            console.error('Google login error:', err)
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="group relative w-full overflow-hidden rounded-xl bg-white dark:bg-white/10 backdrop-blur-xl border-2 border-gray-200 dark:border-white/20 px-6 py-4 font-semibold text-gray-900 dark:text-white shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
            <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {loading ? (
                <div className="flex items-center justify-center gap-3">
                    <div className="spinner border-purple-600" />
                    <span>Connecting...</span>
                </div>
            ) : (
                <div className="relative flex items-center justify-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="relative z-10">
                    <path
                        d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z"
                        fill="#4285F4"
                    />
                    <path
                        d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z"
                        fill="#34A853"
                    />
                    <path
                        d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z"
                        fill="#EA4335"
                    />
                </svg>
                <span className="relative z-10 font-semibold">Continue with Google</span>
                <div className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2.5 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </div>
            </div>
            )}
        </button>
    )
}
