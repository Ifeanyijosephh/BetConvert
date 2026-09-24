import { logger } from "./logger";

type CircuitState = "closed" | "open" | "half_open";

interface CircuitStats {
  failures: number;
  lastFailureAt: number;
  state: CircuitState;
}

export class CircuitBreaker {
  private circuits = new Map<string, CircuitStats>();

  constructor(private failureThreshold: number = 5, private cooldownMs: number = 60_000) {}

  private getCircuit(key: string): CircuitStats {
    let c = this.circuits.get(key);
    if (!c) {
      c = { failures: 0, lastFailureAt: 0, state: "closed" };
      this.circuits.set(key, c);
    }
    return c;
  }

  canProceed(key: string): boolean {
    const c = this.getCircuit(key);
    if (c.state === "closed") return true;
    if (c.state === "open") {
      if (Date.now() - c.lastFailureAt >= this.cooldownMs) {
        c.state = "half_open";
        return true;
      }
      return false;
    }
    return true;
  }

  recordSuccess(key: string): void {
    const c = this.getCircuit(key);
    c.failures = 0;
    c.state = "closed";
  }

  recordFailure(key: string): void {
    const c = this.getCircuit(key);
    c.failures += 1;
    c.lastFailureAt = Date.now();
    if (c.failures >= this.failureThreshold) {
      c.state = "open";
      logger.error({ bookmaker: key }, "Circuit breaker opened");
    }
  }

  getState(key: string): CircuitState {
    return this.getCircuit(key).state;
  }
}

export const circuitBreaker = new CircuitBreaker(5, 60_000);
