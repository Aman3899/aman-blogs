import Link from 'next/link'
import SignUpForm from '@/components/auth/SignUpForm'
import GoogleAuthButton from '@/components/auth/GoogleAuthButton'

export const metadata = {
    title: 'Sign Up | Aman Blogs',
    description: 'Create your account and start sharing',
}

export default function SignUpPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="max-w-md mx-auto animate-fade-in">
                <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-block mb-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-accent/50 float">
                            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
                        <span className="text-gradient">Join Aman Blogs</span>
                    </h1>
                    <p className="text-text-secondary text-base sm:text-lg">
                        Create an account to start sharing your stories
                    </p>
                </div>

                <div className="card p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl">
                    {/* Google OAuth */}
                    <GoogleAuthButton />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 sm:px-4 py-1 bg-card text-text-secondary text-xs sm:text-sm font-medium rounded-full border border-border/50">
                                Or sign up with email
                            </span>
                        </div>
                    </div>

                    {/* Sign Up Form */}
                    <SignUpForm />

                    <div className="text-center pt-4 sm:pt-4 border-t border-border/50">
                        <p className="text-sm text-text-secondary">
                            Already have an account?{' '}
                            <Link href="/login" className="text-accent hover:text-accent-light font-semibold transition-colors inline-flex items-center gap-1 group">
                                Sign in
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
