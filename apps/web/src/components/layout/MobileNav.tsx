import React from "react";
import { NavLink } from "react-router-dom";
import { Zap, History, Trophy, Wallet, User } from "lucide-react";

export const MobileNav: React.FC = () => {
  const navItems = [
    { to: "/converter", label: "Convert", icon: Zap },
    { to: "/scores", label: "Scores", icon: Trophy },
    { to: "/history", label: "History", icon: History },
    { to: "/wallet", label: "Wallet", icon: Wallet },
    { to: "/account", label: "Account", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-lg border-t border-border-subtle pb-[env(safe-area-inset-bottom,8px)]">
      <div className="max-w-md mx-auto grid grid-cols-5 h-14">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-150 select-none ${
                  isActive
                    ? "text-brand scale-105"
                    : "text-text-muted hover:text-text-primary"
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};