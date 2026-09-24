import React, { useState } from "react";
import { Trophy } from "lucide-react";
import { Card } from "../components/ui/Card";

export const LiveScores: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 md:py-6 flex flex-col gap-4 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl uppercase tracking-tight text-text-primary flex items-center gap-2">
            Matchday <span className="text-brand">Scores</span>
          </h1>
          <p className="text-xs text-text-secondary">Real-time match updates & video highlights</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-danger/10 border border-status-danger/20 text-status-danger text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-status-danger animate-pulse-subtle" />
          Live
        </div>
      </div>

      <Card className="p-0 overflow-hidden min-h-[500px] relative border-border-subtle">
        {isLoading && (
          <div className="absolute inset-0 bg-surface flex flex-col items-center justify-center gap-2 z-10">
            <Trophy className="w-8 h-8 text-brand animate-pulse-subtle" />
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Loading Match Center...
            </span>
          </div>
        )}
        <iframe
          src="https://www.scorebat.com/embed/livescore/"
          frameBorder="0"
          width="100%"
          height="650"
          onLoad={() => setIsLoading(false)}
          className="w-full bg-surface"
          title="Scorebat Live Scores Widget"
          allow="autoplay; fullscreen"
        />
      </Card>

      <p className="text-center text-[11px] text-text-muted">
        Scores provided via Scorebat live data feed.
      </p>
    </div>
  );
};
