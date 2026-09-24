import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Zap } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export const Header: React.FC = () => {
  const { user, balance } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const loc = useLocation();

  // Landing page has its own hero header
  if (loc.pathname === "/") return null;

  const titles: Record<string, string> = {
    "/converter": "CONVERTER",
    "/history": "HISTORY",
    "/scores": "LIVE SCORES",
    "/wallet": "WALLET",
    "/account": "ACCOUNT",
    "/admin": "ADMIN CONTROL",
    "/login": "",
    "/register": "",
    "/forgot-password": "ACCOUNT RECOVERY",
  };
  const title = titles[loc.pathname] ?? "";
  const isAuth = ["/login","/register","/forgot-password"].includes(loc.pathname);

  return (
    <header className="sticky top-0 z-40 bg-app/95 backdrop-blur-md border-b border-border">
      <div className="max-w-lg mx-auto px-4 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-green flex items-center justify-center">
              <span className="text-[10px] font-black text-green-fg">BF</span>
            </div>
            {!isAuth && title && (
              <span className="text-[11px] font-bold uppercase tracking-widest text-t-muted">{title}</span>
            )}
            {isAuth && (
              <span className="font-bold text-sm tracking-tight text-t-primary">
                BET<span className="text-green">FORGE</span>
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {user && !isAuth && (
            <Link to="/wallet" className="flex items-center gap-1 px-2 py-1 rounded-lg bg-surface border border-border">
              <Zap className="w-3 h-3 text-green" />
              <span className="font-mono text-[11px] font-bold text-t-primary tabular-nums">{balance}</span>
            </Link>
          )}
          <button onClick={toggleTheme} className="p-2 rounded-lg text-t-muted hover:text-t-primary transition-colors" aria-label="Toggle theme">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
