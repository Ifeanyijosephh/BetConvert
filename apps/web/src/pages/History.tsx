import React, { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Copy, Check, History as HistoryIcon } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";

interface ConversionHistoryItem {
  id: string;
  source_bookmaker: string;
  source_code: string;
  dest_bookmaker: string;
  dest_code: string | null;
  status: "success" | "partial" | "failed";
  selections_matched: number;
  selections_total: number;
  created_at: string;
}

export const History: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("conversions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }: { data: any }) => {
        if (data) setHistory(data as ConversionHistoryItem[]);
      });
  }, [user]);

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 flex flex-col gap-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl uppercase tracking-tight text-text-primary">
            Conversion <span className="gradient-text">History</span>
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">Your past converted slips and booking codes</p>
        </div>
      </div>

      {history.length === 0 ? (
        <Card variant="glass" className="flex flex-col items-center justify-center py-16 text-center gap-3">
          <HistoryIcon className="w-10 h-10 text-text-muted" />
          <h2 className="font-display font-bold text-sm uppercase text-text-primary">No Conversions Yet</h2>
          <p className="text-xs text-text-secondary max-w-xs">
            Any booking code you convert will be saved here for instant re-copying.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {history.map((item) => (
            <Card key={item.id} variant="glass" className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-text-primary uppercase">
                  {item.source_bookmaker} ➔ {item.dest_bookmaker}
                </span>
                <Badge variant={item.status === "success" ? "success" : item.status === "partial" ? "warning" : "danger"}>
                  {item.status} ({item.selections_matched}/{item.selections_total})
                </Badge>
              </div>

              {item.dest_code && (
                <div className="flex items-center justify-between bg-surface-subtle/60 p-3 rounded-2xl border border-border-subtle mt-1">
                  <span className="font-mono text-sm font-bold tracking-widest text-accent-1">
                    {item.dest_code}
                  </span>
                  <Button
                    size="sm"
                    variant={copiedId === item.id ? "primary" : "secondary"}
                    onClick={() => handleCopy(item.id, item.dest_code!)}
                    leftIcon={copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  >
                    {copiedId === item.id ? "Copied" : "Copy"}
                  </Button>
                </div>
              )}
              <span className="text-[10px] text-text-muted">
                {new Date(item.created_at).toLocaleString()}
              </span>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
