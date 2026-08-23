// src/app/certifications/page.tsx — AI Certification Curriculum Hub
import Link from "next/link";
import type { Metadata } from "next";
import { CERTIFICATION_TRACKS } from "@/data/certifications";

export const metadata: Metadata = {
  title: "AI Certification Curriculum — Free & Open Source Preparation",
  description:
    "Free, independent, open-source preparation for AI engineering credentials. Role-based tracks for Claude Certifications (CCAO-F, CCDV-F, CCAR-F, CCAR-P) with blueprint domains, lessons, and timed mocks.",
};

export default function CertificationsPage() {
  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      {/* ── 1. Masthead ───────────────────────────────────────── */}
      <section
        className="dot-grid-bg"
        style={{
          borderBottom: "1px solid var(--color-border)",
          padding: "3.5rem 1.5rem 2.5rem",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--color-accent-text)",
              marginBottom: "1rem",
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
            <span>AI Certification Preparation · Open Source Curriculum</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              lineHeight: 0.95,
              color: "var(--color-ink)",
              marginBottom: "1rem",
            }}
          >
            AI Certification
            <br />
            <span style={{ color: "var(--color-accent)" }}>Curriculum</span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.08rem",
              color: "var(--color-ink-2)",
              maxWidth: "720px",
              lineHeight: 1.6,
              marginBottom: "1.75rem",
            }}
          >
            Free, independent, open-source preparation for AI engineering credentials. Start with Claude, with more certification families coming next.
          </p>

          {/* Status Pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "2rem",
            }}
          >
            {[
              "CLAUDE AVAILABLE NOW",
              "4 ROLE-BASED TRACKS",
              "33 CERTIFICATION LESSONS",
              "VERIFIED AUG 9, 2026",
            ].map((pill) => (
              <span
                key={pill}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "0.3rem 0.65rem",
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border-2)",
                  color: "var(--color-ink)",
                }}
              >
                {pill}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
            <Link
              href="/certifications/claude-ccdv-f/"
              className="btn-primary"
              style={{
                padding: "0.65rem 1.4rem",
                fontSize: "0.72rem",
                textDecoration: "none",
              }}
            >
              Start CCDV-F Developer Path →
            </Link>

            <Link
              href="/certifications/claude-ccao-f/"
              className="btn-secondary"
              style={{
                fontSize: "0.72rem",
                textDecoration: "none",
              }}
            >
              CCAO-F Associate Path
            </Link>

            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "var(--color-ink-3)",
                padding: "0.4rem 0.75rem",
                border: "1px dashed var(--color-border)",
              }}
            >
              • More Certifications Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. Official Exam Access & Quick Links Notice ─────── */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 1.5rem 0" }}>
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderLeft: "4px solid var(--color-accent)",
            padding: "1.75rem 2rem",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "2.5rem",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-accent-text)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Official Exam Access Notice
            </span>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.88rem",
                color: "var(--color-ink-2)",
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              As verified on August 9, 2026, official exam registration is limited to people at Claude Partner Network organizations and requires a recognized partner-company email. This open curriculum is available to everyone. Verify current eligibility before paying or scheduling because access rules can change.
            </p>
          </div>

          {/* Quick Links Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              borderLeft: "1px solid var(--color-border)",
              paddingLeft: "1.75rem",
            }}
          >
            {[
              { label: "Claude certification exam prep courses ↗", url: "https://anthropic-partners.skilljar.com/page/claude-certification-exam-prep-courses" },
              { label: "Claude certification program FAQ ↗", url: "https://anthropic-partners.skilljar.com/page/faq-certifications" },
              { label: "Anthropic Academy course catalog ↗", url: "https://anthropic.skilljar.com/" },
              { label: "Claude Platform documentation ↗", url: "https://platform.claude.com/docs/en/home" },
              { label: "Claude Code documentation ↗", url: "https://code.claude.com/docs/en/overview" },
              { label: "Model Context Protocol documentation ↗", url: "https://modelcontextprotocol.io/docs/getting-started/intro" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--color-accent-text)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
                className="hover:underline"
              >
                <span>›</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. The 4 Certification Tracks (2x2 Grid) ─────────── */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>
        <div style={{ marginBottom: "1.75rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-accent-text)",
              display: "block",
              marginBottom: "0.25rem",
            }}
          >
            Available Now
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.2rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--color-ink)",
              marginBottom: "0.35rem",
            }}
          >
            Claude Certification Tracks
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-ink-2)", margin: 0 }}>
            Each route maps official blueprint domains to lessons, practical code labs, and a measurable readiness plan.
          </p>
        </div>

        <div
          className="card-grid-responsive"
          style={{
            marginBottom: "4rem",
          }}
        >
          {CERTIFICATION_TRACKS.map((track) => (
            <article
              key={track.id}
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "border-color 0.15s ease",
              }}
              className="hover:border-accent"
            >
              <div>
                {/* Top Code & Level Badge */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--color-accent)",
                    }}
                  >
                    {track.code}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      padding: "0.2rem 0.5rem",
                      backgroundColor: "var(--color-surface-2)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-ink-3)",
                    }}
                  >
                    {track.levelBadge}
                  </span>
                </div>

                {/* Track Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.01em",
                    lineHeight: 1.1,
                    color: "var(--color-ink)",
                    marginBottom: "1rem",
                  }}
                >
                  <Link
                    href={`/certifications/${track.id}/`}
                    style={{ color: "inherit", textDecoration: "none" }}
                    className="hover:text-accent"
                  >
                    {track.title}
                  </Link>
                </h3>

                {/* Tagline */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.92rem",
                    color: "var(--color-ink-2)",
                    lineHeight: 1.5,
                    marginBottom: "1.75rem",
                  }}
                >
                  {track.tagline}
                </p>

                {/* Exam Metric Boxes */}
                <div
                  className="stat-box-3col"
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "var(--color-surface-2)",
                    border: "1px solid var(--color-border)",
                    marginBottom: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "var(--color-ink)",
                        display: "block",
                      }}
                    >
                      {track.questionsCount}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        textTransform: "uppercase",
                        color: "var(--color-ink-3)",
                      }}
                    >
                      QUESTIONS
                    </span>
                  </div>

                  <div style={{ borderLeft: "1px solid var(--color-border)", borderRight: "1px solid var(--color-border)" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "var(--color-ink)",
                        display: "block",
                      }}
                    >
                      {track.timeLimitMin} min
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        textTransform: "uppercase",
                        color: "var(--color-ink-3)",
                      }}
                    >
                      TIME LIMIT
                    </span>
                  </div>

                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "var(--color-accent)",
                        display: "block",
                      }}
                    >
                      {track.passingScore}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        textTransform: "uppercase",
                        color: "var(--color-ink-3)",
                      }}
                    >
                      PASSING SCORE
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Action */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: "var(--color-ink-3)",
                  }}
                >
                  {track.lessons.length} lessons · {track.domains.length} domains
                </span>

                <Link
                  href={`/certifications/${track.id}/`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--color-accent-text)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                  className="hover:underline"
                >
                  Open path →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ── 4. How This Works: 3-Pillar Learning Model ──────── */}
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
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
              How This Works
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--color-ink)",
              }}
            >
              Learn. Build. Decide Under Pressure.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              {
                step: "01",
                title: "LEARN THE MECHANISM",
                desc: "Study the concepts behind the blueprint instead of memorizing product vocabulary.",
              },
              {
                step: "02",
                title: "BUILD THE SYSTEM",
                desc: "Use labs and artifacts to make architecture, tooling, evaluation, and safety decisions concrete.",
              },
              {
                step: "03",
                title: "PRACTICE THE JUDGMENT",
                desc: "Use original scenarios, timed mocks, and domain feedback to find your weak decisions.",
              },
            ].map((pillar) => (
              <div
                key={pillar.step}
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  padding: "1.75rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: "0.75rem",
                  }}
                >
                  {pillar.step}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--color-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.92rem",
                    color: "var(--color-ink-2)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. Independent Preparation Disclaimer ────────────── */}
        <div
          style={{
            backgroundColor: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderLeft: "4px solid var(--color-accent)",
            padding: "1.5rem 1.75rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-accent-text)",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Independent Preparation Disclaimer
          </span>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.88rem",
              color: "var(--color-ink-2)",
              lineHeight: 1.6,
              marginBottom: "0.5rem",
            }}
          >
            This is an independent community curriculum. It is not affiliated with, endorsed by, sponsored by, or authorized by Anthropic. It does not contain live protected exam questions. The official exam guide and current program policies always take precedence.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.88rem",
              color: "var(--color-ink-3)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Practice percentages in this curriculum are raw scores for this course. They are not equivalent to Anthropic&apos;s scaled score of 100 to 1,000 and cannot predict an official result.
          </p>
        </div>
      </section>
    </div>
  );
}
