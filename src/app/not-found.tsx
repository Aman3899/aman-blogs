export default function NotFound() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
            <div className="text-center animate-fade-in">
                <div className="inline-block p-6 rounded-full bg-surface mb-6">
                    <svg
                        className="w-20 h-20 text-text-secondary mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-4 text-text-secondary">
                    Page Not Found
                </h2>
                <p className="text-text-secondary mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <a href="/" className="btn-primary inline-block">
                    <span>Back to Home</span>
                </a>
            </div>
        </div>
    )
}
