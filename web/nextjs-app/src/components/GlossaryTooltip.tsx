// src/components/GlossaryTooltip.tsx — Inline term tooltip for lesson integration
"use client";

import { useState } from "react";
import Link from "next/link";
import { getGlossaryTermBySlug } from "@/data/glossary";

interface Props {
  slug: string;
  children: React.ReactNode;
}

export function GlossaryTooltip({ slug, children }: Props) {
  const [open, setOpen] = useState(false);
  const term = getGlossaryTermBySlug(slug);

  if (!term) {
    return <span>{children}</span>;
  }

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <Link
        href={`/glossary/${term.slug}/`}
        style={{
          textDecoration: "underline",
          textDecorationStyle: "dotted",
          textUnderlineOffset: "3px",
          color: "var(--color-accent-text)",
          fontWeight: 500,
        }}
      >
        {children}
      </Link>

      {open && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "280px",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border-2)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            padding: "0.75rem",
            zIndex: 60,
            pointerEvents: "auto",
            display: "block",
          }}
        >
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.3rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "var(--color-ink)",
                textTransform: "uppercase",
              }}
            >
              {term.term}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "var(--color-accent-text)",
                textTransform: "uppercase",
              }}
            >
              {term.categoryLabel}
            </span>
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--color-ink-2)",
              lineHeight: 1.4,
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            {term.definition}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              fontWeight: 600,
              color: "var(--color-accent)",
              display: "block",
              textTransform: "uppercase",
            }}
          >
            Learn Term →
          </span>
        </span>
      )}
    </span>
  );
}

