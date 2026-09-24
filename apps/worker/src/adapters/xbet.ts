import { BookmakerAdapter, sanitizeBookingCode } from "./types";
import { CanonicalSlip, MatchedSelection } from "../engine/types";

export class XBetAdapter implements BookmakerAdapter {
  readonly code = "xbet";
  readonly displayName = "1xBet";

  async fetchSlip(code: string): Promise<CanonicalSlip> {
    code = sanitizeBookingCode(code);
    return {
      sourceBookmaker: this.code,
      sourceCode: code,
      selections: [],
      totalOdds: 1.0,
    };
  }

  async createSlip(_selections: MatchedSelection[]): Promise<{ code: string; totalOdds: number }> {
    return {
      code: "1X-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      totalOdds: 1.88,
    };
  }

  async getFixtures() {
    return [];
  }
}
