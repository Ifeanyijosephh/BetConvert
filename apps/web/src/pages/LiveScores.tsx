import React, { useState } from "react";
import { Trophy } from "lucide-react";
import { Card } from "../components/ui/Card";

export const LiveScores: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 flex flex-col gap-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl uppercase tracking-tight text-text-primary">
            Matchday <span className="gradient-text">Scores</span>
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">Real-time score updates & match highlights</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-status-danger/10 border border-status-danger/20 text-status-danger text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-status-danger animate-pulse-subtle" />
          Live Center
        </div>
      </div>

      <Card variant="glass" className="p-0 overflow-hidden min-h-[500px] relative border-border-glass">
        {isLoading && (
          <div className="absolute inset-0 bg-surface/90 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-10">
            <Trophy className="w-8 h-8 text-accent-1 animate-pulse-subtle" />
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
