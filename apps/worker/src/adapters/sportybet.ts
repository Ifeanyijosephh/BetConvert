import { BookmakerAdapter, AdapterError, sanitizeBookingCode } from "./types";
import { CanonicalSlip, MatchedSelection } from "../engine/types";
import { logger } from "../infra/logger";

export class SportyBetAdapter implements BookmakerAdapter {
  readonly code = "sportybet";
  readonly displayName = "SportyBet";

  async fetchSlip(code: string): Promise<CanonicalSlip> {
    code = sanitizeBookingCode(code);
    logger.info({ bookmaker: this.code, code }, "Fetching SportyBet slip");
    return {
      sourceBookmaker: this.code,
      sourceCode: code,
      selections: [
        {
          sport: "football",
          league: "Premier League",
          homeTeam: "Arsenal",
          awayTeam: "Chelsea",
          kickoffUtc: new Date().toISOString(),
          marketType: "1x2",
          marketSelection: "home",
          sourceOdds: 1.85,
        },
      ],
      totalOdds: 1.85,
    };
  }

  async createSlip(selections: MatchedSelection[]): Promise<{ code: string; totalOdds: number }> {
    const usable = selections.filter((s) => s.matched);
    if (usable.length === 0) {
      throw new AdapterError("slip_rejected", "No matched selections", this.code);
    }
    return {
      code: "SB-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      totalOdds: 1.85,
    };
  }

  async getFixtures() {
    return [];
  }
}
