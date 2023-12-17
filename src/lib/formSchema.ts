import { z } from "zod"

export const signUpSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    phoneNumber: z.string().min(6),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"]
})
export type TSignUpSchema = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters")
})
export type TSignInSchema = z.infer<typeof signInSchema>

export const addEventSchema = z.object({
    name: z.string().min(3),
    slug: z.string(),
    eventDate: z.string(),
    registrationStartDate: z.string(),
    registrationEndDate: z.string(),
    status: z.string()
}).refine(data => data.status !== 'Pilih Status', {
    message: "Silahkan pilih status!",
    path: ["status"]
})
export type TAddEventSchema = z.infer<typeof addEventSchema>

export const addEventCategorySchema = z.object({
    name: z.string().min(3),
    slug: z.string(),
    price: z.string(),
    status: z.string()
}).refine(data => data.status !== 'Pilih Status', {
    message: "Silahkan pilih status!",
    path: ["status"]
})
export type TAddEventCategorySchema = z.infer<typeof addEventCategorySchema>