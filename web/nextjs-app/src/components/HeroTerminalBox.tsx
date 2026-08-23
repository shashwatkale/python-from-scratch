// src/components/HeroTerminalBox.tsx — Interactive Terminal Command Box
"use client";

import { useState } from "react";

const TERMINAL_COMMAND = "npx skills add python-from-scratch\n> /start-learning";

export function HeroTerminalBox() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx skills add python-from-scratch");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border-2)",
        marginTop: "1.75rem",
        overflow: "hidden",
      }}
    >
      {/* Terminal Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1rem",
          borderBottom: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface-2)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--color-ink-3)",
          }}
        >
          Learn In Your Terminal
        </span>

        <button
          onClick={handleCopy}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: copied ? "#059669" : "var(--color-accent-text)",
            border: "1px solid",
            borderColor: copied ? "#059669" : "var(--color-border)",
            backgroundColor: "var(--color-surface)",
            padding: "0.15rem 0.5rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          {copied ? "COPIED ✓" : "COPY 📋"}
        </button>
      </div>

      {/* Terminal Content Body */}
      <div style={{ padding: "0.85rem 1rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--color-ink)",
            marginBottom: "0.3rem",
            userSelect: "all",
          }}
        >
          npx skills add python-from-scratch
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--color-accent-text)",
            margin: 0,
          }}
        >
          &gt; /start-learning
        </p>
      </div>

      {/* Terminal Footer Sub-bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.5rem 1rem",
          borderTop: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface-2)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--color-ink-3)",
        }}
      >
        <span>⚡ CLAUDE</span>
        <span>·</span>
        <span>🤖 CURSOR</span>
        <span>·</span>
        <span>🧠 CODEX</span>
        <span>·</span>
        <span>+ ANY SKILL.MD AGENT</span>
      </div>
    </div>
  );
}
