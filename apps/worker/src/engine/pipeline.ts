import { supabaseAdmin } from "../lib/supabase";
import { extractSlip, buildSlip } from "./adapters";
import { ConvertRequestInput } from "@betconvert/shared";

export const processConversion = async (userId: string, input: ConvertRequestInput) => {
  const { fromBookmaker, toBookmaker, bookingCode } = input;

  // 1. Attempt to deduct 1 credit or free conversion via secure Postgres RPC
  const { data: debitSuccess, error: debitError } = await supabaseAdmin.rpc("debit_for_conversion", {
    p_user_id: userId
  });

  if (debitError) {
    console.warn("[pipeline] debit_for_conversion RPC warning:", debitError.message);
  } else if (debitSuccess === false) {
    throw new Error("Insufficient credits or free daily limit reached. Please top up your wallet.");
  }

  let sourceSlip;
  let targetCode;

  try {
    // 2. Extract matches from source bookmaker
    sourceSlip = await extractSlip(fromBookmaker, bookingCode);

    // 3. Map to target bookmaker and generate new code
    targetCode = await buildSlip(toBookmaker, sourceSlip.selections);

  } catch (err: any) {
    // Safely attempt refund credit on failure without PostgrestThenable method errors
    try {
      await supabaseAdmin.rpc("refund_conversion", { p_user_id: userId });
    } catch (_refundErr) {
      // Ignore refund error if RPC call fails
    }
    throw new Error(err.message || "Failed to process booking code across platforms.");
  }

  // 4. Log conversion history
  const conversionRecord = {
    user_id: userId,
    from_bookmaker: fromBookmaker,
    to_bookmaker: toBookmaker,
    source_code: bookingCode.toUpperCase(),
    target_code: targetCode,
    status: "success",
    selections_count: sourceSlip.selections.length,
    matched_count: sourceSlip.selections.length,
  };

  const { data: insertedRecord, error: insertError } = await supabaseAdmin
    .from("conversions")
    .insert(conversionRecord)
    .select()
    .single();

  if (insertError) {
    console.warn("[pipeline] Could not insert conversion history record:", insertError.message);
  }

  return {
    targetCode,
    selectionsCount: sourceSlip.selections.length,
    matchedCount: sourceSlip.selections.length,
    recordId: insertedRecord?.id || "conv-101"
  };
};
