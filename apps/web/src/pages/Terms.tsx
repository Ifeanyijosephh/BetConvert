import React from "react";
import { FileText } from "lucide-react";

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-app pt-24 pb-28 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-xs font-bold mb-2">
          <FileText className="w-3.5 h-3.5" /> BetForge Terms of Agreement
        </div>
        <h1 className="text-3xl font-extrabold text-white">Terms of <span className="text-brand-neon">Service</span></h1>
        <p className="text-text-secondary text-xs mt-1">Last Updated: October 2024</p>
      </div>

      <div className="bg-surface/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 text-sm text-text-secondary backdrop-blur-xl">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Service Nature & Disclaimer</h2>
          <p>
            BetForge provides automated booking code translation software that matches sporting events between independent bookmakers (SportyBet, 1xBet, Bet9ja, etc.). BetForge is NOT a bookmaker and does not accept or place financial wagers directly.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Conversion Accuracy</h2>
          <p>
            While our multi-stage match engine achieves high accuracy, odds and fixture markets vary across bookmakers. Users are responsible for reviewing converted selections prior to placing wagers on third-party betting sites.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Credits & Refunds Policy</h2>
          <p>
            Free daily conversions reset at 00:00 UTC. Purchased credit balances are non-refundable except in instances where a technical engine error fails to convert a valid bet code.
          </p>
        </section>
      </div>
    </div>
  );
};
