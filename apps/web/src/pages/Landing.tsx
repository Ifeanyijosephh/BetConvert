import React from "react";
import { Link } from "react-router-dom";
import { Zap, CheckCircle2, TrendingUp, ArrowRight } from "lucide-react";

export const Landing: React.FC = () => (
  <div className="min-h-screen bg-app flex flex-col relative overflow-hidden">
    {/* Stadium glow backdrop */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,230,118,0.08)_0%,_transparent_60%)]" />
    <div className="absolute top-0 inset-x-0 h-72 bg-gradient-to-b from-green/5 to-transparent" />

    {/* Top bar */}
    <div className="relative z-10 flex items-center justify-between px-5 pt-5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-green flex items-center justify-center">
          <span className="text-xs font-black text-green-fg">BF</span>
        </div>
        <span className="font-bold text-sm tracking-tight">BET<span className="text-green">FORGE</span></span>
      </div>
    </div>

    {/* Hero */}
    <div className="relative z-10 flex-1 flex flex-col justify-center px-5 pb-8 pt-12">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-green mb-3">Booking Code Converter</p>
      <h1 className="font-extrabold text-[2.15rem] leading-[1.15] tracking-tight text-t-primary mb-3">
        Convert Any<br />Booking Code<br />in Seconds
      </h1>
      <p className="text-sm text-t-secondary leading-relaxed mb-8 max-w-xs">
        Move your selections between Nigeria&apos;s leading bookmakers — fast, accurate and secure.
      </p>

      <Link to="/converter">
        <button className="btn-green w-full max-w-xs h-14 rounded-xl text-sm flex items-center justify-center gap-2">
          CONVERT A CODE <ArrowRight className="w-4 h-4" />
        </button>
      </Link>

      {/* Feature pills */}
      <div className="mt-10 flex flex-col gap-3 max-w-xs">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-t-muted mb-1">Built for Matchday</p>
        {[
          { icon: Zap, title: "Instant conversion", desc: "Codes rebuilt in seconds" },
          { icon: CheckCircle2, title: "Slip validation", desc: "See every passed selection" },
          { icon: TrendingUp, title: "Best odds", desc: "Compare value before kickoff" },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3 bg-surface border border-border rounded-xl p-3.5">
            <div className="w-8 h-8 rounded-lg bg-green-dim flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-green" />
            </div>
            <div>
              <p className="text-sm font-semibold text-t-primary">{title}</p>
              <p className="text-xs text-t-muted">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Bookmaker strip */}
    <div className="relative z-10 px-5 pb-8">
      <div className="flex items-center gap-3 flex-wrap">
        {["BET9JA", "SPORTYBET", "1XBET", "BETKING"].map((b) => (
          <span key={b} className="text-[10px] font-bold tracking-widest text-t-muted">{b}</span>
        ))}
      </div>
    </div>
  </div>
);
