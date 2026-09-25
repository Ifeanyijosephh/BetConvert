export interface Match {
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

const LEAGUES = [
  { slug: "uefa.champions", name: "UEFA Champions League", flag: "🇪🇺" },
  { slug: "eng.1", name: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { slug: "esp.1", name: "Spanish La Liga", flag: "🇪🇸" },
  { slug: "ita.1", name: "Italian Serie A", flag: "🇮🇹" },
  { slug: "ger.1", name: "German Bundesliga", flag: "🇩🇪" },
  { slug: "fra.1", name: "French Ligue 1", flag: "🇫🇷" },
  { slug: "nga.1", name: "Nigeria NPFL", flag: "🇳🇬" },
];

function mapStateToStatus(state?: string, detail?: string): "LIVE" | "FT" | "HT" | "NS" {
  if (!state) return "NS";
  const s = state.toLowerCase();
  const d = (detail || "").toLowerCase();

  if (d.includes("halftime") || d.includes("ht")) return "HT";
  if (s === "in" || d.includes("'")) return "LIVE";
  if (s === "post" || d.includes("ft") || d.includes("final")) return "FT";
  return "NS";
}

export async function fetchLiveScores(): Promise<Match[]> {
  const allMatches: Match[] = [];

  const requests = LEAGUES.map(async (lg) => {
    try {
      const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/${lg.slug}/scoreboard`;
      const res = await fetch(url, {
        headers: { "User-Agent": "BetForge/1.0" },
        signal: AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined,
      });

      if (!res.ok) return [];

      const data = await res.json();
      const events = data.events || [];

      const mapped: Match[] = [];

      for (const ev of events) {
        const comp = ev.competitions?.[0];
        if (!comp) continue;

        const competitors = comp.competitors || [];
        const homeComp = competitors.find((c: any) => c.homeAway === "home");
        const awayComp = competitors.find((c: any) => c.homeAway === "away");

        if (!homeComp || !awayComp) continue;

        const statusType = ev.status?.type?.state;
        const statusDetail = ev.status?.type?.shortDetail || ev.status?.type?.description || "";
        const status = mapStateToStatus(statusType, statusDetail);

        const displayClock = ev.status?.displayClock || "";
        const minute = status === "HT" ? "HT" : status === "LIVE" ? `${displayClock}'` : undefined;

        // Extract key events (goals)
        const matchEvents: string[] = [];
        if (comp.details) {
          for (const d of comp.details) {
            if (d.type?.text?.toLowerCase().includes("goal")) {
              const clockVal = d.clock?.displayValue ? `${d.clock.displayValue}'` : "";
              const player = d.athletesInvolved?.[0]?.displayName || "";
              if (player) {
                matchEvents.push(`⚽ ${player} ${clockVal}`.trim());
              }
            }
          }
        }

        const dateObj = new Date(ev.date);
        const startTime = !isNaN(dateObj.getTime())
          ? dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : "TBD";

        mapped.push({
          id: String(ev.id),
          league: lg.name,
          leagueFlag: lg.flag,
          homeTeam: homeComp.team?.displayName || homeComp.team?.name || "Home",
          awayTeam: awayComp.team?.displayName || awayComp.team?.name || "Away",
          homeLogo: homeComp.team?.logo || `https://media.api-sports.io/football/teams/42.png`,
          awayLogo: awayComp.team?.logo || `https://media.api-sports.io/football/teams/50.png`,
          homeScore: status !== "NS" ? parseInt(homeComp.score || "0", 10) : null,
          awayScore: status !== "NS" ? parseInt(awayComp.score || "0", 10) : null,
          status,
          minute,
          startTime,
          events: matchEvents.length > 0 ? matchEvents.slice(0, 3) : undefined,
        });
      }

      return mapped;
    } catch (_err) {
      return [];
    }
  });

  const results = await Promise.allSettled(requests);
  for (const r of results) {
    if (r.status === "fulfilled" && Array.isArray(r.value)) {
      allMatches.push(...r.value);
    }
  }

  return allMatches;
}
