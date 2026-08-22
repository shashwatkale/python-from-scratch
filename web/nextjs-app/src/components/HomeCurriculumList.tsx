"use client";

import { useState } from "react";
import type { Phase } from "@/types";
import { PhaseModal } from "./PhaseModal";
import { ProgressBar } from "./ProgressBar";

const DIFF_COLOR: Record<string, string> = {
  beginner: "var(--color-accent-text)",
  intermediate: "#d97706",
  advanced: "#dc2626",
};

interface Props {
  phases: Phase[];
}

export function HomeCurriculumList({ phases }: Props) {
  const [active, setActive] = useState<Phase | null>(null);

  return (
    <>
      <div
        style={{
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3rem 1fr 7rem 5rem",
            gap: "1rem",
            padding: "0.5rem 1.25rem",
            borderBottom: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface-2)",
          }}
        >
          {["#", "Phase", "Difficulty", "Lessons"].map((h) => (
            <span
              key={h}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-ink-3)",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {phases.map((phase) => (
          <button
            key={phase.slug}
            onClick={() => setActive(phase)}
            className="phase-row"
            style={{ width: "100%", textAlign: "left", background: "transparent", border: "none" }}
          >
            {/* Number */}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--color-ink-3)",
                fontWeight: 600,
              }}
            >
              {String(phase.order).padStart(2, "0")}
            </span>

            {/* Title + desc */}
            <div style={{ minWidth: 0 }}>
              <p
                className="phase-row-title"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--color-ink)",
                  transition: "color 0.12s",
                  marginBottom: "0.15rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {phase.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  color: "var(--color-ink-3)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {phase.description}
              </p>
            </div>

            {/* Difficulty */}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: DIFF_COLOR[phase.difficulty] ?? "var(--color-ink-3)",
              }}
            >
              {phase.difficulty}
            </span>

            {/* Lessons + progress */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--color-ink-3)",
                  display: "block",
                  marginBottom: "0.3rem",
                }}
              >
                {phase.lessons.length > 0 ? `${phase.lessons.length}` : "—"}
              </span>
              {phase.lessons.length > 0 && (
                <ProgressBar
                  phaseSlug={phase.slug}
                  totalLessons={phase.lessons.length}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {active && (
        <PhaseModal phase={active} onClose={() => setActive(null)} />
      )}
    </>
  );
}
