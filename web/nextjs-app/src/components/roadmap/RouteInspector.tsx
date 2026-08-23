// src/components/roadmap/RouteInspector.tsx — Selected Node & Path Inspector Panel
"use client";

import Link from "next/link";
import { getNodeById, getNodeStatus, ROADMAP_NODES } from "@/data/roadmap";
import type { RoadmapNode, CareerRole } from "@/types";

interface Props {
  selectedNode: RoadmapNode | null;
  activeRole: CareerRole | null;
  completedLessons: string[];
  onSelectNode: (nodeId: string) => void;
  onToggleLesson: (lessonKey: string) => void;
  onClose: () => void;
}

export function RouteInspector({
  selectedNode,
  activeRole,
  completedLessons,
  onSelectNode,
  onToggleLesson,
  onClose,
}: Props) {
  if (!selectedNode) {
    return (
      <div
        style={{
          padding: "2rem 1.5rem",
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "2rem", marginBottom: "1rem", opacity: 0.5 }}>🗺️</span>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-ink)",
            marginBottom: "0.5rem",
          }}
        >
          Route Inspector
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            color: "var(--color-ink-3)",
            lineHeight: 1.5,
            maxWidth: "260px",
          }}
        >
          Click any skill node on the roadmap to inspect its prerequisites, what it unlocks, and connected lessons.
        </p>
      </div>
    );
  }

  const status = getNodeStatus(selectedNode, completedLessons, ROADMAP_NODES);
  const prereqNodes = selectedNode.prerequisites
    .map((id) => getNodeById(id))
    .filter((n): n is RoadmapNode => n !== undefined);
  const unlockNodes = selectedNode.unlocks
    .map((id) => getNodeById(id))
    .filter((n): n is RoadmapNode => n !== undefined);

  const completedLessonCount = selectedNode.lessons.filter((l) =>
    completedLessons.includes(`${l.phaseSlug}/${l.lessonSlug}`)
  ).length;

  const pct =
    selectedNode.lessons.length > 0
      ? Math.round((completedLessonCount / selectedNode.lessons.length) * 100)
      : 0;

  return (
    <div
      style={{
        padding: "1.75rem",
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        overflowY: "auto",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-accent-text)",
            }}
          >
            {selectedNode.number} · {selectedNode.category}
          </span>
          <button
            onClick={onClose}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--color-ink-3)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            CLOSE ×
          </button>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.65rem",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "var(--color-ink)",
            lineHeight: 1.1,
            marginBottom: "0.4rem",
          }}
        >
          {selectedNode.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-accent-text)",
            marginBottom: "0.75rem",
          }}
        >
          {selectedNode.subtitle}
        </p>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            color: "var(--color-ink-2)",
            lineHeight: 1.5,
          }}
        >
          {selectedNode.description}
        </p>
      </div>

      {/* ── Progress in this skill ──────────────────────────────── */}
      <div
        style={{
          padding: "0.85rem 1rem",
          backgroundColor: "var(--color-surface-2)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.4rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-ink-3)",
            }}
          >
            Node Progress ({completedLessonCount}/{selectedNode.lessons.length})
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 700,
              color: pct === 100 ? "var(--color-accent)" : "var(--color-ink)",
            }}
          >
            {pct}%
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* ── Connected Curriculum Lessons ────────────────────────── */}
      {selectedNode.lessons.length > 0 && (
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-ink)",
              marginBottom: "0.5rem",
            }}
          >
            Curriculum Lessons
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {selectedNode.lessons.map((lesson) => {
              const key = `${lesson.phaseSlug}/${lesson.lessonSlug}`;
              const isDone = completedLessons.includes(key);

              return (
                <div
                  key={lesson.lessonSlug}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.5rem 0.75rem",
                    border: "1px solid var(--color-border)",
                    backgroundColor: isDone ? "var(--color-surface-2)" : "var(--color-surface)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <button
                      onClick={() => onToggleLesson(key)}
                      className={`check-box ${isDone ? "check-box-done" : ""}`}
                      aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                    >
                      {isDone && (
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5">
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      )}
                    </button>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: isDone ? "var(--color-ink-3)" : "var(--color-ink)",
                        textDecoration: isDone ? "line-through" : "none",
                      }}
                    >
                      {lesson.title}
                    </span>
                  </div>

                  <Link
                    href={`/curriculum/${lesson.phaseSlug}/${lesson.lessonSlug}/`}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: "var(--color-accent-text)",
                      textDecoration: "none",
                    }}
                  >
                    Open →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Prerequisites (Upstream) ────────────────────────────── */}
      {prereqNodes.length > 0 && (
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#059669",
              marginBottom: "0.4rem",
            }}
          >
            ← Prerequisites ({prereqNodes.length})
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {prereqNodes.map((pn) => (
              <button
                key={pn.id}
                onClick={() => onSelectNode(pn.id)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  padding: "0.25rem 0.5rem",
                  backgroundColor: "#f0fdf4",
                  border: "1px solid #059669",
                  color: "#065f46",
                  cursor: "pointer",
                }}
              >
                {pn.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Unlocks (Downstream) ────────────────────────────────── */}
      {unlockNodes.length > 0 && (
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#d97706",
              marginBottom: "0.4rem",
            }}
          >
            → Unlocks Next ({unlockNodes.length})
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {unlockNodes.map((un) => (
              <button
                key={un.id}
                onClick={() => onSelectNode(un.id)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  padding: "0.25rem 0.5rem",
                  backgroundColor: "#fffbeb",
                  border: "1px solid #d97706",
                  color: "#92400e",
                  cursor: "pointer",
                }}
              >
                {un.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── CTA Button ─────────────────────────────────────────── */}
      {selectedNode.lessons[0] && (
        <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
          <Link
            href={`/curriculum/${selectedNode.lessons[0].phaseSlug}/${selectedNode.lessons[0].lessonSlug}/`}
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
          >
            Start Learning {selectedNode.title} →
          </Link>
        </div>
      )}
    </div>
  );
}

