// src/app/certifications/[id]/page.tsx — Detailed Certification Track Page
"use client";

import { useState, useEffect, useMemo, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCertificationTrackById,
  CERTIFICATION_TRACKS,
  getAssessmentsByTrack,
} from "@/data/certifications";

interface Props {
  params: Promise<{ id: string }>;
}

export default function CertificationTrackPage({ params }: Props) {
  const { id } = use(params);
  const track = getCertificationTrackById(id);

  if (!track) {
    notFound();
  }

  const assessments = useMemo(() => getAssessmentsByTrack(track.id), [track.id]);

  // Local progress state
  const [completedLessonSlugs, setCompletedLessonSlugs] = useState<string[]>([]);
  const [attemptedAssessmentIds, setAttemptedAssessmentIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedLessons = localStorage.getItem(`cert_progress_${track.id}`);
      if (storedLessons) {
        setCompletedLessonSlugs(JSON.parse(storedLessons));
      }
      const storedAssessments = localStorage.getItem(`cert_assessments_${track.id}`);
      if (storedAssessments) {
        setAttemptedAssessmentIds(JSON.parse(storedAssessments));
      }
    } catch {
      // ignore JSON errors
    }
  }, [track.id]);

  const toggleLessonComplete = (slug: string) => {
    setCompletedLessonSlugs((prev) => {
      const updated = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      try {
        localStorage.setItem(`cert_progress_${track.id}`, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const progressPercent = useMemo(() => {
    if (track.lessons.length === 0) return 0;
    return Math.round((completedLessonSlugs.length / track.lessons.length) * 100);
  }, [completedLessonSlugs, track.lessons.length]);

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      {/* ── 1. Track Masthead ─────────────────────────────────── */}
      <section
        className="dot-grid-bg"
        style={{
          borderBottom: "1px solid var(--color-border)",
          padding: "3.5rem 1.5rem 2.5rem",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-ink-3)",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
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
            <span style={{ color: "var(--color-ink)" }}>{track.code}</span>
          </nav>

          {/* Title & Level Badge */}
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--color-accent)",
                }}
              >
                {track.code}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "0.15rem 0.5rem",
                  backgroundColor: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-ink-3)",
                }}
              >
                {track.levelBadge}
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 700,
                textTransform: "uppercase",
                lineHeight: 1,
                color: "var(--color-ink)",
                marginBottom: "0.75rem",
              }}
            >
              {track.title}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.1rem",
                color: "var(--color-ink-2)",
                maxWidth: "780px",
                lineHeight: 1.6,
              }}
            >
              {track.tagline}
            </p>
          </div>

          {/* Metadata Specs Bar */}
          <div
            className="stat-pills-row"
            style={{
              padding: "1.15rem 1.35rem",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              marginBottom: "1.75rem",
            }}
          >
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block", fontWeight: 600 }}>
                QUESTIONS
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 700, color: "var(--color-ink)", marginTop: "0.2rem", display: "block" }}>
                {track.questionsCount}
              </span>
            </div>

            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block", fontWeight: 600 }}>
                TIME LIMIT
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 700, color: "var(--color-ink)", marginTop: "0.2rem", display: "block" }}>
                {track.timeLimitMin} min
              </span>
            </div>

            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block", fontWeight: 600 }}>
                PASSING SCORE
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 700, color: "var(--color-accent)", marginTop: "0.2rem", display: "block" }}>
                {track.passingScore}
              </span>
            </div>

            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block", fontWeight: 600 }}>
                EXAM FEE
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 700, color: "var(--color-ink)", marginTop: "0.2rem", display: "block" }}>
                {track.examFee}
              </span>
            </div>

            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block", fontWeight: 600 }}>
                FORMAT
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 600, color: "var(--color-ink)", marginTop: "0.2rem", display: "block" }}>
                {track.format}
              </span>
            </div>

            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-ink-3)", display: "block", fontWeight: 600 }}>
                VALIDITY
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 600, color: "var(--color-ink)", marginTop: "0.2rem", display: "block" }}>
                {track.validity}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", alignItems: "center", marginBottom: "1.75rem" }}>
            <Link
              href={`/certifications/${track.id}/lessons/${track.lessons[0]?.slug || ""}/`}
              className="btn-primary"
              style={{ padding: "0.75rem 1.6rem", fontSize: "0.82rem", textDecoration: "none", fontWeight: 700 }}
            >
              Start learning →
            </Link>
            <Link
              href={`/certifications/${track.id}/practice/`}
              className="btn-secondary"
              style={{ padding: "0.75rem 1.4rem", fontSize: "0.82rem", textDecoration: "none", fontWeight: 700 }}
            >
              Practice Question Bank →
            </Link>
            <Link
              href={`/certifications/${track.id}/mock/`}
              className="btn-ghost"
              style={{ padding: "0.75rem 1.25rem", fontSize: "0.82rem", textDecoration: "none", border: "1.5px solid var(--color-accent)", color: "var(--color-accent-text)", fontWeight: 700 }}
            >
              120-Min Mock Simulator ⏱
            </Link>
            {track.officialGuideUrl && (
              <a
                href={track.officialGuideUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
                style={{ padding: "0.75rem 1.25rem", fontSize: "0.82rem", textDecoration: "none", fontWeight: 600 }}
              >
                Official exam guide ↗
              </a>
            )}
          </div>

          {/* Access Restriction Notice */}
          {track.partnerRestrictedNotice && (
            <div
              style={{
                backgroundColor: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                borderLeft: "3.5px solid var(--color-accent)",
                padding: "0.85rem 1.2rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-accent-text)",
                  display: "block",
                  marginBottom: "0.2rem",
                }}
              >
                Official Exam Access Notice
              </span>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem",
                  color: "var(--color-ink-2)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {track.partnerRestrictedNotice}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── 2. Track Content Body ─────────────────────────────── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 1.5rem 6rem" }}>
        {/* ── A. Local Progress ───────────────────────────────── */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            padding: "1.5rem 1.75rem",
            marginBottom: "3rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.6rem" }}>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-ink-3)",
                  display: "block",
                }}
              >
                Local Progress
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                }}
              >
                Your Preparation Track
              </h2>
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 700,
                color: "var(--color-accent)",
              }}
            >
              {progressPercent}%
            </span>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              height: "8px",
              backgroundColor: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              marginBottom: "0.6rem",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPercent}%`,
                backgroundColor: "var(--color-accent)",
                transition: "width 0.3s ease",
              }}
            />
          </div>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "var(--color-ink-3)",
            }}
          >
            {completedLessonSlugs.length} of {track.lessons.length} lessons complete · {attemptedAssessmentIds.length} of {assessments.length} assessments attempted · Stored only in this browser
          </span>
        </section>

        {/* ── B. Exam Blueprint Domain Weights ─────────────────── */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-accent-text)",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              Exam Blueprint
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--color-ink)",
              }}
            >
              Domain Weighting &amp; Coverage
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-ink-2)", margin: 0 }}>
              Weights describe the official blueprint. Lesson coverage shows where this path trains each architectural decision.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {track.domains.map((dom) => (
              <div
                key={dom.id}
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.75rem",
                        fontWeight: 700,
                        color: "var(--color-accent)",
                      }}
                    >
                      {dom.weightPercent}%
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.58rem",
                        color: "var(--color-ink-3)",
                        textTransform: "uppercase",
                      }}
                    >
                      {dom.id}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--color-ink)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {dom.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.82rem",
                      color: "var(--color-ink-2)",
                      lineHeight: 1.45,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {dom.description}
                  </p>
                </div>

                {/* Subtopic checklist */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    borderTop: "1px solid var(--color-border)",
                    paddingTop: "0.5rem",
                  }}
                >
                  {dom.subtopics.slice(0, 3).map((sub) => (
                    <li
                      key={sub}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        color: "var(--color-ink-3)",
                        lineHeight: 1.4,
                        marginBottom: "0.25rem",
                        display: "flex",
                        gap: "0.4rem",
                      }}
                    >
                      <span style={{ color: "var(--color-accent)" }}>›</span>
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── C. Ordered Learning Path (Lessons 01 to N) ────────── */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-accent-text)",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              Learning Path
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--color-ink)",
              }}
            >
              Lessons In Order
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-ink-2)", margin: 0 }}>
              Step-by-step architectural tutorials and interactive code labs. Completion is saved locally in this browser.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {track.lessons.map((lesson) => {
              const isCompleted = completedLessonSlugs.includes(lesson.slug);

              return (
                <article
                  key={lesson.slug}
                  className="lesson-row-card hover:border-accent"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid",
                    borderColor: isCompleted ? "var(--color-accent)" : "var(--color-border)",
                    padding: "1.25rem 1.5rem",
                    transition: "border-color 0.15s ease",
                  }}
                >
                  {/* Order Number & Checkbox */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <button
                      onClick={() => toggleLessonComplete(lesson.slug)}
                      aria-label="Toggle completed"
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "1.5px solid",
                        borderColor: isCompleted ? "var(--color-accent)" : "var(--color-border-2)",
                        backgroundColor: isCompleted ? "var(--color-accent)" : "transparent",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        borderRadius: "2px",
                      }}
                    >
                      {isCompleted && "✓"}
                    </button>

                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        color: isCompleted ? "var(--color-accent)" : "var(--color-ink-3)",
                        minWidth: "35px",
                      }}
                    >
                      {lesson.order.toString().padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.55rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          padding: "0.1rem 0.35rem",
                          backgroundColor: "var(--color-surface-2)",
                          border: "1px solid var(--color-border)",
                          color: "var(--color-ink-3)",
                        }}
                      >
                        {lesson.kind}
                      </span>

                      {lesson.domains.map((dom) => (
                        <span
                          key={dom}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.55rem",
                            color: "var(--color-accent-text)",
                          }}
                        >
                          {dom}
                        </span>
                      ))}
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.35rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.01em",
                        color: "var(--color-ink)",
                        lineHeight: 1.15,
                        marginBottom: "0.3rem",
                      }}
                    >
                      <Link
                        href={`/certifications/${track.id}/lessons/${lesson.slug}/`}
                        style={{ color: "inherit", textDecoration: "none" }}
                        className="hover:text-accent"
                      >
                        {lesson.title}
                      </Link>
                    </h3>

                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.88rem",
                        color: "var(--color-ink-2)",
                        lineHeight: 1.45,
                        margin: 0,
                      }}
                    >
                      {lesson.leadParagraph}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div>
                    <Link
                      href={`/certifications/${track.id}/lessons/${lesson.slug}/`}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "var(--color-accent-text)",
                        textDecoration: "none",
                        padding: "0.4rem 0.8rem",
                        backgroundColor: "var(--color-surface-2)",
                        border: "1px solid var(--color-border)",
                        whiteSpace: "nowrap",
                      }}
                      className="hover:border-accent"
                    >
                      Open →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── D. Optional Extensions ───────────────────────────── */}
        {track.optionalExtensions.length > 0 && (
          <section style={{ marginBottom: "4rem" }}>
            <div style={{ marginBottom: "1.25rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-accent-text)",
                  display: "block",
                  marginBottom: "0.25rem",
                }}
              >
                Optional Extensions
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                }}
              >
                Go Deeper In The Python Curriculum
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1rem",
              }}
            >
              {track.optionalExtensions.map((ext) => (
                <div
                  key={ext.title}
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    padding: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: "var(--color-ink-3)",
                        display: "block",
                        marginBottom: "0.35rem",
                      }}
                    >
                      OPTIONAL
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "var(--color-ink)",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {ext.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-ink-2)", margin: 0, marginBottom: "0.75rem" }}>
                      {ext.subtitle}
                    </p>
                  </div>

                  <Link
                    href={ext.lessonPath}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: "var(--color-accent-text)",
                      textDecoration: "none",
                    }}
                    className="hover:underline"
                  >
                    Open lesson →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── E. Readiness: Diagnostics & Mocks ────────────────── */}
        <section id="trackAssessments" style={{ marginBottom: "4rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-accent-text)",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              Readiness
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--color-ink)",
              }}
            >
              Diagnostics and Mocks
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-ink-2)", margin: 0 }}>
              Practice results are percentages for this course, not official scaled exam scores.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {assessments.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        padding: "0.15rem 0.45rem",
                        backgroundColor: item.type === "mock" ? "var(--color-accent-soft)" : "var(--color-surface-2)",
                        color: item.type === "mock" ? "var(--color-accent-text)" : "var(--color-ink-3)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      {item.type}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--color-ink-3)" }}>
                      {item.questionsCount} questions · {item.timeLimitMin} min
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.45rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "var(--color-ink)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      color: "var(--color-ink-2)",
                      lineHeight: 1.5,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={`/certifications/${track.id}/assessments/${item.id}/`}
                    className="btn-primary"
                    style={{
                      width: "100%",
                      textAlign: "center",
                      display: "block",
                      padding: "0.6rem 1rem",
                      fontSize: "0.72rem",
                      textDecoration: "none",
                    }}
                  >
                    Start practice →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── F. Pace Yourself: Study Schedules ───────────────── */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-accent-text)",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              Pace Yourself
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--color-ink)",
              }}
            >
              Structured Study Plans
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {track.studyPlans.map((plan) => (
              <div
                key={plan.name}
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  padding: "1.75rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: "0.25rem",
                  }}
                >
                  {plan.duration}
                </span>

                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--color-ink)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {plan.name}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--color-ink-3)",
                    display: "block",
                    marginBottom: "1rem",
                  }}
                >
                  {plan.weeklyCommitment}
                </span>

                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {plan.breakdown.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.85rem",
                        color: "var(--color-ink-2)",
                        lineHeight: 1.5,
                        marginBottom: "0.5rem",
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}>›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

