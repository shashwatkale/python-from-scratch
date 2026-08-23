// src/components/roadmap/RecommendedNext.tsx — Dynamic Next Step Recommendation
"use client";

import { getRecommendedNextNode } from "@/data/roadmap";
import type { CareerRole, CareerRoleId } from "@/types";
import Link from "next/link";

interface Props {
  activeRole: CareerRole | null;
  completedLessons: string[];
  onSelectNode: (nodeId: string) => void;
}

export function RecommendedNext({
  activeRole,
  completedLessons,
  onSelectNode,
}: Props) {
  if (!activeRole) return null;

  const nextNode = getRecommendedNextNode(activeRole.id, completedLessons);
  if (!nextNode) {
    return (
      <div
        style={{
          padding: "1rem 1.5rem",
          backgroundColor: "#f0fdf4",
          border: "1px solid #059669",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          margin: "1rem auto 0",
          maxWidth: "1400px",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#065f46",
              marginBottom: "0.2rem",
            }}
          >
            🎉 Role Milestone Complete
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              color: "#064e3b",
            }}
          >
            You have completed all skills for the <strong>{activeRole.title}</strong> roadmap! Ready to build your capstone portfolio.
          </p>
        </div>
        <Link href="#capstone-projects" className="btn-primary" style={{ fontSize: "0.65rem", textDecoration: "none" }}>
          View Capstone Projects →
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "1rem 1.5rem",
        backgroundColor: "var(--color-accent-soft)",
        border: "1px solid var(--color-accent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        margin: "1rem auto 0",
        maxWidth: "1400px",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-accent-text)",
            marginBottom: "0.2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span>🎯</span> Recommended Next Skill for {activeRole.shortTitle}
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "var(--color-ink)",
            marginBottom: "0.15rem",
          }}
        >
          {nextNode.number} · {nextNode.title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            color: "var(--color-ink-2)",
          }}
        >
          {nextNode.description}
        </p>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => onSelectNode(nextNode.id)}
          className="btn-ghost"
          style={{ fontSize: "0.65rem", padding: "0.4rem 0.85rem" }}
        >
          Inspect Node
        </button>
        {nextNode.lessons[0] && (
          <Link
            href={`/curriculum/${nextNode.lessons[0].phaseSlug}/${nextNode.lessons[0].lessonSlug}/`}
            className="btn-primary"
            style={{ fontSize: "0.65rem", padding: "0.4rem 0.85rem", textDecoration: "none" }}
          >
            Start Lesson →
          </Link>
        )}
      </div>
    </div>
  );
}

