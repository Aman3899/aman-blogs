'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, SignUpFormData } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'

export default function SignUpForm() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = async (data: SignUpFormData) => {
        setLoading(true)
        setError(null)

        try {
            const supabase = createClient()
            const { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.fullName,
                    },
                },
            })

            if (error) throw error

            router.push('/login?message=Check your email to confirm your account')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to sign up')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                    Full Name
                </label>
                <input
                    {...register('fullName')}
                    type="text"
                    id="fullName"
                    className="input"
                    placeholder="John Doe"
                />
                {errors.fullName && (
                    <p className="error-message">{errors.fullName.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                </label>
                <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="input"
                    placeholder="you@example.com"
                />
                {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                </label>
                <input
                    {...register('password')}
                    type="password"
                    id="password"
                    className="input"
                    placeholder="••••••••"
                />
                {errors.password && (
                    <p className="error-message">{errors.password.message}</p>
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
                    {loading ? 'Creating account...' : 'Sign Up'}
                </span>
            </button>
        </form>
    )
}
