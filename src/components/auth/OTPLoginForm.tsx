'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { otpSchema, OTPFormData } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'

export default function OTPLoginForm() {
    const [sent, setSent] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OTPFormData>({
        resolver: zodResolver(otpSchema),
    })

    const onSubmit = async (data: OTPFormData) => {
        setLoading(true)
        setError(null)

        try {
            const supabase = createClient()
            const { error } = await supabase.auth.signInWithOtp({
                email: data.email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            })

            if (error) throw error

            setSent(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send OTP')
        } finally {
            setLoading(false)
        }
    }

    if (sent) {
        return (
            <div className="p-6 rounded-xl bg-green-500/10 border-2 border-green-500/30 backdrop-blur-sm animate-scale-in">
                <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-green-400 mb-1">Magic link sent!</h3>
                        <p className="text-sm text-green-300/80">
                            Check your email for the magic link to sign in. The link will expire in 1 hour.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
                <label htmlFor="otp-email" className="block text-sm font-semibold text-text-primary">
                    Email Address
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </div>
                    <input
                        {...register('email')}
                        type="email"
                        id="otp-email"
                        className={`input pl-12 ${errors.email ? 'border-destructive focus:border-destructive' : ''}`}
                        placeholder="you@example.com"
                    />
                </div>
                {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
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
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span className="flex items-center justify-center gap-2">
                    {loading && <div className="spinner" />}
                    {loading ? 'Sending...' : '✨ Send Magic Link'}
                </span>
            </button>

            <p className="text-xs text-text-secondary text-center flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                We&apos;ll send you a magic link to sign in without a password
            </p>
        </form>
    )
}
