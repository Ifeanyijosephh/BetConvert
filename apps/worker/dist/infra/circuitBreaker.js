"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.circuitBreaker = exports.CircuitBreaker = void 0;
const logger_1 = require("./logger");
class CircuitBreaker {
    failureThreshold;
    cooldownMs;
    circuits = new Map();
    constructor(failureThreshold = 5, cooldownMs = 60_000) {
        this.failureThreshold = failureThreshold;
        this.cooldownMs = cooldownMs;
    }
    getCircuit(key) {
        let c = this.circuits.get(key);
        if (!c) {
            c = { failures: 0, lastFailureAt: 0, state: "closed" };
            this.circuits.set(key, c);
        }
        return c;
    }
    canProceed(key) {
        const c = this.getCircuit(key);
        if (c.state === "closed")
            return true;
        if (c.state === "open") {
            if (Date.now() - c.lastFailureAt >= this.cooldownMs) {
                c.state = "half_open";
                return true;
            }
            return false;
        }
        return true;
    }
    recordSuccess(key) {
        const c = this.getCircuit(key);
        c.failures = 0;
        c.state = "closed";
    }
    recordFailure(key) {
        const c = this.getCircuit(key);
        c.failures += 1;
        c.lastFailureAt = Date.now();
        if (c.failures >= this.failureThreshold) {
            c.state = "open";
            logger_1.logger.error({ bookmaker: key }, "Circuit breaker opened");
        }
    }
    getState(key) {
        return this.getCircuit(key).state;
    }
}
exports.CircuitBreaker = CircuitBreaker;
exports.circuitBreaker = new CircuitBreaker(5, 60_000);
