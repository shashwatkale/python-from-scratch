"use client";

import { useEffect, useState } from "react";
import { loadProgress, markLessonComplete, saveProgress } from "@/lib/progress";

interface Props {
  phaseSlug: string;
  lessonSlug: string;
}

export function LessonMarkComplete({ phaseSlug, lessonSlug }: Props) {
  const key = `${phaseSlug}/${lessonSlug}`;
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(loadProgress().completedLessons.includes(key));
  }, [key]);

  const toggle = () => {
    const p = loadProgress();
    if (done) {
      p.completedLessons = p.completedLessons.filter((s) => s !== key);
      saveProgress(p);
      setDone(false);
    } else {
      markLessonComplete(key);
      setDone(true);
    }
  };

  return (
    <div
      style={{
        marginTop: "2.5rem",
        padding: "1rem 1.25rem",
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface-2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: done ? "var(--color-accent-text)" : "var(--color-ink-3)",
        }}
      >
        {done ? "✓ Lesson Complete" : "Mark this lesson as complete"}
      </p>
      <button
        onClick={toggle}
        className={done ? "btn-ghost" : "btn-primary"}
        style={{ fontSize: "0.6rem", padding: "0.4rem 1rem" }}
      >
        {done ? "Mark Incomplete" : "Mark Complete"}
      </button>
    </div>
  );
}
