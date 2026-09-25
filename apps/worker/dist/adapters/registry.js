"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdapter = getAdapter;
exports.listAdapters = listAdapters;
const sportybet_1 = require("./sportybet");
const bet9ja_1 = require("./bet9ja");
const xbet_1 = require("./xbet");
const adapters = new Map();
adapters.set("sportybet", new sportybet_1.SportyBetAdapter());
adapters.set("bet9ja", new bet9ja_1.Bet9jaAdapter());
adapters.set("xbet", new xbet_1.XBetAdapter());
function getAdapter(code) {
    const adapter = adapters.get(code);
    if (!adapter)
        throw new Error(`Unknown bookmaker: ${code}`);
    return adapter;
}
function listAdapters() {
    return Array.from(adapters.keys());
}
