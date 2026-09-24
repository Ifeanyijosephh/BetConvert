import { z } from "zod";
export function normalizeNigerianPhone(phone) {
    const cleaned = phone.replace(/[\s\-()]/g, "");
    if (cleaned.startsWith("0") && cleaned.length === 11) {
        return `+234${cleaned.slice(1)}`;
    }
    if (cleaned.startsWith("234") && cleaned.length === 13) {
        return `+${cleaned}`;
    }
    if (cleaned.startsWith("+234") && cleaned.length === 14) {
        return cleaned;
    }
    return cleaned;
}
export const nigerianPhoneSchema = z
    .string()
    .transform((val) => normalizeNigerianPhone(val))
    .pipe(z
    .string()
    .regex(/^\+234[789][01]\d{8}$/, "Invalid Nigerian phone number. Format: 080XXXXXXXX or +234XXXXXXXXXX"));
export const usernameSchema = z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters")
    .toLowerCase()
    .trim()
    .regex(/^[a-z0-9_]+$/, "Username can only contain lowercase letters, numbers, and underscores");
export const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must not exceed 72 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number");
export const registerSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name too long")
        .trim(),
    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name too long")
        .trim(),
    username: usernameSchema,
    email: z
        .string()
        .email("Invalid email address")
        .toLowerCase()
        .trim(),
    phone: nigerianPhoneSchema.optional().or(z.literal("")),
    password: passwordSchema,
});
export const loginSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .toLowerCase()
        .trim(),
    password: z.string().min(1, "Password is required"),
});
export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .toLowerCase()
        .trim(),
});
export const resetPasswordSchema = z.object({
    password: passwordSchema,
});
