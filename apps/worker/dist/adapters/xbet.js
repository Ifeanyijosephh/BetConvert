"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XBetAdapter = void 0;
const types_1 = require("./types");
class XBetAdapter {
    code = "xbet";
    displayName = "1xBet";
    async fetchSlip(code) {
        code = (0, types_1.sanitizeBookingCode)(code);
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
exports.XBetAdapter = XBetAdapter;
