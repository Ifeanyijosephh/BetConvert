import React, { useState } from "react";
import { Save, LogOut, CheckCircle2, User, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Account: React.FC = () => {
  const { profile, signOut } = useAuth();
  const [saved, setSaved] = useState(false);

  const firstName = profile?.first_name || profile?.firstName || profile?.full_name?.split(" ")[0] || "";
  const lastName = profile?.last_name || profile?.lastName || profile?.full_name?.split(" ").slice(1).join(" ") || "";
  const fullName = profile?.full_name || `${firstName} ${lastName}`.trim() || "User";
  const email = profile?.username ? `${profile.username}@betforge.app` : "";
  const phone = profile?.phone || "";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-app pt-24 pb-28 px-4 md:px-8 max-w-4xl mx-auto space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-xs font-black uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" /> Account Center
        </div>
        <h1 className="text-3xl font-black text-white">Account <span className="text-brand-neon">Settings</span></h1>
        <p className="text-text-secondary text-xs mt-1 font-medium">Manage your profile, security, and betting conversion preferences.</p>
      </div>

      <div className="bg-surface/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 animate-fade-up">
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-white/10">
          <div className="w-20 h-20 rounded-full bg-surface border border-brand-neon/40 flex items-center justify-center text-white/50 shadow-lg overflow-hidden">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10" />
            )}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-black text-white">{fullName}</h2>
            <p className="text-xs font-bold text-text-secondary">@{profile?.username || "user"}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 bg-app/60 border border-white/5 rounded-2xl text-center">
          <div>
            <span className="text-[10px] text-text-secondary uppercase font-black tracking-wider block">Conversions</span>
            <span className="font-black text-base text-white">0</span>
          </div>
          <div className="border-x border-white/10">
            <span className="text-[10px] text-text-secondary uppercase font-black tracking-wider block">Match Rate</span>
            <span className="font-black text-base text-brand-neon">0%</span>
          </div>
          <div>
            <span className="text-[10px] text-text-secondary uppercase font-black tracking-wider block">Free Today</span>
            <span className="font-black text-base text-brand-neon">{profile?.daily_free_conversions_remaining ?? 3}</span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-white uppercase tracking-wider mb-1.5">First Name</label>
              <input
                type="text"
                defaultValue={firstName}
                className="w-full bg-app border border-white/10 rounded-xl py-3 px-4 text-sm text-white font-medium focus:outline-none focus:border-brand-neon transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-white uppercase tracking-wider mb-1.5">Last Name</label>
              <input
                type="text"
                defaultValue={lastName}
                className="w-full bg-app border border-white/10 rounded-xl py-3 px-4 text-sm text-white font-medium focus:outline-none focus:border-brand-neon transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-white uppercase tracking-wider mb-1.5">Email (Read Only)</label>
            <input
              type="email"
              defaultValue={email}
              disabled
              className="w-full bg-app/50 border border-white/5 rounded-xl py-3 px-4 text-sm text-text-secondary font-medium cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-white uppercase tracking-wider mb-1.5">Phone Number</label>
            <input
              type="text"
              defaultValue={phone}
              className="w-full bg-app border border-white/10 rounded-xl py-3 px-4 text-sm text-white font-medium focus:outline-none focus:border-brand-neon transition-colors"
            />
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/10 gap-3">
            <button
              type="submit"
              className="py-3.5 px-6 bg-brand-neon hover:bg-[#00E05A] text-black font-black text-xs uppercase tracking-wide rounded-xl transition-all shadow-brand-neon flex items-center gap-2 pressable"
            >
              {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? "Changes Saved!" : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={signOut}
              className="py-3.5 px-5 bg-[#FF453A]/10 hover:bg-[#FF453A]/20 text-[#FF453A] font-black text-xs uppercase tracking-wide rounded-xl transition-colors flex items-center gap-2 pressable"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
