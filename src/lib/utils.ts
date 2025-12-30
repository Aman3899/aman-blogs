import { format, formatDistanceToNow } from 'date-fns'

export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return format(date, 'MMMM dd, yyyy')
}

export function formatRelativeDate(dateString: string): string {
    const date = new Date(dateString)
    return formatDistanceToNow(date, { addSuffix: true })
}
