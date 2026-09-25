import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Menu, Wallet, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user, balance } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-[72px] bg-app/85 backdrop-blur-xl border-b border-white/10 fixed top-0 left-0 right-0 z-40 px-4 md:px-8 flex items-center justify-between animate-header-in">
      <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-3 group pressable">
        <div className="w-10 h-10 bg-brand-neon rounded-xl flex items-center justify-center shadow-lg shadow-brand-neon/20 group-hover:scale-105 transition-transform duration-200">
          <Zap className="w-6 h-6 text-black fill-black" />
        </div>
        <span className="font-black text-2xl tracking-wider text-white italic">
          BET<span className="text-brand-neon">FORGE</span>
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link hover:text-white">Overview</Link>
            <Link to="/convert" className="nav-link hover:text-white">Converter</Link>
            <Link to="/history" className="nav-link hover:text-white">History</Link>
            <Link to="/scores" className="nav-link hover:text-white">Live Scores</Link>
            <Link to="/news" className="nav-link hover:text-white">News</Link>
          </>
        ) : (
          <>
            <Link to="/scores" className="nav-link hover:text-white">Live Scores</Link>
            <Link to="/news" className="nav-link hover:text-white">Sports News</Link>
            <Link to="/contact" className="nav-link hover:text-white">Contact</Link>
          </>
        )}
      </nav>

      <div className="flex items-center gap-3">
        {user ? (
          <button
            onClick={() => navigate("/wallet")}
            className="flex items-center gap-2 bg-surface hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-brand-neon transition-all pressable"
          >
            <Wallet className="w-4 h-4" />
            <span>{balance} Credits</span>
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-2">
            <Link
              to="/login"
              className="px-4 py-2 text-xs font-semibold text-white bg-surface hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center gap-1.5 pressable"
            >
              <LogIn className="w-3.5 h-3.5 text-text-secondary" />
              Log In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-xs font-bold text-black bg-brand-neon hover:bg-brand-neon-hover rounded-xl shadow-md shadow-brand-neon/20 transition-all flex items-center gap-1.5 pressable animate-neon-pulse"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Get Started
            </Link>
          </div>
        )}

        <button
          onClick={onToggleSidebar}
          className="p-2.5 rounded-xl bg-surface border border-white/10 text-white hover:bg-white/10 transition-colors pressable"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5 text-brand-neon" />
        </button>
      </div>
    </header>
  );
};
