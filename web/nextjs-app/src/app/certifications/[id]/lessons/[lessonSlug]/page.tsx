// src/app/certifications/[id]/lessons/[lessonSlug]/page.tsx — Interactive Tutorial Lesson Reader with Sticky Sidebar
"use client";

import { useState, useEffect, useMemo, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCertificationTrackById,
  getCertificationLesson,
} from "@/data/certifications";
import { CodeBlock } from "@/components/CodeBlock";

interface Props {
  params: Promise<{ id: string; lessonSlug: string }>;
}

export default function CertificationLessonPage({ params }: Props) {
  const { id, lessonSlug } = use(params);
  const track = getCertificationTrackById(id);
  const lesson = getCertificationLesson(id, lessonSlug);

  if (!track || !lesson) {
    notFound();
  }

  // Local progress state
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);
  const [selectedJudgeOption, setSelectedJudgeOption] = useState<number | null>(null);
  const [judgeSubmitted, setJudgeSubmitted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`cert_progress_${track.id}`);
      if (stored) {
        setCompletedSlugs(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, [track.id]);

  const isCompleted = completedSlugs.includes(lesson.slug);

  const toggleComplete = () => {
    try {
      const updated = isCompleted
        ? completedSlugs.filter((s) => s !== lesson.slug)
        : [...completedSlugs, lesson.slug];
      setCompletedSlugs(updated);
      localStorage.setItem(`cert_progress_${track.id}`, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Find prev/next lesson
  const currentIdx = track.lessons.findIndex((l) => l.slug === lesson.slug);
  const prevLesson = track.lessons[currentIdx - 1];
  const nextLesson = track.lessons[currentIdx + 1];

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      {/* ── 1. Top Mini Disclaimer Bar ─────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-surface-2)",
          borderBottom: "1px solid var(--color-border)",
          padding: "0.5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--color-ink-3)",
            margin: 0,
          }}
        >
          Independent Preparation Curriculum · Not affiliated with Anthropic · Teaches official public blueprint decisions
        </p>
      </div>

      {/* ── 2. Two-Column Workspace (Sidebar + Lesson Content) ── */}
      <div
        className="lesson-workspace"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "2rem 1.5rem 6rem",
        }}
      >
        {/* ── Left Sticky Sidebar: Lesson Path Roadmap ──────── */}
        <aside
          style={{
            position: "sticky",
            top: "5rem",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxHeight: "calc(100vh - 7rem)",
            overflowY: "auto",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-accent-text)",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              {track.code} Learning Path
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.2rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--color-ink)",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {track.title}
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              borderTop: "1px solid var(--color-border)",
              paddingTop: "0.75rem",
            }}
          >
            {track.lessons.map((item) => {
              const isActive = item.slug === lesson.slug;
              const isItemDone = completedSlugs.includes(item.slug);

              return (
                <Link
                  key={item.slug}
                  href={`/certifications/${track.id}/lessons/${item.slug}/`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "24px 1fr",
                    gap: "0.5rem",
                    alignItems: "baseline",
                    padding: "0.5rem 0.6rem",
                    backgroundColor: isActive
                      ? "var(--color-accent-soft)"
                      : "transparent",
                    borderLeft: isActive
                      ? "3px solid var(--color-accent)"
                      : "3px solid transparent",
                    textDecoration: "none",
                  }}
                  className="hover:bg-surface-2"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: isItemDone ? "var(--color-accent)" : isActive ? "var(--color-accent-text)" : "var(--color-ink-3)",
                    }}
                  >
                    {isItemDone ? "✓" : item.order.toString().padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.82rem",
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? "var(--color-ink)" : "var(--color-ink-2)",
                      lineHeight: 1.35,
                    }}
                  >
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>

          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "0.75rem" }}>
            <Link
              href={`/certifications/${track.id}/`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "var(--color-ink-3)",
                textDecoration: "none",
                display: "block",
              }}
              className="hover:underline"
            >
              ← Back to {track.code} Overview
            </Link>
          </div>
        </aside>

        {/* ── Right Main Content Area ───────────────────────── */}
        <main>
          {/* Masthead */}
          <div style={{ marginBottom: "2.5rem" }}>
            {/* Breadcrumb Navigation */}
            <nav
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-ink-3)",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/certifications/"
                style={{ color: "var(--color-accent-text)", textDecoration: "none" }}
                className="hover:underline"
              >
                Certifications
              </Link>
              <span>/</span>
              <Link
                href={`/certifications/${track.id}/`}
                style={{ color: "var(--color-accent-text)", textDecoration: "none" }}
                className="hover:underline"
              >
                {track.code}
              </Link>
              <span>/</span>
              <span style={{ color: "var(--color-ink)" }}>Lesson {lesson.order.toString().padStart(2, "0")}</span>
            </nav>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                textTransform: "uppercase",
                lineHeight: 1.05,
                color: "var(--color-ink)",
                marginBottom: "1rem",
              }}
            >
              {lesson.title}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.1rem",
                color: "var(--color-ink-2)",
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}
            >
              {lesson.leadParagraph}
            </p>

            {/* Metadata Badges */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.25rem",
                padding: "0.75rem 1rem",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block" }}>
                  TYPE
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-ink)", textTransform: "uppercase" }}>
                  {lesson.kind}
                </span>
              </div>

              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block" }}>
                  LANGUAGE
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-ink)" }}>
                  Python
                </span>
              </div>

              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block" }}>
                  PREREQUISITES
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-ink)" }}>
                  None
                </span>
              </div>

              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block" }}>
                  TIME
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-accent)" }}>
                  {lesson.durationMin || 20} minutes
                </span>
              </div>
            </div>
          </div>

          {/* ── Learning Objectives ─────────────────────────── */}
          {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                padding: "1.5rem 1.75rem",
                marginBottom: "2.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-accent-text)",
                  display: "block",
                  marginBottom: "0.6rem",
                }}
              >
                Learning Objectives
              </span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {lesson.learningObjectives.map((obj, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.92rem",
                      color: "var(--color-ink)",
                      lineHeight: 1.55,
                      marginBottom: "0.4rem",
                      display: "flex",
                      gap: "0.6rem",
                    }}
                  >
                    <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}>✓</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Key Decisions Callout Box ───────────────────── */}
          {lesson.keyDecisions && lesson.keyDecisions.length > 0 && (
            <div
              style={{
                backgroundColor: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                borderLeft: "4px solid var(--color-accent)",
                padding: "1.5rem 1.75rem",
                marginBottom: "2.5rem",
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
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Key Architectural Decisions
              </span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {lesson.keyDecisions.map((decision, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.92rem",
                      color: "var(--color-ink)",
                      lineHeight: 1.55,
                      marginBottom: "0.4rem",
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}>▸</span>
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Try Judging First (Interactive Practice Widget) ─ */}
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1.5px solid var(--color-accent)",
              padding: "1.75rem",
              marginBottom: "3rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-accent-text)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Try Judging First · Scenario Challenge
            </span>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.98rem",
                fontWeight: 600,
                color: "var(--color-ink)",
                lineHeight: 1.5,
                marginBottom: "1.25rem",
              }}
            >
              A director asks Claude to produce a comprehensive monthly report, but gives no audience, sources, or definition of success. What should the engineer do first?
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1rem" }}>
              {[
                "Add a role prompt saying 'Claude is an expert director'.",
                "Choose the most capable model and execute the prompt as-is.",
                "Choose the strongest model and ask it to infer an executive audience, likely sources, and format.",
                "Define the decision, audience, authoritative sources, constraints, output shape, and pass criteria.",
              ].map((opt, optIdx) => {
                const isSelected = selectedJudgeOption === optIdx;
                const isCorrect = optIdx === 3;

                let bg = "var(--color-surface-2)";
                let border = "var(--color-border)";
                if (judgeSubmitted) {
                  if (isCorrect) {
                    bg = "rgba(5, 150, 105, 0.1)";
                    border = "#059669";
                  } else if (isSelected) {
                    bg = "rgba(220, 38, 38, 0.1)";
                    border = "#dc2626";
                  }
                } else if (isSelected) {
                  bg = "var(--color-accent-soft)";
                  border = "var(--color-accent)";
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => {
                      if (!judgeSubmitted) setSelectedJudgeOption(optIdx);
                    }}
                    style={{
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      backgroundColor: bg,
                      border: `1px solid ${border}`,
                      fontFamily: "var(--font-body)",
                      fontSize: "0.88rem",
                      color: "var(--color-ink)",
                      cursor: judgeSubmitted ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 700 }}>
                      {judgeSubmitted && isCorrect ? "✓" : isSelected ? "●" : "○"}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {!judgeSubmitted ? (
              <button
                disabled={selectedJudgeOption === null}
                onClick={() => setJudgeSubmitted(true)}
                className="btn-primary"
                style={{
                  padding: "0.45rem 1rem",
                  fontSize: "0.68rem",
                  opacity: selectedJudgeOption === null ? 0.4 : 1,
                }}
              >
                Submit Judgment
              </button>
            ) : (
              <div
                style={{
                  padding: "0.75rem 1rem",
                  backgroundColor: "var(--color-surface-2)",
                  borderLeft: "3px solid #059669",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "var(--color-ink)",
                  lineHeight: 1.5,
                }}
              >
                <strong>Correct Rationale:</strong> Before executing or selecting a model, an engineer must turn vague requests into a testable specification: defining audience, constraints, sources, and observable success criteria.
              </div>
            )}
          </div>

          {/* ── Lesson Markdown Content ─────────────────────── */}
          <div
            className="prose"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.02rem",
              color: "var(--color-ink)",
              lineHeight: 1.7,
              marginBottom: "3rem",
            }}
          >
            {lesson.contentMarkdown.split("\n\n").map((para, idx) => {
              if (para.startsWith("# ")) {
                return null;
              }
              if (para.startsWith("### ")) {
                return (
                  <h2
                    key={idx}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.6rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "var(--color-ink)",
                      marginTop: "2.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {para.replace("### ", "")}
                  </h2>
                );
              }
              if (para.startsWith("```")) {
                const lines = para.split("\n");
                const lang = lines[0].replace("```", "") || "python";
                const code = lines.slice(1, -1).join("\n");
                return (
                  <div key={idx} style={{ margin: "1.5rem 0" }}>
                    <CodeBlock code={code} language={lang} />
                  </div>
                );
              }
              return (
                <p key={idx} style={{ marginBottom: "1.25rem" }}>
                  {para}
                </p>
              );
            })}
          </div>

          {/* ── Code Snippet Highlight ──────────────────────── */}
          {lesson.codeSnippet && (
            <div style={{ marginBottom: "3rem" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-ink-3)",
                  marginBottom: "0.4rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Sample Implementation · {lesson.codeSnippet.filename}</span>
                <span>{lesson.codeSnippet.language}</span>
              </div>
              <CodeBlock
                code={lesson.codeSnippet.code}
                language={lesson.codeSnippet.language}
                filename={lesson.codeSnippet.filename}
              />
            </div>
          )}

          {/* ── Interactive Lab Challenge ───────────────────── */}
          {lesson.interactiveLabPrompt && (
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border-2)",
                padding: "1.75rem",
                marginBottom: "3.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    backgroundColor: "var(--color-accent)",
                  }}
                />
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
                  Hands-On Architectural Lab Challenge
                </span>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  color: "var(--color-ink)",
                  lineHeight: 1.55,
                  marginBottom: "1rem",
                }}
              >
                {lesson.interactiveLabPrompt}
              </p>

              <div
                style={{
                  padding: "0.75rem 1rem",
                  backgroundColor: "var(--color-surface-2)",
                  border: "1px dashed var(--color-border)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--color-ink-2)",
                }}
              >
                💡 <strong>Self-Defense Test:</strong> Write down your decision criteria. Can you justify your choices under latency and token cost constraints?
              </div>
            </div>
          )}

          {/* ── Bottom Action Bar & Navigation ──────────────── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              paddingTop: "2rem",
              borderTop: "2px solid var(--color-border)",
            }}
          >
            {/* Mark Complete Button */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={toggleComplete}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "0.75rem 2rem",
                  backgroundColor: isCompleted ? "var(--color-accent)" : "var(--color-surface)",
                  color: isCompleted ? "#ffffff" : "var(--color-ink)",
                  border: "1.5px solid",
                  borderColor: isCompleted ? "var(--color-accent)" : "var(--color-border-2)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.15s ease",
                }}
              >
                <span>{isCompleted ? "✓ Completed Lesson" : "○ Mark as Complete"}</span>
              </button>
            </div>

            {/* Prev / Next Lesson Links */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              {prevLesson ? (
                <Link
                  href={`/certifications/${track.id}/lessons/${prevLesson.slug}/`}
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    padding: "1rem 1.25rem",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  className="hover:border-accent"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      textTransform: "uppercase",
                      color: "var(--color-ink-3)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    ← Previous Lesson
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "var(--color-ink)",
                    }}
                  >
                    {prevLesson.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link
                  href={`/certifications/${track.id}/lessons/${nextLesson.slug}/`}
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    padding: "1rem 1.25rem",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "right",
                  }}
                  className="hover:border-accent"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      textTransform: "uppercase",
                      color: "var(--color-ink-3)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Next Lesson →
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                    }}
                  >
                    {nextLesson.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
