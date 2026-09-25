"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdapterError = void 0;
exports.sanitizeBookingCode = sanitizeBookingCode;
class AdapterError extends Error {
    code;
    bookmaker;
    retryable;
    constructor(code, message, bookmaker, retryable = false) {
        super(message);
        this.code = code;
        this.bookmaker = bookmaker;
        this.retryable = retryable;
        this.name = "AdapterError";
    }
}
exports.AdapterError = AdapterError;
function sanitizeBookingCode(code) {
    const sanitized = code.trim().toUpperCase();
    if (!/^[A-Z0-9\-_]+$/.test(sanitized)) {
        throw new AdapterError("invalid_code", "Booking code contains invalid characters", "system", false);
    }
    return sanitized;
}
