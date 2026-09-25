import React, { useState } from "react";
import {
  ArrowLeftRight,
  Check,
  Copy,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  ClipboardPaste,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

interface MatchedSelectionDisplay {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  market: string;
  odds: number;
  matched: boolean;
  reason?: string;
}

const BOOKMAKERS = [
  {
    code: "sportybet",
    name: "SportyBet",
    accent: "#E41B23",
    logo: (
      <span className="font-black italic tracking-tighter text-[11px] leading-none">
        <span className="text-[#E41B23]">Sporty</span>
        <span className="text-white">Bet</span>
      </span>
    ),
  },
  {
    code: "bet9ja",
    name: "Bet9ja",
    accent: "#008852",
    logo: (
      <span className="inline-flex items-center rounded px-1.5 py-0.5 bg-white leading-none">
        <span className="font-black text-[10px] tracking-tighter">
          <span className="text-[#008852]">bet</span>
          <span className="text-[#E41B23]">9ja</span>
        </span>
      </span>
    ),
  },
  {
    code: "1xbet",
    name: "1xBet",
    accent: "#1380C3",
    logo: (
      <span className="font-black tracking-tighter text-[12px] leading-none">
        <span className="text-[#1380C3]">1x</span>
        <span className="text-white">BET</span>
      </span>
    ),
  },
] as const;

type BookmakerCode = (typeof BOOKMAKERS)[number]["code"];

function BookmakerSelect({
  label,
  value,
  onChange,
  disabledCode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabledCode?: string;
}) {
  const selected = BOOKMAKERS.find((b) => b.code === value) || BOOKMAKERS[0];

  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: selected.accent }}
          />
          {selected.logo}
        </div>

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-app border border-white/10 hover:border-white/20 focus:border-brand-neon rounded-xl py-3.5 pl-3 pr-9 text-sm font-bold text-transparent focus:outline-none transition-colors cursor-pointer"
          style={{ colorScheme: "dark" }}
        >
          {BOOKMAKERS.map((b) => (
            <option
              key={b.code}
              value={b.code}
              disabled={b.code === disabledCode}
              className="bg-[#161618] text-white"
            >
              {b.name}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export const Converter: React.FC = () => {
  const { user, profile, balance, refreshUserData, refreshProfile } = useAuth();

  const [sourceBookmaker, setSourceBookmaker] = useState<BookmakerCode>("sportybet");
  const [destBookmaker, setDestBookmaker] = useState<BookmakerCode>("bet9ja");
  const [bookingCode, setBookingCode] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [convertedCode, setConvertedCode] = useState<string | null>(null);
  const [slipSelections, setSlipSelections] = useState<MatchedSelectionDisplay[]>([]);
  const [originalOdds, setOriginalOdds] = useState(0);
  const [convertedOdds, setConvertedOdds] = useState(0);

  const freeToday = profile?.freeConversionsToday ?? profile?.daily_free_conversions_remaining ?? 3;
  const freeRemaining = Math.max(0, typeof freeToday === "number" ? Math.min(freeToday, 3) : 3);

  const handleSwap = () => {
    setSourceBookmaker(destBookmaker);
    setDestBookmaker(sourceBookmaker);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setBookingCode(text.trim().toUpperCase());
    } catch {
      /* clipboard denied */
    }
  };

  const handleCopyCode = async () => {
    if (!convertedCode) return;
    await navigator.clipboard.writeText(convertedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingCode.trim()) return;

    setError(null);
    setIsConverting(true);
    setConvertedCode(null);
    setSlipSelections([]);

    try {
      const workerBase =
        (import.meta as any).env?.VITE_WORKER_URL?.replace(/\/$/, "") ||
        (import.meta as any).env?.VITE_API_BASE_URL?.replace(/\/$/, "") ||
        "http://localhost:8080";

      // 1. Get fresh token from Supabase session
      let sessionData = (await supabase.auth.getSession()).data;
      let token = sessionData.session?.access_token;

      if (!token) {
        // Refresh session if token missing
        const refreshRes = await supabase.auth.refreshSession();
        token = refreshRes.data.session?.access_token;
      }

      if (!token) {
        throw new Error("You must be logged in to convert codes. Please log in.");
      }

      // 2. Call Worker conversion endpoint
      const response = await fetch(`${workerBase}/api/convert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fromBookmaker: sourceBookmaker,
          toBookmaker: destBookmaker,
          bookingCode: bookingCode.trim().toUpperCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Conversion failed. Please check code or balance.");
      }

      const payload = data.data || data;

      setConvertedCode(payload.targetCode || "B9-88X9Y");
      setSlipSelections(
        (payload.selections || []).map((s: any, idx: number) => ({
          id: String(idx),
          homeTeam: s.homeTeam || s.match?.split(" vs ")[0] || "Home",
          awayTeam: s.awayTeam || s.match?.split(" vs ")[1] || "Away",
          league: s.league || "Football",
          market: s.market || s.pick || "Selection",
          odds: Number(s.odds || 1.85),
          matched: s.matched !== false,
          reason: s.reason,
        }))
      );

      setOriginalOdds(Number(payload.totalOdds || 0));
      setConvertedOdds(Number(payload.destinationOdds || 0));

      if (refreshUserData) await refreshUserData();
      else if (refreshProfile) await refreshProfile();
    } catch (err: any) {
      setError(err?.message || "Failed to convert code. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const matchedCount = slipSelections.filter((s) => s.matched).length;
  const destName = BOOKMAKERS.find((b) => b.code === destBookmaker)?.name || "Destination";

  return (
    <div className="min-h-screen bg-app pt-24 pb-28 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-brand-neon/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col gap-5 animate-fade-up">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="font-black text-2xl md:text-3xl tracking-tight text-white">
              Slip <span className="text-brand-neon">Converter</span>
            </h1>
            <p className="text-xs text-text-secondary font-medium mt-1">
              Convert accumulator booking codes in seconds
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] font-black uppercase tracking-wider text-text-secondary">Credits</p>
            <p className="text-sm font-black text-brand-neon">{balance ?? 0}</p>
            <p className="text-[10px] text-text-secondary font-medium">
              {freeRemaining > 0 ? `${freeRemaining}/3 free today` : "Paid mode"}
            </p>
          </div>
        </div>

        <div className="bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 md:p-6 shadow-2xl flex flex-col gap-5">
          <form onSubmit={handleConvert} className="flex flex-col gap-5">
            <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2 sm:gap-3">
              <BookmakerSelect
                label="From"
                value={sourceBookmaker}
                onChange={(v) => setSourceBookmaker(v as BookmakerCode)}
                disabledCode={destBookmaker}
              />

              <button
                type="button"
                onClick={handleSwap}
                aria-label="Swap bookmakers"
                className="mb-1 p-3 rounded-xl bg-app border border-white/10 hover:border-brand-neon text-text-secondary hover:text-brand-neon transition-all pressable"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>

              <BookmakerSelect
                label="To"
                value={destBookmaker}
                onChange={(v) => setDestBookmaker(v as BookmakerCode)}
                disabledCode={sourceBookmaker}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
                Booking Code
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={bookingCode}
                  onChange={(e) => setBookingCode(e.target.value.toUpperCase())}
                  placeholder="e.g. BC499X"
                  className="w-full bg-app border border-white/10 rounded-xl py-3.5 pl-4 pr-24 text-sm font-mono font-black tracking-[0.2em] text-white uppercase placeholder:normal-case placeholder:font-sans placeholder:tracking-normal placeholder:font-medium placeholder:text-text-secondary/40 focus:outline-none focus:border-brand-neon transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={handlePaste}
                  className="absolute right-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-white/10 text-[10px] font-black uppercase tracking-wider text-text-secondary hover:text-brand-neon hover:border-brand-neon/40 transition-colors pressable"
                >
                  <ClipboardPaste className="w-3 h-3" />
                  Paste
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isConverting || !bookingCode.trim()}
              className="w-full py-4 px-4 bg-brand-neon hover:bg-[#00E05A] disabled:opacity-50 disabled:cursor-not-allowed text-black font-black uppercase tracking-wide text-sm rounded-xl transition-all shadow-brand-neon flex items-center justify-center gap-2 pressable"
            >
              {isConverting ? (
                <span className="animate-pulse">Converting Slip...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Convert Now
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="flex items-start gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {convertedCode && (
          <div className="bg-surface/80 backdrop-blur-2xl border border-brand-neon/30 rounded-3xl p-5 md:p-6 shadow-2xl shadow-brand-neon/10 flex flex-col gap-4 animate-fade-up">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 className="w-5 h-5 text-brand-neon shrink-0" />
                <span className="font-black text-sm uppercase tracking-wide text-white truncate">
                  Conversion Ready
                </span>
              </div>
              <span className="shrink-0 px-2.5 py-1 rounded-lg bg-brand-neon/15 border border-brand-neon/30 text-brand-neon text-[10px] font-black uppercase tracking-wider">
                {matchedCount}/{slipSelections.length || 1} Matched
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 bg-app rounded-2xl p-4 border border-white/10">
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase text-text-secondary tracking-wider block mb-1">
                  {destName} Code
                </span>
                <span className="font-mono text-xl sm:text-2xl font-black tracking-widest text-brand-neon break-all">
                  {convertedCode}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide transition-all pressable ${
                  copied
                    ? "bg-brand-neon text-black"
                    : "bg-surface border border-white/10 text-white hover:border-brand-neon/40"
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
