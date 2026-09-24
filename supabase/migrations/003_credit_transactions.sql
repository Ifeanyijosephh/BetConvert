-- ============================================================
-- 003_credit_transactions.sql
-- THE MOST IMPORTANT TABLE IN THE DATABASE.
--
-- This is an APPEND-ONLY ledger. Every credit and debit is a
-- new row. There is NO balance column anywhere in the database.
-- Balance is always derived: SELECT SUM(amount) FROM credit_transactions.
--
-- WHY THIS MATTERS:
-- 1. Auditability: You can reconstruct the entire financial
--    history of any user at any point in time.
-- 2. Immutability: No one can silently change a balance. If
--    someone's balance is wrong, you can trace exactly which
--    transactions caused it.
-- 3. Dispute resolution: When a user says "I paid but wasn't
--    credited," you can point to the exact ledger entry.
-- 4. Fraud detection: Patterns of abuse are visible in the
--    transaction history, not hidden by overwritten balances.
--
-- A mutable balance column (UPDATE users SET balance = balance - 1)
-- is how fintech startups lose money. Race conditions, bugs, and
-- manual admin edits silently corrupt the number. With a ledger,
-- corruption is impossible because the original entries are permanent.
-- ============================================================

CREATE TABLE public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- Positive = credit IN (purchase, refund, admin top-up, free quota)
  -- Negative = debit OUT (conversion cost)
  -- NEVER zero. A zero-amount transaction is meaningless.
  amount INTEGER NOT NULL CHECK (amount != 0),

  -- What caused this transaction.
  type TEXT NOT NULL CHECK (type IN (
    'purchase',           -- User funded wallet via PocketFi
    'conversion_debit',   -- Cost of a code conversion
    'refund',             -- Failed conversion, credit returned
    'admin_adjustment',   -- Manual correction by admin
    'free_quota'          -- Daily free conversions (informational)
  )),

  -- External reference for idempotency.
  -- For purchases: PocketFi transaction ID
  -- For conversions: conversion record ID
  -- For refunds: original conversion ID being refunded
  -- For admin: admin audit log ID
  reference TEXT NOT NULL,

  -- Additional context. Shape varies by type.
  -- purchase: {pocketfi_ref, naira_amount, rate}
  -- conversion_debit: {source_bookmaker, dest_bookmaker, source_code}
  -- refund: {reason, original_debit_reference}
  metadata JSONB NOT NULL DEFAULT '{}',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Idempotency: the same reference + type combination can only
  -- exist once. This prevents double-crediting from duplicate
  -- PocketFi webhooks or double-debiting from retried conversions.
  CONSTRAINT uq_credit_txn_reference_type UNIQUE (reference, type)
);

-- Primary query pattern: compute balance for a user
CREATE INDEX idx_credit_txn_user_created
  ON public.credit_transactions(user_id, created_at);

-- Secondary: filter by type for admin reports
CREATE INDEX idx_credit_txn_type
  ON public.credit_transactions(type);

-- Comment: This table has NO UPDATE and NO DELETE permissions
-- for any role, including service_role in normal operation.
-- Corrections are made by inserting new rows with type
-- 'admin_adjustment' or 'refund'. The original entries remain.