import React from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { LogOut, User as UserIcon, ShieldCheck } from "lucide-react";

export const Account: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 flex flex-col gap-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl uppercase tracking-tight text-text-primary">
            My <span className="gradient-text">Profile</span>
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">Account settings & member details</p>
        </div>
      </div>

      <Card variant="glass" className="flex flex-col gap-5">
        <div className="flex items-center gap-4 pb-4 border-b border-border-glass">
          <div className="w-14 h-14 rounded-2xl bg-accent-gradient flex items-center justify-center text-xl font-black text-white shadow-glow-sm">
            {profile?.firstName ? profile.firstName[0] : <UserIcon className="w-7 h-7" />}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base text-text-primary">
              {profile?.firstName} {profile?.lastName}
            </span>
            <span className="text-xs text-text-secondary">@{profile?.username}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <div className="flex justify-between py-2 border-b border-border-subtle">
            <span className="text-text-muted">Email Address</span>
            <span className="font-medium text-text-primary">{user?.email}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border-subtle">
            <span className="text-text-muted">Phone Number</span>
            <span className="font-medium text-text-primary">{profile?.phone || "Not provided"}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border-subtle">
            <span className="text-text-muted">Daily Free Quota</span>
            <span className="font-bold text-status-success">{profile?.freeConversionsToday || 0} / 3 Used</span>
          </div>
        </div>

        <Button
          variant="danger"
          size="md"
          onClick={handleLogout}
          leftIcon={<LogOut className="w-4 h-4" />}
          className="w-full mt-2"
        >
          Sign Out
        </Button>
      </Card>

      <div className="flex items-center justify-center gap-2 text-[11px] text-text-muted text-center pt-2">
        <ShieldCheck className="w-4 h-4 text-status-success shrink-0" />
        <span>BET FORGE v1.0 • Independent Sports Conversion Utility</span>
      </div>
    </div>
  );
};
