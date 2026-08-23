// src/app/page.tsx — Homepage
import Link from "next/link";
import { PHASES, STATS } from "@/lib/curriculum";
import { HomeCurriculumList } from "@/components/HomeCurriculumList";
import { HeroTerminalBox } from "@/components/HeroTerminalBox";
import { HeroPythonEngineAnimation } from "@/components/HeroPythonEngineAnimation";

const VOLUMES = [
  {
    vol: "VOL_001",
    title: "FOUNDATIONS",
    desc: "Syntax, Memory Model, Control Flow, and OOP · phases 00–08",
    href: "/curriculum/00-getting-started/",
  },
  {
    vol: "VOL_002",
    title: "CORE INTERNALS",
    desc: "Dunder Protocols, Descriptors, Metaclasses, and Memory · phases 09–12",
    href: "/curriculum/09-dunder-methods/",
  },
  {
    vol: "VOL_003",
    title: "SYSTEMS & TESTING",
    desc: "Testing, Tooling, Packaging, and CPython C-API · phases 13–15",
    href: "/curriculum/13-testing/",
  },
  {
    vol: "VOL_004",
    title: "PRODUCTION APIS",
    desc: "FastAPI, Asyncio, Databases, Redis, and WebSockets · phases 16–17",
    href: "/curriculum/16-fastapi/",
  },
  {
    vol: "VOL_005",
    title: "DATA & AI FOUNDATIONS",
    desc: "NumPy, Vector DBs, Embeddings, RAG, and AI Agents · phases 18–19",
    href: "/curriculum/18-data-python/",
  },
  {
    vol: "VOL_006",
    title: "PRODUCTION SYSTEMS",
    desc: "Docker, Kubernetes, Observability, and Capstones · phases 20–21",
    href: "/curriculum/20-real-world-projects/",
  },
];

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "var(--color-bg)" }}>
      {/* ── Hero Section ───────────────────────────────────────── */}
      <section
        className="dot-grid-bg"
        style={{
          borderBottom: "1px solid var(--color-border)",
          padding: "3.5rem 1.5rem 3rem",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Top metadata bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-accent-text)",
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
              <span>Fig_000 · Curriculum V1.0 · 2026</span>
            </div>

            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--color-ink-3)",
                display: "flex",
                gap: "1rem",
              }}
            >
              <span>{STATS.phases} PHASES</span>
              <span>·</span>
              <span>{STATS.lessons} LESSONS</span>
              <span>·</span>
              <span>{STATS.exercises} EXERCISES</span>
            </div>
          </div>

          {/* Main 2-column hero */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "start",
            }}
            className="hero-grid"
          >
            {/* Left column — Title & Concept */}
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.9,
                  color: "var(--color-ink)",
                  marginBottom: "1.5rem",
                }}
              >
                Python
                <br />
                <span style={{ color: "var(--color-accent)" }}>From Scratch</span>
              </h1>

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

              {/* Action Buttons */}
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
                  <span style={{ color: "#e3b341" }}>★</span>
                  <span>Star on GitHub</span>
                </a>

                <Link
                  href="/certifications/"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    padding: "0.4rem 0.85rem",
                    backgroundColor: "var(--color-accent-soft)",
                    color: "var(--color-accent-text)",
                    border: "1px solid var(--color-accent)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span>AI Certifications Prep →</span>
                </Link>
              </div>

              {/* Terminal command */}
              <HeroTerminalBox />

              {/* CTAs */}
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  href="/curriculum/00-getting-started/what-is-python/"
                  className="btn-primary"
                  style={{ fontSize: "0.72rem", padding: "0.65rem 1.4rem" }}
                >
                  Start Phase 00 →
                </Link>
                <Link
                  href="/curriculum/"
                  className="btn-secondary"
                  style={{ fontSize: "0.72rem", padding: "0.65rem 1.2rem" }}
                >
                  View Curriculum
                </Link>
                <Link
                  href="/roadmap/"
                  className="btn-ghost"
                  style={{ fontSize: "0.72rem", padding: "0.65rem 1.2rem" }}
                >
                  Career Roadmap
                </Link>
              </div>
            </div>

            {/* Right column — CPython Virtual Machine & Runtime Engine Animation */}
            <div>
              <HeroPythonEngineAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Feature Pillars ─────────────────────────────────── */}
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
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            borderLeft: "1px solid var(--color-border)",
          }}
        >
          {[
            {
              num: "01",
              label: "Zero Magic",
              desc: "Every concept explained at memory, frame, and opcode level before importing packages.",
            },
            {
              num: "02",
              label: "CPython Internals",
              desc: "Reference counting, bytecode compilation, descriptor protocol, and GIL mechanics.",
            },
            {
              num: "03",
              label: "Production Systems",
              desc: "FastAPI, PostgreSQL, Redis, Docker, and Asyncio built and deployed end-to-end.",
            },
            {
              num: "04",
              label: "AI & Certification Prep",
              desc: "Vector databases, RAG, autonomous agents, and 4 role-based Claude certification tracks.",
            },
          ].map((f) => (
            <div
              key={f.num}
              style={{
                padding: "2rem 1.5rem",
                borderRight: "1px solid var(--color-border)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--color-accent)",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                {f.num}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
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
                  fontSize: "0.82rem",
                  color: "var(--color-ink-3)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Curriculum Volumes / Books Section ────────────────── */}
      <section style={{ padding: "4rem 1.5rem 2rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ marginBottom: "1.75rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--color-accent-text)",
              display: "block",
              marginBottom: "0.25rem",
            }}
          >
            Curriculum Series · 6 Modular Volumes
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.2rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--color-ink)",
            }}
          >
            Structured Knowledge Volumes
          </h2>
        </div>

        <div
          className="card-grid-responsive"
          style={{
            gap: "1.25rem",
          }}
        >
          {VOLUMES.map((vol) => (
            <div
              key={vol.vol}
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                    display: "block",
                    marginBottom: "0.35rem",
                  }}
                >
                  {vol.vol}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.45rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--color-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {vol.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "var(--color-ink-2)",
                    lineHeight: 1.5,
                    marginBottom: "1rem",
                  }}
                >
                  {vol.desc}
                </p>
              </div>

              <Link
                href={vol.href}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--color-accent-text)",
                  textDecoration: "none",
                }}
                className="hover:underline"
              >
                Explore Volume →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Curriculum Table of Contents ─────────────────────── */}
      <section style={{ padding: "3rem 1.5rem 4rem", maxWidth: "1280px", margin: "0 auto" }}>
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

      {/* ── Independent Certification Preparation Banner (BELOW CURRICULUM) ────── */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "1rem 1.5rem 6rem" }}>
        <div
          className="hero-banner-grid"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1.5px solid var(--color-accent)",
            padding: "2.5rem 2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--color-accent-text)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Independent Certification Preparation
            </span>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--color-ink)",
                lineHeight: 1.05,
                marginBottom: "0.75rem",
              }}
            >
              Prepare By Building The Real Systems
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.98rem",
                color: "var(--color-ink-2)",
                lineHeight: 1.55,
                maxWidth: "680px",
                marginBottom: "1.25rem",
              }}
            >
              Four Claude certification paths taught the same way as the course: step by step, with interactive labs, practical artifacts, blueprint domain weighting, and timed mock exams.
            </p>

            {/* Metrics Tagline */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-accent)",
                marginBottom: "1rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <span>4 Tracks (CCAO-F · CCDV-F · CCAR-F · CCAR-P)</span>
              <span>·</span>
              <span>33+ Certification Lessons</span>
              <span>·</span>
              <span>295 Original Practice Questions</span>
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                color: "var(--color-ink-3)",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Not affiliated with, endorsed by, sponsored by, or authorized by Anthropic. This curriculum does not issue credentials or guarantee a passing result.
            </p>
          </div>

          {/* Action Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minWidth: "220px" }}>
            <Link
              href="/certifications/"
              className="btn-primary"
              style={{
                textAlign: "center",
                padding: "0.75rem 1.25rem",
                fontSize: "0.75rem",
                textDecoration: "none",
              }}
            >
              Explore all 4 tracks →
            </Link>

            <Link
              href="/certifications/claude-ccdv-f/"
              className="btn-secondary"
              style={{
                textAlign: "center",
                padding: "0.65rem 1.25rem",
                fontSize: "0.7rem",
                textDecoration: "none",
              }}
            >
              CCDV-F Developer Path
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
