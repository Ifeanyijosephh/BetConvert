import React from "react";
import { ShieldCheck, ShieldAlert, FileText } from "lucide-react";

export const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-app pt-24 pb-28 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
      <div className="bg-gradient-to-r from-red-900/30 via-surface to-surface border border-red-500/30 rounded-3xl p-6 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400 font-extrabold text-2xl shrink-0">
            18+
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Privacy Policy & Responsible Gaming Notice</h1>
            <p className="text-xs text-text-secondary mt-1">
              BetForge operates strictly for legal adult bettors in Nigeria, Ghana, Kenya, and West Africa.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-surface/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 text-sm text-text-secondary backdrop-blur-xl">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-neon" /> 1. Data Collection & Usage
          </h2>
          <p>
            BetForge collects user email addresses, usernames, and encrypted booking codes exclusively for executing real-time odds mapping and code conversion services. We do not sell or share personal identity information to third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-brand-neon" /> 2. Age Requirement & West African Regulatory Compliance
          </h2>
          <p>
            You must be at least 18 years of age (or the legal gambling age in your country) to register and use BetForge. BetForge complies with National Lottery Regulatory Commission (NLRC) regulations in Nigeria, Gaming Commission of Ghana standards, and East/West African gaming authorities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-neon" /> 3. Responsible Gambling Standards
          </h2>
          <p>
            Betting should remain entertainment, not a financial strategy. If you feel your betting habits are becoming harmful, please seek help through independent problem gambling helplines in West Africa or set personal deposit limits.
          </p>
          <ul className="space-y-1 pl-4 list-disc text-xs text-text-secondary">
            <li>GambleAlert Nigeria Support Helpline</li>
            <li>Gamblers Anonymous West Africa</li>
            <li>Self-exclusion available upon request via support@betforge.app</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
