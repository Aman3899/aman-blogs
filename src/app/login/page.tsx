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

    return (
        <div className="container-custom py-12">
            <div className="max-w-md mx-auto animate-fade-in">
                <div className="text-center mb-8">
                    <h1 className="text-gradient mb-4">Welcome Back</h1>
                    <p className="text-text-secondary">
                        Sign in to continue to Aman Blogs
                    </p>
                </div>

                {message && (
                    <div className="mb-6 p-3 rounded-lg bg-blue-500/10 border border-blue-500/50">
                        <p className="text-blue-400 text-sm">{message}</p>
                    </div>
                )}

                <div className="card p-8 space-y-6">
                    {/* Google OAuth */}
                    <GoogleAuthButton />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-surface text-text-secondary">Or continue with</span>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-2 p-1 bg-background rounded-lg">
                        <button
                            onClick={() => setActiveTab('password')}
                            className={`flex-1 py-2 rounded-md transition-all ${activeTab === 'password'
                                    ? 'bg-surface text-text-primary font-medium'
                                    : 'text-text-secondary hover:text-text-primary'
                                }`}
                        >
                            Password
                        </button>
                        <button
                            onClick={() => setActiveTab('otp')}
                            className={`flex-1 py-2 rounded-md transition-all ${activeTab === 'otp'
                                    ? 'bg-surface text-text-primary font-medium'
                                    : 'text-text-secondary hover:text-text-primary'
                                }`}
                        >
                            Magic Link
                        </button>
                    </div>

                    {/* Forms */}
                    {activeTab === 'password' ? <LoginForm /> : <OTPLoginForm />}

                    <div className="text-center pt-4 border-t border-border">
                        <p className="text-sm text-text-secondary">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-accent hover:text-accent-hover font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
