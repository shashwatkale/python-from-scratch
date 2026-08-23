// src/components/roadmap/RoleSelector.tsx
"use client";

import { CAREER_ROLES, calculateRoleProgress } from "@/data/roadmap";
import type { CareerRoleId } from "@/types";

interface Props {
  selectedRole: CareerRoleId | "all";
  onSelectRole: (role: CareerRoleId | "all") => void;
  completedLessons: string[];
}

export function RoleSelector({
  selectedRole,
  onSelectRole,
  completedLessons,
}: Props) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
        padding: "1.25rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.75rem",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-ink)",
              }}
            >
              Choose Target Role
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--color-ink-3)",
              }}
            >
              (Highlights required learning path)
            </span>
          </div>

          {/* All Paths button */}
          <button
            onClick={() => onSelectRole("all")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "0.3rem 0.75rem",
              border: "1px solid",
              borderColor:
                selectedRole === "all"
                  ? "var(--color-accent)"
                  : "var(--color-border-2)",
              backgroundColor:
                selectedRole === "all"
                  ? "var(--color-accent-soft)"
                  : "transparent",
              color:
                selectedRole === "all"
                  ? "var(--color-accent-text)"
                  : "var(--color-ink-3)",
              cursor: "pointer",
              transition: "all 0.12s",
            }}
          >
            Show All Paths
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div className="block sm:hidden" style={{ marginTop: "0.5rem" }}>
          <select
            value={selectedRole}
            onChange={(e) => onSelectRole(e.target.value as CareerRoleId | "all")}
            style={{
              width: "100%",
              padding: "0.6rem 0.85rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              backgroundColor: "var(--color-surface-2)",
              color: "var(--color-ink)",
              border: "1px solid var(--color-border)",
              outline: "none",
            }}
          >
            <option value="all">Show All Paths</option>
            {CAREER_ROLES.map((role) => (
              <option key={role.id} value={role.id}>
                {role.icon} {role.title}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Role Pills */}
        <div
          className="hidden sm:flex"
          style={{
            flexWrap: "wrap",
            gap: "0.4rem",
          }}
        >
          {CAREER_ROLES.map((role) => {
            const isSelected = selectedRole === role.id;
            const progress = calculateRoleProgress(role.id, completedLessons);

            return (
              <button
                key={role.id}
                onClick={() => onSelectRole(role.id)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  fontWeight: isSelected ? 700 : 500,
                  letterSpacing: "0.04em",
                  padding: "0.4rem 0.85rem",
                  border: "1px solid",
                  borderColor: isSelected
                    ? "var(--color-accent)"
                    : "var(--color-border)",
                  backgroundColor: isSelected
                    ? "var(--color-accent-soft)"
                    : "var(--color-surface)",
                  color: isSelected
                    ? "var(--color-accent-text)"
                    : "var(--color-ink)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "all 0.12s",
                }}
              >
                <span>{role.icon}</span>
                <span>{role.title}</span>
                {progress > 0 && (
                  <span
                    style={{
                      fontSize: "0.6rem",
                      padding: "0.05rem 0.3rem",
                      backgroundColor: isSelected ? "var(--color-accent)" : "var(--color-surface-2)",
                      color: isSelected ? "#fff" : "var(--color-accent-text)",
                      fontWeight: 700,
                    }}
                  >
                    {progress}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

