import React, { useEffect, useState } from "react";
import { Flame, Clock, ArrowRight, Loader2, RefreshCw, ExternalLink } from "lucide-react";
import { fetchNewsFeed, type NewsArticle } from "../lib/newsApi";

export const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("football");

  const load = async (cat = category) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchNewsFeed({ category: cat, limit: 12 });
      setArticles(data);
    } catch (err: any) {
      setError(err?.message || "Could not load sports news");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load("football");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = [
    { id: "football", label: "Football" },
    { id: "betting", label: "Betting" },
    { id: "premier-league", label: "EPL" },
    { id: "champions-league", label: "UCL" },
  ];

  return (
    <div className="min-h-screen bg-app pt-24 pb-28 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
 
          <h1 className="text-3xl font-black text-white">
            Sports & <span className="text-brand-neon">Betting News</span>
          </h1>
          <p className="text-text-secondary text-xs mt-1 font-medium">
            Real-time football and market updates, shaped for BetForge conversion day.
          </p>
        </div>

        <button
          onClick={() => load(category)}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-white/10 text-xs font-bold text-white hover:border-brand-neon/40 pressable"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Feed
        </button>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setCategory(c.id);
              load(c.id);
            }}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide border transition-all pressable ${
              category === c.id
                ? "bg-brand-neon text-black border-brand-neon"
                : "bg-surface text-text-secondary border-white/10 hover:text-white"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 text-brand-neon animate-spin" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <p className="text-red-400 text-sm font-semibold mb-3">{error}</p>
          <button
            onClick={() => load(category)}
            className="px-4 py-2 rounded-xl bg-surface border border-white/10 text-xs font-bold text-white pressable"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface/80 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-neon/40 transition-colors flex flex-col group cursor-pointer card-lift"
            >
              <div className="overflow-hidden h-48 w-full bg-app">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-text-secondary mb-3 font-bold uppercase tracking-wider gap-2">
                    <span className="text-brand-neon truncate">{article.category || "News"}</span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" /> {article.publishedAt}
                    </span>
                  </div>
                  <h3 className="font-black text-white text-lg leading-tight group-hover:text-brand-neon transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-text-secondary text-xs mt-2 line-clamp-3 font-medium">
                    {article.description}
                  </p>
                </div>
                <div className="text-xs font-black text-white uppercase tracking-wide flex items-center justify-between gap-2 pt-2 group-hover:text-brand-neon transition-colors">
                  <span className="inline-flex items-center gap-2">
                    Read Article <ArrowRight className="w-4 h-4 stroke-[3px]" />
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
