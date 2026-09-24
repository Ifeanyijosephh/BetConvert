export type Sport = "football" | "basketball" | "tennis";

export type MarketType =
  | "1x2"
  | "double_chance"
  | "over_under"
  | "btts"
  | "handicap"
  | "correct_score"
  | "unknown";

export interface CanonicalSelection {
  sport: Sport;
  league: string;
  homeTeam: string;
  awayTeam: string;
  kickoffUtc: string;
  marketType: MarketType;
  marketSelection: string;
  sourceOdds: number;
}

export interface CanonicalSlip {
  sourceBookmaker: string;
  sourceCode: string;
  selections: CanonicalSelection[];
  totalOdds: number;
}

export interface MatchedSelection {
  original: CanonicalSelection;
  destinationFixtureId: string | null;
  destinationMarketId: string | null;
  destinationOdds: number | null;
  matched: boolean;
  confidence: number;
  reason?: string;
}

export interface ConversionResult {
  success: boolean;
  status: "success" | "partial" | "failed";
  destinationCode: string | null;
  matched: number;
  total: number;
  selections: MatchedSelection[];
  errorMessage?: string;
}
