import React, { useState } from "react";
import { Save, LogOut, CheckCircle2, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Account: React.FC = () => {
  const { profile, signOut } = useAuth();
  const [saved, setSaved] = useState(false);

  const firstName = profile?.first_name || profile?.firstName || profile?.full_name?.split(" ")[0] || "Adebayo";
  const lastName = profile?.last_name || profile?.lastName || profile?.full_name?.split(" ").slice(1).join(" ") || "Johnson";
  const fullName = profile?.full_name || `${firstName} ${lastName}`.trim();
  const email = profile?.username ? `${profile.username}@gmail.com` : "adebayo.j@gmail.com";
  const phone = profile?.phone || "+234 812 345 6789";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-app pt-24 pb-28 px-4 md:px-8 max-w-4xl mx-auto space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-xs font-bold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" /> Account Center
        </div>
        <h1 className="text-3xl font-extrabold text-white">Account <span className="text-brand-neon">Settings</span></h1>
        <p className="text-text-secondary text-xs mt-1">Manage your profile, security, and betting conversion preferences.</p>
      </div>

      <div className="bg-surface/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-white/10">
          <div className="w-20 h-20 rounded-full bg-surface border-2 border-brand-neon flex items-center justify-center text-brand-neon font-black text-2xl shadow-lg shadow-brand-neon/20 overflow-hidden">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span>{firstName[0]}{lastName[0]}</span>
            )}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-bold text-white">{fullName}</h2>
            <p className="text-xs text-text-secondary">@{profile?.username || "adebayoj"}</p>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-neon bg-brand-neon/10 px-2.5 py-0.5 rounded-md mt-1">
              ⚡ Verified BetForge Bettor
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 bg-app/60 border border-white/5 rounded-2xl text-center">
          <div>
            <span className="text-[10px] text-text-secondary uppercase font-bold block">Conversions</span>
            <span className="font-extrabold text-base text-white">148</span>
          </div>
          <div className="border-x border-white/10">
            <span className="text-[10px] text-text-secondary uppercase font-bold block">Match Rate</span>
            <span className="font-extrabold text-base text-brand-neon">96%</span>
          </div>
          <div>
            <span className="text-[10px] text-text-secondary uppercase font-bold block">Free Today</span>
            <span className="font-extrabold text-base text-brand-neon">{profile?.daily_free_conversions_remaining ?? profile?.freeConversionsToday ?? 3}</span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">First Name</label>
              <input
                type="text"
                defaultValue={firstName}
                className="w-full bg-app/80 border border-white/10 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-brand-neon"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Last Name</label>
              <input
                type="text"
                defaultValue={lastName}
                className="w-full bg-app/80 border border-white/10 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-brand-neon"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Email</label>
            <input
              type="email"
              defaultValue={email}
              disabled
              className="w-full bg-app/40 border border-white/5 rounded-xl py-2.5 px-3.5 text-sm text-text-secondary cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Phone Number</label>
            <input
              type="text"
              defaultValue={phone}
              className="w-full bg-app/80 border border-white/10 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-brand-neon"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-3">
            <button
              type="submit"
              className="py-3 px-6 bg-brand-neon hover:bg-brand-neon-hover text-black font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-neon/20 flex items-center gap-2"
            >
              {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? "Changes Saved!" : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={signOut}
              className="py-3 px-5 bg-[#FF453A]/10 hover:bg-[#FF453A]/20 text-[#FF453A] font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
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
