import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Activity,
  Search,
  RefreshCw,
  Clock,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";

interface Match {
  id: string;
  league: string;
  leagueFlag: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  homeScore: number | null;
  awayScore: number | null;
  status: "LIVE" | "FT" | "HT" | "NS";
  minute?: string;
  startTime?: string;
  events?: string[];
}

function ScrollMarquee({ children }: { children: React.ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = viewportRef.current;
    if (!el) return;
    isDragging.current = true;
    el.classList.add("is-dragging");
    startX.current = e.clientX;
    scrollLeft.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !viewportRef.current) return;
    const dx = e.clientX - startX.current;
    viewportRef.current.scrollLeft = scrollLeft.current - dx;
  };

  const endDrag = (e: React.PointerEvent) => {
    const el = viewportRef.current;
    if (!el) return;
    isDragging.current = false;
    el.classList.remove("is-dragging");
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      ref={viewportRef}
      className="chip-marquee-viewport no-scrollbar overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing select-none touch-pan-x"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <div className="chip-marquee-track px-1 py-0.5">
        {children}
        {children}
      </div>
    </div>
  );
}

export const Scores: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"ALL" | "LIVE" | "FT" | "NS">("ALL");
  const [selectedLeague, setSelectedLeague] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Just now");

  const loadScores = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    else setLoading(true);

    try {
      const workerUrl =
        (import.meta as any).env?.VITE_WORKER_URL?.replace(/\/$/, "") ||
        "http://localhost:8080";

      const res = await fetch(`${workerUrl}/api/scores`);
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        setMatches(json.data);
      }
    } catch (_err) {
      console.warn("Could not fetch live scores from worker");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }
  };

  useEffect(() => {
    loadScores();
    const interval = setInterval(() => loadScores(true), 30000); // Live poll every 30s
    return () => clearInterval(interval);
  }, []);

  const filteredMatches = matches.filter((m) => {
    const matchesStatus =
      filterStatus === "ALL"
        ? true
        : filterStatus === "LIVE"
        ? m.status === "LIVE" || m.status === "HT"
        : m.status === filterStatus;

    const matchesLeague = selectedLeague === "ALL" || m.league === selectedLeague;

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      m.homeTeam.toLowerCase().includes(q) ||
      m.awayTeam.toLowerCase().includes(q) ||
      m.league.toLowerCase().includes(q);

    return matchesStatus && matchesLeague && matchesSearch;
  });

  const leagues = Array.from(new Set(matches.map((m) => m.league)));
  const liveCount = matches.filter((m) => m.status === "LIVE" || m.status === "HT").length;
  const finishedCount = matches.filter((m) => m.status === "FT").length;
  const scheduledCount = matches.filter((m) => m.status === "NS").length;

  const leagueChips = (
    <>
      <button
        type="button"
        onClick={() => setSelectedLeague("ALL")}
        className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all pressable shrink-0 ${
          selectedLeague === "ALL"
            ? "bg-brand-neon text-black shadow-md shadow-brand-neon/20"
            : "bg-surface text-text-secondary hover:text-white border border-white/10"
        }`}
      >
        🏆 All Competitions
      </button>
      {leagues.map((lg) => {
        const flag = matches.find((m) => m.league === lg)?.leagueFlag || "⚽";
        return (
          <button
            key={lg}
            type="button"
            onClick={() => setSelectedLeague(lg)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all pressable shrink-0 ${
              selectedLeague === lg
                ? "bg-brand-neon text-black shadow-md shadow-brand-neon/20"
                : "bg-surface text-text-secondary hover:text-white border border-white/10"
            }`}
          >
            {flag} {lg}
          </button>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-app pt-24 pb-28 px-4 md:px-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-surface/80 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden animate-fade-up">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-neon/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-xs font-black uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              Live Football Matchday Center
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white">
              Live Scores & <span className="text-brand-neon">Fixtures</span>
            </h1>
            <p className="text-text-secondary text-xs md:text-sm font-medium max-w-xl">
              Real-time match updates across Champions League, Premier League, La Liga & Nigeria NPFL.
              Verify scores before converting booking codes.
            </p>
          </div>
          <button
            onClick={() => loadScores(true)}
            className="self-start py-3 px-4 bg-surface hover:bg-white/10 border border-white/10 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 pressable"
          >
            <RefreshCw className={`w-4 h-4 text-brand-neon ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Updated {lastUpdated}</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4 animate-fade-up-delay-1">
        <div className="bg-surface/60 border border-white/10 p-2 rounded-2xl backdrop-blur-md space-y-3">
          <div className="no-scrollbar overflow-x-auto overflow-y-hidden touch-pan-x">
            <div className="flex items-center gap-1 w-max min-w-full">
              <TabButton active={filterStatus === "ALL"} onClick={() => setFilterStatus("ALL")} label="All Matches" count={matches.length} />
              <TabButton active={filterStatus === "LIVE"} onClick={() => setFilterStatus("LIVE")} label="Live Now" count={liveCount} isLive />
              <TabButton active={filterStatus === "FT"} onClick={() => setFilterStatus("FT")} label="Finished" count={finishedCount} />
              <TabButton active={filterStatus === "NS"} onClick={() => setFilterStatus("NS")} label="Scheduled" count={scheduledCount} />
            </div>
          </div>

          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team or league..."
              className="w-full bg-app/80 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-text-secondary/60 focus:outline-none focus:border-brand-neon transition-colors"
            />
          </div>
        </div>

        {/* Competitions Marquee */}
        {leagues.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-surface/40 p-2">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-text-secondary/70 px-2 mb-2">
              Competitions · swipe or drag
            </p>
            <ScrollMarquee>{leagueChips}</ScrollMarquee>
          </div>
        )}
      </div>

      {/* Match Cards List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-brand-neon animate-spin" />
        </div>
      ) : (
        <div className="space-y-6 animate-fade-up-delay-2">
          {filteredMatches.length === 0 ? (
            <div className="bg-surface/40 border border-white/10 rounded-3xl p-12 text-center space-y-3">
              <Trophy className="w-10 h-10 text-text-secondary/40 mx-auto" />
              <h3 className="text-white font-bold text-base">No matches found</h3>
              <p className="text-text-secondary text-xs max-w-sm mx-auto">
                Try adjusting your search or switching between Live, Finished, and Scheduled filters.
              </p>
            </div>
          ) : (
            leagues.map((lg) => {
              const lgMatches = filteredMatches.filter((m) => m.league === lg);
              if (lgMatches.length === 0) return null;

              return (
                <div key={lg} className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-lg shrink-0">
                        {matches.find((m) => m.league === lg)?.leagueFlag || "⚽"}
                      </span>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider break-words">
                        {lg}
                      </h3>
                    </div>
                    <span className="text-xs text-text-secondary font-bold shrink-0 ml-2">
                      {lgMatches.length} {lgMatches.length === 1 ? "match" : "matches"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {lgMatches.map((m) => (
                      <MatchCard key={m.id} match={m} />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

function TabButton({
  active,
  onClick,
  label,
  count,
  isLive,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  isLive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 pressable whitespace-nowrap shrink-0 ${
        active
          ? "bg-brand-neon text-black shadow-md shadow-brand-neon/20"
          : "text-text-secondary hover:text-white hover:bg-white/5"
      }`}
    >
      {isLive && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
      <span>{label}</span>
      <span
        className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
          active ? "bg-black/20 text-black" : "bg-white/10 text-white"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function MatchCard({ match }: { match: Match }) {
  const isLive = match.status === "LIVE" || match.status === "HT";
  const isUpcoming = match.status === "NS";

  return (
    <div className="bg-surface/70 border border-white/10 hover:border-brand-neon/40 rounded-2xl p-4 backdrop-blur-xl transition-all card-lift flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between gap-2">
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
            isLive
              ? "bg-brand-neon/15 text-brand-neon border border-brand-neon/30"
              : match.status === "FT"
              ? "bg-white/5 text-text-secondary border border-white/10"
              : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
          }`}
        >
          {isLive && <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-ping" />}
          {isLive ? match.minute || "LIVE" : match.status === "FT" ? "Full Time" : match.startTime || "Upcoming"}
        </div>
        {isUpcoming && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-text-secondary">
            <Clock className="w-3 h-3" /> Kick-off
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 py-1">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={match.homeLogo}
            alt={match.homeTeam}
            className="w-9 h-9 object-contain shrink-0 rounded-full bg-app/70 p-1 border border-white/10"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://media.api-sports.io/football/teams/42.png";
            }}
          />
          <span className="flex-1 text-sm font-bold text-white leading-snug break-words">
            {match.homeTeam}
          </span>
          <span
            className={`text-lg font-black tabular-nums shrink-0 w-8 text-right ${
              isUpcoming ? "text-text-secondary/40" : "text-white"
            }`}
          >
            {isUpcoming ? "–" : match.homeScore}
          </span>
        </div>

        <div className="h-px bg-white/5 mx-1" />

        <div className="flex items-center gap-3 min-w-0">
          <img
            src={match.awayLogo}
            alt={match.awayTeam}
            className="w-9 h-9 object-contain shrink-0 rounded-full bg-app/70 p-1 border border-white/10"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://media.api-sports.io/football/teams/50.png";
            }}
          />
          <span className="flex-1 text-sm font-bold text-white leading-snug break-words">
            {match.awayTeam}
          </span>
          <span
            className={`text-lg font-black tabular-nums shrink-0 w-8 text-right ${
              isUpcoming ? "text-text-secondary/40" : "text-white"
            }`}
          >
            {isUpcoming ? "–" : match.awayScore}
          </span>
        </div>
      </div>

      {match.events && match.events.length > 0 && (
        <div className="flex items-start gap-2 text-[11px] text-text-secondary bg-app/50 px-3 py-2 rounded-xl border border-white/5">
          <Sparkles className="w-3.5 h-3.5 text-brand-neon shrink-0 mt-0.5" />
          <p className="leading-relaxed break-words">{match.events.join(" · ")}</p>
        </div>
      )}

      <Link
        to="/convert"
        state={{
          fromMatch: {
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            league: match.league,
            status: match.status,
          },
        }}
        className="mt-auto w-full py-2.5 px-4 bg-brand-neon hover:bg-[#00E05A] text-black rounded-xl text-xs font-black uppercase tracking-wide transition-all flex items-center justify-center gap-2 pressable shadow-brand-neon"
      >
        <span>Get Prediction</span>
        <ArrowRight className="w-3.5 h-3.5 stroke-[3px]" />
      </Link>
    </div>
  );
}
