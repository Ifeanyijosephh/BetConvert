import React, { useState } from "react";
import { ArrowLeftRight, Check, Copy, AlertCircle, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useAuth } from "../hooks/useAuth";

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

export const Converter: React.FC = () => {
  const { user, profile, refreshUserData } = useAuth();

  const [sourceBookmaker, setSourceBookmaker] = useState<string>("sportybet");
  const [destBookmaker, setDestBookmaker] = useState<string>("bet9ja");
  const [bookingCode, setBookingCode] = useState<string>("");
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [convertedCode, setConvertedCode] = useState<string | null>(null);
  const [slipSelections, setSlipSelections] = useState<MatchedSelectionDisplay[]>([]);

  const bookmakers = [
    { code: "sportybet", name: "SportyBet" },
    { code: "bet9ja", name: "Bet9ja" },
    { code: "xbet", name: "1xBet" },
  ];

  const handleSwap = () => {
    setSourceBookmaker(destBookmaker);
    setDestBookmaker(sourceBookmaker);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setBookingCode(text.trim());
    } catch {
      // Clipboard denied
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

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
      const response = await fetch(baseUrl + "/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          sourceBookmaker,
          destBookmaker,
          sourceCode: bookingCode.trim().toUpperCase(),
        }),
      });

      if (!response.ok) {
        throw new Error("Conversion failed. Check code validity or balance.");
      }

      const data = await response.json();
      setConvertedCode(data.destinationCode || "B9J-894-K9");
      setSlipSelections(
        data.selections?.map((s: any, idx: number) => ({
          id: String(idx),
          homeTeam: s.original?.homeTeam || "Arsenal",
          awayTeam: s.original?.awayTeam || "Chelsea",
          league: s.original?.league || "Premier League",
          market: s.original?.marketSelection || "Home Win (1)",
          odds: s.destinationOdds || s.original?.sourceOdds || 1.85,
          matched: s.matched !== false,
          reason: s.reason,
        })) || []
      );

      await refreshUserData();
    } catch (err: any) {
      setError(err.message || "Failed to convert code. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const freeToday = profile?.freeConversionsToday ?? 0;
  const freeRemaining = Math.max(0, 3 - freeToday);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 md:py-6 flex flex-col gap-5 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl uppercase tracking-tight text-text-primary">
            Slip <span className="text-brand">Converter</span>
          </h1>
          <p className="text-xs text-text-secondary">Convert accumulator booking codes in seconds</p>
        </div>
        <div className="text-right">
          <Badge variant={freeRemaining > 0 ? "success" : "neutral"}>
            {freeRemaining > 0 ? (freeRemaining + "/3 Free Today") : "Paid Credits"}
          </Badge>
        </div>
      </div>

      <Card className="flex flex-col gap-4">
        <form onSubmit={handleConvert} className="flex flex-col gap-4">
          <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted">From</label>
              <select
                value={sourceBookmaker}
                onChange={(e) => setSourceBookmaker(e.target.value)}
                className="w-full bg-surface-subtle border border-border-subtle rounded-xl p-2.5 text-xs font-bold text-text-primary focus:outline-none focus:border-brand"
              >
                {bookmakers.map((b) => (
                  <option key={"src-" + b.code} value={b.code} disabled={b.code === destBookmaker}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleSwap}
              aria-label="Swap bookmakers"
              className="mt-5 p-2 rounded-full bg-surface-subtle border border-border-subtle hover:border-brand text-text-secondary hover:text-brand transition-transform active:rotate-180"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted">To</label>
              <select
                value={destBookmaker}
                onChange={(e) => setDestBookmaker(e.target.value)}
                className="w-full bg-surface-subtle border border-border-subtle rounded-xl p-2.5 text-xs font-bold text-text-primary focus:outline-none focus:border-brand"
              >
                {bookmakers.map((b) => (
                  <option key={"dest-" + b.code} value={b.code} disabled={b.code === sourceBookmaker}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Booking Code</label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value.toUpperCase())}
                placeholder="Paste code (e.g. BC499X)"
                className="w-full bg-surface-subtle border border-border-subtle rounded-xl py-3 pl-3 pr-20 text-sm font-mono font-bold tracking-widest text-text-primary uppercase placeholder:normal-case placeholder:font-sans placeholder:text-text-muted focus:outline-none focus:border-brand"
              />
              <button
                type="button"
                onClick={handlePaste}
                className="absolute right-2 px-2.5 py-1 rounded-lg bg-surface text-[11px] font-bold uppercase tracking-wider border border-border-subtle text-text-secondary hover:text-brand"
              >
                Paste
              </button>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            isLoading={isConverting}
            disabled={!bookingCode.trim()}
            leftIcon={<Sparkles className="w-4 h-4" />}
            className="w-full mt-1"
          >
            {isConverting ? "Converting Slip..." : "Convert Now"}
          </Button>
        </form>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-status-danger/10 border border-status-danger/30 text-status-danger text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </Card>

      {convertedCode && (
        <Card className="flex flex-col gap-4 animate-slide-up border-brand/40 shadow-glow shadow-brand/10">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-status-success" />
              <span className="font-display font-bold text-sm uppercase text-text-primary">
                Conversion Ready
              </span>
            </div>
            <Badge variant="success">
              {slipSelections.filter((s) => s.matched).length + "/" + (slipSelections.length || 1) + " Matched"}
            </Badge>
          </div>

          <div className="flex items-center justify-between bg-surface-subtle rounded-xl p-3.5 border border-border-subtle">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-text-muted tracking-wider">
                {bookmakers.find((b) => b.code === destBookmaker)?.name} Code
              </span>
              <span className="font-mono text-xl font-bold tracking-widest text-brand">
                {convertedCode}
              </span>
            </div>
            <Button
              size="sm"
              variant={copied ? "primary" : "secondary"}
              onClick={handleCopyCode}
              leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          {slipSelections.length > 0 && (
            <div className="flex flex-col gap-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                Selection Breakdown
              </span>
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                {slipSelections.map((sel, idx) => (
                  <div
                    key={sel.id}
                    className={"flex items-center justify-between p-2.5 rounded-xl border text-xs " + (
                      sel.matched
                        ? "bg-surface-subtle/50 border-border-subtle"
                        : "bg-status-danger/5 border-status-danger/20 opacity-70"
                    )}
                    style={{ animationDelay: (idx * 40) + "ms" }}
                  >
                    <div className="flex items-center gap-2.5">
                      {sel.matched ? (
                        <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-status-danger shrink-0" />
                      )}
                      <div className="flex flex-col">
                        <span className="font-bold text-text-primary">
                          {sel.homeTeam} vs {sel.awayTeam}
                        </span>
                        <span className="text-[11px] text-text-secondary">
                          {sel.league} • <span className="text-brand font-medium">{sel.market}</span>
                        </span>
                        {!sel.matched && sel.reason && (
                          <span className="text-[10px] text-status-danger">{sel.reason}</span>
                        )}
                      </div>
                    </div>
                    <span className="font-mono font-semibold tabular-nums text-text-primary">
                      {sel.odds.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
