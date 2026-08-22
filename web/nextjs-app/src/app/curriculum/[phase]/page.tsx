import { PHASES } from "@/lib/curriculum";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ phase: string }>;
}

export function generateStaticParams() {
  return PHASES.map((p) => ({ phase: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { phase: slug } = await params;
  const phase = PHASES.find((p) => p.slug === slug);
  if (!phase) return {};
  return { title: phase.title, description: phase.description };
}

const DIFF_COLOR: Record<string, string> = {
  beginner: "var(--color-accent-text)",
  intermediate: "#d97706",
  advanced: "#dc2626",
};

export default async function PhasePage({ params }: Props) {
  const { phase: slug } = await params;
  const phase = PHASES.find((p) => p.slug === slug);
  if (!phase) notFound();

  const prev = PHASES.find((p) => p.order === phase.order - 1);
  const next = PHASES.find((p) => p.order === phase.order + 1);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Breadcrumb */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--color-ink-3)",
          marginBottom: "1.5rem",
        }}
      >
        <Link href="/curriculum/" style={{ color: "var(--color-ink-3)", textDecoration: "none" }}>
          Curriculum
        </Link>
        {" / "}
        <span style={{ color: "var(--color-ink)" }}>
          Phase {String(phase.order).padStart(2, "0")}
        </span>
      </p>

      {/* Title block */}
      <div
        style={{
          marginBottom: "2.5rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.25rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--color-ink)",
              lineHeight: 1.05,
            }}
          >
            {phase.title}
          </h1>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: DIFF_COLOR[phase.difficulty],
              border: `1px solid ${DIFF_COLOR[phase.difficulty]}`,
              padding: "0.2rem 0.5rem",
              flexShrink: 0,
            }}
          >
            {phase.difficulty}
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "var(--color-ink-3)",
          }}
        >
          {phase.description}
        </p>
      </div>

      {/* Lessons */}
      {phase.lessons.length > 0 ? (
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
              gridTemplateColumns: "2.5rem 1fr auto",
              gap: "1rem",
              padding: "0.5rem 1.25rem",
              borderBottom: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface-2)",
            }}
          >
            {["#", "Lesson", ""].map((h, i) => (
              <span
                key={i}
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

          {phase.lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/curriculum/${phase.slug}/${lesson.slug}/`}
              style={{
                display: "grid",
                gridTemplateColumns: "2.5rem 1fr auto",
                gap: "1rem",
                alignItems: "center",
                padding: "0.875rem 1.25rem",
                borderBottom: "1px solid var(--color-border)",
                textDecoration: "none",
                transition: "background-color 0.12s",
              }}
              className="phase-row"
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--color-ink-3)",
                }}
              >
                {String(lesson.order).padStart(2, "0")}
              </span>
              <div>
                <p
                  className="phase-row-title"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--color-ink)",
                    marginBottom: "0.15rem",
                    transition: "color 0.12s",
                  }}
                >
                  {lesson.title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "var(--color-ink-3)",
                  }}
                >
                  {lesson.description}
                </p>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--color-accent-text)",
                }}
              >
                →
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div
          style={{
            border: "1px dashed var(--color-border-2)",
            padding: "3rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-ink-3)",
              marginBottom: "0.5rem",
            }}
          >
            Lessons coming soon
          </p>
          <a
            href="https://github.com/shashwatkale/python-from-scratch"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--color-accent-text)",
              textDecoration: "none",
            }}
          >
            Contribute on GitHub →
          </a>
        </div>
      )}

      {/* Phase nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2.5rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        {prev ? (
          <Link
            href={`/curriculum/${prev.slug}/`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--color-ink-3)",
              textDecoration: "none",
            }}
          >
            ← {prev.title}
          </Link>
        ) : <span />}
        {next && (
          <Link
            href={`/curriculum/${next.slug}/`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--color-ink-3)",
              textDecoration: "none",
            }}
          >
            {next.title} →
          </Link>
        )}
      </div>
    </div>
  );
}
