import { z } from "zod";
export declare const bookmakerEnum: z.ZodEnum<["sportybet", "bet9ja", "1xbet", "betking", "bangbet", "bcgame", "paripesa", "22bet", "mozzartbet", "betway", "melbet", "msport"]>;
export type BookmakerId = z.infer<typeof bookmakerEnum>;
export declare const registerSchema: z.ZodObject<{
    fullName: z.ZodString;
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    fullName: string;
    username: string;
    email: string;
    password: string;
    phone?: string | undefined;
}, {
    fullName: string;
    username: string;
    email: string;
    password: string;
    phone?: string | undefined;
}>;
export type RegisterInput = z.infer<typeof registerSchema>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type LoginInput = z.infer<typeof loginSchema>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export declare const convertRequestSchema: z.ZodObject<{
    fromBookmaker: z.ZodEnum<["sportybet", "bet9ja", "1xbet", "betking", "bangbet", "bcgame", "paripesa", "22bet", "mozzartbet", "betway", "melbet", "msport"]>;
    toBookmaker: z.ZodEnum<["sportybet", "bet9ja", "1xbet", "betking", "bangbet", "bcgame", "paripesa", "22bet", "mozzartbet", "betway", "melbet", "msport"]>;
    bookingCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    fromBookmaker: "sportybet" | "bet9ja" | "1xbet" | "betking" | "bangbet" | "bcgame" | "paripesa" | "22bet" | "mozzartbet" | "betway" | "melbet" | "msport";
    toBookmaker: "sportybet" | "bet9ja" | "1xbet" | "betking" | "bangbet" | "bcgame" | "paripesa" | "22bet" | "mozzartbet" | "betway" | "melbet" | "msport";
    bookingCode: string;
}, {
    fromBookmaker: "sportybet" | "bet9ja" | "1xbet" | "betking" | "bangbet" | "bcgame" | "paripesa" | "22bet" | "mozzartbet" | "betway" | "melbet" | "msport";
    toBookmaker: "sportybet" | "bet9ja" | "1xbet" | "betking" | "bangbet" | "bcgame" | "paripesa" | "22bet" | "mozzartbet" | "betway" | "melbet" | "msport";
    bookingCode: string;
}>;
export type ConvertRequestInput = z.infer<typeof convertRequestSchema>;
export interface Profile {
    id: string;
    username: string;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar_url?: string;
    daily_free_conversions_remaining?: number;
    freeConversionsToday?: number;
    last_free_reset_at?: string;
    created_at?: string;
}
export type UserProfile = Profile;
export interface AuthState {
    user: any;
    profile: Profile | null;
    balance: number;
    loading: boolean;
}
export interface ConversionRecord {
    id: string;
    user_id: string;
    from_bookmaker: string;
    to_bookmaker: string;
    source_code: string;
    target_code: string;
    status: "success" | "pending" | "failed";
    selections_count?: number;
    matched_count?: number;
    created_at: string;
}
