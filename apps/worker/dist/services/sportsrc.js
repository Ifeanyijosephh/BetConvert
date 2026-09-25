"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSportsrcNews = fetchSportsrcNews;
const SPORTSRC_BASE = process.env.SPORTSRC_BASE_URL?.replace(/\/$/, "") || "https://sportsrc.org";
const RSS_FEEDS = [
    `${SPORTSRC_BASE}/feed/`,
    `${SPORTSRC_BASE}/rss`,
    "https://feeds.bbci.co.uk/sport/football/rss.xml",
    "https://www.skysports.com/rss/12040",
];
function formatRelativeTime(dateStr) {
    if (!dateStr)
        return "Just now";
    const ts = new Date(dateStr).getTime();
    if (Number.isNaN(ts))
        return "Recently";
    const diffMs = Date.now() - ts;
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1)
        return "Just now";
    if (mins < 60)
        return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24)
        return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7)
        return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
    });
}
function parseRssXml(xmlText, sourceName = "sportsrc") {
    const articles = [];
    const itemMatches = xmlText.match(/<item[\s\S]*?<\/item>/gi) || [];
    let idx = 0;
    for (const itemXml of itemMatches) {
        if (idx >= 12)
            break;
        const titleMatch = itemXml.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
        const linkMatch = itemXml.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
        const descMatch = itemXml.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
        const pubDateMatch = itemXml.match(/<pubDate>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/pubDate>/i);
        const mediaMatch = itemXml.match(/url=["'](https?:\/\/[^"']+\.(?:jpg|jpeg|png|webp|gif))["']/i) ||
            itemXml.match(/<enclosure[^>]+url=["']([^"']+)["']/i) ||
            (descMatch ? descMatch[1].match(/src=["']([^"']+)["']/i) : null);
        const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").trim() : "";
        const url = linkMatch ? linkMatch[1].trim() : "https://sportsrc.org";
        const rawDesc = descMatch ? descMatch[1].replace(/<[^>]+>/g, "").trim() : "";
        const description = rawDesc.slice(0, 200) + (rawDesc.length > 200 ? "..." : "");
        const publishedAt = formatRelativeTime(pubDateMatch ? pubDateMatch[1] : undefined);
        const urlToImage = mediaMatch
            ? mediaMatch[1]
            : "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80";
        if (title) {
            articles.push({
                id: `rss-${idx}-${Date.now()}`,
                title,
                category: "Football News",
                publishedAt,
                description: description || "Read the full story on sportsrc.",
                urlToImage,
                url,
                source: sourceName,
            });
            idx++;
        }
    }
    return articles;
}
async function fetchSportsrcNews(options) {
    const limit = options?.limit ?? 12;
    for (const feedUrl of RSS_FEEDS) {
        try {
            const res = await fetch(feedUrl, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) BetForge/1.0",
                    Accept: "application/rss+xml, application/xml, text/xml, */*",
                },
                signal: AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined,
            });
            if (!res.ok)
                continue;
            const xmlText = await res.text();
            if (xmlText.includes("<item")) {
                const sourceName = feedUrl.includes("bbci")
                    ? "BBC Sport"
                    : feedUrl.includes("skysports")
                        ? "Sky Sports"
                        : "sportsrc.org";
                const parsed = parseRssXml(xmlText, sourceName);
                if (parsed.length > 0) {
                    console.log(`[news] Successfully fetched ${parsed.length} live articles from ${sourceName}`);
                    return parsed.slice(0, limit);
                }
            }
        }
        catch (_err) {
            // Continue to next feed
        }
    }
    console.warn("[news] Falling back to structured demo feed.");
    return getDemoNews();
}
function getDemoNews() {
    return [
        {
            id: "demo-1",
            title: "Champions League: Odds gaps open between SportyBet and 1xBet",
            category: "Betting Insights",
            publishedAt: "2h ago",
            description: "Knockout fixtures are creating conversion opportunities across West African bookies as line movement accelerates.",
            urlToImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
            url: "https://sportsrc.org",
            source: "BetForge Desk",
        },
        {
            id: "demo-2",
            title: "EPL weekend: fixture aliases refreshed for SportyBet codes",
            category: "Platform Update",
            publishedAt: "5h ago",
            description: "BetForge matcher cache updated for UK league sides to keep booking-code conversion accuracy high.",
            urlToImage: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
            url: "https://sportsrc.org",
            source: "BetForge Desk",
        },
        {
            id: "demo-3",
            title: "AFCON accumulators: five multi-bet structures that travel well",
            category: "Tips & Strategies",
            publishedAt: "1d ago",
            description: "How bettors in Nigeria and Ghana structure tickets before converting codes onto alternate books.",
            urlToImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
            url: "https://sportsrc.org",
            source: "BetForge Desk",
        },
    ];
}
