'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, SignInFormData } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    })

    const emailValue = watch('email')

    // Load saved email on mount
    useEffect(() => {
        const savedEmail = localStorage.getItem('loginEmail')
        if (savedEmail) {
            setValue('email', savedEmail)
        }
    }, [setValue])

    // Save email on change
    useEffect(() => {
        if (emailValue) {
            localStorage.setItem('loginEmail', emailValue)
        }
    }, [emailValue])

    const onSubmit = async (data: SignInFormData) => {
        setLoading(true)
        setError(null)

        try {
            const supabase = createClient()
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            })

            if (error) throw error

            router.refresh()
            router.push('/')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to sign in')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                    Email Address
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </div>
                    <input
                        {...register('email')}
                        type="email"
                        id="email"
                        className={`input pl-12 ${errors.email ? 'border-destructive focus:border-destructive' : ''}`}
                        placeholder="you@example.com"
                    />
                </div>
                {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                    Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <input
                        {...register('password')}
                        type="password"
                        id="password"
                        className={`input pl-12 ${errors.password ? 'border-destructive focus:border-destructive' : ''}`}
                        placeholder="••••••••"
                    />
                </div>
                {errors.password && (
                    <p className="error-message">{errors.password.message}</p>
                )}
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-destructive/10 border-2 border-destructive/50 animate-shake">
                    <div className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-destructive shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-destructive text-sm font-medium">{error}</p>
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
                <span className="flex items-center justify-center gap-2">
                    {loading && <div className="spinner" />}
                    {loading ? 'Signing in...' : 'Sign In'}
                </span>
            </button>
        </form>
    )
}
