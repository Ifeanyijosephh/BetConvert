import { z } from "zod";
export const bookmakerEnum = z.enum([
    "sportybet",
    "bet9ja",
    "1xbet",
    "betking",
    "bangbet",
    "bcgame",
    "paripesa",
    "22bet",
    "mozzartbet",
    "betway",
    "melbet",
    "msport"
]);
export const registerSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().optional(),
});
export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});
export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});
export const convertRequestSchema = z.object({
    fromBookmaker: bookmakerEnum,
    toBookmaker: bookmakerEnum,
    bookingCode: z.string().min(2, "Booking code is required"),
});
