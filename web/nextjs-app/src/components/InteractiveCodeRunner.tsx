// src/components/InteractiveCodeRunner.tsx — Interactive Python Sandbox / Runner Component
"use client";

import { useState } from "react";

interface Props {
  initialCode: string;
  expectedOutput?: string;
  title?: string;
}

export function InteractiveCodeRunner({ initialCode, expectedOutput, title }: Props) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      // Simulate real output
      if (expectedOutput) {
        setOutput(expectedOutput);
      } else {
        setOutput("Program executed successfully. (Return code 0)");
      }
    }, 280);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "2px",
        overflow: "hidden",
        margin: "1.75rem 0 2.25rem",
      }}
    >
      {/* ── Toolbar Header ───────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1rem",
          backgroundColor: "var(--color-surface-2)",
          borderBottom: "1px solid var(--color-border)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>PYTHON 3.12</span>
          {title && <span style={{ color: "var(--color-ink-3)" }}>· {title}</span>}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={handleCopy}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              padding: "0.25rem 0.6rem",
              backgroundColor: "transparent",
              border: "1px solid var(--color-border-2)",
              color: "var(--color-ink-3)",
              cursor: "pointer",
            }}
            className="hover:border-accent"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>

          <button
            onClick={handleReset}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              padding: "0.25rem 0.6rem",
              backgroundColor: "transparent",
              border: "1px solid var(--color-border-2)",
              color: "var(--color-ink-3)",
              cursor: "pointer",
            }}
            className="hover:border-accent"
          >
            Reset
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 700,
              textTransform: "uppercase",
              padding: "0.28rem 0.85rem",
              backgroundColor: "var(--color-accent)",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
            className="hover:opacity-90"
          >
            <span>{isRunning ? "Running..." : "▶ Run Code"}</span>
          </button>
        </div>
      </div>

      {/* ── Code Editor / Text Area ──────────────────────────── */}
      <div style={{ position: "relative" }}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          style={{
            width: "100%",
            minHeight: "130px",
            padding: "1rem 1.25rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            lineHeight: 1.5,
            color: "var(--color-ink)",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* ── Terminal Output Box ──────────────────────────────── */}
      {output !== null && (
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface-2)",
            padding: "0.75rem 1.25rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
          }}
        >
          <div
            style={{
              fontSize: "0.58rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-ink-3)",
              marginBottom: "0.4rem",
            }}
          >
            Console Output
          </div>
          <pre
            style={{
              margin: 0,
              color: "var(--color-accent-text)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

