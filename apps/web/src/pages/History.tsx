import React, { useEffect, useState } from "react";
import { History as HistoryIcon, ArrowRight, Copy, Check } from "lucide-react";
import { fetchConversionHistory } from "../lib/api";
import type { ConversionRecord } from "@betconvert/shared";

export const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<ConversionRecord[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchConversionHistory().then(setHistory);
  }, []);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-app pt-24 pb-28 px-4 md:px-8 max-w-5xl mx-auto space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-xs font-bold mb-2">
          <HistoryIcon className="w-3.5 h-3.5" /> Order Logs
        </div>
        <h1 className="text-3xl font-extrabold text-white">Conversion <span className="text-brand-neon">History</span></h1>
        <p className="text-text-secondary text-xs mt-1">Review your past converted booking codes and mapped selections.</p>
      </div>

      <div className="space-y-3">
        {history.map((record) => (
          <div key={record.id} className="bg-surface/60 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-neon/30 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase">
                <span>{record.from_bookmaker}</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-neon" />
                <span className="text-brand-neon">{record.to_bookmaker}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-text-secondary mt-1">
                <span>Original Code: <strong className="text-white font-mono">{record.source_code}</strong></span>
                <span>•</span>
                <span>Matches: {record.matched_count}/{record.selections_count || 8}</span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
              <div className="text-right">
                <span className="text-[10px] text-text-secondary block">Converted Code</span>
                <span className="font-mono text-base font-bold text-brand-neon">{record.target_code}</span>
              </div>
              <button
                onClick={() => handleCopy(record.target_code, record.id)}
                className="p-2.5 rounded-xl bg-app border border-white/10 text-white hover:text-brand-neon transition-colors"
                title="Copy Converted Code"
              >
                {copiedId === record.id ? <Check className="w-4 h-4 text-brand-neon" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
