const SPORTSRC_BASE = process.env.SPORTSRC_BASE_URL?.replace(/\/$/, "") || "https://sportsrc.org";
function formatRelativeTime(iso) {
    if (!iso)
        return "Just now";
    const ts = new Date(iso).getTime();
    if (Number.isNaN(ts))
        return "Recently";
    const diffMs = Date.now() - ts;
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1)
        return "Just now";
    if (mins < 60)
        return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24)
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7)
        return `${days} day${days === 1 ? "" : "s"} ago`;
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}
function pickImage(a) {
    return (a.urlToImage ||
        a.imageUrl ||
        a.image ||
        a.thumbnail ||
        a.cover ||
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80");
}
function pickTitle(a) {
    return (a.title || a.headline || a.name || "Untitled story").trim();
}
function pickDescription(a) {
    const raw = a.description || a.summary || a.excerpt || a.content || "No summary available.";
    return String(raw).replace(/<[^>]+>/g, "").trim().slice(0, 220);
}
function pickCategory(a) {
    if (a.category)
        return String(a.category);
    if (a.tag)
        return String(a.tag);
    if (Array.isArray(a.tags) && a.tags[0])
        return String(a.tags[0]);
    return "Football News";
}
function pickUrl(a) {
    return a.url || a.link || a.sourceUrl || "https://sportsrc.org";
}
function pickSource(a) {
    if (typeof a.source === "string")
        return a.source;
    if (a.source && typeof a.source === "object" && a.source.name)
        return a.source.name;
    return "sportsrc";
}
function pickPublished(a) {
    return (a.publishedAt ||
        a.published_at ||
        a.date ||
        a.createdAt ||
        a.created_at ||
        new Date().toISOString());
}
export function mapSportsrcArticle(raw, index = 0) {
    const published = pickPublished(raw);
    return {
        id: String(raw.id ?? raw._id ?? `sportsrc-${index}-${Date.now()}`),
        title: pickTitle(raw),
        category: pickCategory(raw),
        publishedAt: formatRelativeTime(published),
        description: pickDescription(raw),
        urlToImage: pickImage(raw),
        url: pickUrl(raw),
        source: pickSource(raw),
    };
}
function extractArray(payload) {
    if (!payload)
        return [];
    if (Array.isArray(payload))
        return payload;
    const obj = payload;
    const candidates = [
        obj.data,
        obj.articles,
        obj.news,
        obj.items,
        obj.results,
        obj.posts,
        obj.data?.articles,
        obj.data?.news,
    ];
    for (const c of candidates) {
        if (Array.isArray(c))
            return c;
    }
    return [];
}
export async function fetchSportsrcNews(options) {
    const limit = options?.limit ?? 12;
    const params = new URLSearchParams();
    if (options?.category)
        params.set("category", options.category);
    if (options?.q)
        params.set("q", options.q);
    params.set("limit", String(limit));
    const paths = [
        `/api/news?${params.toString()}`,
        `/api/v1/news?${params.toString()}`,
        `/news?${params.toString()}`,
        `/api/articles?${params.toString()}`,
    ];
    let lastError = null;
    for (const path of paths) {
        const url = `${SPORTSRC_BASE}${path}`;
        try {
            const res = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "User-Agent": "BetForge/1.0 (+https://betforge.app)",
                },
                signal: AbortSignal.timeout ? AbortSignal.timeout(12000) : undefined,
            });
            if (!res.ok) {
                lastError = new Error(`sportsrc ${res.status} on ${path}`);
                continue;
            }
            const contentType = res.headers.get("content-type") || "";
            if (!contentType.includes("application/json")) {
                lastError = new Error(`Non-JSON response from ${path}`);
                continue;
            }
            const json = await res.json();
            const rawList = extractArray(json);
            if (rawList.length === 0) {
                lastError = new Error(`Empty payload from ${path}`);
                continue;
            }
            return rawList.slice(0, limit).map(mapSportsrcArticle);
        }
        catch (err) {
            lastError = err instanceof Error ? err : new Error(String(err));
        }
    }
    console.warn("[sportsrc] falling back to demo feed:", lastError?.message);
    return getDemoNews();
}
function getDemoNews() {
    return [
        {
            id: "demo-1",
            title: "Champions League: Odds gaps open between SportyBet and 1xBet",
            category: "Betting Insights",
            publishedAt: "2 hours ago",
            description: "Knockout fixtures are creating conversion opportunities across West African bookies as line movement accelerates.",
            urlToImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
            url: "https://sportsrc.org",
            source: "BetForge Desk",
        },
        {
            id: "demo-2",
            title: "EPL weekend: fixture aliases refreshed for SportyBet codes",
            category: "Platform Update",
            publishedAt: "5 hours ago",
            description: "BetForge matcher cache updated for UK league sides to keep booking-code conversion accuracy high.",
            urlToImage: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
            url: "https://sportsrc.org",
            source: "BetForge Desk",
        },
        {
            id: "demo-3",
            title: "AFCON accumulators: five multi-bet structures that travel well",
            category: "Tips & Strategies",
            publishedAt: "1 day ago",
            description: "How bettors in Nigeria and Ghana structure tickets before converting codes onto alternate books.",
            urlToImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
            url: "https://sportsrc.org",
            source: "BetForge Desk",
        },
    ];
}
