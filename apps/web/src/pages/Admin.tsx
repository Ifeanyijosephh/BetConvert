import React from "react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { ShieldAlert } from "lucide-react";

export const Admin: React.FC = () => {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 flex flex-col gap-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl uppercase tracking-tight text-text-primary">
            Admin <span className="gradient-text">Panel</span>
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">System health & bookmaker registry controls</p>
        </div>
        <Badge variant="neutral">Admin Only</Badge>
      </div>

      <Card variant="glass" className="flex flex-col gap-4 text-center py-10">
        <ShieldAlert className="w-10 h-10 text-accent-1 mx-auto" />
        <h2 className="font-display font-bold text-base uppercase text-text-primary">Admin System Active</h2>
        <p className="text-xs text-text-secondary max-w-xs mx-auto leading-relaxed">
          Bookmaker status toggles, user credit adjustments, and audit logs are enforced via Supabase service-role policies.
        </p>
      </Card>
    </div>
  );
};
