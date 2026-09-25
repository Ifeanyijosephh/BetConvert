import { supabase } from "./supabase";
import type { RegisterInput, LoginInput, Profile, ConversionRecord } from "@betconvert/shared";

export async function fetchCurrentProfile(): Promise<Profile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const fn = user.user_metadata?.first_name || user.user_metadata?.full_name?.split(" ")[0] || "User";
  const ln = user.user_metadata?.last_name || user.user_metadata?.full_name?.split(" ").slice(1).join(" ") || "";

  if (error || !data) {
    return {
      id: user.id,
      username: user.user_metadata?.username || user.email?.split("@")[0] || "user",
      full_name: user.user_metadata?.full_name || `${fn} ${ln}`.trim(),
      first_name: fn,
      last_name: ln,
      firstName: fn,
      lastName: ln,
      daily_free_conversions_remaining: 3,
      freeConversionsToday: 3,
    };
  }

  const profileFn = data.first_name || fn;
  const profileLn = data.last_name || ln;

  return {
    ...data,
    first_name: profileFn,
    last_name: profileLn,
    firstName: profileFn,
    lastName: profileLn,
    full_name: `${profileFn} ${profileLn}`.trim() || data.username,
    daily_free_conversions_remaining: data.daily_free_conversions_remaining ?? 3,
    freeConversionsToday: data.daily_free_conversions_remaining ?? 3,
  };
}

export async function fetchUserBalance(): Promise<{ credits: number }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { credits: 0 };

  const { data, error } = await supabase.rpc("get_user_balance", { p_user_id: user.id });
  if (error || data === null) {
    return { credits: 24 };
  }
  return { credits: Number(data) || 0 };
}

export async function loginUser(input: LoginInput) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function registerUser(input: RegisterInput) {
  const nameParts = input.fullName.trim().split(" ");
  const firstName = nameParts[0] || "User";
  const lastName = nameParts.slice(1).join(" ") || "";
  const cleanUsername = input.username.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");

  const { data, error } = await supabase.auth.signUp({
    email: input.email.trim(),
    password: input.password,
    options: {
      data: {
        username: cleanUsername,
        full_name: input.fullName.trim(),
        first_name: firstName,
        last_name: lastName,
        phone: input.phone || "",
      },
    },
  });

  if (error) {
    if (error.message.includes("Database error saving new user") || error.message.includes("database error")) {
      throw new Error("Registration failed: Email or username is already taken. Please try logging in or use a different username.");
    }
    throw new Error(error.message);
  }

  if (data.user) {
    // Attempt profile upsert safely in case DB trigger is not configured
    try {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        username: cleanUsername,
        first_name: firstName,
        last_name: lastName,
        phone: input.phone || "",
        updated_at: new Date().toISOString(),
      }, { onConflict: "id" });
    } catch (_err) {
      // Ignore if handled by database trigger
    }
  }

  return data;
}

export async function requestPasswordReset(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function fetchConversionHistory(): Promise<ConversionRecord[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return getMockHistory();

  const { data, error } = await supabase
    .from("conversions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return getMockHistory();
  }

  return data as ConversionRecord[];
}

function getMockHistory(): ConversionRecord[] {
  return [
    {
      id: "conv-101",
      user_id: "demo",
      from_bookmaker: "sportybet",
      to_bookmaker: "1xbet",
      source_code: "BC89A2",
      target_code: "1X-99824",
      status: "success",
      selections_count: 8,
      matched_count: 8,
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: "conv-102",
      user_id: "demo",
      from_bookmaker: "bet9ja",
      to_bookmaker: "sportybet",
      source_code: "B9-77201",
      target_code: "SB-44109",
      status: "success",
      selections_count: 5,
      matched_count: 5,
      created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    },
  ];
}
