-- ============================================================
-- 002_bookmakers.sql
-- Registry of supported bookmakers.
-- Admins can toggle status to disable a bookmaker without
-- deleting data (e.g., when a bookmaker sends a takedown).
-- ============================================================

CREATE TABLE public.bookmakers (
  -- Short code used throughout the system: 'sportybet', 'bet9ja', 'xbet'
  code TEXT PRIMARY KEY CHECK (code ~ '^[a-z0-9_]+$'),

  display_name TEXT NOT NULL,
  logo_url TEXT,

  -- 'active' = available for conversions
  -- 'maintenance' = temporarily down, show user a message
  -- 'disabled' = removed (e.g., takedown request)
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'maintenance', 'disabled')),

  -- Bookmaker-specific config: API base URL, headers, rate limits.
  -- Stored as JSONB so each adapter can define its own shape.
  -- NEVER store API secrets here — those live in env vars on the worker.
  config JSONB NOT NULL DEFAULT '{}',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed the three launch bookmakers
INSERT INTO public.bookmakers (code, display_name, status, config) VALUES
  ('sportybet', 'SportyBet', 'active', '{"api_base": "https://www.sportybet.com/api", "rate_limit_per_min": 30}'),
  ('bet9ja', 'Bet9ja', 'active', '{"api_base": "https://sports.bet9ja.com/api", "rate_limit_per_min": 20}'),
  ('xbet', '1xBet', 'active', '{"api_base": "https://1xbet.com/api", "rate_limit_per_min": 25}')
ON CONFLICT (code) DO NOTHING;

-- Comment: The config column stores non-secret configuration only.
-- API keys, cookies, and auth tokens live in environment variables
-- on the worker VPS. If someone reads this table via the anon key,
-- they learn nothing exploitable.