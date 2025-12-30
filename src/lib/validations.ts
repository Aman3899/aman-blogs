import { z } from 'zod'

export const createPostSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
    body: z.string().min(1, 'Content is required').min(10, 'Content must be at least 10 characters')
})

export const signUpSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    fullName: z.string().min(1, 'Name is required')
})

export const signInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
})

export const otpSchema = z.object({
    email: z.string().email('Invalid email address')
})

export type CreatePostFormData = z.infer<typeof createPostSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
export type SignInFormData = z.infer<typeof signInSchema>
export type OTPFormData = z.infer<typeof otpSchema>
