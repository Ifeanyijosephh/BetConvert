"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bet9jaAdapter = void 0;
const types_1 = require("./types");
class Bet9jaAdapter {
    code = "bet9ja";
    displayName = "Bet9ja";
    async fetchSlip(code) {
        code = (0, types_1.sanitizeBookingCode)(code);
        return {
            sourceBookmaker: this.code,
            sourceCode: code,
            selections: [],
            totalOdds: 1.0,
        };
    }
    async createSlip(selections) {
        const usable = selections.filter((s) => s.matched);
        if (usable.length === 0) {
            throw new types_1.AdapterError("slip_rejected", "No matched selections", this.code);
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
exports.Bet9jaAdapter = Bet9jaAdapter;
