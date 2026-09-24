import React from "react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { ShieldAlert } from "lucide-react";

export const Admin: React.FC = () => {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 md:py-6 flex flex-col gap-4 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl uppercase tracking-tight text-text-primary">
            Admin <span className="text-brand">Panel</span>
          </h1>
          <p className="text-xs text-text-secondary">System monitoring and bookmaker management</p>
        </div>
        <Badge variant="brand">Admin Only</Badge>
      </div>

      <Card className="flex flex-col gap-3 text-center py-8">
        <ShieldAlert className="w-10 h-10 text-brand mx-auto" />
        <h2 className="font-display font-bold text-sm uppercase text-text-primary">Admin Controls Active</h2>
        <p className="text-xs text-text-secondary max-w-xs mx-auto">
          Bookmaker status toggles and audit trails are managed via Supabase service-role policies.
        </p>
      </Card>
    </div>
  );
};
