import React from "react";
import { Link } from "react-router-dom";
import { Zap, ShieldCheck, Trophy, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export const Landing: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-16 flex flex-col items-center text-center gap-8 pb-24">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5" />
        #1 Booking Code Converter in Nigeria
      </div>

      <div className="flex flex-col gap-3 max-w-2xl">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-text-primary leading-none">
          Convert Any Bet Code <br />
          <span className="text-brand">In Under 10 Seconds</span>
        </h1>
        <p className="text-sm md:text-base text-text-secondary max-w-lg mx-auto">
          SportyBet ➔ Bet9ja ➔ 1xBet. Paste your accumulator booking code, select your target platform, and get your new slip instantly.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
        <Link to="/converter" className="w-full">
          <Button size="lg" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Start Converting
          </Button>
        </Link>
        <Link to="/register" className="w-full">
          <Button size="lg" variant="secondary" className="w-full">
            Create Account
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-6">
        <Card className="flex flex-col items-center gap-2 p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-1">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-base uppercase text-text-primary">Instant Accuracy</h3>
          <p className="text-xs text-text-secondary">
            Our 3-layer matching engine reconciles team names, leagues, and market variations seamlessly.
          </p>
        </Card>

        <Card className="flex flex-col items-center gap-2 p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-1">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-base uppercase text-text-primary">Append-Only Wallet</h3>
          <p className="text-xs text-text-secondary">
            Fund your dedicated bank account anytime. Transparent ledger tracking with zero hidden deductions.
          </p>
        </Card>

        <Card className="flex flex-col items-center gap-2 p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-1">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-base uppercase text-text-primary">Live Match Center</h3>
          <p className="text-xs text-text-secondary">
            Keep track of live match scores and odds changes as your accumulator unfolds.
          </p>
        </Card>
      </div>

      <footer className="pt-8 text-center text-xs text-text-muted border-t border-border-subtle w-full">
        <p>BetConvert is an independent conversion utility and is not affiliated with SportyBet, Bet9ja, 1xBet, or any other bookmaker.</p>
      </footer>
    </div>
  );
};
