// src/app/certifications/[id]/mock/page.tsx — 120-Minute Timed Mock Exam Simulator
"use client";

import { use, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CERTIFICATION_TRACKS } from "@/data/certifications";
import { generateMockExam, type CertificationQuestionItem } from "@/data/certifications/questions";

interface Props {
  params: Promise<{ id: string }>;
}

export default function MockExamPage({ params }: Props) {
  const { id } = use(params);
  const track = CERTIFICATION_TRACKS.find(
    (t) => t.id.toLowerCase() === id.toLowerCase() || t.id.replace("claude-", "").toLowerCase() === id.toLowerCase()
  );

  if (!track) notFound();

  // Generate exam questions on mount
  const [examQuestions, setExamQuestions] = useState<CertificationQuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(120 * 60); // 120 minutes

  useEffect(() => {
    setExamQuestions(generateMockExam(track.id, 60));
  }, [track.id]);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const currentQ = examQuestions[currentIndex];

  const toggleOption = (optionId: string) => {
    if (isSubmitted || !currentQ) return;
    const isMulti = currentQ.type === "multiple-response" || currentQ.correctAnswers.length > 1;
    setUserAnswers((prev) => {
      const existing = prev[currentQ.id] || [];
      if (isMulti) {
        return existing.includes(optionId)
          ? { ...prev, [currentQ.id]: existing.filter((x) => x !== optionId) }
          : { ...prev, [currentQ.id]: [...existing, optionId] };
      } else {
        return { ...prev, [currentQ.id]: [optionId] };
      }
    });
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((q) => q !== questionId) : [...prev, questionId]
    );
  };

  // Format timer string
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hours}:${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Compute Results
  const results = useMemo(() => {
    if (!isSubmitted || examQuestions.length === 0) return null;

    let correctCount = 0;
    const domainScores: Record<string, { total: number; correct: number; name: string }> = {};

    examQuestions.forEach((q) => {
      if (!domainScores[q.domain]) {
        domainScores[q.domain] = { total: 0, correct: 0, name: q.domainName };
      }
      domainScores[q.domain].total += 1;

      const userAns = userAnswers[q.id] || [];
      const isCorrect =
        userAns.length === q.correctAnswers.length &&
        userAns.every((a) => q.correctAnswers.includes(a as any));

      if (isCorrect) {
        correctCount += 1;
        domainScores[q.domain].correct += 1;
      }
    });

    const percent = Math.round((correctCount / examQuestions.length) * 100);
    const passed = percent >= 70;

    return {
      total: examQuestions.length,
      correct: correctCount,
      percent,
      passed,
      domainScores,
    };
  }, [isSubmitted, examQuestions, userAnswers]);

  if (examQuestions.length === 0) {
    return (
      <div style={{ padding: "5rem 1.5rem", textAlign: "center", backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--color-ink-3)" }}>
          Initializing {track.code} Mock Exam Environment...
        </p>
      </div>
    );
  }

  // ── Results Screen ───────────────────────────────────────────
  if (isSubmitted && results) {
    return (
      <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh", padding: "3rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Result Card Header */}
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              border: `2px solid ${results.passed ? "var(--color-accent)" : "#dc2626"}`,
              padding: "2.5rem 2rem",
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-ink-3)",
                display: "block",
                marginBottom: "0.6rem",
                fontWeight: 700,
              }}
            >
              {track.code} · Official Blueprint Simulation Results
            </span>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 700,
                color: results.passed ? "var(--color-accent)" : "#dc2626",
                textTransform: "uppercase",
                margin: "0 0 0.75rem",
                lineHeight: 1.1,
              }}
            >
              {results.passed ? "PASS · CERTIFICATION READY" : "NEEDS IMPROVEMENT"}
            </h1>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.15rem", color: "var(--color-ink-2)", margin: 0, lineHeight: 1.6 }}>
              Overall Score: <strong style={{ color: "var(--color-ink)" }}>{results.percent}%</strong> ({results.correct} / {results.total} Correct) · Passing Threshold: 70%
            </p>
          </div>

          {/* Domain Breakdown */}
          <div style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "2rem", marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-ink)", marginBottom: "1.5rem" }}>
              Domain Competency Analysis
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {Object.entries(results.domainScores).map(([domId, score]) => {
                const domPct = Math.round((score.correct / score.total) * 100);
                const isWeak = domPct < 70;

                return (
                  <div key={domId}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                      <span style={{ color: "var(--color-ink)", fontWeight: 600 }}>{score.name}</span>
                      <span style={{ color: isWeak ? "#dc2626" : "var(--color-accent-text)", fontWeight: 700 }}>
                        {score.correct}/{score.total} ({domPct}%)
                      </span>
                    </div>

                    <div style={{ height: "8px", backgroundColor: "var(--color-surface-2)", border: "1px solid var(--color-border)", borderRadius: "2px", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${domPct}%`,
                          backgroundColor: isWeak ? "#dc2626" : "var(--color-accent)",
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <Link
              href={`/certifications/${track.id}/practice/`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.82rem",
                fontWeight: 700,
                textTransform: "uppercase",
                padding: "0.85rem 1.75rem",
                backgroundColor: "var(--color-accent)",
                color: "#fff",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Practice Domain Questions →
            </Link>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setUserAnswers({});
                setSecondsRemaining(120 * 60);
                setCurrentIndex(0);
                setExamQuestions(generateMockExam(track.id, 60));
              }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.82rem",
                fontWeight: 700,
                textTransform: "uppercase",
                padding: "0.85rem 1.75rem",
                backgroundColor: "transparent",
                border: "1px solid var(--color-border)",
                color: "var(--color-ink)",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              Retake Mock Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Active Mock Simulator Screen ─────────────────────────────
  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh", padding: "1.5rem 1rem 4rem" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        {/* ── Top Bar ─────────────────────────────────────────── */}
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            padding: "1rem 1.5rem",
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", textTransform: "uppercase", color: "var(--color-accent-text)", fontWeight: 700, display: "block" }}>
              {track.code} · Official Blueprint Simulation
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", margin: "0.2rem 0 0", color: "var(--color-ink)", fontWeight: 700 }}>
              Question {currentIndex + 1} of {examQuestions.length}
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.15rem",
                fontWeight: 700,
                color: secondsRemaining < 600 ? "#dc2626" : "var(--color-accent)",
                backgroundColor: "var(--color-surface-2)",
                padding: "0.4rem 0.8rem",
                border: "1px solid var(--color-border)",
              }}
            >
              ⏱ {formatTime(secondsRemaining)}
            </div>

            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to submit your exam now?")) {
                  setIsSubmitted(true);
                }
              }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                padding: "0.6rem 1.25rem",
                backgroundColor: "#dc2626",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              End &amp; Submit Exam
            </button>
          </div>
        </div>

        {/* ── Responsive Layout Grid ───────────────────────────── */}
        <div className="mock-exam-layout">
          {/* Main Question Box */}
          <div style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "1.75rem" }}>
            {/* Meta */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--color-border)", flexWrap: "wrap", gap: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--color-ink-3)", fontWeight: 600 }}>
                {currentQ.domainName} · {currentQ.difficulty.toUpperCase()}
              </span>

              <button
                onClick={() => toggleFlag(currentQ.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  color: flaggedQuestions.includes(currentQ.id) ? "#d97706" : "var(--color-ink-3)",
                  fontWeight: 600,
                }}
              >
                {flaggedQuestions.includes(currentQ.id) ? "⚑ Flagged for Review" : "⚐ Flag for Review"}
              </button>
            </div>

            {/* Scenario */}
            {currentQ.scenario && (
              <div
                style={{
                  backgroundColor: "var(--color-surface-2)",
                  borderLeft: "3.5px solid var(--color-accent)",
                  padding: "1.15rem 1.35rem",
                  marginBottom: "1.5rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  color: "var(--color-ink)",
                }}
              >
                {currentQ.scenario}
              </div>
            )}

            {/* Question */}
            <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1.15rem", fontWeight: 600, color: "var(--color-ink)", marginBottom: "1.5rem", lineHeight: 1.55 }}>
              {currentQ.question}
            </h3>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2rem" }}>
              {currentQ.options.map((opt) => {
                const isSelected = (userAnswers[currentQ.id] || []).includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleOption(opt.id)}
                    style={{
                      textAlign: "left",
                      padding: "1.1rem 1.35rem",
                      backgroundColor: isSelected ? "var(--color-accent-soft)" : "transparent",
                      border: `1.5px solid ${isSelected ? "var(--color-accent)" : "var(--color-border)"}`,
                      cursor: "pointer",
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start",
                      minHeight: "52px",
                      transition: "all 0.12s ease",
                    }}
                    className="hover:border-accent"
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 700, color: isSelected ? "var(--color-accent)" : "var(--color-ink-3)", minWidth: "22px" }}>
                      {opt.id}.
                    </span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "1.02rem", color: "var(--color-ink)", lineHeight: 1.6 }}>
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Footer */}
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--color-border)", paddingTop: "1.25rem", gap: "0.5rem" }}>
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "0.65rem 1.4rem",
                  backgroundColor: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-ink)",
                  cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                  opacity: currentIndex === 0 ? 0.5 : 1,
                }}
              >
                ← Previous
              </button>

              <button
                onClick={() => setCurrentIndex((prev) => Math.min(examQuestions.length - 1, prev + 1))}
                disabled={currentIndex === examQuestions.length - 1}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "0.65rem 1.4rem",
                  backgroundColor: "var(--color-accent)",
                  border: "none",
                  color: "#fff",
                  cursor: currentIndex === examQuestions.length - 1 ? "not-allowed" : "pointer",
                  opacity: currentIndex === examQuestions.length - 1 ? 0.5 : 1,
                }}
              >
                Next →
              </button>
            </div>
          </div>

          {/* ── Question Navigator Grid Sidebar ─────────────────── */}
          <aside style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "1.25rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-ink-3)", display: "block", marginBottom: "0.85rem", fontWeight: 700 }}>
              Question Grid
            </span>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.4rem" }}>
              {examQuestions.map((q, idx) => {
                const isAnswered = (userAnswers[q.id] || []).length > 0;
                const isCurrent = idx === currentIndex;
                const isFlagged = flaggedQuestions.includes(q.id);

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    style={{
                      height: "36px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: isCurrent ? 700 : 400,
                      backgroundColor: isCurrent
                        ? "var(--color-accent)"
                        : isAnswered
                        ? "var(--color-surface-2)"
                        : "transparent",
                      border: `1px solid ${isCurrent ? "var(--color-accent)" : isFlagged ? "#d97706" : "var(--color-border)"}`,
                      color: isCurrent ? "#fff" : isAnswered ? "var(--color-accent-text)" : "var(--color-ink-3)",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <span style={{ position: "absolute", top: 1, right: 3, fontSize: "0.6rem", color: "#d97706" }}>
                        •
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: "1.25rem", borderTop: "1px solid var(--color-border)", paddingTop: "0.85rem", fontFamily: "var(--font-mono)", fontSize: "0.72rem", display: "flex", flexDirection: "column", gap: "0.4rem", color: "var(--color-ink-3)" }}>
              <div>• Answered: {Object.keys(userAnswers).length} / {examQuestions.length}</div>
              <div>• Flagged: {flaggedQuestions.length}</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
