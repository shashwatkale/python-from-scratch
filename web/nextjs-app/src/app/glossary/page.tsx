// src/app/glossary/page.tsx — Python & AI Engineering Reference Ledger
"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  GLOSSARY_TERMS,
  GLOSSARY_LEARNING_AREAS,
} from "@/data/glossary";
import type { GlossaryTerm } from "@/types/glossary";

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      const matchesSearch =
        !search.trim() ||
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        term.definition.toLowerCase().includes(search.toLowerCase()) ||
        term.whyItMatters.toLowerCase().includes(search.toLowerCase()) ||
        term.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

      const matchesArea =
        selectedArea === "all" || term.category === selectedArea;

      return matchesSearch && matchesArea;
    });
  }, [search, selectedArea]);

  // Group filtered terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    for (const term of filteredTerms) {
      let letter = term.term.charAt(0).toUpperCase();
      if (!/[A-Z]/.test(letter)) {
        letter = "#";
      }
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(term);
    }

    // Sort terms within each letter
    for (const letter in groups) {
      groups[letter].sort((a, b) => a.term.localeCompare(b.term));
    }

    return groups;
  }, [filteredTerms]);

  const availableLetters = useMemo(
    () => Object.keys(groupedTerms).sort(),
    [groupedTerms]
  );

  const handleCopyLink = useCallback((slug: string) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/glossary/${slug}/`;
      navigator.clipboard.writeText(url);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  }, []);

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      {/* ── 1. Reference Ledger Hero ──────────────────────────── */}
      <section
        className="dot-grid-bg"
        style={{
          borderBottom: "1px solid var(--color-border)",
          padding: "3.5rem 1.5rem 2.5rem",
        }}
      >
        <div style={{ maxWidth: "1380px", margin: "0 auto" }}>
          {/* Top Metadata */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--color-accent-text)",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                backgroundColor: "var(--color-accent)",
              }}
            />
            <span>Reference Ledger · Curriculum V1.0</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "2.5rem",
              alignItems: "start",
            }}
          >
            {/* Title & Description */}
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  lineHeight: 0.95,
                  color: "var(--color-ink)",
                  marginBottom: "1rem",
                }}
              >
                AI &amp; Python Engineering
                <br />
                <span style={{ color: "var(--color-accent)" }}>Glossary</span>
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.05rem",
                  color: "var(--color-ink-2)",
                  maxWidth: "680px",
                  lineHeight: 1.6,
                }}
              >
                Precise working definitions for the systems you build. Start with the meaning, then use the examples, distinctions, and lesson links to turn vocabulary into judgment.
              </p>
            </div>

            {/* Right Side Stats Ledger */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                border: "1px solid var(--color-border-2)",
                backgroundColor: "var(--color-surface)",
                minWidth: "220px",
              }}
            >
              {[
                { value: "243", label: "TERMS INDEXED" },
                { value: "12", label: "LEARNING AREAS" },
                { value: "A-Z", label: "STABLE DEEP LINKS" },
              ].map((stat, idx) => (
                <div
                  key={stat.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    padding: "0.75rem 1.25rem",
                    borderBottom: idx < 2 ? "1px solid var(--color-border)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.65rem",
                      fontWeight: 700,
                      color: "var(--color-accent)",
                      minWidth: "50px",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--color-ink-3)",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Two-Column Ledger Workspace ────────────────────── */}
      <div
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          padding: "2rem 1.5rem 6rem",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "2.5rem",
          alignItems: "start",
        }}
      >
        {/* ── Left Sticky Sidebar: Search & Learning Areas ──── */}
        <aside
          style={{
            position: "sticky",
            top: "4.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
          }}
        >
          {/* Search Box */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-ink-3)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Search The Ledger
            </span>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <input
                type="text"
                placeholder="Term, alias, concept..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  padding: "0.5rem 0.75rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
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
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    padding: "0.5rem 0.6rem",
                    backgroundColor: "var(--color-surface-2)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-ink-3)",
                    cursor: "pointer",
                  }}
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Learning Area Filters */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-ink-3)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Learning Area
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              {/* All terms row */}
              <button
                onClick={() => setSelectedArea("all")}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.55rem 0.85rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  fontWeight: selectedArea === "all" ? 700 : 500,
                  backgroundColor:
                    selectedArea === "all"
                      ? "var(--color-accent-soft)"
                      : "transparent",
                  color:
                    selectedArea === "all"
                      ? "var(--color-accent-text)"
                      : "var(--color-ink)",
                  border: "none",
                  borderBottom: "1px solid var(--color-border)",
                  borderLeft:
                    selectedArea === "all"
                      ? "3px solid var(--color-accent)"
                      : "3px solid transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.12s",
                }}
              >
                <span>All terms</span>
                <span style={{ color: "var(--color-ink-3)", fontSize: "0.65rem" }}>
                  {GLOSSARY_TERMS.length}
                </span>
              </button>

              {/* 12 Learning Areas list */}
              {GLOSSARY_LEARNING_AREAS.map((area, idx) => {
                const isSelected = selectedArea === area.id;

                return (
                  <button
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.55rem 0.85rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      fontWeight: isSelected ? 700 : 500,
                      backgroundColor: isSelected
                        ? "var(--color-accent-soft)"
                        : "transparent",
                      color: isSelected
                        ? "var(--color-accent-text)"
                        : "var(--color-ink)",
                      border: "none",
                      borderBottom:
                        idx < GLOSSARY_LEARNING_AREAS.length - 1
                          ? "1px solid var(--color-border)"
                          : "none",
                      borderLeft: isSelected
                        ? "3px solid var(--color-accent)"
                        : "3px solid transparent",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.12s",
                    }}
                    className="hover:bg-surface-2"
                  >
                    <span>{area.label}</span>
                    <span style={{ color: "var(--color-ink-3)", fontSize: "0.65rem" }}>
                      {area.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Jump Letters */}
          <div
            style={{
              padding: "0.75rem",
              backgroundColor: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-ink-3)",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              Alphabet Jump
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((ltr) => {
                const hasEntries = groupedTerms[ltr] && groupedTerms[ltr].length > 0;
                return (
                  <a
                    key={ltr}
                    href={hasEntries ? `#letter-${ltr}` : undefined}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      color: hasEntries ? "var(--color-accent-text)" : "var(--color-border-2)",
                      textDecoration: "none",
                      padding: "0.1rem 0.25rem",
                      cursor: hasEntries ? "pointer" : "default",
                    }}
                  >
                    {ltr}
                  </a>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ── Right Main Area: Reference Entries Ledger ──────── */}
        <main>
          {/* Header Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "0.75rem",
              borderBottom: "2px solid var(--color-ink)",
              marginBottom: "2rem",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-accent-text)",
                  marginBottom: "0.2rem",
                }}
              >
                Live Reference
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                }}
              >
                Reference Entries
              </h2>
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--color-ink-3)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {filteredTerms.length} OF {GLOSSARY_TERMS.length} TERMS
            </span>
          </div>

          {/* Grouped Entries */}
          {availableLetters.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
              {availableLetters.map((letter) => (
                <section key={letter} id={`letter-${letter}`}>
                  {/* Letter Divider */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "1rem",
                      borderBottom: "1px solid var(--color-border-2)",
                      paddingBottom: "0.4rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "2rem",
                        fontWeight: 700,
                        color: "var(--color-accent)",
                        lineHeight: 1,
                      }}
                    >
                      {letter}
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        textTransform: "uppercase",
                        color: "var(--color-ink-3)",
                      }}
                    >
                      {groupedTerms[letter].length} {groupedTerms[letter].length === 1 ? "entry" : "entries"}
                    </span>
                  </div>

                  {/* Entry Cards List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {groupedTerms[letter].map((term) => {
                      const isCopied = copiedSlug === term.slug;

                      return (
                        <article
                          key={term.slug}
                          style={{
                            backgroundColor: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                            padding: "1.5rem 1.75rem",
                            transition: "border-color 0.15s ease",
                          }}
                          className="hover:border-accent"
                        >
                          {/* Entry Metadata & Actions */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "0.75rem",
                              flexWrap: "wrap",
                              gap: "0.5rem",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.62rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: "var(--color-accent-text)",
                              }}
                            >
                              {term.refNumber || "REF"} · {term.categoryLabel}
                            </span>

                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <Link
                                href={`/glossary/${term.slug}/`}
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "0.6rem",
                                  fontWeight: 600,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.06em",
                                  padding: "0.25rem 0.6rem",
                                  backgroundColor: "var(--color-surface-2)",
                                  color: "var(--color-ink)",
                                  border: "1px solid var(--color-border)",
                                  textDecoration: "none",
                                }}
                              >
                                Read Term →
                              </Link>
                              <button
                                onClick={() => handleCopyLink(term.slug)}
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "0.6rem",
                                  fontWeight: 600,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.06em",
                                  padding: "0.25rem 0.6rem",
                                  backgroundColor: "transparent",
                                  color: isCopied ? "#059669" : "var(--color-ink-3)",
                                  border: "1px solid",
                                  borderColor: isCopied ? "#059669" : "var(--color-border)",
                                  cursor: "pointer",
                                }}
                              >
                                {isCopied ? "COPIED ✓" : "COPY LINK"}
                              </button>
                            </div>
                          </div>

                          {/* Term Title */}
                          <h4
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "1.65rem",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.02em",
                              color: "var(--color-ink)",
                              lineHeight: 1.1,
                              marginBottom: "1rem",
                            }}
                          >
                            <Link
                              href={`/glossary/${term.slug}/`}
                              style={{ color: "inherit", textDecoration: "none" }}
                              className="hover:text-accent"
                            >
                              {term.term}
                            </Link>
                          </h4>

                          {/* Working Definition Box */}
                          <div
                            style={{
                              backgroundColor: "var(--color-surface-2)",
                              borderLeft: "3.5px solid var(--color-accent)",
                              padding: "1rem 1.25rem",
                              marginBottom: "1.25rem",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.58rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: "var(--color-ink-3)",
                                display: "block",
                                marginBottom: "0.35rem",
                              }}
                            >
                              Working Definition
                            </span>
                            <p
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "0.98rem",
                                color: "var(--color-ink)",
                                lineHeight: 1.6,
                                margin: 0,
                              }}
                            >
                              {term.definition}
                            </p>
                          </div>

                          {/* Detail Grid: Why it Matters & In Practice */}
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: term.inPractice ? "1fr 1fr" : "1fr",
                              gap: "1.25rem",
                              paddingTop: "0.75rem",
                              borderTop: "1px solid var(--color-border)",
                            }}
                          >
                            {/* Why It Matters */}
                            <div>
                              <span
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "0.58rem",
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.08em",
                                  color: "var(--color-ink-3)",
                                  display: "block",
                                  marginBottom: "0.25rem",
                                }}
                              >
                                Why It Matters
                              </span>
                              <p
                                style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: "0.85rem",
                                  color: "var(--color-ink-2)",
                                  lineHeight: 1.5,
                                  margin: 0,
                                }}
                              >
                                {term.whyItMatters}
                              </p>
                            </div>

                            {/* In Practice */}
                            {term.inPractice && (
                              <div>
                                <span
                                  style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.58rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    color: "var(--color-accent-text)",
                                    display: "block",
                                    marginBottom: "0.25rem",
                                  }}
                                >
                                  In Practice
                                </span>
                                <p
                                  style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: "0.85rem",
                                    color: "var(--color-ink-2)",
                                    lineHeight: 1.5,
                                    margin: 0,
                                  }}
                                >
                                  {term.inPractice}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Related Terms Chips */}
                          {term.relatedTerms.length > 0 && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                flexWrap: "wrap",
                                marginTop: "1rem",
                                paddingTop: "0.75rem",
                                borderTop: "1px dashed var(--color-border)",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "0.58rem",
                                  textTransform: "uppercase",
                                  color: "var(--color-ink-3)",
                                }}
                              >
                                Related:
                              </span>
                              {term.relatedTerms.map((rel) => (
                                <Link
                                  key={rel}
                                  href={`/glossary/${rel}/`}
                                  className="tag hover:border-accent"
                                  style={{ fontSize: "0.6rem", padding: "0.1rem 0.4rem", textDecoration: "none" }}
                                >
                                  {rel.replace(/-/g, " ")}
                                </Link>
                              ))}
                            </div>
                          )}
                        </article>
                      );
                    })}
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
                backgroundColor: "var(--color-surface)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--color-ink-3)",
                  marginBottom: "1rem",
                }}
              >
                No entries found matching &ldquo;{search}&rdquo;
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedArea("all");
                }}
                className="btn-ghost"
                style={{ fontSize: "0.65rem" }}
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
