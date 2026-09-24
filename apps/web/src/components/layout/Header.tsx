import React from "react";
import { Link } from "react-router-dom";
import { Zap, Moon, Sun, User, ShieldCheck } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export const Header: React.FC = () => {
  const { user, profile, balance } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-brand flex items-center justify-center shadow-glow text-brand-fg font-black text-lg transition-transform group-hover:scale-105">
            ⚡
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-text-primary">
            BET<span className="text-brand">CONVERT</span>
          </span>
        </Link>

        {/* Right Action Icons & Wallet */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user && (
            <Link
              to="/wallet"
              className="flex items-center gap-1.5 bg-surface-subtle hover:bg-surface-subtle/80 border border-border-subtle rounded-xl px-2.5 py-1.5 transition-colors"
            >
              <Zap className="w-4 h-4 text-brand fill-brand animate-pulse-subtle" />
              <span className="font-mono font-bold text-xs tabular-nums text-text-primary">
                {balance} <span className="hidden sm:inline font-sans text-text-secondary font-normal">CR</span>
              </span>
            </Link>
          )}

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-subtle transition-all duration-150"
          >
            {isDark ? (
              <Sun className="w-4 h-4 transition-transform hover:rotate-45 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 transition-transform hover:-rotate-12 text-slate-700" />
            )}
          </button>

          {/* Auth/Profile */}
          {user ? (
            <Link
              to="/account"
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-subtle transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-brand/20 border border-brand/30 flex items-center justify-center text-xs font-bold text-brand uppercase">
                {profile?.firstName ? profile.firstName[0] : <User className="w-4 h-4" />}
              </div>
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl bg-brand text-brand-fg hover:bg-brand-hover transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};