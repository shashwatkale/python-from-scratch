import type { Metadata } from "next";
import { PROJECTS } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "Projects",
  description: "Build real Python projects from beginner to advanced.",
};

const DIFF_COLOR: Record<string, string> = {
  beginner: "var(--color-accent-text)",
  intermediate: "#d97706",
  advanced: "#dc2626",
};

export default function ProjectsPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--color-border)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-3)", marginBottom: "0.5rem" }}>
          Projects · {PROJECTS.length} Available
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-ink)", lineHeight: 1.05 }}>
          Projects
        </h1>
      </div>

      <div style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
        {PROJECTS.map((project, i) => (
          <div
            key={project.slug}
            id={project.slug}
            style={{
              display: "grid",
              gridTemplateColumns: "2.5rem 1fr auto",
              gap: "1rem",
              alignItems: "start",
              padding: "1.25rem",
              borderBottom: i < PROJECTS.length - 1 ? "1px solid var(--color-border)" : "none",
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-ink-3)", fontWeight: 600, paddingTop: "0.1rem" }}>
              {String(project.order).padStart(2, "0")}
            </span>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-ink)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.3rem" }}>
                {project.title}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-ink-3)", marginBottom: "0.75rem" }}>
                {project.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                {project.concepts.map((c) => (
                  <span key={c} className="tag">{c}</span>
                ))}
              </div>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.06em", color: DIFF_COLOR[project.difficulty], border: `1px solid ${DIFF_COLOR[project.difficulty]}`, padding: "0.2rem 0.5rem", flexShrink: 0 }}>
              {project.difficulty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
