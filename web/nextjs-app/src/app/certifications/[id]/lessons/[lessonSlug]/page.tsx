// src/app/certifications/[id]/lessons/[lessonSlug]/page.tsx — Interactive Claude Certification Lesson Reader
"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCertificationTrackById,
  getCertificationLesson,
} from "@/data/certifications";
import { CodeBlock } from "@/components/CodeBlock";

interface Props {
  params: Promise<{ id: string; lessonSlug: string }>;
}

export default function CertificationLessonPage({ params }: Props) {
  const { id, lessonSlug } = use(params);
  const track = getCertificationTrackById(id);
  const lesson = getCertificationLesson(id, lessonSlug);

  if (!track || !lesson) {
    notFound();
  }

  // Local progress state
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);
  // Knowledge check interactive state: mapping questionId -> selectedOptionId
  const [selectedKCOptions, setSelectedKCOptions] = useState<Record<string, string>>({});
  // Knowledge check submitted state: mapping questionId -> boolean
  const [submittedKCs, setSubmittedKCs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`cert_progress_${track.id}`);
      if (stored) {
        setCompletedSlugs(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, [track.id]);

  const isCompleted = completedSlugs.includes(lesson.slug);

  const toggleComplete = () => {
    try {
      const updated = isCompleted
        ? completedSlugs.filter((s) => s !== lesson.slug)
        : [...completedSlugs, lesson.slug];
      setCompletedSlugs(updated);
      localStorage.setItem(`cert_progress_${track.id}`, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSelectKCOption = (qId: string, optId: string) => {
    if (submittedKCs[qId]) return;
    setSelectedKCOptions((prev) => ({ ...prev, [qId]: optId }));
  };

  const handleSubmitKC = (qId: string) => {
    setSubmittedKCs((prev) => ({ ...prev, [qId]: true }));
  };

  // Find prev/next lesson
  const currentIdx = track.lessons.findIndex((l) => l.slug === lesson.slug);
  const prevLesson = track.lessons[currentIdx - 1];
  const nextLesson = track.lessons[currentIdx + 1];

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      {/* ── 1. Top Mandatory Independent Learning Disclaimer Bar ── */}
      <div
        style={{
          backgroundColor: "var(--color-surface-2)",
          borderBottom: "1px solid var(--color-border)",
          padding: "0.65rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--color-ink-2)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: "var(--color-accent-text)" }}>⚠️ Independent Learning Material — Not Official Anthropic Training.</strong>{" "}
          This content is an independently created preparation resource for the {track.title} ({track.code}) certification. It is NOT produced, endorsed, or affiliated with Anthropic. All practice questions are original. Official Anthropic documentation is the authoritative source for product facts.
        </p>
      </div>

      {/* ── 2. Two-Column Workspace (Sidebar + Lesson Content) ── */}
      <div
        className="lesson-workspace"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "2rem 1.5rem 6rem",
        }}
      >
        {/* ── Left Sticky Sidebar: Lesson Path Roadmap ──────── */}
        <aside
          style={{
            position: "sticky",
            top: "5rem",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxHeight: "calc(100vh - 6rem)",
            overflowY: "auto",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-accent-text)",
                fontWeight: 700,
                display: "block",
                marginBottom: "0.2rem",
              }}
            >
              Track Blueprint
            </span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--color-ink)",
                margin: 0,
              }}
            >
              {track.title}
            </h3>
          </div>

          {/* Lesson List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {track.lessons.map((item) => {
              const isActive = item.slug === lesson.slug;
              const isItemDone = completedSlugs.includes(item.slug);

              return (
                <Link
                  key={item.slug}
                  href={`/certifications/${track.id}/lessons/${item.slug}/`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "24px 1fr",
                    gap: "0.5rem",
                    alignItems: "baseline",
                    padding: "0.6rem 0.65rem",
                    backgroundColor: isActive
                      ? "var(--color-accent-soft)"
                      : "transparent",
                    borderLeft: isActive
                      ? "3px solid var(--color-accent)"
                      : "3px solid transparent",
                    textDecoration: "none",
                  }}
                  className="hover:bg-surface-2"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: isItemDone ? "var(--color-accent)" : isActive ? "var(--color-accent-text)" : "var(--color-ink-3)",
                    }}
                  >
                    {isItemDone ? "✓" : item.order.toString().padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.92rem",
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? "var(--color-ink)" : "var(--color-ink-2)",
                      lineHeight: 1.35,
                    }}
                  >
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>

          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "0.85rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Link
              href={`/certifications/${track.id}/practice/`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                color: "var(--color-accent-text)",
                textDecoration: "none",
                fontWeight: 700,
              }}
              className="hover:underline"
            >
              ⚡ Practice Question Bank →
            </Link>
            <Link
              href={`/certifications/${track.id}/mock/`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                color: "var(--color-accent-text)",
                textDecoration: "none",
                fontWeight: 700,
              }}
              className="hover:underline"
            >
              ⏱ 120-Min Mock Exam Simulator →
            </Link>
            <Link
              href={`/certifications/${track.id}/`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--color-ink-3)",
                textDecoration: "none",
                marginTop: "0.25rem",
              }}
              className="hover:underline"
            >
              ← Back to Track Overview
            </Link>
          </div>
        </aside>

        {/* ── Right Main Content Area ───────────────────────── */}
        <main>
          {/* Masthead */}
          <div style={{ marginBottom: "2.5rem" }}>
            {/* Breadcrumb Navigation */}
            <nav
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-ink-3)",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/certifications/"
                style={{ color: "var(--color-accent-text)", textDecoration: "none" }}
                className="hover:underline"
              >
                Certifications
              </Link>
              <span>/</span>
              <Link
                href={`/certifications/${track.id}/`}
                style={{ color: "var(--color-accent-text)", textDecoration: "none" }}
                className="hover:underline"
              >
                {track.code}
              </Link>
              <span>/</span>
              <span style={{ color: "var(--color-ink)" }}>Lesson {lesson.order.toString().padStart(2, "0")}</span>
            </nav>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                textTransform: "uppercase",
                lineHeight: 1.05,
                color: "var(--color-ink)",
                marginBottom: "1rem",
              }}
            >
              {lesson.title}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.1rem",
                color: "var(--color-ink-2)",
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}
            >
              {lesson.leadParagraph}
            </p>

            {/* Metadata Badges */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "1.25rem",
                padding: "1rem 1.25rem",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block", fontWeight: 600 }}>
                  DIFFICULTY
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.92rem", fontWeight: 700, color: "var(--color-ink)", marginTop: "0.2rem", display: "block" }}>
                  {lesson.kind === "orientation" ? "Foundational" : "Core Track"}
                </span>
              </div>

              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block", fontWeight: 600 }}>
                  ESTIMATED TIME
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.92rem", fontWeight: 700, color: "var(--color-accent)", marginTop: "0.2rem", display: "block" }}>
                  {lesson.durationMin || 40} minutes
                </span>
              </div>

              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block", fontWeight: 600 }}>
                  PREREQUISITES
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.92rem", fontWeight: 700, color: "var(--color-ink)", marginTop: "0.2rem", display: "block" }}>
                  {lesson.order === 1 ? "None" : `Lesson ${(lesson.order - 1).toString().padStart(2, "0")}`}
                </span>
              </div>

              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block", fontWeight: 600 }}>
                  DOMAIN
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-ink)", marginTop: "0.2rem", display: "block" }}>
                  {lesson.domains?.[0] || "Foundations"}
                </span>
              </div>
            </div>
          </div>

          {/* ── Learning Objectives ─────────────────────────── */}
          {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1.5px solid var(--color-accent)",
                padding: "1.5rem 1.75rem",
                marginBottom: "2.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-accent-text)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  marginBottom: "0.85rem",
                }}
              >
                <span>🎯</span>
                <span>Learning Objectives</span>
              </span>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {lesson.learningObjectives.map((obj, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "1.05rem",
                      color: "var(--color-ink)",
                      lineHeight: 1.6,
                      display: "flex",
                      gap: "0.75rem",
                    }}
                  >
                    <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>▪</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Lesson Markdown Content ─────────────────────── */}
          <div
            className="prose"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              color: "var(--color-ink)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            {lesson.contentMarkdown.split("\n\n").map((para, idx) => {
              if (para.startsWith("# ")) {
                return null;
              }
              if (para.startsWith("### ")) {
                return (
                  <h2
                    key={idx}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.6rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "var(--color-ink)",
                      marginTop: "2.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {para.replace("### ", "")}
                  </h2>
                );
              }
              if (para.startsWith("```")) {
                const lines = para.split("\n");
                const lang = lines[0].replace("```", "") || "python";
                const code = lines.slice(1, -1).join("\n");
                return (
                  <div key={idx} style={{ margin: "1.5rem 0" }}>
                    <CodeBlock code={code} language={lang} />
                  </div>
                );
              }
              return (
                <p key={idx} style={{ marginBottom: "1.25rem" }}>
                  {para}
                </p>
              );
            })}
          </div>

          {/* ── Product Landscape Table ─────────────────────── */}
          {lesson.productLandscape && lesson.productLandscape.length > 0 && (
            <div style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                  marginBottom: "1rem",
                }}
              >
                The Product Landscape
              </h2>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <thead>
                    <tr style={{ backgroundColor: "var(--color-surface-2)", borderBottom: "1.5px solid var(--color-border)", textAlign: "left" }}>
                      <th style={{ padding: "0.85rem 1rem", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--color-ink)", textTransform: "uppercase" }}>Surface</th>
                      <th style={{ padding: "0.85rem 1rem", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--color-ink)", textTransform: "uppercase" }}>What It Is</th>
                      <th style={{ padding: "0.85rem 1rem", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--color-ink)", textTransform: "uppercase" }}>Typical User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lesson.productLandscape.map((p, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid var(--color-border)" }}>
                        <td style={{ padding: "0.85rem 1rem", fontFamily: "var(--font-mono)", fontSize: "0.9rem", fontWeight: 700, color: "var(--color-accent-text)" }}>{p.surface}</td>
                        <td style={{ padding: "0.85rem 1rem", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-ink)" }}>{p.whatItIs}</td>
                        <td style={{ padding: "0.85rem 1rem", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-ink-2)" }}>{p.typicalUser}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Real-World Scenario ─────────────────────────── */}
          {lesson.scenarioData && (
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderLeft: "4px solid var(--color-accent)",
                padding: "1.5rem 1.75rem",
                marginBottom: "3rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--color-accent-text)",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                {lesson.scenarioData.title}
              </span>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--color-ink)", lineHeight: 1.65, marginBottom: "1rem" }}>
                <strong>Scenario:</strong> {lesson.scenarioData.context}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", padding: "1rem", backgroundColor: "var(--color-surface-2)", border: "1px solid var(--color-border)" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#dc2626", fontWeight: 700, textTransform: "uppercase" }}>⚠️ What went wrong:</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", color: "var(--color-ink-2)", margin: "0.2rem 0 0", lineHeight: 1.5 }}>
                    {lesson.scenarioData.whatWentWrong}
                  </p>
                </div>
                <div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#059669", fontWeight: 700, textTransform: "uppercase" }}>✅ Correct engineering approach:</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", color: "var(--color-ink)", margin: "0.2rem 0 0", lineHeight: 1.5 }}>
                    {lesson.scenarioData.correctApproach}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Good vs. Bad Comparison Cards ───────────────── */}
          {lesson.examples && lesson.examples.length > 0 && (
            <div style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                  marginBottom: "1rem",
                }}
              >
                Good vs. Bad Approach
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {lesson.examples.map((ex, idx) => (
                  <div key={idx} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
                    <div style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderTop: "3px solid #dc2626", padding: "1.25rem" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "#dc2626", display: "block", marginBottom: "0.5rem" }}>
                        {ex.bad.label}
                      </span>
                      <pre style={{ fontFamily: "var(--font-mono)", fontSize: "0.88rem", backgroundColor: "var(--color-surface-2)", padding: "0.75rem", border: "1px solid var(--color-border)", margin: "0.5rem 0", whiteSpace: "pre-wrap" }}>
                        {ex.bad.codeOrPrompt}
                      </pre>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-ink-2)", margin: "0.5rem 0 0" }}>
                        {ex.bad.explanation}
                      </p>
                    </div>

                    <div style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderTop: "3px solid #059669", padding: "1.25rem" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "#059669", display: "block", marginBottom: "0.5rem" }}>
                        {ex.good.label}
                      </span>
                      <pre style={{ fontFamily: "var(--font-mono)", fontSize: "0.88rem", backgroundColor: "var(--color-surface-2)", padding: "0.75rem", border: "1px solid var(--color-border)", margin: "0.5rem 0", whiteSpace: "pre-wrap" }}>
                        {ex.good.codeOrPrompt}
                      </pre>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-ink-2)", margin: "0.5rem 0 0" }}>
                        {ex.good.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Practical Prompt Example ────────────────────── */}
          {lesson.practicalPromptExample && (
            <div style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "1.5rem", marginBottom: "3rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-accent-text)", display: "block", marginBottom: "0.5rem" }}>
                Practical Claude Example · {lesson.practicalPromptExample.title}
              </span>
              <pre style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", backgroundColor: "var(--color-surface-2)", padding: "1rem", border: "1px solid var(--color-border)", whiteSpace: "pre-wrap", color: "var(--color-ink)", lineHeight: 1.5 }}>
                {lesson.practicalPromptExample.prompt}
              </pre>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", color: "var(--color-ink-2)", margin: "0.75rem 0 0", lineHeight: 1.6 }}>
                {lesson.practicalPromptExample.explanation}
              </p>
            </div>
          )}

          {/* ── Code Snippet Highlight ──────────────────────── */}
          {lesson.codeSnippet && (
            <div style={{ marginBottom: "3rem" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-ink-3)",
                  marginBottom: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Python/API Example · {lesson.codeSnippet.filename}</span>
                <span>{lesson.codeSnippet.language}</span>
              </div>
              <CodeBlock
                code={lesson.codeSnippet.code}
                language={lesson.codeSnippet.language}
                filename={lesson.codeSnippet.filename}
                showLineNumbers
              />
              {lesson.codeSnippet.note && (
                <div style={{ marginTop: "0.75rem", padding: "0.75rem 1rem", backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-ink-2)" }}>
                  💡 <strong>Note:</strong> {lesson.codeSnippet.note}
                </div>
              )}
            </div>
          )}

          {/* ── Common Mistakes & Best Practices Side-by-Side ─ */}
          {(lesson.commonMistakes || lesson.bestPractices) && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
              {lesson.commonMistakes && (
                <div style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderTop: "3.5px solid #dc2626", padding: "1.5rem" }}>
                  <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.88rem", fontWeight: 700, textTransform: "uppercase", color: "#dc2626", margin: "0 0 1rem" }}>
                    ⚠️ Common Mistakes
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {lesson.commonMistakes.map((m, i) => (
                      <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", color: "var(--color-ink-2)", lineHeight: 1.55, display: "flex", gap: "0.5rem" }}>
                        <span style={{ color: "#dc2626" }}>×</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {lesson.bestPractices && (
                <div style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderTop: "3.5px solid #059669", padding: "1.5rem" }}>
                  <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.88rem", fontWeight: 700, textTransform: "uppercase", color: "#059669", margin: "0 0 1rem" }}>
                    ✅ Best Practices
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {lesson.bestPractices.map((b, i) => (
                      <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", color: "var(--color-ink)", lineHeight: 1.55, display: "flex", gap: "0.5rem" }}>
                        <span style={{ color: "#059669" }}>✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* ── Key Takeaways ───────────────────────────────── */}
          {lesson.keyTakeaways && (
            <div style={{ backgroundColor: "var(--color-surface-2)", border: "1px solid var(--color-border)", padding: "1.5rem 1.75rem", marginBottom: "3rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-accent-text)", display: "block", marginBottom: "0.75rem" }}>
                Key Takeaways
              </span>
              <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", margin: 0 }}>
                {lesson.keyTakeaways.map((k, i) => (
                  <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "1.02rem", color: "var(--color-ink)", marginBottom: "0.5rem", lineHeight: 1.6 }}>
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Practice Exercises (A, B, C, D) ─────────────── */}
          {((lesson.exercisesList && lesson.exercisesList.length > 0) || (lesson.exercises && lesson.exercises.length > 0)) && (
            <div style={{ marginBottom: "3.5rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                  marginBottom: "1.25rem",
                }}
              >
                Practice Exercises
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {(lesson.exercisesList || lesson.exercises || []).map((ex) => (
                  <div key={ex.id} style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "1.5rem" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "var(--color-ink)", margin: "0 0 0.5rem" }}>
                      {ex.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-ink-2)", marginBottom: "0.85rem", lineHeight: 1.6 }}>
                      {ex.description}
                    </p>
                    <ul style={{ listStyle: "decimal", paddingLeft: "1.25rem", margin: 0 }}>
                      {ex.tasks.map((task, tidx) => (
                        <li key={tidx} style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", color: "var(--color-ink)", marginBottom: "0.4rem", lineHeight: 1.5 }}>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Interactive Knowledge Check (Q1, Q2, Q3, Q4) ─ */}
          {((lesson.knowledgeChecksList && lesson.knowledgeChecksList.length > 0) || (lesson.knowledgeChecks && lesson.knowledgeChecks.length > 0)) && (
            <div style={{ marginBottom: "3.5rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                  marginBottom: "0.5rem",
                }}
              >
                Interactive Knowledge Checks
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.02rem", color: "var(--color-ink-2)", marginBottom: "1.5rem" }}>
                Test your conceptual understanding. Select your answer and submit to review the engineering rationale.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                {(lesson.knowledgeChecksList || lesson.knowledgeChecks || []).map((kc, qIndex) => {
                  const selectedOpt = selectedKCOptions[kc.id];
                  const isSubmitted = submittedKCs[kc.id];
                  const isCorrect = selectedOpt === kc.correctAnswer;

                  return (
                    <div
                      key={kc.id}
                      style={{
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid",
                        borderColor: isSubmitted ? (isCorrect ? "#059669" : "#dc2626") : "var(--color-border)",
                        padding: "1.75rem",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-accent-text)", textTransform: "uppercase" }}>
                          Question {qIndex + 1}
                        </span>
                        {isSubmitted && (
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 700, color: isCorrect ? "#059669" : "#dc2626" }}>
                            {isCorrect ? "✓ Correct" : "× Incorrect"}
                          </span>
                        )}
                      </div>

                      <p style={{ fontFamily: "var(--font-body)", fontSize: "1.08rem", fontWeight: 600, color: "var(--color-ink)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
                        {kc.question}
                      </p>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.25rem" }}>
                        {kc.options.map((opt) => {
                          const isOptSelected = selectedOpt === opt.id;
                          const isOptCorrect = opt.id === kc.correctAnswer;

                          let bg = "var(--color-surface-2)";
                          let border = "var(--color-border)";
                          if (isSubmitted) {
                            if (isOptCorrect) {
                              bg = "rgba(5, 150, 105, 0.1)";
                              border = "#059669";
                            } else if (isOptSelected && !isCorrect) {
                              bg = "rgba(220, 38, 38, 0.1)";
                              border = "#dc2626";
                            }
                          } else if (isOptSelected) {
                            bg = "var(--color-accent-soft)";
                            border = "var(--color-accent)";
                          }

                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleSelectKCOption(kc.id, opt.id)}
                              disabled={isSubmitted}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "0.75rem",
                                padding: "0.85rem 1.15rem",
                                backgroundColor: bg,
                                border: `1.5px solid ${border}`,
                                color: "var(--color-ink)",
                                textAlign: "left",
                                cursor: isSubmitted ? "default" : "pointer",
                                minHeight: "48px",
                              }}
                            >
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", fontWeight: 700, marginTop: "0.1rem" }}>
                                {opt.id})
                              </span>
                              <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.5 }}>
                                {opt.text}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {!isSubmitted ? (
                        <button
                          disabled={!selectedOpt}
                          onClick={() => handleSubmitKC(kc.id)}
                          className="btn-primary"
                          style={{
                            padding: "0.6rem 1.4rem",
                            fontSize: "0.78rem",
                            opacity: !selectedOpt ? 0.4 : 1,
                            cursor: !selectedOpt ? "not-allowed" : "pointer",
                          }}
                        >
                          Check Answer →
                        </button>
                      ) : (
                        <div style={{ padding: "1rem 1.25rem", backgroundColor: "var(--color-surface-2)", borderLeft: `3.5px solid ${isCorrect ? "#059669" : "#dc2626"}` }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: isCorrect ? "#059669" : "#dc2626", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>
                            {isCorrect ? "Correct Engineering Rationale:" : "Explanation & Key Concept:"}
                          </span>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", color: "var(--color-ink)", margin: 0, lineHeight: 1.6 }}>
                            {kc.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Related Glossary Terms ──────────────────────── */}
          {((lesson.glossaryTermsList && lesson.glossaryTermsList.length > 0) || (lesson.glossaryTerms && lesson.glossaryTerms.length > 0)) && (
            <div style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "1.5rem", marginBottom: "3.5rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-accent-text)", display: "block", marginBottom: "1rem" }}>
                Related Glossary Terms
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
                {(lesson.glossaryTermsList || lesson.glossaryTerms || []).map((g, idx) => (
                  <div key={idx} style={{ padding: "0.85rem", backgroundColor: "var(--color-surface-2)", border: "1px solid var(--color-border)" }}>
                    <strong style={{ fontFamily: "var(--font-mono)", fontSize: "0.88rem", color: "var(--color-ink)", display: "block", marginBottom: "0.3rem" }}>
                      {g.term}
                    </strong>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-ink-2)", margin: 0, lineHeight: 1.5 }}>
                      {g.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Bottom Action Bar & Navigation ──────────────── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              paddingTop: "2rem",
              borderTop: "2px solid var(--color-border)",
            }}
          >
            {/* Mark Complete Button */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={toggleComplete}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "0.85rem 2.25rem",
                  backgroundColor: isCompleted ? "var(--color-accent)" : "var(--color-surface)",
                  color: isCompleted ? "#ffffff" : "var(--color-ink)",
                  border: "1.5px solid",
                  borderColor: isCompleted ? "var(--color-accent)" : "var(--color-border-2)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.15s ease",
                }}
              >
                <span>{isCompleted ? "✓ Completed Lesson" : "○ Mark as Complete"}</span>
              </button>
            </div>

            {/* Prev / Next Lesson Links */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.25rem",
                marginTop: "1rem",
              }}
            >
              {prevLesson ? (
                <Link
                  href={`/certifications/${track.id}/lessons/${prevLesson.slug}/`}
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    padding: "1.25rem 1.5rem",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  className="hover:border-accent"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      textTransform: "uppercase",
                      color: "var(--color-ink-3)",
                      marginBottom: "0.3rem",
                      fontWeight: 600,
                    }}
                  >
                    ← Previous Lesson
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "var(--color-ink)",
                    }}
                  >
                    {prevLesson.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link
                  href={`/certifications/${track.id}/lessons/${nextLesson.slug}/`}
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    padding: "1.25rem 1.5rem",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "right",
                  }}
                  className="hover:border-accent"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      textTransform: "uppercase",
                      color: "var(--color-ink-3)",
                      marginBottom: "0.3rem",
                      fontWeight: 600,
                    }}
                  >
                    Next Lesson →
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "var(--color-accent-text)",
                    }}
                  >
                    {nextLesson.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
