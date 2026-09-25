import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  X,
  Zap,
  LayoutDashboard,
  ArrowLeftRight,
  History,
  Wallet,
  Trophy,
  Newspaper,
  User,
  Mail,
  ShieldCheck,
  FileText,
  LogOut,
  LogIn,
  UserPlus
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ isOpen, onClose }) => {
  const { user, profile, balance, signOut } = useAuth();
  const navigate = useNavigate();

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogout = async () => {
    await signOut();
    onClose();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-drawer-backdrop"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm bg-[#111113] border-l border-white/10 h-full p-6 flex flex-col overflow-y-auto z-10 animate-drawer-in shadow-2xl">
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-neon rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-black fill-black" />
            </div>
            <span className="font-black text-xl italic text-white">
              BET<span className="text-brand-neon">FORGE</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-white rounded-lg hover:bg-white/5 pressable"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {user ? (
          <div className="my-6 p-4 rounded-2xl bg-surface border border-white/10 flex items-center gap-3 animate-fade-up">
            <div className="w-12 h-12 rounded-full bg-brand-neon/10 border border-brand-neon flex items-center justify-center text-brand-neon font-bold text-lg">
              {profile?.full_name?.charAt(0) || profile?.first_name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold text-sm truncate">
                {profile?.full_name || "BetForge User"}
              </h4>
              <p className="text-text-secondary text-xs truncate">@{profile?.username || "user"}</p>
              <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-brand-neon bg-brand-neon/10 px-2 py-0.5 rounded-md">
                ⚡ {balance} Credits
              </div>
            </div>
          </div>
        ) : (
          <div className="my-6 p-4 rounded-2xl bg-surface border border-white/10 text-center animate-fade-up">
            <p className="text-sm text-text-secondary mb-3">
              Sign in to convert bet codes instantly across West Africa.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={onClose}
                className="py-2.5 px-3 bg-surface hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 pressable"
              >
                <LogIn className="w-3.5 h-3.5" />
                Log In
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="py-2.5 px-3 bg-brand-neon hover:bg-brand-neon-hover text-black rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 pressable"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Sign Up
              </Link>
            </div>
          </div>
        )}

        <div className="flex-1 space-y-1">
          <p className="text-[10px] font-bold tracking-widest text-text-secondary uppercase px-3 mb-2">
            Navigation Menu
          </p>

          {user ? (
            <>
              <SidebarLink to="/dashboard" icon={<LayoutDashboard className="w-4 h-4" />} label="Overview & Dashboard" onClick={onClose} />
              <SidebarLink to="/convert" icon={<ArrowLeftRight className="w-4 h-4" />} label="Code Converter" onClick={onClose} />
              <SidebarLink to="/wallet" icon={<Wallet className="w-4 h-4" />} label="Wallet & Top-up" onClick={onClose} />
              <SidebarLink to="/history" icon={<History className="w-4 h-4" />} label="Conversion Orders" onClick={onClose} />
              <SidebarLink to="/scores" icon={<Trophy className="w-4 h-4" />} label="Live Score Center" onClick={onClose} />
              <SidebarLink to="/news" icon={<Newspaper className="w-4 h-4" />} label="Sports News" onClick={onClose} />
              <SidebarLink to="/account" icon={<User className="w-4 h-4" />} label="Account Settings" onClick={onClose} />
            </>
          ) : (
            <>
              <SidebarLink to="/" icon={<Zap className="w-4 h-4" />} label="Home Overview" onClick={onClose} />
              <SidebarLink to="/login" icon={<LogIn className="w-4 h-4" />} label="Log In" onClick={onClose} />
              <SidebarLink to="/register" icon={<UserPlus className="w-4 h-4" />} label="Create Account" onClick={onClose} />
              <SidebarLink to="/scores" icon={<Trophy className="w-4 h-4" />} label="Live Scores" onClick={onClose} />
              <SidebarLink to="/news" icon={<Newspaper className="w-4 h-4" />} label="Sports Betting News" onClick={onClose} />
            </>
          )}

          <div className="pt-4 mt-4 border-t border-white/10">
            <p className="text-[10px] font-bold tracking-widest text-text-secondary uppercase px-3 mb-2">
              Support & Legal
            </p>
            <SidebarLink to="/contact" icon={<Mail className="w-4 h-4" />} label="Contact Support" onClick={onClose} />
            <SidebarLink to="/privacy" icon={<ShieldCheck className="w-4 h-4" />} label="Privacy & 18+ Gaming" onClick={onClose} />
            <SidebarLink to="/terms" icon={<FileText className="w-4 h-4" />} label="Terms of Service" onClick={onClose} />
          </div>
        </div>

        {user && (
          <div className="pt-4 border-t border-white/10 mt-auto">
            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 rounded-xl bg-[#FF453A]/10 text-[#FF453A] hover:bg-[#FF453A]/20 transition-colors flex items-center justify-center gap-2 font-semibold text-sm pressable"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-[10px] text-text-secondary flex items-center justify-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">18+</span>
          <span>West Africa Betting Engine. Play Responsibly.</span>
        </div>
      </div>
    </div>
  );
};

function SidebarLink({
  to,
  icon,
  label,
  onClick,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-200 pressable"
    >
      <span className="text-brand-neon">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
