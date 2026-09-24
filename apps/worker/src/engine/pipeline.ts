import { createHash, randomUUID } from "node:crypto";
import { logger } from "../infra/logger";
import { supabaseAdmin } from "../infra/supabase";
import { circuitBreaker } from "../infra/circuitBreaker";
import { getAdapter } from "../adapters/registry";
import { AdapterError } from "../adapters/types";
import { matchSelections } from "./matcher";
import { ConversionResult } from "./types";

export interface ConversionRequest {
  userId?: string;
  sourceBookmaker: string;
  sourceCode: string;
  destBookmaker: string;
}

function makeIdempotencyKey(req: ConversionRequest): string {
  const raw = `${req.userId || "anon"}:${req.sourceBookmaker}:${req.sourceCode}:${req.destBookmaker}`;
  return createHash("sha256").update(raw).digest("hex");
}

export async function runConversion(req: ConversionRequest): Promise<ConversionResult> {
  const log = logger.child({ source: req.sourceBookmaker, dest: req.destBookmaker, code: req.sourceCode });

  if (!circuitBreaker.canProceed(req.sourceBookmaker) || !circuitBreaker.canProceed(req.destBookmaker)) {
    return {
      success: false,
      status: "failed",
      destinationCode: null,
      matched: 0,
      total: 0,
      selections: [],
      errorMessage: "Service temporarily unavailable. Please retry in a moment.",
    };
  }

  const conversionId = randomUUID();
  const idempotencyKey = makeIdempotencyKey(req);

  try {
    const sourceAdapter = getAdapter(req.sourceBookmaker);
    const destAdapter = getAdapter(req.destBookmaker);

    const sourceSlip = await sourceAdapter.fetchSlip(req.sourceCode);
    const matched = await matchSelections(sourceSlip.selections, destAdapter);
    const destResult = await destAdapter.createSlip(matched);

    return {
      success: true,
      status: "success",
      destinationCode: destResult.code,
      matched: matched.length,
      total: matched.length,
      selections: matched,
    };
  } catch (err) {
    const msg = err instanceof AdapterError ? err.message : "Conversion failed";
    log.error({ error: msg }, "Conversion error");
    return {
      success: false,
      status: "failed",
      destinationCode: null,
      matched: 0,
      total: 0,
      selections: [],
      errorMessage: msg,
    };
  }
}
