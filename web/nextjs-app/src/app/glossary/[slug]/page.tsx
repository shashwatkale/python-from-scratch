// src/app/glossary/[slug]/page.tsx — Python Glossary Term Detail Page
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { GLOSSARY_TERMS, getGlossaryTermBySlug } from "@/data/glossary";
import { CodeBlock } from "@/components/CodeBlock";
import type { TermDifficulty } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return GLOSSARY_TERMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTermBySlug(slug);
  if (!term) return {};
  return {
    title: `${term.term} — Python Glossary`,
    description: term.definition,
  };
}

const DIFF_COLORS: Record<TermDifficulty, string> = {
  beginner: "var(--color-accent-text)",
  intermediate: "#d97706",
  advanced: "#dc2626",
};

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params;
  const term = getGlossaryTermBySlug(slug);
  if (!term) notFound();

  const termIndex = GLOSSARY_TERMS.findIndex((t) => t.slug === slug);
  const prevTerm = GLOSSARY_TERMS[termIndex - 1];
  const nextTerm = GLOSSARY_TERMS[termIndex + 1];

  // Lookup related terms objects
  const relatedTermObjects = term.relatedTerms
    .map((rSlug) => getGlossaryTermBySlug(rSlug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "3rem 1.5rem 6rem",
      }}
    >
      {/* ── Breadcrumb ─────────────────────────────────────────── */}
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
        <Link
          href="/glossary/"
          style={{ color: "var(--color-ink-3)", textDecoration: "none" }}
        >
          Glossary
        </Link>
        {" / "}
        <span>{term.categoryLabel}</span>
        {" / "}
        <span style={{ color: "var(--color-ink)" }}>{term.term}</span>
      </p>

      {/* ── Title Header ───────────────────────────────────────── */}
      <div
        style={{
          marginBottom: "2rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginBottom: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-accent-text)",
              backgroundColor: "var(--color-accent-soft)",
              padding: "0.2rem 0.5rem",
              border: "1px solid var(--color-accent)",
            }}
          >
            {term.categoryLabel}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: DIFF_COLORS[term.difficulty],
              border: `1px solid ${DIFF_COLORS[term.difficulty]}`,
              padding: "0.2rem 0.5rem",
            }}
          >
            {term.difficulty}
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "var(--color-ink)",
            lineHeight: 1.05,
            marginBottom: "0.75rem",
          }}
        >
          {term.term}
        </h1>

        {/* Crisp Definition Callout Box */}
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            borderLeft: "4px solid var(--color-accent)",
            borderTop: "1px solid var(--color-border)",
            borderRight: "1px solid var(--color-border)",
            borderBottom: "1px solid var(--color-border)",
            padding: "1.25rem 1.5rem",
            marginTop: "1.25rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.15rem",
              fontWeight: 500,
              color: "var(--color-ink)",
              lineHeight: 1.6,
            }}
          >
            {term.definition}
          </p>
        </div>
      </div>

      {/* ── Explanation & Details ──────────────────────────────── */}
      {term.explanation && (
        <section style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-ink-3)",
              marginBottom: "0.75rem",
            }}
          >
            Concept Breakdown
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--color-ink-2)",
              lineHeight: 1.7,
            }}
          >
            {term.explanation}
          </p>
        </section>
      )}

      {/* ── Syntax Block (if present) ──────────────────────────── */}
      {term.syntax && (
        <section style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-ink-3)",
              marginBottom: "0.75rem",
            }}
          >
            Syntax
          </h2>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              padding: "0.75rem 1.25rem",
              backgroundColor: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              color: "var(--color-accent-text)",
              whiteSpace: "pre-wrap",
            }}
          >
            {term.syntax}
          </div>
        </section>
      )}

      {/* ── Example Code & Output ──────────────────────────────── */}
      {term.example && (
        <section style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-ink-3)",
              marginBottom: "0.75rem",
            }}
          >
            Python Example
          </h2>
          <CodeBlock code={term.example} language="python" showLineNumbers />

          {term.output && (
            <div style={{ marginTop: "1rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-ink-3)",
                  marginBottom: "0.35rem",
                }}
              >
                Output:
              </p>
              <pre
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-ink)",
                  overflowX: "auto",
                  lineHeight: 1.5,
                }}
              >
                {term.output}
              </pre>
            </div>
          )}
        </section>
      )}

      {/* ── Why It Matters ─────────────────────────────────────── */}
      <section
        style={{
          marginBottom: "2.5rem",
          padding: "1.25rem 1.5rem",
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-ink)",
            marginBottom: "0.4rem",
          }}
        >
          Why It Matters in Practice
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.92rem",
            color: "var(--color-ink-2)",
            lineHeight: 1.6,
          }}
        >
          {term.whyItMatters}
        </p>
      </section>

      {/* ── Dedicated Comparison Table (if present) ────────────── */}
      {term.comparison && (
        <section
          style={{
            marginBottom: "2.5rem",
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface)",
          }}
        >
          <div
            style={{
              padding: "0.75rem 1.25rem",
              backgroundColor: "var(--color-surface-2)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-ink)",
              }}
            >
              {term.comparison.title}
            </h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {term.comparison.differences.map((diff, idx) => (
              <div
                key={diff.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(140px, 200px) 1fr",
                  gap: "1rem",
                  padding: "0.85rem 1.25rem",
                  borderBottom:
                    idx < (term.comparison?.differences.length ?? 0) - 1
                      ? "1px solid var(--color-border)"
                      : "none",
                  alignItems: "start",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--color-accent-text)",
                  }}
                >
                  {diff.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "var(--color-ink-2)",
                    lineHeight: 1.5,
                  }}
                >
                  {diff.description}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Related Terms ──────────────────────────────────────── */}
      {relatedTermObjects.length > 0 && (
        <section style={{ marginBottom: "2.5rem" }}>
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-ink-3)",
              marginBottom: "0.75rem",
            }}
          >
            Related Terms
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {relatedTermObjects.map((rel) => (
              <Link
                key={rel.slug}
                href={`/glossary/${rel.slug}/`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.4rem 0.8rem",
                  border: "1px solid var(--color-border-2)",
                  backgroundColor: "var(--color-surface)",
                  textDecoration: "none",
                  transition: "border-color 0.12s, color 0.12s",
                }}
                className="hover:border-accent hover:text-accent"
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--color-ink)",
                  }}
                >
                  {rel.term}
                </span>
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
        </section>
      )}

      {/* ── Related Lessons (Curriculum Bridge) ─────────────────── */}
      {term.relatedLessons.length > 0 && (
        <section
          style={{
            marginBottom: "3rem",
            padding: "1.25rem",
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-accent-text)",
              marginBottom: "0.75rem",
            }}
          >
            📖 Related Curriculum Lessons
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {term.relatedLessons.map((lesson) => (
              <Link
                key={lesson.lessonSlug}
                href={`/curriculum/${lesson.phaseSlug}/${lesson.lessonSlug}/`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.6rem 0.85rem",
                  backgroundColor: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  textDecoration: "none",
                }}
                className="hover:border-accent"
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--color-ink)",
                  }}
                >
                  {lesson.title}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--color-accent-text)",
                    textTransform: "uppercase",
                  }}
                >
                  Open Lesson →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Navigation Footer ──────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        {prevTerm ? (
          <Link
            href={`/glossary/${prevTerm.slug}/`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--color-ink-3)",
              textDecoration: "none",
            }}
          >
            ← {prevTerm.term}
          </Link>
        ) : (
          <Link
            href="/glossary/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--color-ink-3)",
              textDecoration: "none",
            }}
          >
            ← All Terms
          </Link>
        )}

        <Link href="/glossary/" className="btn-ghost" style={{ fontSize: "0.6rem", padding: "0.35rem 0.75rem" }}>
          Glossary Index
        </Link>

        {nextTerm ? (
          <Link
            href={`/glossary/${nextTerm.slug}/`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--color-accent-text)",
              textDecoration: "none",
            }}
          >
            {nextTerm.term} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

