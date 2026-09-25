import React, { useState } from "react";
import { ArrowLeftRight, Zap, Copy, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Converter: React.FC = () => {
  const { balance } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResult("B9-88X9Y");
      setLoading(false);
    }, 1500);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-stadium flex flex-col pt-24 pb-28 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-neon/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-2xl mx-auto space-y-6 z-10 animate-fade-up">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface/80 border border-brand-neon/30 text-brand-neon text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-lg">
            <ArrowLeftRight className="w-3.5 h-3.5" /> Bet Engine
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-md">
            Convert <span className="text-brand-neon">Code</span>
          </h1>
          <p className="text-text-secondary text-xs font-medium max-w-sm mx-auto">
            Available Credits: <span className="text-white font-bold">{balance}</span>
          </p>
        </div>

        <div className="bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
          <form onSubmit={handleConvert} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-white uppercase tracking-wider mb-2">From Bookmaker</label>
                <select className="w-full bg-app border border-white/10 rounded-xl py-3.5 px-4 text-sm text-white font-bold focus:outline-none focus:border-brand-neon transition-colors">
                  <option value="sportybet">🔴 SportyBet</option>
                  <option value="1xbet">🔵 1xBet</option>
                  <option value="bet9ja">🟢 Bet9ja</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-white uppercase tracking-wider mb-2">To Bookmaker</label>
                <select className="w-full bg-app border border-white/10 rounded-xl py-3.5 px-4 text-sm text-white font-bold focus:outline-none focus:border-brand-neon transition-colors">
                  <option value="bet9ja">🟢 Bet9ja</option>
                  <option value="sportybet">🔴 SportyBet</option>
                  <option value="1xbet">🔵 1xBet</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-white uppercase tracking-wider mb-2">Booking Code</label>
              <input
                type="text"
                required
                placeholder="e.g. BC89A2"
                className="w-full bg-app border border-white/10 rounded-xl py-4 px-5 text-lg font-black tracking-widest text-white uppercase placeholder-text-secondary/30 focus:outline-none focus:border-brand-neon transition-colors text-center"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-4 bg-brand-neon hover:bg-brand-neon-hover text-black font-black uppercase tracking-wide text-sm rounded-xl transition-all shadow-brand-neon flex items-center justify-center gap-2 disabled:opacity-50 pressable"
            >
              {loading ? (
                <span className="animate-pulse">Mapping Markets...</span>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-black" /> Convert Now
                </>
              )}
            </button>
          </form>

          {result && (
            <div className="mt-8 pt-6 border-t border-white/10 animate-fade-up">
              <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest text-center mb-3">
                Conversion Successful
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-brand-neon/10 border border-brand-neon/30 rounded-xl py-4 px-5 text-center">
                  <span className="text-2xl font-black text-brand-neon tracking-widest">{result}</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-4 bg-surface hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all pressable"
                >
                  {copied ? <CheckCircle2 className="w-6 h-6 text-brand-neon" /> : <Copy className="w-6 h-6" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
