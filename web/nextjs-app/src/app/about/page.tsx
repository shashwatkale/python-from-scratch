import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Python From Scratch — a free, open-source Python learning platform.",
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--color-border)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-ink)", lineHeight: 1.05 }}>
          About
        </h1>
      </div>

      <div className="lesson-prose">
        <p>
          <strong>Python / From Scratch</strong> is a free, open-source Python curriculum built for
          people who want to learn Python by actually writing code.
        </p>
        <p>
          Every lesson follows a consistent structure: concept, explanation, syntax, example,
          real-world use, common mistakes, exercises, and interview questions. No lesson is
          purely theoretical.
        </p>
        <p>
          The goal is to take a complete beginner from their first{" "}
          <code>print()</code> statement to building production-quality Python applications —
          covering web APIs, databases, async programming, testing, DSA, and real-world projects.
        </p>
        <p>
          The entire project — curriculum, code, exercises, projects, and this website — is
          open source under the MIT license.
        </p>
        <hr />
        <p>
          <a href="https://github.com/shashwatkale/python-from-scratch">GitHub →</a>
          {"  "}
          <Link href="/contributing/">Contributing →</Link>
        </p>
      </div>
    </div>
  );
}
