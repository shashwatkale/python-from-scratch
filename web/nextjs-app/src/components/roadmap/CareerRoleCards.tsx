// src/components/roadmap/CareerRoleCards.tsx — 11 Career Paths Summary Grid
"use client";

import { CAREER_ROLES, calculateRoleProgress } from "@/data/roadmap";
import type { CareerRoleId } from "@/types";

interface Props {
  selectedRole: CareerRoleId | "all";
  onSelectRole: (role: CareerRoleId) => void;
  completedLessons: string[];
}

export function CareerRoleCards({
  selectedRole,
  onSelectRole,
  completedLessons,
}: Props) {
  return (
    <section
      id="career-roles"
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
            Engineering Specializations
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
            11 Python Career Paths
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
          Click to highlight path
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {CAREER_ROLES.map((role) => {
          const isSelected = selectedRole === role.id;
          const progress = calculateRoleProgress(role.id, completedLessons);

          return (
            <div
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              style={{
                padding: "1.5rem",
                backgroundColor: isSelected
                  ? "var(--color-accent-soft)"
                  : "var(--color-surface)",
                border: "1px solid",
                borderColor: isSelected
                  ? "var(--color-accent)"
                  : "var(--color-border)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.15s ease",
              }}
              className="hover:border-accent"
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span style={{ fontSize: "1.75rem" }}>{role.icon}</span>
                  {progress > 0 && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        padding: "0.15rem 0.45rem",
                        backgroundColor: "var(--color-accent)",
                        color: "#fff",
                      }}
                    >
                      {progress}% COMPLETE
                    </span>
                  )}
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
                  {role.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--color-accent-text)",
                    marginBottom: "0.6rem",
                  }}
                >
                  {role.headline}
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem",
                    color: "var(--color-ink-3)",
                    lineHeight: 1.5,
                    marginBottom: "1.25rem",
                  }}
                >
                  {role.description}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "var(--color-ink-3)",
                    textTransform: "uppercase",
                  }}
                >
                  {role.nodeIds.length} Skills · {role.capstoneProjects.length} Projects
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "var(--color-accent-text)",
                    textTransform: "uppercase",
                  }}
                >
                  {isSelected ? "Active Path ✓" : "Select Path →"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

