// src/app/curriculum/[phase]/[lesson]/page.tsx — Interactive Python Lesson Detail Reader with High-Legibility Typography
import { PHASES } from "@/lib/curriculum";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { LessonSidebar } from "@/components/LessonSidebar";
import { LessonTOC } from "@/components/LessonTOC";
import { LessonMarkComplete } from "@/components/LessonMarkComplete";
import { InteractiveCodeRunner } from "@/components/InteractiveCodeRunner";
import { CodeBlock } from "@/components/CodeBlock";
import { getRichLessonDetail } from "@/data/curriculum";

interface Props {
  params: Promise<{ phase: string; lesson: string }>;
}

export function generateStaticParams() {
  const out: { phase: string; lesson: string }[] = [];
  for (const phase of PHASES) {
    for (const lesson of phase.lessons) {
      out.push({ phase: phase.slug, lesson: lesson.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { phase: phaseSlug, lesson: lessonSlug } = await params;
  const phase = PHASES.find((p) => p.slug === phaseSlug);
  const lesson = phase?.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return {};
  return {
    title: `${lesson.title} — Python From Scratch`,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: Props) {
  const { phase: phaseSlug, lesson: lessonSlug } = await params;
  const phase = PHASES.find((p) => p.slug === phaseSlug);
  if (!phase) notFound();

  const lessonIndex = phase.lessons.findIndex((l) => l.slug === lessonSlug);
  if (lessonIndex === -1) notFound();

  const lesson = phase.lessons[lessonIndex];
  const prevLesson = phase.lessons[lessonIndex - 1];
  const nextLesson = phase.lessons[lessonIndex + 1];

  // Retrieve rich, concrete, non-generic lesson detail
  const detail = getRichLessonDetail(phase.slug, lesson.slug, lesson.title);

  // Table of Contents sections
  const tocSections = [
    { id: "learning-objectives", label: "Learning Objectives" },
    { id: "the-problem", label: "The Problem" },
    { id: "the-concept", label: "The Concept" },
    { id: "interactive-example", label: "Interactive Code" },
    { id: "build-it", label: "Build It" },
    ...(detail.commonPitfalls ? [{ id: "common-pitfalls", label: "Common Pitfalls" }] : []),
    { id: "use-it", label: "Use It" },
    { id: "ship-it", label: "Ship It" },
    { id: "exercises", label: "Exercises" },
  ];

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      {/* ── 3-Column Centered Layout ───────────────────────────── */}
      <div className="curriculum-3col-layout">
        {/* ── Column 1: Left Sticky Sidebar ───────────────────── */}
        <LessonSidebar phase={phase} currentLesson={lesson} allPhases={PHASES} />

        {/* ── Column 2: Center Main Content Workspace ─────────── */}
        <main className="lesson-article-body">
          {/* Header Kicker */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.85rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-accent-text)",
            }}
          >
            <span>
              PHASE {String(phase.order).padStart(2, "0")} · LESSON {String(lesson.order).padStart(2, "0")}
            </span>
          </div>

          {/* Main Big Lesson Title */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              lineHeight: 1.02,
              color: "var(--color-ink)",
              marginBottom: "1.25rem",
            }}
          >
            {lesson.title}
          </h1>

          {/* Subtitle Quote Banner */}
          {detail.quote && (
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderLeft: "4px solid var(--color-accent)",
                padding: "1.15rem 1.45rem",
                marginBottom: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  color: "var(--color-ink)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {detail.quote}
              </p>
            </div>
          )}

          {/* Metadata Specs Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "1.25rem",
              padding: "1.15rem 1.35rem",
              backgroundColor: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              marginBottom: "2.5rem",
            }}
          >
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block", fontWeight: 600 }}>
                TYPE
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.92rem", fontWeight: 700, color: "var(--color-ink)", marginTop: "0.2rem", display: "block" }}>
                {detail.type}
              </span>
            </div>

            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block", fontWeight: 600 }}>
                LANGUAGE
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.92rem", fontWeight: 700, color: "var(--color-ink)", marginTop: "0.2rem", display: "block" }}>
                {detail.languages}
              </span>
            </div>

            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block", fontWeight: 600 }}>
                TIME
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.92rem", fontWeight: 700, color: "var(--color-ink)", marginTop: "0.2rem", display: "block" }}>
                {detail.estimatedTime}
              </span>
            </div>

            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block", fontWeight: 600 }}>
                PREREQUISITE
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.92rem", fontWeight: 700, color: "var(--color-ink)", marginTop: "0.2rem", display: "block" }}>
                {detail.prerequisites}
              </span>
            </div>
          </div>

          {/* ── Learning Objectives Box ──────────────────────────── */}
          <section
            id="learning-objectives"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1.5px solid var(--color-accent)",
              padding: "1.75rem 2rem",
              marginBottom: "2.75rem",
              scrollMarginTop: "5.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-accent-text)",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                marginBottom: "1rem",
              }}
            >
              <span>🎯</span>
              <span>Learning Objectives</span>
            </span>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {detail.objectives.map((obj, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1.05rem",
                    color: "var(--color-ink)",
                    lineHeight: 1.65,
                    display: "flex",
                    gap: "0.75rem",
                  }}
                >
                  <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>▪</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── The Problem Section ──────────────────────────────── */}
          <section id="the-problem">
            <h2>The Problem</h2>
            <p style={{ fontSize: "1.08rem", lineHeight: 1.8 }}>{detail.problem.statement}</p>
            {detail.problem.scenario && (
              <div
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderLeft: "3.5px solid var(--color-accent)",
                  padding: "1.15rem 1.45rem",
                  margin: "1.25rem 0 1.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--color-accent-text)",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Concrete Scenario
                </span>
                <p style={{ margin: 0, fontSize: "1.05rem", lineHeight: 1.65 }}>{detail.problem.scenario}</p>
              </div>
            )}
            <ul style={{ listStyle: "none", padding: 0, margin: "1.25rem 0" }}>
              {detail.problem.steps.map((step, i) => (
                <li key={i} style={{ marginBottom: "0.55rem", color: "var(--color-ink-2)", fontSize: "1.02rem", lineHeight: 1.6 }}>
                  {step}
                </li>
              ))}
            </ul>
          </section>

          {/* ── The Concept Section ──────────────────────────────── */}
          <section id="the-concept">
            <h2>The Concept</h2>
            <p style={{ fontSize: "1.08rem", lineHeight: 1.8 }}>{detail.concept.summary}</p>

            {/* Syntax Breakdown Visualizer */}
            {detail.concept.syntaxBreakdown && (
              <div
                style={{
                  backgroundColor: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  padding: "1.35rem",
                  margin: "1.75rem 0",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-ink-3)",
                    display: "block",
                    marginBottom: "0.65rem",
                  }}
                >
                  Syntax Anatomy
                </span>
                <pre
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.92rem",
                    backgroundColor: "var(--color-surface)",
                    padding: "0.85rem 1.15rem",
                    border: "1px solid var(--color-border)",
                    marginBottom: "1.15rem",
                    color: "var(--color-accent-text)",
                    lineHeight: 1.5,
                  }}
                >
                  {detail.concept.syntaxBreakdown.syntax}
                </pre>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {detail.concept.syntaxBreakdown.parts.map((p) => (
                    <div key={p.label} style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                      <code style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink)", fontWeight: 700 }}>
                        {p.label}
                      </code>
                      <span style={{ color: "var(--color-ink-3)" }}> — </span>
                      <span style={{ color: "var(--color-ink-2)" }}>{p.explanation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", margin: "1.25rem 0" }}>
              {detail.concept.keyPoints.map((point, i) => (
                <li key={i} style={{ marginBottom: "0.5rem", fontSize: "1.05rem", lineHeight: 1.7 }}>
                  {point}
                </li>
              ))}
            </ul>
          </section>

          {/* ── Interactive Code Playground ──────────────────────── */}
          <section id="interactive-example">
            <h2>Interactive Code Playground</h2>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
              Experiment with this runnable code example. Click <strong>Run Code</strong> to execute and observe the terminal stdout output:
            </p>
            <InteractiveCodeRunner
              initialCode={detail.concept.codeExample.code}
              expectedOutput={detail.concept.codeExample.expectedOutput}
              title={detail.concept.codeExample.title}
            />
          </section>

          {/* ── Build It Section ─────────────────────────────────── */}
          <section id="build-it">
            <h2>Build It Step-by-Step</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem", marginTop: "1.25rem" }}>
              {detail.buildSteps.map((step, idx) => (
                <div key={idx}>
                  <h3>{step.title}</h3>
                  <p style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>{step.explanation}</p>
                  {step.code && (
                    <CodeBlock
                      code={step.code.code}
                      language={step.code.language}
                      showLineNumbers
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── Common Pitfalls Section ─────────────────────────── */}
          {detail.commonPitfalls && (
            <section id="common-pitfalls">
              <h2>Common Failure Modes &amp; Traps</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1.25rem" }}>
                {detail.commonPitfalls.map((pitfall, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderLeft: "4px solid #dc2626",
                      padding: "1.15rem 1.45rem",
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.92rem",
                        fontWeight: 700,
                        color: "#dc2626",
                        margin: "0 0 0.5rem",
                      }}
                    >
                      ⚠️ {pitfall.pitfall}
                    </h4>
                    <p style={{ margin: "0 0 0.5rem", fontSize: "0.98rem", color: "var(--color-ink-2)", lineHeight: 1.6 }}>
                      <strong>Why it fails:</strong> {pitfall.whyItFails}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.98rem", color: "var(--color-accent-text)", lineHeight: 1.6 }}>
                      <strong>How to fix:</strong> {pitfall.howToFix}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Use It Section ──────────────────────────────────── */}
          {detail.useIt && (
            <section id="use-it">
              <h2>Use It in Production</h2>
              <ul style={{ listStyle: "disc", paddingLeft: "1.5rem" }}>
                {detail.useIt.map((item, i) => (
                  <li key={i} style={{ marginBottom: "0.6rem", fontSize: "1.05rem", lineHeight: 1.7 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── Ship It Section ─────────────────────────────────── */}
          {detail.shipIt && (
            <section id="ship-it">
              <h2>Ship It</h2>
              <ul style={{ listStyle: "disc", paddingLeft: "1.5rem" }}>
                {detail.shipIt.map((item, i) => (
                  <li key={i} style={{ marginBottom: "0.6rem", fontSize: "1.05rem", lineHeight: 1.7 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── Exercises Section ───────────────────────────────── */}
          {detail.exercises && (
            <section id="exercises">
              <h2>Exercises &amp; Review Questions</h2>
              <ul style={{ listStyle: "decimal", paddingLeft: "1.5rem" }}>
                {detail.exercises.map((item, i) => (
                  <li key={i} style={{ marginBottom: "0.75rem", fontSize: "1.05rem", lineHeight: 1.7 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── Mark Complete Checkpoint ────────────────────────── */}
          <div style={{ padding: "2.75rem 0", borderTop: "1px solid var(--color-border)", marginTop: "3.5rem" }}>
            <LessonMarkComplete phaseSlug={phase.slug} lessonSlug={lesson.slug} />
          </div>

          {/* ── Prev / Next Navigation ──────────────────────────── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.25rem",
              marginTop: "1.5rem",
            }}
          >
            {prevLesson ? (
              <Link
                href={`/curriculum/${phase.slug}/${prevLesson.slug}/`}
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  padding: "1.35rem 1.65rem",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
                className="hover:border-accent"
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", marginBottom: "0.35rem", fontWeight: 600 }}>
                  ← Previous Lesson
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-ink)" }}>
                  {prevLesson.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                href={`/curriculum/${phase.slug}/${nextLesson.slug}/`}
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  padding: "1.35rem 1.65rem",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "right",
                }}
                className="hover:border-accent"
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", marginBottom: "0.35rem", fontWeight: 600 }}>
                  Next Lesson →
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-accent-text)" }}>
                  {nextLesson.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </main>

        {/* ── Column 3: Right Sticky Table of Contents ────────── */}
        <LessonTOC sections={tocSections} />
      </div>
    </div>
  );
}
