// src/components/roadmap/RoadmapHero.tsx
"use client";

import { CAREER_ROLES, ROADMAP_NODES, CAPSTONE_PROJECTS } from "@/data/roadmap";
import type { CareerRole } from "@/types";

interface Props {
  activeRole: CareerRole | null;
  roleProgress: number;
}

export function RoadmapHero({ activeRole, roleProgress }: Props) {
  return (
    <section
      className="dot-grid-bg"
      style={{
        borderBottom: "1px solid var(--color-border)",
        padding: "3.5rem 1.5rem 3rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--color-accent-text)",
            marginBottom: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              backgroundColor: "var(--color-accent)",
            }}
          />
          Interactive Dependency Graph · Career Paths
        </p>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
            color: "var(--color-ink)",
            marginBottom: "1rem",
          }}
        >
          Python Career Roadmap
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.1rem",
            color: "var(--color-ink-2)",
            maxWidth: "680px",
            lineHeight: 1.6,
            marginBottom: "2rem",
          }}
        >
          {activeRole ? (
            <>
              Targeting <strong style={{ color: "var(--color-ink)" }}>{activeRole.title}</strong>:{" "}
              {activeRole.headline} Start with the common Python foundation, then branch into the specialized skills and projects required for this role.
            </>
          ) : (
            <>
              Python opens multiple high-impact engineering disciplines. Start with the same solid Python foundation, then follow the skills, tools, and projects that match your target role.
            </>
          )}
        </p>

        {/* Live Metrics Strip */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          {[
            { value: CAREER_ROLES.length, label: "Career Paths" },
            { value: ROADMAP_NODES.length, label: "Core & Branch Skills" },
            { value: CAPSTONE_PROJECTS.length, label: "Capstone Projects" },
            {
              value: activeRole ? `${roleProgress}%` : "—",
              label: activeRole ? `${activeRole.shortTitle} Progress` : "Role Progress",
              highlight: activeRole && roleProgress > 0,
            },
          ].map(({ value, label, highlight }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: highlight ? "var(--color-accent)" : "var(--color-ink)",
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-ink-3)",
                  marginTop: "0.25rem",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

