-- ============================================================
-- 001_profiles.sql
-- User profiles linked to Supabase Auth.
-- One row per user. Created automatically by a trigger when
-- a new user signs up via Supabase Auth.
-- ============================================================

CREATE TABLE public.profiles (
  -- Must match auth.users.id exactly. This is the link.
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  first_name TEXT NOT NULL CHECK (char_length(first_name) >= 2),
  last_name TEXT NOT NULL CHECK (char_length(last_name) >= 2),

  -- Unique, lowercase, alphanumeric + underscores only.
  username TEXT NOT NULL UNIQUE CHECK (username ~ '^[a-z0-9_]{3,30}$'),

  -- Optional. Nigerian format: +234XXXXXXXXXX
  phone TEXT CHECK (phone ~ '^\+234[0-9]{10}$'),

  -- Admin flag. Default false. Set manually by existing admin
  -- via the admin_audit_log trail.
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,

  -- Free conversion quota. Resets daily.
  -- This is a rate limit, NOT money. It's safe to mutate.
  free_conversions_today INTEGER NOT NULL DEFAULT 0,
  daily_reset_at DATE NOT NULL DEFAULT CURRENT_DATE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for username lookups (login, profile URLs)
CREATE INDEX idx_profiles_username ON public.profiles(username);

-- Index for admin queries
CREATE INDEX idx_profiles_is_admin ON public.profiles(is_admin) WHERE is_admin = TRUE;

-- Comment: The profiles table stores identity data, not financial data.
-- No balance column here. Balance is derived from credit_transactions.
-- The free_conversions_today counter is a rate limit, not a financial
-- instrument, so it's safe to UPDATE directly.