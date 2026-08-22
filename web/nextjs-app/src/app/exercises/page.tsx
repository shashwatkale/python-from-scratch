import type { Metadata } from "next";
import { EXERCISES } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "Exercises",
  description: "Practice Python with exercises from beginner to interview level.",
};

const DIFF_COLOR: Record<string, string> = {
  beginner: "var(--color-accent-text)",
  easy: "#059669",
  medium: "#d97706",
  hard: "#dc2626",
  interview: "#7c3aed",
};

const DIFFICULTIES = ["beginner", "easy", "medium", "hard", "interview"] as const;

export default function ExercisesPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--color-border)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-3)", marginBottom: "0.5rem" }}>
          Catalog · {EXERCISES.length} Exercises
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-ink)", lineHeight: 1.05 }}>
          Exercises
        </h1>
      </div>

      {DIFFICULTIES.map((diff) => {
        const items = EXERCISES.filter((e) => e.difficulty === diff);
        if (items.length === 0) return null;
        return (
          <section key={diff} style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIFF_COLOR[diff], marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--color-border)" }}>
              {diff}
            </p>
            <div style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
              {items.map((ex, i) => (
                <div
                  key={ex.slug}
                  id={ex.slug}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "1rem",
                    alignItems: "center",
                    padding: "0.875rem 1.25rem",
                    borderBottom: i < items.length - 1 ? "1px solid var(--color-border)" : "none",
                  }}
                >
                  <div>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 600, color: "var(--color-ink)", marginBottom: "0.2rem" }}>
                      {ex.title}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-ink-3)", marginBottom: "0.5rem" }}>
                      {ex.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {ex.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.06em", color: DIFF_COLOR[diff], border: `1px solid ${DIFF_COLOR[diff]}`, padding: "0.2rem 0.5rem", flexShrink: 0 }}>
                    {diff}
                  </span>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
