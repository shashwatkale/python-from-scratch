"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Phase } from "@/types";
import { loadProgress, markLessonComplete, saveProgress, loadProgress as lp } from "@/lib/progress";

interface Props {
  phase: Phase;
  onClose: () => void;
}

export function PhaseModal({ phase, onClose }: Props) {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(loadProgress().completedLessons);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const toggle = (slug: string) => {
    const p = lp();
    const key = `${phase.slug}/${slug}`;
    if (p.completedLessons.includes(key)) {
      p.completedLessons = p.completedLessons.filter((s) => s !== key);
      saveProgress(p);
      setCompleted(p.completedLessons);
    } else {
      markLessonComplete(key);
      setCompleted(lp().completedLessons);
    }
  };

  const resetPhase = () => {
    const p = lp();
    p.completedLessons = p.completedLessons.filter(
      (s) => !s.startsWith(phase.slug)
    );
    saveProgress(p);
    setCompleted(p.completedLessons);
  };

  const doneCount = phase.lessons.filter((l) =>
    completed.includes(`${phase.slug}/${l.slug}`)
  ).length;

  const pct =
    phase.lessons.length > 0
      ? Math.round((doneCount / phase.lessons.length) * 100)
      : 0;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-box">
        {/* Header */}
        <div
          style={{
            padding: "1.5rem 2rem 1.25rem",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-ink-3)",
              marginBottom: "0.4rem",
            }}
          >
            Phase {String(phase.order).padStart(2, "0")}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--color-ink)",
              marginBottom: "0.5rem",
              lineHeight: 1.1,
            }}
          >
            {phase.title}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "var(--color-ink-3)",
              marginBottom: "1.25rem",
            }}
          >
            {phase.description}
          </p>

          {/* Progress */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-ink-3)",
              }}
            >
              {doneCount} of {phase.lessons.length} lessons complete
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 700,
                color: pct === 100 ? "var(--color-accent)" : "var(--color-ink-3)",
              }}
            >
              {pct}%
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Lessons */}
        <div className="modal-body">
          {phase.lessons.length === 0 ? (
            <div
              style={{
                padding: "2rem 0",
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-ink-3)",
              }}
            >
              Lessons coming soon.{" "}
              <a
                href="https://github.com/shashwatkale/python-from-scratch"
                style={{ color: "var(--color-accent-text)" }}
              >
                Contribute →
              </a>
            </div>
          ) : (
            phase.lessons.map((lesson) => {
              const key = `${phase.slug}/${lesson.slug}`;
              const done = completed.includes(key);
              return (
                <div key={lesson.slug} className="lesson-row">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggle(lesson.slug)}
                    className={`check-box ${done ? "check-box-done" : ""}`}
                    aria-label={done ? "Mark incomplete" : "Mark complete"}
                  >
                    {done && (
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </button>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: done ? "var(--color-ink-3)" : "var(--color-ink)",
                        textDecoration: done ? "line-through" : "none",
                        marginBottom: "0.15rem",
                      }}
                    >
                      {lesson.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        color: "var(--color-ink-3)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lesson.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="hidden sm:flex" style={{ gap: "0.3rem", flexShrink: 0 }}>
                    {lesson.tags.slice(0, 2).map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>

                  {/* Open */}
                  <Link
                    href={`/curriculum/${phase.slug}/${lesson.slug}/`}
                    onClick={onClose}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--color-accent-text)",
                      border: "1px solid var(--color-accent)",
                      padding: "0.25rem 0.6rem",
                      textDecoration: "none",
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                      transition: "background-color 0.12s",
                    }}
                  >
                    Open →
                  </Link>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--color-ink-3)",
            }}
          >
            Progress saved in browser only
          </p>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {phase.lessons.length > 0 && (
              <button onClick={resetPhase} className="btn-ghost" style={{ fontSize: "0.6rem", padding: "0.35rem 0.75rem" }}>
                Reset
              </button>
            )}
            <button onClick={onClose} className="btn-ghost" style={{ fontSize: "0.6rem", padding: "0.35rem 0.75rem" }}>
              Close ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
