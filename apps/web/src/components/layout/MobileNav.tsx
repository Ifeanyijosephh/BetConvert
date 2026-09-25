import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, History, Wallet, User, Trophy } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const MobileNav: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0B]/92 backdrop-blur-[40px] border-t border-white/10 px-2 py-2.5 flex justify-around items-center shadow-[0_-12px_40px_rgba(0,0,0,0.65)] animate-dock-in safe-bottom">
      {user ? (
        <>
          <NavItem to="/dashboard" active={isActive("/dashboard")} icon={<LayoutDashboard className="w-6 h-6" strokeWidth={2.25} />} label="Overview" />
          <NavItem to="/convert" active={isActive("/convert")} icon={<ArrowLeftRight className="w-6 h-6" strokeWidth={2.25} />} label="Convert" />
          <NavItem to="/history" active={isActive("/history")} icon={<History className="w-6 h-6" strokeWidth={2.25} />} label="History" />
          <NavItem to="/wallet" active={isActive("/wallet")} icon={<Wallet className="w-6 h-6" strokeWidth={2.25} />} label="Wallet" />
          <NavItem to="/account" active={isActive("/account")} icon={<User className="w-6 h-6" strokeWidth={2.25} />} label="Account" />
        </>
      ) : (
        <>
          <NavItem to="/" active={isActive("/")} icon={<LayoutDashboard className="w-6 h-6" strokeWidth={2.25} />} label="Home" />
          <NavItem to="/scores" active={isActive("/scores")} icon={<Trophy className="w-6 h-6" strokeWidth={2.25} />} label="Scores" />
          <NavItem to="/login" active={isActive("/login")} icon={<User className="w-6 h-6" strokeWidth={2.25} />} label="Sign In" />
        </>
      )}
    </div>
  );
};

function NavItem({
  to,
  active,
  icon,
  label,
}: {
  to: string;
  active: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 pressable ${
        active
          ? "text-brand-neon font-black scale-110 drop-shadow-[0_0_10px_rgba(0,255,102,0.85)]"
          : "text-white font-semibold hover:text-brand-neon"
      }`}
    >
      {icon}
      <span className="text-[10px] tracking-wide">{label}</span>
    </Link>
  );
}
