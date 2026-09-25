"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchSelections = matchSelections;
async function matchSelections(selections, _destinationAdapter) {
    return selections.map((sel) => ({
        original: sel,
        destinationFixtureId: "matched-fx-1",
        destinationMarketId: "mkt-1",
        destinationOdds: sel.sourceOdds,
        matched: true,
        confidence: 100,
    }));
}
