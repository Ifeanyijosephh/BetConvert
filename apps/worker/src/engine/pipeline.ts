import { supabaseAdmin } from "../lib/supabase";
import { extractSlip, buildSlip } from "./adapters";
import { ConvertRequestInput } from "@betconvert/shared";

export const processConversion = async (userId: string, input: ConvertRequestInput) => {
  const { fromBookmaker, toBookmaker, bookingCode } = input;

  // 1. Attempt to deduct 1 credit (or use daily free limit) via secure Postgres RPC
  const { data: debitSuccess, error: debitError } = await supabaseAdmin.rpc("debit_for_conversion", {
    p_user_id: userId
  });

  if (debitError || !debitSuccess) {
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
    // If the engine fails (e.g. invalid code), refund the user immediately!
    await supabaseAdmin.rpc("refund_conversion", { p_user_id: userId });
    throw new Error(err.message || "Failed to process booking code across platforms.");
  }

  // 4. Log successful conversion securely into the database
  const conversionRecord = {
    user_id: userId,
    from_bookmaker: fromBookmaker,
    to_bookmaker: toBookmaker,
    source_code: bookingCode.toUpperCase(),
    target_code: targetCode,
    status: "success",
    selections_count: sourceSlip.selections.length,
    matched_count: sourceSlip.selections.length, // Simulating 100% match for now
  };

  const { data: insertedRecord, error: insertError } = await supabaseAdmin
    .from("conversions")
    .insert(conversionRecord)
    .select()
    .single();

  if (insertError) {
    console.error("Failed to log conversion history:", insertError);
  }

  return {
    targetCode,
    selectionsCount: sourceSlip.selections.length,
    matchedCount: sourceSlip.selections.length,
    recordId: insertedRecord?.id
  };
};
