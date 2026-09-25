import React from "react";
import { Link } from "react-router-dom";
import { Zap, ShieldCheck, Trophy, ArrowRight, Sparkles } from "lucide-react";
import { BackgroundVideo } from "../components/layout/BackgroundVideo";

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col pt-20 relative overflow-hidden">
      {/* Animated Football Background */}
      <BackgroundVideo />

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-16 flex flex-col items-center text-center gap-8 pb-24 z-10 animate-fade-up">
        
 

        {/* Main Headline */}
        <div className="flex flex-col mt-4 gap-4 max-w-3xl animate-fade-up-delay-1">
          <h1 className="font-black text-4xl md:text-6xl uppercase tracking-tight text-white leading-[1.1] drop-shadow-lg">
            Convert Any Bet Code <br />
            <span className="text-brand-neon italic">In Under 10 Seconds</span>
          </h1>
          <p className="text-sm md:text-base text-text-secondary max-w-lg mx-auto font-medium leading-relaxed drop-shadow">
            SportyBet ➔ Bet9ja ➔ 1xBet. Paste your accumulator booking code, select your target platform, and get your new slip instantly.
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-4 animate-fade-up-delay-2">
          <Link to="/convert" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-brand-neon hover:bg-[#00E05A] text-black font-black text-sm uppercase tracking-wide rounded-xl transition-all shadow-brand-neon flex items-center justify-center gap-2 pressable">
              Start Converting
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
          </Link>
          <Link to="/register" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-surface/80 hover:bg-surface border border-white/10 text-white font-bold text-sm uppercase tracking-wide rounded-xl transition-all backdrop-blur-md flex items-center justify-center gap-2 pressable">
              Create Account
            </button>
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-10 animate-fade-up-delay-2">
          <div className="bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-2xl flex flex-col items-center gap-3 p-6 text-center card-lift shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center text-brand-neon mb-1">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg uppercase text-white">Instant Accuracy</h3>
            <p className="text-xs text-text-secondary font-medium leading-relaxed">
              Our 3-layer matching engine reconciles team names, leagues, and market variations seamlessly.
            </p>
          </div>

          <div className="bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-2xl flex flex-col items-center gap-3 p-6 text-center card-lift shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center text-brand-neon mb-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg uppercase text-white">Append-Only Wallet</h3>
            <p className="text-xs text-text-secondary font-medium leading-relaxed">
              Fund your dedicated bank account anytime. Transparent ledger tracking with zero hidden deductions.
            </p>
          </div>

          <div className="bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-2xl flex flex-col items-center gap-3 p-6 text-center card-lift shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center text-brand-neon mb-1">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg uppercase text-white">Live Match Center</h3>
            <p className="text-xs text-text-secondary font-medium leading-relaxed">
              Keep track of live match scores and odds changes as your accumulator unfolds.
            </p>
          </div>
        </div>

        {/* Disclaimer Footer */}
        <footer className="mt-16 pt-8 text-center text-[10px] text-text-secondary/60 border-t border-white/10 w-full uppercase tracking-wider font-semibold">
          <p>BetForge is an independent conversion utility and is not affiliated with SportyBet, Bet9ja, 1xBet, or any other bookmaker.</p>
        </footer>
      </div>
    </div>
  );
};
