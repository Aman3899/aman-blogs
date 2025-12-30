import Link from 'next/link'
import SignUpForm from '@/components/auth/SignUpForm'
import GoogleAuthButton from '@/components/auth/GoogleAuthButton'

export const metadata = {
    title: 'Sign Up | Aman Blogs',
    description: 'Create your account and start sharing',
}

export default function SignUpPage() {
    return (
        <div className="container-custom py-12">
            <div className="max-w-md mx-auto animate-fade-in">
                <div className="text-center mb-8">
                    <h1 className="text-gradient mb-4">Join Aman Blogs</h1>
                    <p className="text-text-secondary">
                        Create an account to start sharing your stories
                    </p>
                </div>

                <div className="card p-8 space-y-6">
                    {/* Google OAuth */}
                    <GoogleAuthButton />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-surface text-text-secondary">Or sign up with email</span>
                        </div>
                    </div>

                    {/* Sign Up Form */}
                    <SignUpForm />

                    <div className="text-center pt-4 border-t border-border">
                        <p className="text-sm text-text-secondary">
                            Already have an account?{' '}
                            <Link href="/login" className="text-accent hover:text-accent-hover font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
