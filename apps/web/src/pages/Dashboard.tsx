import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Wallet, ArrowLeftRight, History, ShieldCheck, Trophy, Sparkles, TrendingUp } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Dashboard: React.FC = () => {
  const { profile, balance } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-app pt-24 pb-28 px-4 md:px-8 max-w-6xl mx-auto space-y-6">
      <div className="bg-surface/80 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> BetForge Engine Active
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Welcome back, <span className="text-brand-neon">{profile?.full_name || "Bettor"}</span> 👋
            </h1>
            <p className="text-text-secondary text-sm mt-1 max-w-xl">
              Convert codes seamlessly between SportyBet, 1xBet, Bet9ja, BetKing, BangBet & 8+ West African bookies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/convert")}
              className="py-3 px-6 bg-brand-neon hover:bg-brand-neon-hover text-black font-bold text-sm rounded-xl transition-all shadow-lg shadow-brand-neon/20 flex items-center gap-2"
            >
              <ArrowLeftRight className="w-4 h-4" />
              Convert Booking Code
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Zap className="w-5 h-5 text-brand-neon" />}
          title="Daily Free Conversions"
          value="3 / 3 Left"
          subtitle="Resets daily at 00:00 UTC"
        />
        <StatCard
          icon={<Wallet className="w-5 h-5 text-brand-neon" />}
          title="Wallet Credit Balance"
          value={`₦ ${(balance * 200).toLocaleString()}`}
          subtitle={`${balance} Credits available`}
          action={() => navigate("/wallet")}
          actionText="Top Up"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5 text-brand-neon" />}
          title="Total Conversions"
          value="148 Codes"
          subtitle="96% Successful Match Rate"
        />
        <StatCard
          icon={<ShieldCheck className="w-5 h-5 text-brand-neon" />}
          title="Supported Bookmakers"
          value="12 Platforms"
          subtitle="SportyBet, 1xBet, Bet9ja + more"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface/60 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-brand-neon" />
              Quick Converter
            </h3>
            <span className="text-xs text-brand-neon bg-brand-neon/10 px-2.5 py-1 rounded-full font-semibold">
              Instant Mapping
            </span>
          </div>
          <p className="text-text-secondary text-xs">
            Paste any booking code below to start mapping odds across platforms.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. BC89A2 or 1X-9981"
              className="flex-1 bg-app border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-neon"
            />
            <button
              onClick={() => navigate("/convert")}
              className="px-5 py-3 bg-brand-neon text-black font-bold text-sm rounded-xl hover:bg-brand-neon-hover transition-colors"
            >
              Start
            </button>
          </div>
        </div>

        <div className="bg-surface/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white text-lg flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-brand-neon" /> Live Tools & Scores
            </h3>
            <p className="text-text-secondary text-xs">
              Check live match scores, team statistics, and news updates before converting.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Link
              to="/scores"
              className="p-3 bg-app hover:bg-white/5 border border-white/10 rounded-xl text-center font-medium text-xs text-white transition-colors"
            >
              ⚽ Live Matches
            </Link>
            <Link
              to="/history"
              className="p-3 bg-app hover:bg-white/5 border border-white/10 rounded-xl text-center font-medium text-xs text-white transition-colors"
            >
              📜 Order History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

function StatCard({ icon, title, value, subtitle, action, actionText }: any) {
  return (
    <div className="bg-surface/60 border border-white/10 rounded-2xl p-5 space-y-2 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center">
          {icon}
        </div>
        {action && (
          <button
            onClick={action}
            className="text-xs font-bold text-brand-neon hover:underline"
          >
            {actionText} →
          </button>
        )}
      </div>
      <div>
        <p className="text-xs text-text-secondary font-medium">{title}</p>
        <h4 className="text-xl font-bold text-white mt-1">{value}</h4>
        <p className="text-[11px] text-text-secondary/70 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
