"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportyBetAdapter = void 0;
const types_1 = require("./types");
const logger_1 = require("../infra/logger");
class SportyBetAdapter {
    code = "sportybet";
    displayName = "SportyBet";
    async fetchSlip(code) {
        code = (0, types_1.sanitizeBookingCode)(code);
        logger_1.logger.info({ bookmaker: this.code, code }, "Fetching SportyBet slip");
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
    async createSlip(selections) {
        const usable = selections.filter((s) => s.matched);
        if (usable.length === 0) {
            throw new types_1.AdapterError("slip_rejected", "No matched selections", this.code);
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
exports.SportyBetAdapter = SportyBetAdapter;
