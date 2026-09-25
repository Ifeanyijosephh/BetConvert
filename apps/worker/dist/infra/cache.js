"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliasCache = exports.TTLCache = void 0;
class TTLCache {
    defaultTtlMs;
    store = new Map();
    constructor(defaultTtlMs = 15 * 60 * 1000) {
        this.defaultTtlMs = defaultTtlMs;
    }
    get(key) {
        const entry = this.store.get(key);
        if (!entry)
            return undefined;
        if (Date.now() > entry.expiresAt) {
            this.store.delete(key);
            return undefined;
        }
        return entry.value;
    }
    set(key, value, ttlMs) {
        this.store.set(key, {
            value,
            expiresAt: Date.now() + (ttlMs ?? this.defaultTtlMs),
        });
    }
}
exports.TTLCache = TTLCache;
exports.aliasCache = new TTLCache(60 * 60 * 1000);
