-- ============================================================
-- 004_conversions.sql
-- Record of every conversion attempt.
-- One row per user action. Linked to the credit ledger via
-- the idempotency_key (which matches the credit_transaction reference).
-- ============================================================

CREATE TABLE public.conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  source_bookmaker TEXT NOT NULL REFERENCES public.bookmakers(code),
  source_code TEXT NOT NULL,

  dest_bookmaker TEXT NOT NULL REFERENCES public.bookmakers(code),
  dest_code TEXT,  -- NULL if conversion failed

  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'success', 'partial', 'failed')),

  -- How many selections were in the original slip
  selections_total INTEGER NOT NULL DEFAULT 0,
  -- How many were successfully matched on the destination
  selections_matched INTEGER NOT NULL DEFAULT 0,

  -- Human-readable error if failed. NULL on success.
  error_message TEXT,

  -- The slip breakdown: array of matched/unmatched selections.
  -- Stored for the user to review in their history.
  slip_details JSONB NOT NULL DEFAULT '[]',

  -- Idempotency key: hash of (user_id + source_bookmaker + source_code + dest_bookmaker).
  -- If the same request arrives twice (network retry), the second
  -- attempt returns the cached result instead of charging again.
  idempotency_key TEXT NOT NULL UNIQUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Primary query: user's conversion history (paginated, newest first)
CREATE INDEX idx_conversions_user_created
  ON public.conversions(user_id, created_at DESC);

-- Lookup by idempotency key (fast path for duplicate detection)
CREATE INDEX idx_conversions_idempotency
  ON public.conversions(idempotency_key);

-- Admin: filter by status for failure monitoring
CREATE INDEX idx_conversions_status
  ON public.conversions(status) WHERE status IN ('failed', 'partial');.