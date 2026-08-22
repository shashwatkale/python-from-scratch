"use client";

import { useState, useEffect } from "react";
import { search } from "@/lib/search";
import type { SearchResult } from "@/types";
import Link from "next/link";
import { Search as SearchIcon, X } from "lucide-react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    setResults(search(query).slice(0, 8));
  }, [query]);

  const categoryColor: Record<SearchResult["category"], string> = {
    lesson: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    exercise: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    project: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    cheatsheet: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 bg-white dark:bg-zinc-900">
        <SearchIcon size={16} className="text-zinc-400 shrink-0" />
        <input
          type="text"
          placeholder="Search lessons, exercises, projects..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="flex-1 bg-transparent text-sm outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
        />
        {query && (
          <button onClick={() => { setQuery(""); setResults([]); }} aria-label="Clear">
            <X size={14} className="text-zinc-400" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-50 overflow-hidden">
          {results.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              onClick={() => { setOpen(false); setQuery(""); }}
              className="flex items-start gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <span className={`text-xs px-2 py-0.5 rounded font-medium shrink-0 mt-0.5 ${categoryColor[r.category]}`}>
                {r.category}
              </span>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{r.title}</p>
                <p className="text-xs text-zinc-500 line-clamp-1">{r.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
