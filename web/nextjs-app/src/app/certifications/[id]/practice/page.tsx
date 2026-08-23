// src/app/certifications/[id]/practice/page.tsx — Interactive Question Practice Mode
"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CERTIFICATION_TRACKS } from "@/data/certifications";
import { getQuestionsByTrack, type QuestionDifficulty, type CertificationQuestionItem } from "@/data/certifications/questions";

interface Props {
  params: Promise<{ id: string }>;
}

export default function PracticePage({ params }: Props) {
  const { id } = use(params);
  const track = CERTIFICATION_TRACKS.find(
    (t) => t.id.toLowerCase() === id.toLowerCase() || t.id.replace("claude-", "").toLowerCase() === id.toLowerCase()
  );

  if (!track) notFound();

  const allQuestions = useMemo(() => getQuestionsByTrack(track.id), [track.id]);

  // Filter States
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Question Interaction State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      if (selectedDomain !== "all" && q.domain !== selectedDomain) return false;
      if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesText =
          q.question.toLowerCase().includes(query) ||
          (q.scenario && q.scenario.toLowerCase().includes(query)) ||
          q.topic.toLowerCase().includes(query) ||
          q.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesText) return false;
      }
      return true;
    });
  }, [allQuestions, selectedDomain, selectedDifficulty, searchQuery]);

  const toggleOption = (questionId: string, optionId: string, isMulti: boolean) => {
    setSelectedAnswers((prev) => {
      const current = prev[questionId] || [];
      if (isMulti) {
        return current.includes(optionId)
          ? { ...prev, [questionId]: current.filter((x) => x !== optionId) }
          : { ...prev, [questionId]: [...current, optionId] };
      } else {
        return { ...prev, [questionId]: [optionId] };
      }
    });
  };

  const toggleReveal = (questionId: string) => {
    setRevealedExplanations((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const toggleBookmark = (questionId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(questionId) ? prev.filter((x) => x !== questionId) : [...prev, questionId]
    );
  };

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh", padding: "2.5rem 1.5rem 6rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* ── Breadcrumb & Notice ──────────────────────────────── */}
        <nav
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-ink-3)",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <Link href="/certifications/" style={{ color: "var(--color-accent-text)", textDecoration: "none" }}>
            Certifications
          </Link>
          <span>/</span>
          <Link href={`/certifications/${track.id}/`} style={{ color: "var(--color-accent-text)", textDecoration: "none" }}>
            {track.code}
          </Link>
          <span>/</span>
          <span style={{ color: "var(--color-ink)" }}>Practice Bank</span>
        </nav>

        {/* Disclaimer Banner */}
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderLeft: "3.5px solid var(--color-accent)",
            padding: "0.85rem 1.25rem",
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-accent-text)",
              fontWeight: 700,
            }}
          >
            Original Practice Question Bank · Not An Official Exam Question Pool
          </span>
          <Link
            href={`/certifications/${track.id}/mock/`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--color-accent)",
              textDecoration: "none",
            }}
            className="hover:underline"
          >
            Launch 120-min Mock Simulator →
          </Link>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              fontWeight: 700,
              color: "var(--color-accent)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "block",
              marginBottom: "0.25rem",
            }}
          >
            {track.code} · Interactive Practice
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--color-ink)",
              margin: "0 0 0.5rem",
            }}
          >
            Scenario-Based Practice Engine
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-ink-2)", margin: 0 }}>
            Master decision patterns and architectural tradeoffs. Filter by blueprint domain, difficulty, or keyword.
          </p>
        </div>

        {/* ── Filter Controls Bar ──────────────────────────────── */}
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            padding: "1.25rem",
            marginBottom: "2.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Domain Filter */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", textTransform: "uppercase", color: "var(--color-ink-3)" }}>
              Domain
            </label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                padding: "0.4rem 0.6rem",
                backgroundColor: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-ink)",
                outline: "none",
              }}
            >
              <option value="all">All Domains ({allQuestions.length})</option>
              {track.domains.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.weightPercent}%)
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", textTransform: "uppercase", color: "var(--color-ink-3)" }}>
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                padding: "0.4rem 0.6rem",
                backgroundColor: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-ink)",
                outline: "none",
              }}
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy (15%)</option>
              <option value="medium">Medium (35%)</option>
              <option value="hard">Hard (35%)</option>
              <option value="expert">Expert (15%)</option>
            </select>
          </div>

          {/* Search Box */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", flex: 1, minWidth: "220px" }}>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", textTransform: "uppercase", color: "var(--color-ink-3)" }}>
              Search Topics &amp; Scenarios
            </label>
            <input
              type="text"
              placeholder="e.g. MCP, Prompt Caching, Token Limits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                padding: "0.4rem 0.6rem",
                backgroundColor: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-ink)",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* ── Questions Stream ─────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {filteredQuestions.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", border: "1px dashed var(--color-border)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-ink-3)" }}>
                No questions found matching your filter criteria.
              </p>
            </div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const selected = selectedAnswers[q.id] || [];
              const isRevealed = revealedExplanations[q.id];
              const isBookmarked = bookmarkedIds.includes(q.id);
              const isMulti = q.type === "multiple-response" || q.correctAnswers.length > 1;

              return (
                <article
                  key={q.id}
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    padding: "2rem",
                    position: "relative",
                  }}
                >
                  {/* Top Meta Bar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid var(--color-border)",
                      paddingBottom: "0.75rem",
                      marginBottom: "1.25rem",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700, color: "var(--color-accent)" }}>
                        QUESTION {idx + 1} OF {filteredQuestions.length} ({q.id})
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.55rem",
                          textTransform: "uppercase",
                          padding: "0.15rem 0.4rem",
                          backgroundColor: "var(--color-surface-2)",
                          border: "1px solid var(--color-border)",
                          color: "var(--color-ink-3)",
                        }}
                      >
                        {q.difficulty}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--color-ink-3)" }}>
                        {q.domainName}
                      </span>
                      <button
                        onClick={() => toggleBookmark(q.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          color: isBookmarked ? "var(--color-accent)" : "var(--color-ink-3)",
                        }}
                      >
                        {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
                      </button>
                    </div>
                  </div>

                  {/* Scenario Narrative */}
                  {q.scenario && (
                    <div
                      style={{
                        backgroundColor: "var(--color-surface-2)",
                        borderLeft: "3px solid var(--color-accent)",
                        padding: "1rem 1.25rem",
                        marginBottom: "1.25rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                        color: "var(--color-ink)",
                        lineHeight: 1.6,
                      }}
                    >
                      {q.scenario}
                    </div>
                  )}

                  {/* Question Prompt */}
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "var(--color-ink)",
                      marginBottom: "1.25rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {q.question}
                  </h3>

                  {/* Options List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.5rem" }}>
                    {q.options.map((opt) => {
                      const isChosen = selected.includes(opt.id);
                      const isCorrect = q.correctAnswers.includes(opt.id);

                      let borderColor = "var(--color-border)";
                      let bgColor = "transparent";

                      if (isRevealed) {
                        if (isCorrect) {
                          borderColor = "var(--color-accent)";
                          bgColor = "var(--color-accent-soft)";
                        } else if (isChosen && !isCorrect) {
                          borderColor = "#dc2626";
                          bgColor = "rgba(220, 38, 38, 0.08)";
                        }
                      } else if (isChosen) {
                        borderColor = "var(--color-accent)";
                        bgColor = "var(--color-surface-2)";
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => toggleOption(q.id, opt.id, isMulti)}
                          style={{
                            textAlign: "left",
                            padding: "0.85rem 1.15rem",
                            backgroundColor: bgColor,
                            border: `1.5px solid ${borderColor}`,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.75rem",
                            transition: "all 0.12s ease",
                          }}
                          className="hover:border-accent"
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: isChosen || (isRevealed && isCorrect) ? "var(--color-accent)" : "var(--color-ink-3)",
                              minWidth: "18px",
                            }}
                          >
                            {opt.id}.
                          </span>
                          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-ink)", lineHeight: 1.5 }}>
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Action Bar */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                    <button
                      onClick={() => toggleReveal(q.id)}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        padding: "0.45rem 1rem",
                        backgroundColor: isRevealed ? "var(--color-surface-2)" : "var(--color-accent)",
                        border: isRevealed ? "1px solid var(--color-border)" : "none",
                        color: isRevealed ? "var(--color-ink)" : "#fff",
                        cursor: "pointer",
                      }}
                    >
                      {isRevealed ? "Hide Architectural Rationale" : "Reveal Answer & Rationale"}
                    </button>

                    {q.relatedLessons.length > 0 && (
                      <Link
                        href={`/certifications/${track.id}/lessons/${q.relatedLessons[0]}/`}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.62rem",
                          color: "var(--color-accent-text)",
                          textDecoration: "none",
                        }}
                        className="hover:underline"
                      >
                        Study Related Lesson →
                      </Link>
                    )}
                  </div>

                  {/* ── Architectural Explanation Panel ──────────────── */}
                  {isRevealed && (
                    <div
                      style={{
                        marginTop: "1.5rem",
                        padding: "1.5rem",
                        backgroundColor: "var(--color-surface-2)",
                        border: "1px solid var(--color-border)",
                        borderTop: "3px solid var(--color-accent)",
                      }}
                    >
                      <div style={{ marginBottom: "1rem" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-accent-text)", display: "block" }}>
                          Correct Answer: {q.correctAnswers.join(", ")}
                        </span>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-ink)", marginTop: "0.35rem", lineHeight: 1.6 }}>
                          {q.explanation}
                        </p>
                      </div>

                      {/* Distractor Rationale */}
                      {q.whyOtherOptionsAreWrong && (
                        <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "0.75rem", marginBottom: "1rem" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block", marginBottom: "0.4rem" }}>
                            Why Other Options Are Flawed:
                          </span>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                            {Object.entries(q.whyOtherOptionsAreWrong).map(([optId, reason]) => (
                              <div key={optId} style={{ fontSize: "0.85rem", color: "var(--color-ink-2)", lineHeight: 1.4 }}>
                                <strong>Option {optId}:</strong> {reason}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Engineering Principle */}
                      {q.engineeringPrinciple && (
                        <div style={{ backgroundColor: "var(--color-surface)", padding: "0.75rem 1rem", border: "1px solid var(--color-border)" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", textTransform: "uppercase", color: "var(--color-accent)", fontWeight: 700, display: "block" }}>
                            Engineering Principle:
                          </span>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontStyle: "italic", color: "var(--color-ink)", margin: "0.2rem 0 0" }}>
                            "{q.engineeringPrinciple}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

