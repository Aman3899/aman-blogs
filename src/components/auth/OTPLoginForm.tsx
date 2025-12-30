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
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/50">
                <p className="text-success">
                    Check your email for the magic link to sign in!
                </p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="otp-email" className="block text-sm font-medium mb-2">
                    Email Address
                </label>
                <input
                    {...register('email')}
                    type="email"
                    id="otp-email"
                    className="input"
                    placeholder="you@example.com"
                />
                {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                )}
            </div>

            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50">
                    <p className="text-error text-sm">{error}</p>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
            >
                <span className="flex items-center justify-center gap-2">
                    {loading && <div className="spinner" />}
                    {loading ? 'Sending...' : 'Send Magic Link'}
                </span>
            </button>

            <p className="text-xs text-text-secondary text-center">
                We'll send you a magic link to sign in without a password
            </p>
        </form>
    )
}
