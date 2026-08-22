"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import { SearchModal } from "./SearchModal";

const NAV = [
  { href: "/curriculum/", label: "Contents" },
  { href: "/curriculum/", label: "Books", id: "books" },
  { href: "/exercises/", label: "Catalog" },
  { href: "/roadmap/", label: "Roadmap" },
  { href: "/cheatsheets/", label: "Glossary" },
  { href: "/about/", label: "About" },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const themeLabel =
    theme === "dark" ? "DARK" : theme === "light" ? "LIGHT" : "AUTO";

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "3.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--color-ink)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "var(--color-accent)" }}>■</span>
            {" "}PYTHON / FROM SCRATCH
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex"
            style={{ alignItems: "center", gap: "1.75rem" }}
          >
            {NAV.map((item) => (
              <Link key={item.label} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Tools */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 }}>
            {/* GitHub */}
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
                color: "var(--color-ink-3)",
                padding: "0.3rem 0.6rem",
                border: "1px solid var(--color-border)",
                textDecoration: "none",
                transition: "color 0.15s, border-color 0.15s",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
              className="hidden md:flex hover:text-accent"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--color-ink-3)",
                padding: "0.3rem 0.6rem",
                border: "1px solid var(--color-border)",
                background: "transparent",
                cursor: "pointer",
                transition: "color 0.15s, border-color 0.15s",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
              aria-label="Search"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <span className="hidden md:inline">Search</span>
            </button>

            {/* Theme */}
            <button
              onClick={cycleTheme}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--color-ink-3)",
                padding: "0.3rem 0.6rem",
                border: "1px solid var(--color-border)",
                background: "transparent",
                cursor: "pointer",
                transition: "color 0.15s",
                minWidth: "3.5rem",
              }}
              aria-label="Toggle theme"
            >
              {themeLabel}
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                padding: "0.3rem 0.5rem",
                border: "1px solid var(--color-border)",
                background: "transparent",
                cursor: "pointer",
                color: "var(--color-ink-2)",
              }}
              aria-label="Menu"
            >
              {menuOpen ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface)",
              padding: "1rem 1.5rem",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://github.com/shashwatkale/python-from-scratch"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                GitHub ↗
              </a>
            </nav>
          </div>
        )}
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
