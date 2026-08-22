import type { Metadata } from "next";
import { PHASES } from "@/lib/curriculum";
import { HomeCurriculumList } from "@/components/HomeCurriculumList";

export const metadata: Metadata = {
  title: "Curriculum",
  description: "Complete Python curriculum — 21 phases from beginner to advanced.",
};

export default function CurriculumPage() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "3rem 1.5rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "2rem",
          paddingBottom: "1.25rem",
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
            marginBottom: "0.5rem",
          }}
        >
          Curriculum · {PHASES.length} Phases
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.5rem",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "var(--color-ink)",
            lineHeight: 1.05,
            marginBottom: "0.75rem",
          }}
        >
          Python / From Scratch
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "var(--color-ink-3)",
            maxWidth: "520px",
          }}
        >
          Learn Python from zero to advanced. Click any phase to see lessons and
          track your progress.
        </p>
      </div>

      {/* Phase list with modal */}
      <HomeCurriculumList phases={PHASES} />
    </div>
  );
}
