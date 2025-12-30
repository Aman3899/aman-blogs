import Link from 'next/link'

interface PaginationProps {
    currentPage: number
    hasMore: boolean
    total: number
    pageSize: number
}

export default function Pagination({ currentPage, hasMore, total, pageSize }: PaginationProps) {
    const totalPages = Math.ceil(total / pageSize)
    const hasPrevious = currentPage > 1

    return (
        <div className="flex items-center justify-center gap-4 mt-12">
            {hasPrevious ? (
                <Link
                    href={`/?page=${currentPage - 1}`}
                    className="btn-secondary flex items-center gap-2"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Previous
                </Link>
            ) : (
                <button disabled className="btn-secondary opacity-50 cursor-not-allowed flex items-center gap-2">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Previous
                </button>
            )}

            <div className="px-4 py-2 bg-surface rounded-lg border border-border">
                <span className="text-text-primary font-medium">
                    Page {currentPage} of {totalPages}
                </span>
            </div>

            {hasMore ? (
                <Link
                    href={`/?page=${currentPage + 1}`}
                    className="btn-secondary flex items-center gap-2"
                >
                    Next
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Link>
            ) : (
                <button disabled className="btn-secondary opacity-50 cursor-not-allowed flex items-center gap-2">
                    Next
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            )}
        </div>
    )
}
