"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Phase, Lesson } from "@/types";
import { loadProgress } from "@/lib/progress";

interface Props {
  phase: Phase;
  currentLesson: Lesson;
}

export function LessonSidebar({ phase, currentLesson }: Props) {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(loadProgress().completedLessons);
  }, []);

  return (
    <aside className="lesson-sidebar">
      {/* Back to phase */}
      <div style={{ padding: "0 1rem 1rem", borderBottom: "1px solid var(--color-border)", marginBottom: "0.75rem" }}>
        <Link
          href={`/curriculum/${phase.slug}/`}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-ink-3)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          ← Phase {String(phase.order).padStart(2, "0")}
        </Link>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--color-ink)",
            marginTop: "0.4rem",
          }}
        >
          {phase.title}
        </p>
      </div>

      {/* Lesson list */}
      <nav>
        {phase.lessons.map((lesson) => {
          const key = `${phase.slug}/${lesson.slug}`;
          const done = completed.includes(key);
          const active = lesson.slug === currentLesson.slug;

          return (
            <Link
              key={lesson.slug}
              href={`/curriculum/${phase.slug}/${lesson.slug}/`}
              className={`sidebar-item ${active ? "sidebar-item-active" : ""}`}
            >
              {/* Checkbox indicator */}
              <span
                style={{
                  width: "0.75rem",
                  height: "0.75rem",
                  border: `1px solid ${done ? "var(--color-accent)" : "var(--color-border-2)"}`,
                  backgroundColor: done ? "var(--color-accent)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {done && (
                  <svg width="7" height="7" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5">
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                )}
              </span>
              <span style={{ lineHeight: 1.4 }}>{lesson.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
