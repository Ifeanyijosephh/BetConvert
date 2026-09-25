import React from "react";
import { Wallet as WalletIcon, ArrowUpRight, History, ShieldCheck, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Wallet: React.FC = () => {
  const { balance } = useAuth();

  return (
    <div className="min-h-screen bg-app pt-24 pb-28 px-4 md:px-8 max-w-4xl mx-auto space-y-6">
      <div>
 
        <h1 className="text-3xl font-black text-white">Wallet & <span className="text-brand-neon">Credits</span></h1>
        <p className="text-text-secondary text-xs mt-1 font-medium">Fund your account instantly via virtual account transfer.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-up">
        {/* Balance Card */}
        <div className="md:col-span-1 bg-surface/80 border border-brand-neon/30 rounded-3xl p-6 backdrop-blur-xl shadow-brand-neon flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/10 rounded-full blur-[50px]" />
          <div className="w-12 h-12 rounded-xl bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center text-brand-neon mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Available Credits</p>
          <h2 className="text-5xl font-black text-white">{balance}</h2>
          <p className="text-brand-neon text-xs font-bold mt-2">₦{(balance * 200).toLocaleString()} Value</p>
        </div>

        {/* Deposit Card */}
        <div className="md:col-span-2 bg-surface/80 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-black text-lg">Deposit Funds</h3>
              <p className="text-text-secondary text-xs font-medium">Transfer to your dedicated virtual account.</p>
            </div>
          </div>

          <div className="bg-app border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <span className="text-xs text-text-secondary font-bold uppercase tracking-wider">Bank Name</span>
              <span className="text-sm text-white font-black">Providus Bank</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <span className="text-xs text-text-secondary font-bold uppercase tracking-wider">Account Number</span>
              <div className="flex items-center gap-3">
                <span className="text-xl text-brand-neon font-black tracking-widest">9901458821</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-secondary font-bold uppercase tracking-wider">Account Name</span>
              <span className="text-sm text-white font-black">BetForge - Wallet</span>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <ShieldCheck className="w-5 h-5 text-brand-neon shrink-0" />
            <p className="text-[11px] text-text-secondary font-medium leading-relaxed">
              Transfers reflect instantly. 1 Credit = ₦200. Used exclusively for booking code conversions after your 3 daily free limits are exhausted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
