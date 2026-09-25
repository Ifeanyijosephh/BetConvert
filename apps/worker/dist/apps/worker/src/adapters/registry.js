import { SportyBetAdapter } from "./sportybet";
import { Bet9jaAdapter } from "./bet9ja";
import { XBetAdapter } from "./xbet";
const adapters = new Map();
adapters.set("sportybet", new SportyBetAdapter());
adapters.set("bet9ja", new Bet9jaAdapter());
adapters.set("xbet", new XBetAdapter());
export function getAdapter(code) {
    const adapter = adapters.get(code);
    if (!adapter)
        throw new Error(`Unknown bookmaker: ${code}`);
    return adapter;
}
export function listAdapters() {
    return Array.from(adapters.keys());
}
