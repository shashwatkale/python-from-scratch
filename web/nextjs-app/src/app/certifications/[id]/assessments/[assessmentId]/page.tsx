// src/app/certifications/[id]/assessments/[assessmentId]/page.tsx — Full Interactive Mock Exam Runner matching Reference Design
"use client";

import { useState, useEffect, useMemo, use, useCallback } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCertificationTrackById,
  getAssessmentById,
} from "@/data/certifications";

interface Props {
  params: Promise<{ id: string; assessmentId: string }>;
}

export default function AssessmentRunnerPage({ params }: Props) {
  const { id, assessmentId } = use(params);
  const track = getCertificationTrackById(id);
  const assessment = getAssessmentById(assessmentId);

  if (!track || !assessment) {
    notFound();
  }

  // State
  const [userAnswers, setUserAnswers] = useState<Record<string, number[]>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(
    assessment.timeLimitMin * 60
  );

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  // Handle option selection
  const handleSelectOption = (qId: string, optionIdx: number, isMultiSelect = false) => {
    if (isSubmitted) return;

    setUserAnswers((prev) => {
      const current = prev[qId] || [];
      if (!isMultiSelect) {
        return { ...prev, [qId]: [optionIdx] };
      }
      // Toggle for multi-select
      const updated = current.includes(optionIdx)
        ? current.filter((i) => i !== optionIdx)
        : [...current, optionIdx];
      return { ...prev, [qId]: updated };
    });
  };

  // Format time mm:ss
  const formattedTime = useMemo(() => {
    const mins = Math.floor(timeRemainingSeconds / 60);
    const secs = timeRemainingSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, [timeRemainingSeconds]);

  // Score Calculation
  const scoreReport = useMemo(() => {
    if (!isSubmitted) return null;

    let correctCount = 0;
    const domainScores: Record<string, { name: string; total: number; correct: number }> = {};

    for (const q of assessment.questions) {
      if (!domainScores[q.domainId]) {
        domainScores[q.domainId] = { name: q.domainName, total: 0, correct: 0 };
      }
      domainScores[q.domainId].total += 1;

      const userSelected = userAnswers[q.id] || [];
      const isCorrect =
        userSelected.length === q.correctAnswerIndices.length &&
        userSelected.every((val) => q.correctAnswerIndices.includes(val));

      if (isCorrect) {
        correctCount += 1;
        domainScores[q.domainId].correct += 1;
      }
    }

    const rawPercentage = Math.round((correctCount / assessment.questions.length) * 100);
    const scaledScore = Math.round(100 + rawPercentage * 9);
    const isPassed = scaledScore >= assessment.passingScore;

    return {
      correctCount,
      totalQuestions: assessment.questions.length,
      rawPercentage,
      scaledScore,
      isPassed,
      domainScores,
    };
  }, [isSubmitted, assessment.questions, userAnswers, assessment.passingScore]);

  // Save attempt to localStorage on submission
  useEffect(() => {
    if (isSubmitted && scoreReport) {
      try {
        const key = `cert_assessments_${track.id}`;
        const stored: string[] = JSON.parse(localStorage.getItem(key) || "[]");
        if (!stored.includes(assessment.id)) {
          localStorage.setItem(key, JSON.stringify([...stored, assessment.id]));
        }
      } catch {
        // ignore
      }
    }
  }, [isSubmitted, scoreReport, track.id, assessment.id]);

  const handleRetake = useCallback(() => {
    setUserAnswers({});
    setIsSubmitted(false);
    setTimeRemainingSeconds(assessment.timeLimitMin * 60);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [assessment.timeLimitMin]);

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      {/* ── 1. Masthead ───────────────────────────────────────── */}
      <header
        className="dot-grid-bg"
        style={{
          borderBottom: "1px solid var(--color-border)",
          padding: "3rem 1.5rem 2rem",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-ink-3)",
              marginBottom: "1rem",
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
            <Link
              href={`/certifications/${track.id}/`}
              style={{ color: "var(--color-accent-text)", textDecoration: "none" }}
              className="hover:underline"
            >
              {track.code}
            </Link>
            <span>/</span>
            <span style={{ color: "var(--color-ink)" }}>Practice</span>
          </nav>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--color-accent)",
              display: "block",
              marginBottom: "0.35rem",
            }}
          >
            {assessment.type}
          </span>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              lineHeight: 1,
              color: "var(--color-ink)",
              marginBottom: "0.75rem",
            }}
          >
            {assessment.title}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.02rem",
              color: "var(--color-ink-2)",
              lineHeight: 1.55,
              marginBottom: "1.25rem",
            }}
          >
            Work through the original scenarios, then submit to reveal explanations and domain feedback. Submit whenever you are ready. Unanswered questions count as incorrect.
          </p>

          {/* Badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {[
              `${assessment.questions.length} ORIGINAL QUESTIONS`,
              `${assessment.timeLimitMin} MINUTE LIMIT`,
              "SAVED LOCALLY",
            ].map((badge) => (
              <span
                key={badge}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "0.25rem 0.55rem",
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-ink-3)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── 2. Practice Score Disclaimer Banner ──────────────── */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "1.5rem 1.5rem 0" }}>
        <div
          style={{
            backgroundColor: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderLeft: "3.5px solid var(--color-accent)",
            padding: "0.85rem 1.25rem",
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
            Practice Score Only
          </span>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.82rem",
              color: "var(--color-ink-2)",
              margin: 0,
              lineHeight: 1.45,
            }}
          >
            Your result is a percentage created by this open-source course. It is not an official scaled exam score, credential decision, or guarantee of passing.
          </p>
        </div>
      </section>

      {/* ── 3. Sticky Live Countdown Bar ─────────────────────── */}
      {!isSubmitted && (
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            backgroundColor: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
            padding: "0.6rem 1.5rem",
            marginTop: "1.5rem",
          }}
        >
          <div
            style={{
              maxWidth: "960px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  textTransform: "uppercase",
                  color: "var(--color-ink-3)",
                }}
              >
                Time Remaining:
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: timeRemainingSeconds < 300 ? "#dc2626" : "var(--color-accent)",
                }}
              >
                {formattedTime}
              </span>
            </div>

            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--color-ink-3)",
              }}
            >
              Answered: {Object.keys(userAnswers).length} of {assessment.questions.length}
            </span>
          </div>
        </div>
      )}

      {/* ── 4. Main Question Stream OR Score Report ──────────── */}
      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem 1.5rem 6rem" }}>
        {isSubmitted && scoreReport ? (
          /* ── SUBMISSION SCORE REPORT ───────────────────────── */
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {/* Score Banner */}
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                border: "2px solid",
                borderColor: scoreReport.isPassed ? "#059669" : "#dc2626",
                padding: "2rem 2.5rem",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: scoreReport.isPassed ? "#059669" : "#dc2626",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  {scoreReport.isPassed ? "PASSING RESULT" : "NEEDS REMEDIATION"}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--color-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Scaled Score: {scoreReport.scaledScore} / 1000
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    color: "var(--color-ink-2)",
                    margin: 0,
                  }}
                >
                  Passing threshold: {assessment.passingScore} · Raw accuracy: {scoreReport.correctCount} of {scoreReport.totalQuestions} questions correct ({scoreReport.rawPercentage}%).
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <button
                  onClick={handleRetake}
                  className="btn-primary"
                  style={{ padding: "0.65rem 1.5rem", fontSize: "0.72rem" }}
                >
                  Retake Assessment
                </button>
                <Link
                  href={`/certifications/${track.id}/`}
                  className="btn-secondary"
                  style={{ textAlign: "center", padding: "0.5rem 1rem", fontSize: "0.68rem", textDecoration: "none" }}
                >
                  Back to Track
                </Link>
              </div>
            </div>

            {/* Domain Breakdown */}
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                padding: "1.75rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                  marginBottom: "1.25rem",
                }}
              >
                Domain Performance Breakdown
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {Object.entries(scoreReport.domainScores).map(([domId, dom]) => {
                  const pct = Math.round((dom.correct / dom.total) * 100);
                  return (
                    <div key={domId}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-ink)" }}>
                          {dom.name}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: pct >= 70 ? "#059669" : "#dc2626" }}>
                          {pct}% ({dom.correct}/{dom.total})
                        </span>
                      </div>
                      <div style={{ height: "6px", backgroundColor: "var(--color-surface-2)", overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${pct}%`,
                            backgroundColor: pct >= 70 ? "#059669" : "#dc2626",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Question By Question Review */}
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                  marginBottom: "1.5rem",
                }}
              >
                Question Review &amp; Explanations
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                {assessment.questions.map((q, qIdx) => {
                  const userSelected = userAnswers[q.id] || [];
                  const isCorrect =
                    userSelected.length === q.correctAnswerIndices.length &&
                    userSelected.every((val) => q.correctAnswerIndices.includes(val));

                  return (
                    <article
                      key={q.id}
                      style={{
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid",
                        borderColor: isCorrect ? "#059669" : "#dc2626",
                        padding: "1.75rem",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            color: isCorrect ? "#059669" : "#dc2626",
                          }}
                        >
                          QUESTION {qIdx + 1} · {isCorrect ? "CORRECT ✓" : "INCORRECT ✗"}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--color-ink-3)", textTransform: "uppercase" }}>
                          {q.domainName}
                        </span>
                      </div>

                      <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-ink)", lineHeight: 1.5, marginBottom: "1.25rem" }}>
                        {q.scenario}
                      </p>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                        {q.options.map((opt, optIdx) => {
                          const isChosen = userSelected.includes(optIdx);
                          const isAnswer = q.correctAnswerIndices.includes(optIdx);

                          let bg = "var(--color-surface-2)";
                          let border = "var(--color-border)";
                          if (isAnswer) {
                            bg = "rgba(5, 150, 105, 0.08)";
                            border = "#059669";
                          } else if (isChosen && !isAnswer) {
                            bg = "rgba(220, 38, 38, 0.08)";
                            border = "#dc2626";
                          }

                          return (
                            <div
                              key={optIdx}
                              style={{
                                padding: "0.75rem 1rem",
                                backgroundColor: bg,
                                border: `1px solid ${border}`,
                                fontFamily: "var(--font-body)",
                                fontSize: "0.88rem",
                                color: "var(--color-ink)",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                              }}
                            >
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 700 }}>
                                {isAnswer ? "✓" : isChosen ? "✗" : "○"}
                              </span>
                              <span>{opt}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div
                        style={{
                          padding: "1rem 1.25rem",
                          backgroundColor: "var(--color-surface-2)",
                          borderLeft: "3.5px solid var(--color-accent)",
                        }}
                      >
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-accent-text)", display: "block", marginBottom: "0.25rem" }}>
                          Architectural Rationale
                        </span>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-ink-2)", lineHeight: 1.5, margin: 0 }}>
                          {q.explanation}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* ── ALL QUESTIONS STREAM (DURING PRACTICE) ────────── */
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {assessment.questions.map((q, idx) => {
              const userSelected = userAnswers[q.id] || [];

              return (
                <article
                  key={q.id}
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    padding: "1.75rem 2rem",
                  }}
                >
                  {/* Top Bar: Question # + Domain + Selection Mode */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "1rem",
                      paddingBottom: "0.5rem",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: "var(--color-accent)",
                      }}
                    >
                      QUESTION {idx + 1} · {q.domainId.toUpperCase()}
                    </span>

                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: "var(--color-ink-3)",
                      }}
                    >
                      {q.isMultiSelect ? "SELECT ALL THAT APPLY" : "CHOOSE ONE"}
                    </span>
                  </div>

                  {/* Scenario Question */}
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "1.05rem",
                      fontWeight: 500,
                      color: "var(--color-ink)",
                      lineHeight: 1.55,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {q.scenario}
                  </p>

                  {/* Selectable Options */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userSelected.includes(optIdx);

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx, q.isMultiSelect)}
                          style={{
                            textAlign: "left",
                            padding: "0.85rem 1.1rem",
                            backgroundColor: isSelected
                              ? "var(--color-accent-soft)"
                              : "var(--color-surface-2)",
                            border: "1px solid",
                            borderColor: isSelected
                              ? "var(--color-accent)"
                              : "var(--color-border)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.85rem",
                            transition: "all 0.1s ease",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: isSelected
                                ? "var(--color-accent)"
                                : "var(--color-ink-3)",
                              marginTop: "0.1rem",
                            }}
                          >
                            {q.isMultiSelect ? (isSelected ? "■" : "□") : (isSelected ? "●" : "○")}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.92rem",
                              color: isSelected
                                ? "var(--color-ink)"
                                : "var(--color-ink-2)",
                              lineHeight: 1.5,
                            }}
                          >
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </article>
              );
            })}

            {/* Bottom Submit Action */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "2rem 0",
                borderTop: "2px solid var(--color-border)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-ink-3)",
                }}
              >
                {Object.keys(userAnswers).length} of {assessment.questions.length} questions completed
              </span>

              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setIsSubmitted(true);
                }}
                className="btn-primary"
                style={{
                  padding: "0.75rem 2rem",
                  fontSize: "0.75rem",
                }}
              >
                Submit Exam &amp; Reveal Rationale →
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
