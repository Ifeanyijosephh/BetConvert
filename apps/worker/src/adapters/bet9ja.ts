import { BookmakerAdapter, AdapterError, sanitizeBookingCode } from "./types";
import { CanonicalSlip, MatchedSelection } from "../engine/types";

export class Bet9jaAdapter implements BookmakerAdapter {
  readonly code = "bet9ja";
  readonly displayName = "Bet9ja";

  async fetchSlip(code: string): Promise<CanonicalSlip> {
    code = sanitizeBookingCode(code);
    return {
      sourceBookmaker: this.code,
      sourceCode: code,
      selections: [],
      totalOdds: 1.0,
    };
  }

  async createSlip(selections: MatchedSelection[]): Promise<{ code: string; totalOdds: number }> {
    const usable = selections.filter((s) => s.matched);
    if (usable.length === 0) {
      throw new AdapterError("slip_rejected", "No matched selections", this.code);
    }
    return {
      code: "B9J-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      totalOdds: 1.82,
    };
  }

  async getFixtures() {
    return [];
  }
}
