-- ============================================================
-- 008_rls_policies.sql
-- Row Level Security on EVERY table. No exceptions.
--
-- HOW RLS WORKS:
-- Every query from the browser uses the Supabase anon key,
-- which carries the user's JWT. Postgres evaluates the RLS
-- policies BEFORE returning any rows. If no policy matches,
-- the query returns zero rows — not an error, just empty.
--
-- The service_role key (on the worker VPS only) bypasses RLS.
-- This is intentional: the worker needs to write conversion
-- records and ledger entries on behalf of users.
--
-- IMPORTANT: RLS is the LAST line of defense. Even if your
-- API code has a bug, RLS prevents data leakage. This is
-- why we use Supabase instead of MongoDB for this project.
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fixture_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PROFILES
-- ============================================================

-- Users can read their own profile.
-- PREVENTS: User A reading User B's name, phone, or admin status.
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile (name, phone only).
-- PREVENTS: User A modifying User B's profile.
-- PREVENTS: Users setting is_admin = TRUE on themselves.
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND is_admin = (SELECT is_admin FROM public.profiles WHERE id = auth.uid())
  );
-- Note: The WITH CHECK clause prevents a user from flipping
-- their own is_admin flag. They can only update fields that
-- don't include is_admin. The subquery ensures the new value
-- matches the existing value.

-- No INSERT policy for users. Profiles are created by the
-- handle_new_user() trigger (runs as SECURITY DEFINER, bypasses RLS).
-- PREVENTS: Users creating fake profiles for other user IDs.

-- No DELETE policy. Profiles are never deleted (CASCADE from
-- auth.users handles cleanup if an account is deleted).
-- PREVENTS: Users deleting their own profile to erase audit trails.

-- ============================================================
-- BOOKMAKERS
-- ============================================================

-- All authenticated users can read active bookmakers.
-- PREVENTS: Unauthenticated users enumerating bookmaker config.
CREATE POLICY "Authenticated users can read active bookmakers"
  ON public.bookmakers FOR SELECT
  USING (auth.role() = 'authenticated' AND status = 'active');

-- No INSERT/UPDATE/DELETE for users. Bookmaker management
-- is done by the worker (service_role) or admin Edge Functions.
-- PREVENTS: Users adding fake bookmakers or disabling real ones.

-- ============================================================
-- CREDIT TRANSACTIONS (THE LEDGER)
-- ============================================================

-- Users can read their own transactions only.
-- PREVENTS: User A seeing User B's payment history and balances.
CREATE POLICY "Users can read own credit transactions"
  ON public.credit_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- No INSERT policy for users. Credits are added by:
-- 1. PocketFi webhook → Edge Function (service_role)
-- 2. Conversion debit → Worker (service_role)
-- 3. Refund → Worker (service_role)
-- 4. Admin adjustment → Admin Edge Function (service_role)
-- PREVENTS: Users crediting themselves by inserting fake
-- 'purchase' transactions. THIS IS THE MOST CRITICAL POLICY.

-- No UPDATE policy. The ledger is append-only.
-- PREVENTS: Users (or anyone via anon key) modifying past
-- transactions to inflate their balance.

-- No DELETE policy. The ledger is append-only.
-- PREVENTS: Users deleting debit records to inflate their balance.

-- ============================================================
-- CONVERSIONS
-- ============================================================

-- Users can read their own conversion history.
-- PREVENTS: User A seeing User B's betting history.
CREATE POLICY "Users can read own conversions"
  ON public.conversions FOR SELECT
  USING (auth.uid() = user_id);

-- No INSERT policy for users. Conversions are created by the
-- worker (service_role) after processing the conversion pipeline.
-- PREVENTS: Users inserting fake conversion records to claim
-- they converted a code they didn't actually convert.

-- No UPDATE/DELETE for users.
-- PREVENTS: Users modifying conversion status or deleting records.

-- ============================================================
-- TEAM ALIASES
-- ============================================================

-- All authenticated users can read aliases.
-- This is needed for the frontend to display matched team names.
-- The data is not sensitive — it's public sports knowledge.
CREATE POLICY "Authenticated users can read team aliases"
  ON public.team_aliases FOR SELECT
  USING (auth.role() = 'authenticated');

-- No INSERT/UPDATE/DELETE for users.
-- Aliases are managed by admins and the worker's auto-learning.
-- PREVENTS: Users poisoning the alias table with wrong mappings
-- to sabotage conversions for other users.

-- ============================================================
-- FIXTURE CACHE
-- ============================================================

-- No SELECT for users via anon key.
-- Fixture data is used server-side by the worker only.
-- PREVENTS: Users scraping the entire fixture catalogue,
-- which could expose bookmaker API structure.

-- No INSERT/UPDATE/DELETE for users.
-- PREVENTS: Users injecting fake fixtures to manipulate matching.

-- ============================================================
-- ADMIN AUDIT LOG
-- ============================================================

-- No SELECT for regular users.
-- PREVENTS: Users seeing admin actions, which could reveal
-- internal processes or other users' data.

-- No INSERT/UPDATE/DELETE for users.
-- PREVENTS: Users creating fake audit entries or deleting
-- real ones to cover tracks.

-- ============================================================
-- SUMMARY: What the anon key CAN do:
-- ✅ Read own profile
-- ✅ Update own profile (name, phone — not admin flag)
-- ✅ Read active bookmakers
-- ✅ Read own credit transactions
-- ✅ Read own conversions
-- ✅ Read team aliases
-- ❌ Everything else is blocked
-- ============================================================