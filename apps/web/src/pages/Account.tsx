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
    <div className="w-full max-w-xl mx-auto px-4 py-4 md:py-6 flex flex-col gap-4 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl uppercase tracking-tight text-text-primary">
            My <span className="text-brand">Profile</span>
          </h1>
          <p className="text-xs text-text-secondary">Account settings & information</p>
        </div>
      </div>

      <Card className="flex flex-col gap-4">
        <div className="flex items-center gap-3 pb-3 border-b border-border-subtle">
          <div className="w-12 h-12 rounded-2xl bg-brand/20 border border-brand/30 flex items-center justify-center text-lg font-black text-brand uppercase">
            {profile?.firstName ? profile.firstName[0] : <UserIcon className="w-6 h-6" />}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-text-primary">
              {profile?.firstName} {profile?.lastName}
            </span>
            <span className="text-xs text-text-secondary">@{profile?.username}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xs">
          <div className="flex justify-between py-1 border-b border-border-subtle">
            <span className="text-text-muted">Email</span>
            <span className="font-medium text-text-primary">{user?.email}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border-subtle">
            <span className="text-text-muted">Phone</span>
            <span className="font-medium text-text-primary">{profile?.phone || "Not set"}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border-subtle">
            <span className="text-text-muted">Daily Free Quota</span>
            <span className="font-bold text-brand">{profile?.freeConversionsToday || 0} / 3 Used</span>
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

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-text-muted text-center pt-2">
        <ShieldCheck className="w-3.5 h-3.5 text-brand" />
        <span>BetConvert v1.0 • Independent Sports Utility</span>
      </div>
    </div>
  );
};
