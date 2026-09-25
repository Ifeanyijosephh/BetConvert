export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  publishedAt: string;
  description: string;
  urlToImage: string;
  url: string;
  source?: string;
}

const WORKER_URL =
  (import.meta as any).env?.VITE_WORKER_URL?.replace(/\/$/, "") ||
  "http://localhost:8080";

export async function fetchNewsFeed(options?: {
  category?: string;
  q?: string;
  limit?: number;
}): Promise<NewsArticle[]> {
  const params = new URLSearchParams();
  if (options?.category) params.set("category", options.category);
  if (options?.q) params.set("q", options.q);
  if (options?.limit) params.set("limit", String(options.limit));

  const res = await fetch(`${WORKER_URL}/api/news?${params.toString()}`, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`News feed error ${res.status}`);
  }

  const json = await res.json();
  if (!json?.success || !Array.isArray(json.data)) {
    throw new Error(json?.error || "Invalid news payload");
  }

  return json.data as NewsArticle[];
}
