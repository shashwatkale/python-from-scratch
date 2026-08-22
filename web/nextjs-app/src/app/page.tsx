import type { Metadata } from "next";
import Link from "next/link";
import { PHASES, STATS } from "@/lib/curriculum";
import { HomeCurriculumList } from "@/components/HomeCurriculumList";

export const metadata: Metadata = {
  title: "Python / From Scratch — Learn Python by Building",
  description:
    "Learn Python from your first print() statement to production-ready applications. Free, open-source, project-based.",
};

const CLONE_CMD = `git clone https://github.com/shashwatkale/python-from-scratch.git
cd python-from-scratch
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt`;

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "var(--color-bg)" }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="dot-grid-bg"
        style={{
          borderBottom: "1px solid var(--color-border)",
          padding: "5rem 1.5rem 4rem",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--color-accent-text)",
              marginBottom: "1.25rem",
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
            Free · Open Source · Project-Based
          </p>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              color: "var(--color-ink)",
              marginBottom: "1.5rem",
            }}
          >
            Python
            <br />
            <span style={{ color: "var(--color-accent)" }}>From Scratch</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.125rem",
              color: "var(--color-ink-2)",
              maxWidth: "560px",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Learn Python from your first{" "}
            <code
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.95em",
                backgroundColor: "var(--color-surface-2)",
                color: "var(--color-accent-text)",
                padding: "0.1em 0.4em",
                border: "1px solid var(--color-border)",
              }}
            >
              print()
            </code>{" "}
            statement to production-ready applications.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "3rem" }}>
            <Link href="/curriculum/00-getting-started/" className="btn-primary">
              Start Learning →
            </Link>
            <Link href="/roadmap/" className="btn-ghost">
              View Roadmap
            </Link>
            <a
              href="https://github.com/shashwatkale/python-from-scratch"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>

          {/* Stats — derived from data */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--color-border)",
            }}
          >
            {[
              { value: STATS.phases, label: "Phases" },
              { value: STATS.lessons, label: "Lessons" },
              { value: STATS.exercises, label: "Exercises" },
              { value: STATS.projects, label: "Projects" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
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
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          }}
        >
          {[
            { label: "Beginner Friendly", desc: "Start from zero, no experience needed" },
            { label: "Project-Based", desc: "Build real things at every phase" },
            { label: "Interview Ready", desc: "DSA, algorithms, and common questions" },
            { label: "Production Python", desc: "FastAPI, databases, async, testing" },
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

      {/* ── Curriculum list ──────────────────────────────────── */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            paddingBottom: "0.75rem",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--color-ink)",
            }}
          >
            Curriculum
          </h2>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-ink-3)",
            }}
          >
            {PHASES.length} Phases
          </span>
        </div>

        <HomeCurriculumList phases={PHASES} />

        <div style={{ marginTop: "1.5rem" }}>
          <Link href="/curriculum/" className="btn-ghost">
            View Full Curriculum →
          </Link>
        </div>
      </section>

      {/* ── Setup block ──────────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface)",
          padding: "3rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-ink-3)",
              marginBottom: "0.75rem",
            }}
          >
            Quick Start
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--color-ink)",
              marginBottom: "1.25rem",
            }}
          >
            Get the Repository
          </h2>
          <div className="code-block-wrapper" style={{ maxWidth: "600px" }}>
            <div className="code-block-header">
              <span className="code-block-lang">bash</span>
            </div>
            <pre className="code-block-pre" style={{ color: "var(--color-ink-2)" }}>
              {CLONE_CMD}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
