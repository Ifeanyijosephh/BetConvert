-- ============================================================
-- 005_team_aliases.sql
-- Maps variant team names to a single canonical name.
-- This is the most valuable data asset in the system.
-- It grows over time and directly improves conversion success rates.
--
-- Example: "Man Utd", "Manchester United", "Man United", "MUFC"
--          all map to canonical "Manchester United"
-- ============================================================

CREATE TABLE public.team_aliases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- The variant name as it appears on a specific bookmaker
  alias TEXT NOT NULL,

  -- The standardized name used for matching
  canonical_name TEXT NOT NULL,

  sport TEXT NOT NULL DEFAULT 'football',

  -- Optional: narrows the match to a specific league
  -- (e.g., "Arsenal" in "Premier League" vs "Arsenal" in "Russian Premier League")
  league_hint TEXT,

  -- How confident we are in this alias (100 = verified, lower = auto-generated)
  confidence INTEGER NOT NULL DEFAULT 100
    CHECK (confidence BETWEEN 0 AND 100),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Each alias can only map to one canonical name per sport
  CONSTRAINT uq_alias_sport UNIQUE (alias, sport)
);

-- Fast lookup by alias (the primary query pattern)
CREATE INDEX idx_team_aliases_alias ON public.team_aliases(alias);

-- Trigram index for fuzzy matching when exact alias isn't found.
-- Requires the pg_trgm extension (enabled by default on Supabase).
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_team_aliases_alias_trgm
  ON public.team_aliases USING gin(alias gin_trgm_ops);

-- Lookup by canonical name (reverse lookup for display)
CREATE INDEX idx_team_aliases_canonical
  ON public.team_aliases(canonical_name);

-- Seed some common Nigerian-market aliases
INSERT INTO public.team_aliases (alias, canonical_name, sport) VALUES
  ('Man Utd', 'Manchester United', 'football'),
  ('Man United', 'Manchester United', 'football'),
  ('Manchester United', 'Manchester United', 'football'),
  ('MUFC', 'Manchester United', 'football'),
  ('Man City', 'Manchester City', 'football'),
  ('Manchester City', 'Manchester City', 'football'),
  ('MCFC', 'Manchester City', 'football'),
  ('Liverpool', 'Liverpool', 'football'),
  ('LFC', 'Liverpool', 'football'),
  ('Arsenal', 'Arsenal', 'football'),
  ('AFC', 'Arsenal', 'football'),
  ('Chelsea', 'Chelsea', 'football'),
  ('CFC', 'Chelsea', 'football'),
  ('Spurs', 'Tottenham Hotspur', 'football'),
  ('Tottenham', 'Tottenham Hotspur', 'football'),
  ('THFC', 'Tottenham Hotspur', 'football'),
  ('Real Madrid', 'Real Madrid', 'football'),
  ('Barcelona', 'Barcelona', 'football'),
  ('Barca', 'Barcelona', 'football'),
  ('PSG', 'Paris Saint-Germain', 'football'),
  ('Paris SG', 'Paris Saint-Germain', 'football'),
  ('Bayern', 'Bayern Munich', 'football'),
  ('Bayern Munich', 'Bayern Munich', 'football'),
  ('Dortmund', 'Borussia Dortmund', 'football'),
  ('BVB', 'Borussia Dortmund', 'football'),
  ('Inter', 'Inter Milan', 'football'),
  ('Inter Milan', 'Inter Milan', 'football'),
  ('AC Milan', 'AC Milan', 'football'),
  ('Milan', 'AC Milan', 'football'),
  ('Juventus', 'Juventus', 'football'),
  ('Juve', 'Juventus', 'football'),
  ('Atletico', 'Atletico Madrid', 'football'),
  ('Atletico Madrid', 'Atletico Madrid', 'football'),
  ('Napoli', 'Napoli', 'football'),
  ('Roma', 'AS Roma', 'football'),
  ('AS Roma', 'AS Roma', 'football')
ON CONFLICT (alias, sport) DO NOTHING;