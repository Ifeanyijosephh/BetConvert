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

export type BookmakerId = z.infer<typeof bookmakerEnum>;

export const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const convertRequestSchema = z.object({
  fromBookmaker: bookmakerEnum,
  toBookmaker: bookmakerEnum,
  bookingCode: z.string().min(2, "Booking code is required"),
});

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
