"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processConversion = void 0;
const supabase_1 = require("../lib/supabase");
const adapters_1 = require("./adapters");
const processConversion = async (userId, input) => {
    const { fromBookmaker, toBookmaker, bookingCode } = input;
    // 1. Attempt to deduct 1 credit (or use daily free limit) via secure Postgres RPC
    const { data: debitSuccess, error: debitError } = await supabase_1.supabaseAdmin.rpc("debit_for_conversion", {
        p_user_id: userId
    });
    if (debitError || !debitSuccess) {
        throw new Error("Insufficient credits or free daily limit reached. Please top up your wallet.");
    }
    let sourceSlip;
    let targetCode;
    try {
        // 2. Extract matches from source bookmaker
        sourceSlip = await (0, adapters_1.extractSlip)(fromBookmaker, bookingCode);
        // 3. Map to target bookmaker and generate new code
        targetCode = await (0, adapters_1.buildSlip)(toBookmaker, sourceSlip.selections);
    }
    catch (err) {
        // If the engine fails (e.g. invalid code), refund the user immediately!
        await supabase_1.supabaseAdmin.rpc("refund_conversion", { p_user_id: userId });
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
    const { data: insertedRecord, error: insertError } = await supabase_1.supabaseAdmin
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
exports.processConversion = processConversion;
