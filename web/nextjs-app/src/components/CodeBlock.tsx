"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "./ThemeProvider";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

function normalizeLanguage(lang?: string): string {
  if (!lang) return "markup";
  const l = lang.toLowerCase().trim();
  if (["python", "py", "python3"].includes(l)) return "python";
  if (["typescript", "ts"].includes(l)) return "typescript";
  if (["javascript", "js"].includes(l)) return "javascript";
  if (["tsx", "jsx"].includes(l)) return "tsx";
  if (["json"].includes(l)) return "json";
  if (["yaml", "yml"].includes(l)) return "yaml";
  if (["css", "scss"].includes(l)) return "css";
  if (["sql"].includes(l)) return "sql";
  if (["go", "golang"].includes(l)) return "go";
  if (["rust", "rs"].includes(l)) return "rust";
  if (["c", "cpp", "c++"].includes(l)) return "c";
  // Fallback for markdown, bash, shell, text, etc.
  return "markup";
}

export function CodeBlock({
  code,
  language = "python",
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const safeLang = normalizeLanguage(language);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="code-block-lang">{language || "code"}</span>
          {filename && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--color-ink-3)",
              }}
            >
              · {filename}
            </span>
          )}
        </div>
        <button onClick={copy} className="code-block-copy" aria-label="Copy code">
          {copied ? (
            <>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <Highlight
        theme={isDark ? themes.vsDark : themes.github}
        code={code.trim()}
        language={safeLang as Parameters<typeof Highlight>[0]["language"]}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`code-block-pre ${className}`}
            style={{ ...style, background: "var(--color-surface)", margin: 0 }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {showLineNumbers && (
                  <span
                    style={{
                      display: "inline-block",
                      width: "2rem",
                      userSelect: "none",
                      opacity: 0.3,
                      fontSize: "0.75rem",
                      marginRight: "1rem",
                      textAlign: "right",
                    }}
                  >
                    {i + 1}
                  </span>
                )}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
