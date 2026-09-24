import React from "react";
import { NavLink } from "react-router-dom";
import { Zap, History, BarChart3, Wallet, User } from "lucide-react";

const items = [
  { to: "/converter", label: "Convert", icon: Zap },
  { to: "/history", label: "History", icon: History },
  { to: "/scores", label: "Scores", icon: BarChart3 },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/account", label: "Account", icon: User },
];

export const MobileNav: React.FC = () => (
  <nav className="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border pb-[env(safe-area-inset-bottom,0px)]">
    <div className="max-w-lg mx-auto grid grid-cols-5 h-14">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold tracking-wide transition-colors ${
              isActive ? "text-green" : "text-t-muted hover:text-t-secondary"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2.5 : 1.75} />
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  </nav>
);
