// src/components/LessonSidebar.tsx — Enhanced Curriculum Sidebar with Progress & Phase Navigation
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Phase, Lesson } from "@/types";
import { loadProgress, saveProgress } from "@/lib/progress";

interface Props {
  phase: Phase;
  currentLesson: Lesson;
  allPhases?: Phase[];
}

export function LessonSidebar({ phase, currentLesson, allPhases = [] }: Props) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [phaseDropdownOpen, setPhaseDropdownOpen] = useState(false);

  useEffect(() => {
    setCompleted(loadProgress().completedLessons);
  }, []);

  const toggleLessonDone = (e: React.MouseEvent, phaseSlug: string, lessonSlug: string) => {
    e.preventDefault();
    e.stopPropagation();
    const key = `${phaseSlug}/${lessonSlug}`;
    let updated: string[];
    if (completed.includes(key)) {
      updated = completed.filter((k) => k !== key);
    } else {
      updated = [...completed, key];
    }
    setCompleted(updated);
    saveProgress({ completedLessons: updated });
  };

  // Calculate phase progress
  const completedInPhase = phase.lessons.filter((l) =>
    completed.includes(`${phase.slug}/${l.slug}`)
  ).length;
  const phaseProgressPercent =
    phase.lessons.length > 0
      ? Math.round((completedInPhase / phase.lessons.length) * 100)
      : 0;

  // Find previous and next phases
  const currentPhaseIdx = allPhases.findIndex((p) => p.slug === phase.slug);
  const prevPhase = currentPhaseIdx > 0 ? allPhases[currentPhaseIdx - 1] : null;
  const nextPhase =
    currentPhaseIdx >= 0 && currentPhaseIdx < allPhases.length - 1
      ? allPhases[currentPhaseIdx + 1]
      : null;

  return (
    <aside
      className="lesson-sidebar"
      style={{
        width: "270px",
        flexShrink: 0,
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        height: "calc(100vh - 5.5rem)",
        position: "sticky",
        top: "4.5rem",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        {/* ── Phase Switcher Header ─────────────────────────────── */}
        <div
          style={{
            padding: "1.25rem 1.25rem 1rem",
            borderBottom: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface-2)",
          }}
        >
          {allPhases.length > 1 ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setPhaseDropdownOpen(!phaseDropdownOpen)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-accent-text)",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.2rem 0",
                  fontWeight: 700,
                }}
              >
                <span>Phase {String(phase.order).padStart(2, "0")} · All Phases</span>
                <span>{phaseDropdownOpen ? "▲" : "▼"}</span>
              </button>

              {phaseDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    zIndex: 60,
                    maxHeight: "260px",
                    overflowY: "auto",
                    marginTop: "0.4rem",
                  }}
                >
                  {allPhases.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/curriculum/${p.slug}/${p.lessons[0]?.slug || ""}/`}
                      onClick={() => setPhaseDropdownOpen(false)}
                      style={{
                        display: "block",
                        padding: "0.5rem 0.85rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: p.slug === phase.slug ? "var(--color-accent-text)" : "var(--color-ink)",
                        backgroundColor: p.slug === phase.slug ? "var(--color-accent-soft)" : "transparent",
                        textDecoration: "none",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                      className="hover:bg-surface-2"
                    >
                      Phase {String(p.order).padStart(2, "0")}: {p.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-ink-3)",
                display: "block",
              }}
            >
              PHASE {String(phase.order).padStart(2, "0")} · ALL PHASES
            </span>
          )}

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.3rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--color-ink)",
              marginTop: "0.25rem",
              lineHeight: 1.1,
            }}
          >
            {phase.title}
          </h2>

          {/* Phase Progress Bar */}
          <div style={{ marginTop: "0.85rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                color: "var(--color-ink-3)",
                marginBottom: "0.3rem",
                textTransform: "uppercase",
              }}
            >
              <span>Progress</span>
              <span>
                {completedInPhase} / {phase.lessons.length} Complete
              </span>
            </div>
            <div
              style={{
                height: "4px",
                backgroundColor: "var(--color-border)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${phaseProgressPercent}%`,
                  backgroundColor: "var(--color-accent)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Lesson Checklist Stream ───────────────────────────── */}
        <nav style={{ padding: "0.5rem 0", display: "flex", flexDirection: "column", gap: "0.1rem" }}>
          {phase.lessons.map((lesson) => {
            const key = `${phase.slug}/${lesson.slug}`;
            const done = completed.includes(key);
            const active = lesson.slug === currentLesson.slug;

            return (
              <div
                key={lesson.slug}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  padding: "0.5rem 1.25rem",
                  backgroundColor: active ? "var(--color-accent-soft)" : "transparent",
                  borderLeft: active ? "3px solid var(--color-accent)" : "3px solid transparent",
                  transition: "background-color 0.12s ease",
                }}
                className="hover:bg-surface-2"
              >
                {/* Interactive Checkbox */}
                <button
                  onClick={(e) => toggleLessonDone(e, phase.slug, lesson.slug)}
                  aria-label={`Mark ${lesson.title} as ${done ? "incomplete" : "complete"}`}
                  style={{
                    width: "14px",
                    height: "14px",
                    border: `1.5px solid ${done ? "var(--color-accent)" : active ? "var(--color-accent)" : "var(--color-border-2)"}`,
                    backgroundColor: done ? "var(--color-accent)" : "transparent",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.6rem",
                    cursor: "pointer",
                    flexShrink: 0,
                    padding: 0,
                    borderRadius: "1px",
                  }}
                >
                  {done && "✓"}
                </button>

                {/* Lesson Link */}
                <Link
                  href={`/curriculum/${phase.slug}/${lesson.slug}/`}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    fontWeight: active ? 600 : 400,
                    color: active ? "var(--color-ink)" : done ? "var(--color-ink-3)" : "var(--color-ink-2)",
                    textDecoration: "none",
                    lineHeight: 1.3,
                    flex: 1,
                  }}
                >
                  {lesson.title}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      {/* ── Phase Footer Navigation ───────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          padding: "0.75rem 1rem",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "var(--color-surface-2)",
          gap: "0.5rem",
        }}
      >
        {prevPhase ? (
          <Link
            href={`/curriculum/${prevPhase.slug}/${prevPhase.lessons[0]?.slug || ""}/`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              textTransform: "uppercase",
              color: "var(--color-accent-text)",
              textDecoration: "none",
              fontWeight: 700,
            }}
            className="hover:underline"
          >
            ← Phase {String(prevPhase.order).padStart(2, "0")}
          </Link>
        ) : (
          <span />
        )}

        {nextPhase ? (
          <Link
            href={`/curriculum/${nextPhase.slug}/${nextPhase.lessons[0]?.slug || ""}/`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              textTransform: "uppercase",
              color: "var(--color-accent-text)",
              textDecoration: "none",
              fontWeight: 700,
            }}
            className="hover:underline"
          >
            Phase {String(nextPhase.order).padStart(2, "0")} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </aside>
  );
}
