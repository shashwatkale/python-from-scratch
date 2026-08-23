"use client";

import { useState, useEffect, useRef } from "react";
import { search } from "@/lib/search";
import type { SearchResult } from "@/types";
import Link from "next/link";

interface Props {
  onClose: () => void;
}

const CAT_LABEL: Record<SearchResult["category"], string> = {
  lesson: "LESSON",
  exercise: "EXERCISE",
  project: "PROJECT",
  cheatsheet: "SHEET",
  glossary: "GLOSSARY",
  certification: "CERT",
};

export function SearchModal({ onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    setResults(search(query).slice(0, 10));
  }, [query]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border-2)",
          width: "100%",
          maxWidth: "560px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        {/* Input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.875rem 1.25rem",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-3)" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search lessons, exercises, projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--color-ink)",
            }}
          />
          <button
            onClick={onClose}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--color-ink-3)",
              padding: "0.2rem 0.4rem",
              border: "1px solid var(--color-border)",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            ESC
          </button>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {results.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.75rem 1.25rem",
                  borderBottom: "1px solid var(--color-border)",
                  textDecoration: "none",
                  transition: "background-color 0.1s",
                }}
                className="hover:bg-surface-2"
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--color-accent-text)",
                    border: "1px solid var(--color-accent)",
                    padding: "0.1rem 0.4rem",
                    flexShrink: 0,
                    marginTop: "0.15rem",
                  }}
                >
                  {CAT_LABEL[r.category]}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--color-ink)",
                      marginBottom: "0.15rem",
                    }}
                  >
                    {r.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      color: "var(--color-ink-3)",
                    }}
                  >
                    {r.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : query.length >= 2 ? (
          <div
            style={{
              padding: "2rem 1.25rem",
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--color-ink-3)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            No results for &ldquo;{query}&rdquo;
          </div>
        ) : (
          <div
            style={{
              padding: "1.5rem 1.25rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--color-ink-3)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Type to search lessons, exercises, and projects
          </div>
        )}
      </div>
    </div>
  );
}
