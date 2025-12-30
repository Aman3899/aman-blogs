'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import LoginForm from '@/components/auth/LoginForm'
import OTPLoginForm from '@/components/auth/OTPLoginForm'
import GoogleAuthButton from '@/components/auth/GoogleAuthButton'

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState<'password' | 'otp'>('password')
    const searchParams = useSearchParams()
    const message = searchParams.get('message')
    const error = searchParams.get('error')

    return (
        <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4">
            <div className="max-w-md w-full animate-scale-in">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-block mb-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-accent/50 float">
                            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
                        <span className="text-gradient">Welcome Back</span>
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-lg">
                        Sign in to continue your journey
                    </p>
                </div>

                {error && (
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-destructive/10 border border-destructive/30 backdrop-blur-sm animate-shake">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-destructive shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-destructive text-sm font-medium">{error}</p>
                        </div>
                    </div>
                )}

                {message && (
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm animate-slide-up">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-blue-400 text-sm font-medium">{message}</p>
                        </div>
                    </div>
                )}

                <div className="card p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl">
                    {/* Google OAuth */}
                    <GoogleAuthButton />

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 sm:px-4 py-1 bg-card text-muted-foreground text-xs sm:text-sm font-medium rounded-full border border-border/50">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-background/50 rounded-xl border border-border/50">
                        <button
                            onClick={() => setActiveTab('password')}
                            className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base ${activeTab === 'password'
                                ? 'bg-card text-foreground shadow-lg shadow-accent/10 border border-accent/20'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                        >
                            🔑 Password
                        </button>
                        <button
                            onClick={() => setActiveTab('otp')}
                            className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base ${activeTab === 'otp'
                                ? 'bg-card text-foreground shadow-lg shadow-accent/10 border border-accent/20'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                        >
                            ✨ Magic Link
                        </button>
                    </div>

                    {/* Forms */}
                    <div className="animate-fade-in">
                        {activeTab === 'password' ? <LoginForm /> : <OTPLoginForm />}
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center pt-4 sm:pt-6 border-t border-border/50">
                        <p className="text-sm text-muted-foreground">
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/signup"
                                className="text-accent hover:text-accent-light font-semibold transition-colors inline-flex items-center gap-1 group"
                            >
                                Sign up
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Security Notice */}
                <p className="text-center text-xs text-muted-foreground mt-6 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Your data is secure and encrypted
                </p>
            </div>
        </div>
    )
}
