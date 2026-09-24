import { CanonicalSlip, MatchedSelection } from "../engine/types";

export type AdapterErrorCode =
  | "invalid_code"
  | "code_expired"
  | "code_not_found"
  | "bookmaker_down"
  | "rate_limited"
  | "network_timeout"
  | "parse_error"
  | "slip_rejected"
  | "unknown";

export class AdapterError extends Error {
  constructor(
    public code: AdapterErrorCode,
    message: string,
    public bookmaker: string,
    public retryable: boolean = false
  ) {
    super(message);
    this.name = "AdapterError";
  }
}

export function sanitizeBookingCode(code: string): string {
  const sanitized = code.trim().toUpperCase();
  if (!/^[A-Z0-9\-_]+$/.test(sanitized)) {
    throw new AdapterError("invalid_code", "Booking code contains invalid characters", "system", false);
  }
  return sanitized;
}

export interface BookmakerAdapter {
  readonly code: string;
  readonly displayName: string;
  fetchSlip(code: string): Promise<CanonicalSlip>;
  createSlip(selections: MatchedSelection[]): Promise<{ code: string; totalOdds: number }>;
  getFixtures(): Promise<Array<{
    externalId: string;
    homeTeam: string;
    awayTeam: string;
    kickoffUtc: string;
    league: string;
    markets: Array<{ type: string; selections: Array<{ id: string; name: string; odds: number }> }>;
  }>>;
}
