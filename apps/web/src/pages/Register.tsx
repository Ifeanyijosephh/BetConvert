import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { registerUser } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { BackgroundVideo } from "../components/layout/BackgroundVideo";

export const Register: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+234");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const navigate = useNavigate();
  const { refreshProfile } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError("You must confirm you are 18+ and agree to the terms.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const authData = await registerUser({
        fullName,
        username,
        email,
        password,
        phone: `${countryCode}${phone}`,
      });
      
      if (authData?.user && authData?.session === null) {
        setVerificationSent(true);
      } else {
        await refreshProfile();
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (verificationSent) {
    return (
      <div className="min-h-screen bg-app flex flex-col justify-center items-center px-4 py-24 relative overflow-hidden">
        <BackgroundVideo />
        <div className="w-full max-w-md bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 text-center">
          <div className="w-16 h-16 bg-brand-neon/20 border border-brand-neon rounded-full flex items-center justify-center mx-auto text-brand-neon mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Verify Your Email</h1>
          <p className="text-sm text-text-secondary mb-6">
            We sent a secure verification link to <strong className="text-white">{email}</strong>. Please check your inbox and spam folder to activate your account.
          </p>
          <Link to="/login" className="w-full py-4 bg-brand-neon text-black font-black text-sm uppercase rounded-xl flex items-center justify-center pressable">
            Proceed to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app flex flex-col justify-center items-center px-4 py-24 relative overflow-hidden">
      <BackgroundVideo />

      <div className="w-full max-w-md bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 animate-fade-up">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-brand-neon rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-brand-neon/20">
            <Zap className="w-7 h-7 text-black fill-black" />
          </div>
          <h1 className="text-2xl font-black text-white">Create Account</h1>
          <p className="text-text-secondary text-xs mt-1 font-medium">Get 3 free conversions every single day</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-white uppercase tracking-wider mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" className="w-full bg-app/90 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white font-medium focus:border-brand-neon focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-white uppercase tracking-wider mb-1.5">Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-black">@</span>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="johndoe" className="w-full bg-app/90 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white font-medium focus:border-brand-neon focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-white uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full bg-app/90 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white font-medium focus:border-brand-neon focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-white uppercase tracking-wider mb-1.5">Phone Number</label>
            <div className="flex gap-2">
              <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="bg-app/90 border border-white/10 rounded-xl px-3 text-xs text-white font-bold focus:border-brand-neon focus:outline-none">
                <option value="+234">🇳🇬 +234</option>
                <option value="+233">🇬🇭 +233</option>
                <option value="+254">🇰🇪 +254</option>
                <option value="+27">🇿🇦 +27</option>
              </select>
              <div className="relative flex-1">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="8012345678" className="w-full bg-app/90 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white font-medium focus:border-brand-neon focus:outline-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-white uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-app/90 border border-white/10 rounded-xl py-3 pl-11 pr-10 text-sm text-white font-medium focus:border-brand-neon focus:outline-none" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="terms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="accent-brand-neon rounded w-4 h-4" />
            <label htmlFor="terms" className="text-[11px] font-semibold text-text-secondary">
              I am 18+ and agree to the <Link to="/terms" className="text-white hover:text-brand-neon underline">Terms</Link> & <Link to="/privacy" className="text-white hover:text-brand-neon underline">Privacy</Link>.
            </label>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 px-4 bg-brand-neon hover:bg-brand-neon-hover text-black font-black uppercase tracking-wide text-sm rounded-xl transition-all shadow-brand-neon flex items-center justify-center gap-2 disabled:opacity-50 mt-4 pressable">
            {loading ? "Creating..." : "Create Free Account"}
            <ArrowRight className="w-4 h-4 stroke-[3px]" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs font-semibold text-text-secondary">
          Already registered?{" "}
          <Link to="/login" className="text-brand-neon hover:underline">Log In</Link>
        </div>
      </div>
    </div>
  );
};
