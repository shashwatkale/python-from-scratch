"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Github, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/curriculum/", label: "Curriculum" },
  { href: "/exercises/", label: "Exercises" },
  { href: "/projects/", label: "Projects" },
  { href: "/cheatsheets/", label: "Cheatsheets" },
  { href: "/roadmap/", label: "Roadmap" },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const toggleTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          python-from-scratch
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/your-username/python-from-scratch"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="md:hidden p-2 rounded-md text-zinc-500"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 flex flex-col gap-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-600 dark:text-zinc-400"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
