import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cheatsheets",
  description: "Quick reference cheatsheets for Python syntax, data structures, and more.",
};

const SHEETS = [
  { slug: "python-syntax", title: "Python Syntax", description: "Variables, operators, control flow, functions, and built-ins." },
  { slug: "strings", title: "Strings", description: "String methods, formatting, f-strings, and slicing." },
  { slug: "lists", title: "Lists", description: "List creation, indexing, slicing, methods, and comprehensions." },
  { slug: "dictionaries", title: "Dictionaries", description: "Dict creation, access, methods, and comprehensions." },
  { slug: "oop", title: "OOP", description: "Classes, inheritance, magic methods, and dataclasses." },
  { slug: "big-o", title: "Big O", description: "Time and space complexity reference for common operations." },
];

export default function CheatsheetsPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--color-border)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-3)", marginBottom: "0.5rem" }}>
          Glossary · {SHEETS.length} Sheets
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-ink)", lineHeight: 1.05 }}>
          Cheatsheets
        </h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-border)" }}>
        {SHEETS.map((sheet) => (
          <div
            key={sheet.slug}
            style={{
              padding: "1.25rem",
              backgroundColor: "var(--color-surface)",
              cursor: "default",
            }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-ink)", marginBottom: "0.4rem" }}>
              {sheet.title}
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-ink-3)", marginBottom: "0.75rem" }}>
              {sheet.description}
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--color-ink-3)" }}>
              cheatsheets/{sheet.slug}.md
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
