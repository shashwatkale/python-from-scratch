import type { Metadata } from "next";
import { PHASES } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Python From Scratch learning roadmap — 21 phases from beginner to advanced.",
};

const DIFF_COLOR: Record<string, string> = {
  beginner: "var(--color-accent-text)",
  intermediate: "#d97706",
  advanced: "#dc2626",
};

function phaseStatus(lessons: unknown[]): "active" | "planned" {
  return lessons.length > 0 ? "active" : "planned";
}

export default function RoadmapPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--color-border)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-3)", marginBottom: "0.5rem" }}>
          Learning Path
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-ink)", lineHeight: 1.05, marginBottom: "0.75rem" }}>
          Roadmap
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-ink-3)", maxWidth: "480px" }}>
          {PHASES.length} phases from absolute beginner to production Python.
        </p>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
        {[
          { dot: "var(--color-accent)", label: "In Progress" },
          { dot: "var(--color-border-2)", label: "Planned" },
        ].map(({ dot, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: "8px", height: "8px", backgroundColor: dot, display: "inline-block" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-ink-3)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Phase list */}
      <div style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
        {/* Header row */}
        <div style={{ display: "grid", gridTemplateColumns: "2.5rem 0.5rem 1fr 7rem 5rem", gap: "1rem", alignItems: "center", padding: "0.5rem 1.25rem", borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-surface-2)" }}>
          {["#", "", "Phase", "Difficulty", "Status"].map((h, i) => (
            <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-3)" }}>
              {h}
            </span>
          ))}
        </div>

        {PHASES.map((phase) => {
          const status = phaseStatus(phase.lessons);
          return (
            <div
              key={phase.slug}
              style={{
                display: "grid",
                gridTemplateColumns: "2.5rem 0.5rem 1fr 7rem 5rem",
                gap: "1rem",
                alignItems: "center",
                padding: "0.875rem 1.25rem",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-ink-3)", fontWeight: 600 }}>
                {String(phase.order).padStart(2, "0")}
              </span>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: status === "active" ? "var(--color-accent)" : "var(--color-border-2)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 600, color: "var(--color-ink)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.15rem" }}>
                  {phase.title}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-ink-3)" }}>
                  {phase.description}
                </p>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.06em", color: DIFF_COLOR[phase.difficulty] }}>
                {phase.difficulty}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.06em", color: status === "active" ? "var(--color-accent-text)" : "var(--color-ink-3)" }}>
                {status === "active" ? `${phase.lessons.length} lessons` : "Planned"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
