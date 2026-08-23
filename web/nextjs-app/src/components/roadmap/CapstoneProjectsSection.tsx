// src/components/roadmap/CapstoneProjectsSection.tsx
"use client";

import { CAPSTONE_PROJECTS } from "@/data/roadmap";
import type { CareerRole, CareerRoleId } from "@/types";

interface Props {
  activeRole: CareerRole | null;
  selectedRole: CareerRoleId | "all";
}

const DIFF_COLORS: Record<string, string> = {
  beginner: "var(--color-accent-text)",
  intermediate: "#d97706",
  advanced: "#dc2626",
};

export function CapstoneProjectsSection({ activeRole, selectedRole }: Props) {
  const filteredProjects =
    selectedRole === "all"
      ? CAPSTONE_PROJECTS
      : CAPSTONE_PROJECTS.filter((p) => p.roleId === selectedRole);

  return (
    <section
      id="capstone-projects"
      style={{
        maxWidth: "1400px",
        margin: "4rem auto 0",
        padding: "0 1.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid var(--color-border)",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-accent-text)",
              marginBottom: "0.25rem",
            }}
          >
            Portfolio Building
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--color-ink)",
            }}
          >
            {activeRole ? `${activeRole.title} Capstone Projects` : "All Capstone Projects"}
          </h2>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--color-ink-3)",
            textTransform: "uppercase",
          }}
        >
          {filteredProjects.length} Projects
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            style={{
              padding: "1.5rem",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
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
                    letterSpacing: "0.08em",
                    color: "var(--color-accent-text)",
                  }}
                >
                  {proj.roleTitle}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: DIFF_COLORS[proj.difficulty] ?? "var(--color-ink-3)",
                    border: `1px solid ${DIFF_COLORS[proj.difficulty] ?? "var(--color-border)"}`,
                    padding: "0.15rem 0.4rem",
                  }}
                >
                  {proj.difficulty}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                  marginBottom: "0.4rem",
                }}
              >
                {proj.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "var(--color-ink-3)",
                  lineHeight: 1.5,
                  marginBottom: "1rem",
                }}
              >
                {proj.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "1.25rem" }}>
                {proj.skills.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <a
                href="/projects/"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--color-accent-text)",
                  textDecoration: "none",
                }}
              >
                Explore in Projects Catalog →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

