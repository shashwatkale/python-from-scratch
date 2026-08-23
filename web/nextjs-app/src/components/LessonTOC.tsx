// src/components/LessonTOC.tsx — Active Scroll Highlighting Table of Contents
"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

interface Props {
  sections: Section[];
}

export function LessonTOC({ sections }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140; // offset for sticky header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <aside
      className="lesson-toc"
      style={{
        width: "220px",
        flexShrink: 0,
        position: "sticky",
        top: "4.5rem",
        maxHeight: "calc(100vh - 6rem)",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          borderLeft: "1px solid var(--color-border)",
          paddingLeft: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--color-ink-3)",
            display: "block",
            marginBottom: "1rem",
          }}
        >
          On This Page
        </span>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => scrollToSection(e, section.id)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: isActive ? "var(--color-accent-text)" : "var(--color-ink-3)",
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: "none",
                  padding: "0.35rem 0.6rem",
                  marginLeft: "-1rem",
                  paddingLeft: "1rem",
                  borderLeft: `2px solid ${isActive ? "var(--color-accent)" : "transparent"}`,
                  transition: "all 0.15s ease",
                  display: "block",
                  lineHeight: 1.4,
                }}
                className={isActive ? "" : "hover:text-accent"}
              >
                {section.label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

