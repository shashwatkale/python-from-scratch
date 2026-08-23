// src/app/page.tsx — Python / From Scratch Home Page with CPython Engine Animation
import type { Metadata } from "next";
import Link from "next/link";
import { PHASES, STATS } from "@/lib/curriculum";
import { HomeCurriculumList } from "@/components/HomeCurriculumList";
import { HeroPythonEngineAnimation } from "@/components/HeroPythonEngineAnimation";
import { HeroTerminalBox } from "@/components/HeroTerminalBox";

export const metadata: Metadata = {
  title: "Python / From Scratch — Learn Python by Building",
  description:
    "Learn Python from your first print() statement to production-ready applications. Free, open-source, project-based.",
};

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "var(--color-bg)" }}>
      {/* ── Technical Hero ────────────────────────────────────── */}
      <section
        className="dot-grid-bg"
        style={{
          borderBottom: "1px solid var(--color-border)",
          padding: "2.5rem 1.5rem 4rem",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Top Metadata Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid var(--color-border)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--color-accent-text)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "6px",
                  backgroundColor: "var(--color-accent)",
                }}
              />
              <span>FIG_000 · CURRICULUM V1.0 · 2026</span>
            </div>
            <span>OPEN SOURCE · MIT LICENSE</span>
          </div>

          {/* 2-Column Hero Workspace */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            {/* ── Left Column: Technical Pitch & Actions ───────── */}
            <div>
              {/* Title */}
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  lineHeight: 0.95,
                  color: "var(--color-ink)",
                  marginBottom: "1.25rem",
                }}
              >
                Python Engineering
                <br />
                <span style={{ color: "var(--color-accent)" }}>From Scratch</span>
              </h1>

              {/* Lead Paragraph */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.1rem",
                  color: "var(--color-ink)",
                  lineHeight: 1.6,
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                }}
              >
                100+ lessons. 21 phases. Every concept built from raw fundamentals before a single framework gets imported.
              </p>

              {/* Subtext */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--color-ink-3)",
                  fontStyle: "italic",
                  marginBottom: "1.5rem",
                }}
              >
                100% Free &amp; Open Source technical learning platform. Run on your own machine.
              </p>

              {/* GitHub Button */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.6rem",
                  marginBottom: "1.25rem",
                }}
              >
                <a
                  href="https://github.com/shashwatkale/python-from-scratch"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    padding: "0.4rem 0.85rem",
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-ink)",
                    border: "1px solid var(--color-border-2)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "border-color 0.12s",
                  }}
                  className="hover:border-accent"
                >
                  <span style={{ color: "#eab308" }}>★</span>
                  <span>Star on GitHub</span>
                </a>

                <a
                  href="https://github.com/shashwatkale/python-from-scratch"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    padding: "0.4rem 0.85rem",
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-ink-2)",
                    border: "1px solid var(--color-border)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                  className="hover:border-accent"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>Repository</span>
                </a>
              </div>

              {/* Terminal Box */}
              <HeroTerminalBox />

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  color: "var(--color-ink-3)",
                  marginTop: "0.5rem",
                  lineHeight: 1.4,
                }}
              >
                Your agent becomes your tutor: placement quiz, personalized path, lessons taught interactively in your terminal.
              </p>

              {/* Quick Jump Action Buttons */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.6rem",
                  marginTop: "1.5rem",
                }}
              >
                <Link href="/curriculum/00-getting-started/" className="btn-primary">
                  Start Curriculum →
                </Link>
                <Link href="/roadmap/" className="btn-ghost">
                  Career Roadmap
                </Link>
                <Link href="/glossary/" className="btn-ghost">
                  Python Glossary
                </Link>
              </div>
            </div>

            {/* ── Right Column: CPython Virtual Machine Animation ─ */}
            <div>
              <HeroPythonEngineAnimation />
            </div>
          </div>

          {/* Stats Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2.5rem",
              paddingTop: "2.5rem",
              marginTop: "3rem",
              borderTop: "1px solid var(--color-border)",
            }}
          >
            {[
              { value: STATS.phases, label: "Phases" },
              { value: STATS.lessons, label: "Lessons" },
              { value: STATS.exercises, label: "Exercises" },
              { value: STATS.projects, label: "Projects" },
              { value: "11", label: "Career Paths" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.2rem",
                    fontWeight: 700,
                    color: "var(--color-ink)",
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

      {/* ── Features strip ───────────────────────────────────── */}
      <section
        style={{
          borderBottom: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          {[
            { label: "Beginner Friendly", desc: "Start from zero, no experience needed" },
            { label: "Project-Based", desc: "Build real things at every single phase" },
            { label: "Interactive Roadmap", desc: "11 career paths with animated dependency graph" },
            { label: "Production Python", desc: "FastAPI, databases, async, testing, MLOps" },
          ].map((f) => (
            <div
              key={f.label}
              style={{
                padding: "1.5rem 1.25rem",
                borderRight: "1px solid var(--color-border)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-ink)",
                  marginBottom: "0.35rem",
                }}
              >
                {f.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "var(--color-ink-3)",
                  lineHeight: 1.5,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Curriculum table of contents ─────────────────────── */}
      <section style={{ padding: "4rem 1.5rem 6rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            paddingBottom: "1rem",
            borderBottom: "2px solid var(--color-ink)",
            marginBottom: "2rem",
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
              Complete Curriculum
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--color-ink)",
              }}
            >
              21 Phases · Zero to Production
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
            {STATS.lessons} Lessons Total
          </span>
        </div>

        <HomeCurriculumList phases={PHASES} />
      </section>
    </div>
  );
}
