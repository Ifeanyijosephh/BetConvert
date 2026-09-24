import { supabase } from "./supabase";
import { RegisterInput, LoginInput } from "@betconvert/shared";
import { UserProfile } from "@betconvert/shared";

export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "AuthError";
  }
}

function translateSupabaseError(error: Error): string {
  const msg = error.message.toLowerCase();
  if (msg.includes("user already registered") || msg.includes("already exists")) {
    return "An account with this email already exists.";
  }
  if (msg.includes("invalid login credentials") || msg.includes("invalid_grant")) {
    return "Invalid email or password.";
  }
  if (msg.includes("email not confirmed")) {
    return "Please verify your email address before signing in.";
  }
  if (msg.includes("rate limit") || msg.includes("too many requests")) {
    return "Too many attempts. Please wait a few minutes and try again.";
  }
  return error.message || "An unexpected error occurred. Please try again.";
}

export async function registerUser(input: RegisterInput): Promise<{ userId: string }> {
  const { data: existingUser, error: usernameCheckError } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", input.username)
    .maybeSingle();

  if (usernameCheckError) {
    throw new AuthError("Failed to validate username availability.");
  }
  if (existingUser) {
    throw new AuthError("Username is already taken. Please pick another.");
  }

  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        first_name: input.firstName,
        last_name: input.lastName,
        username: input.username,
        phone: input.phone || null,
      },
    },
  });

  if (error) {
    throw new AuthError(translateSupabaseError(error), error.name);
  }

  if (!data.user) {
    throw new AuthError("Registration failed. No user was created.");
  }

  return { userId: data.user.id };
}

export async function loginUser(input: LoginInput): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  if (error) {
    throw new AuthError(translateSupabaseError(error), error.name);
  }
}

export async function logoutUser(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new AuthError(translateSupabaseError(error), error.name);
  }
}

export async function requestPasswordReset(email: string): Promise<void> {
  const redirectUrl = `${window.location.origin}/reset-password`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  });

  if (error) {
    throw new AuthError(translateSupabaseError(error), error.name);
  }
}

export async function updatePassword(newPassword: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new AuthError(translateSupabaseError(error), error.name);
  }
}

export async function fetchCurrentProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw new AuthError(`Failed to fetch profile: ${error.message}`);
  }

  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    username: data.username,
    phone: data.phone,
    isAdmin: data.is_admin,
    freeConversionsToday: data.free_conversions_today,
    dailyResetAt: data.daily_reset_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export async function fetchUserBalance(userId: string): Promise<number> {
  const { data, error } = await supabase.rpc("get_user_balance", {
    p_user_id: userId,
  });

  if (error) {
    throw new AuthError(`Failed to fetch credit balance: ${error.message}`);
  }

  return (data as number) ?? 0;
}
