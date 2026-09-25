import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Zap, Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import { loginUser } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { BackgroundVideo } from "../components/layout/BackgroundVideo";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { refreshProfile } = useAuth();

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({ email, password });
      await refreshProfile();
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const BookieLogos = [
    <div className="flex items-center gap-0.5 font-black text-2xl italic tracking-tighter"><span className="text-[#FF0000]">Sporty</span><span className="text-white">Bet</span></div>,
    <div className="flex items-center font-black text-2xl tracking-tighter"><span className="text-[#1E90FF]">1x</span><span className="text-white">BET</span></div>,
    <div className="flex items-center font-black text-2xl tracking-tighter bg-white px-2 py-0.5 rounded"><span className="text-[#008000]">bet</span><span className="text-[#FF0000]">9ja</span></div>,
    <div className="flex items-center font-black text-2xl tracking-tighter"><span className="text-[#FFD700]">Bet</span><span className="text-[#000080] bg-[#FFD700] px-1">King</span></div>,
    <div className="flex items-center font-black text-2xl tracking-tighter"><span className="text-[#FF4500]">Bang</span><span className="text-white">Bet</span></div>,
    <div className="flex items-center font-black text-2xl tracking-tighter"><span className="text-white">bet</span><span className="text-white">way</span></div>,
  ];

  return (
    <div className="min-h-screen bg-app flex flex-col justify-center items-center px-4 py-24 relative overflow-hidden">
      <BackgroundVideo />

      <div className="w-full max-w-md bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 animate-fade-up">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-neon rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-brand-neon/20">
            <Zap className="w-7 h-7 text-black fill-black" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">Welcome Back</h1>
          <p className="text-text-secondary text-xs mt-1 font-medium">Access your BetForge conversion engine</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-black text-white uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" className="w-full bg-app/90 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white font-medium focus:outline-none focus:border-brand-neon transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black text-white uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-app/90 border border-white/10 rounded-xl py-3.5 pl-11 pr-10 text-sm text-white font-medium focus:outline-none focus:border-brand-neon transition-colors" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 px-4 bg-brand-neon hover:bg-brand-neon-hover text-black font-black text-sm uppercase tracking-wide rounded-xl transition-all shadow-brand-neon flex items-center justify-center gap-2 disabled:opacity-50 mt-6 pressable">
            {loading ? "Authenticating..." : "Sign In to Engine"}
            <ArrowRight className="w-4 h-4 stroke-[3px]" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs font-semibold text-text-secondary">
          Don't have an account?{" "}
          <Link to="/register" className="text-brand-neon hover:underline">Create Free Account</Link>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 overflow-hidden">
          <p className="text-[9px] font-black text-center text-white/50 uppercase tracking-[0.2em] mb-4">
            Universal Mapping Powered For
          </p>
          <div className="relative w-full overflow-hidden">
            <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
              {BookieLogos.concat(BookieLogos).map((logo, i) => (
                <div key={i} className="grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default transform hover:scale-105">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
