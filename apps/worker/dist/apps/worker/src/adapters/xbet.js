import { sanitizeBookingCode } from "./types";
export class XBetAdapter {
    code = "xbet";
    displayName = "1xBet";
    async fetchSlip(code) {
        code = sanitizeBookingCode(code);
        return {
            sourceBookmaker: this.code,
            sourceCode: code,
            selections: [],
            totalOdds: 1.0,
        };
    }
    async createSlip(_selections) {
        return {
            code: "1X-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
            totalOdds: 1.88,
        };
    }
    async getFixtures() {
        return [];
    }
}
