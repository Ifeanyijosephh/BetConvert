import { CanonicalSelection, MatchedSelection } from "./types";
import { BookmakerAdapter } from "../adapters/types";

export async function matchSelections(
  selections: CanonicalSelection[],
  _destinationAdapter: BookmakerAdapter
): Promise<MatchedSelection[]> {
  return selections.map((sel) => ({
    original: sel,
    destinationFixtureId: "matched-fx-1",
    destinationMarketId: "mkt-1",
    destinationOdds: sel.sourceOdds,
    matched: true,
    confidence: 100,
  }));
}
