// src/app/glossary/page.tsx — Python Glossary Home
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  GLOSSARY_TERMS,
  GLOSSARY_CATEGORIES,
  getPopularGlossaryTerms,
} from "@/data/glossary";
import type { TermDifficulty } from "@/types";

const POPULAR_TERMS = getPopularGlossaryTerms();

const DIFF_COLORS: Record<TermDifficulty, string> = {
  beginner: "var(--color-accent-text)",
  intermediate: "#d97706",
  advanced: "#dc2626",
};

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      const matchesSearch =
        !search.trim() ||
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        term.definition.toLowerCase().includes(search.toLowerCase()) ||
        term.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

      const matchesCat =
        selectedCategory === "all" || term.category === selectedCategory;

      const matchesDiff =
        selectedDifficulty === "all" || term.difficulty === selectedDifficulty;

      return matchesSearch && matchesCat && matchesDiff;
    });
  }, [search, selectedCategory, selectedDifficulty]);

  // Group by alphabetical letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, typeof filteredTerms> = {};
    for (const term of filteredTerms) {
      let letter = term.term.charAt(0).toUpperCase();
      if (letter === "_" || letter === "@") {
        letter = "#";
      }
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(term);
    }
    return groups;
  }, [filteredTerms]);

  const availableLetters = useMemo(() => Object.keys(groupedTerms).sort(), [groupedTerms]);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "3rem 1.5rem 6rem",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div
        style={{
          marginBottom: "2.5rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--color-accent-text)",
            marginBottom: "0.4rem",
          }}
        >
          Reference Manual · {GLOSSARY_TERMS.length} Terms
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "var(--color-ink)",
            lineHeight: 1.05,
            marginBottom: "0.75rem",
          }}
        >
          Python Glossary
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.05rem",
            color: "var(--color-ink-2)",
            maxWidth: "640px",
            lineHeight: 1.6,
          }}
        >
          Short, precise, and beginner-friendly definitions of Python terminology
          from fundamental syntax to advanced internals.
        </p>
      </div>

      {/* ── Search & Filters ───────────────────────────────────── */}
      <div style={{ marginBottom: "2rem" }}>
        {/* Search bar */}
        <div
          style={{
            position: "relative",
            marginBottom: "1.25rem",
          }}
        >
          <input
            type="text"
            placeholder="Search terms, concepts, or keywords (e.g. generator, GIL, slice)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.85rem 1.25rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-ink)",
              border: "1px solid var(--color-border-2)",
              outline: "none",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--color-ink-3)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              CLEAR ×
            </button>
          )}
        </div>

        {/* Popular Terms Chips */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-ink-3)",
              marginBottom: "0.5rem",
            }}
          >
            Popular Terms
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {POPULAR_TERMS.map((t) => (
              <Link
                key={t.slug}
                href={`/glossary/${t.slug}/`}
                className="tag hover:border-accent hover:text-accent"
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                {t.term}
              </Link>
            ))}
          </div>
        </div>

        {/* Filter controls row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.25rem",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          {/* Difficulty Toggles */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-ink-3)",
              }}
            >
              Difficulty:
            </span>
            {["all", "beginner", "intermediate", "advanced"].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  padding: "0.25rem 0.6rem",
                  border: "1px solid",
                  borderColor:
                    selectedDifficulty === diff
                      ? "var(--color-accent)"
                      : "var(--color-border)",
                  backgroundColor:
                    selectedDifficulty === diff
                      ? "var(--color-accent-soft)"
                      : "transparent",
                  color:
                    selectedDifficulty === diff
                      ? "var(--color-accent-text)"
                      : "var(--color-ink-2)",
                  cursor: "pointer",
                }}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-ink-3)",
              }}
            >
              Category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                padding: "0.25rem 0.6rem",
                backgroundColor: "var(--color-surface-2)",
                color: "var(--color-ink)",
                border: "1px solid var(--color-border)",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="all">All Categories ({GLOSSARY_TERMS.length})</option>
              {GLOSSARY_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Alphabetical Quick Jump Bar ────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.3rem",
          padding: "0.75rem 1rem",
          backgroundColor: "var(--color-surface-2)",
          border: "1px solid var(--color-border)",
          marginBottom: "2.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-ink-3)",
            display: "flex",
            alignItems: "center",
            marginRight: "0.4rem",
          }}
        >
          Jump:
        </span>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ#"
          .split("")
          .map((letter) => {
            const hasTerms = groupedTerms[letter] && groupedTerms[letter].length > 0;
            return hasTerms ? (
              <a
                key={letter}
                href={`#letter-${letter}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  padding: "0.15rem 0.35rem",
                  color: "var(--color-accent-text)",
                  textDecoration: "none",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                {letter}
              </a>
            ) : (
              <span
                key={letter}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  padding: "0.15rem 0.35rem",
                  color: "var(--color-border-2)",
                  userSelect: "none",
                }}
              >
                {letter}
              </span>
            );
          })}
      </div>

      {/* ── Term Groups ────────────────────────────────────────── */}
      {availableLetters.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {availableLetters.map((letter) => (
            <section key={letter} id={`letter-${letter}`}>
              {/* Section Letter Heading */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.75rem",
                  borderBottom: "2px solid var(--color-ink)",
                  paddingBottom: "0.4rem",
                  marginBottom: "1rem",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "var(--color-ink)",
                    lineHeight: 1,
                  }}
                >
                  {letter}
                </h2>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--color-ink-3)",
                    textTransform: "uppercase",
                  }}
                >
                  {groupedTerms[letter].length} {groupedTerms[letter].length === 1 ? "term" : "terms"}
                </span>
              </div>

              {/* Term Rows Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                {groupedTerms[letter].map((term, i) => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}/`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(140px, 220px) 1fr auto",
                      gap: "1.25rem",
                      alignItems: "start",
                      padding: "1.1rem 1.25rem",
                      borderBottom:
                        i < groupedTerms[letter].length - 1
                          ? "1px solid var(--color-border)"
                          : "none",
                      textDecoration: "none",
                      transition: "background-color 0.12s",
                    }}
                    className="hover:bg-surface-2"
                  >
                    {/* Term title + category */}
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: "var(--color-ink)",
                          textTransform: "uppercase",
                          letterSpacing: "0.02em",
                          marginBottom: "0.3rem",
                        }}
                      >
                        {term.term}
                      </p>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          color: "var(--color-accent-text)",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {term.categoryLabel}
                      </span>
                    </div>

                    {/* Definition */}
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.88rem",
                          color: "var(--color-ink-2)",
                          lineHeight: 1.5,
                          marginBottom: "0.35rem",
                        }}
                      >
                        {term.definition}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.78rem",
                          color: "var(--color-ink-3)",
                          fontStyle: "italic",
                        }}
                      >
                        Why it matters: {term.whyItMatters}
                      </p>
                    </div>

                    {/* Difficulty Badge */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.55rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: DIFF_COLORS[term.difficulty],
                          border: `1px solid ${DIFF_COLORS[term.difficulty]}`,
                          padding: "0.15rem 0.4rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {term.difficulty}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          color: "var(--color-accent-text)",
                        }}
                      >
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: "4rem 2rem",
            textAlign: "center",
            border: "1px dashed var(--color-border-2)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-ink-3)",
              marginBottom: "1rem",
            }}
          >
            No glossary terms found matching &ldquo;{search}&rdquo;
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
              setSelectedDifficulty("all");
            }}
            className="btn-ghost"
            style={{ fontSize: "0.65rem" }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

