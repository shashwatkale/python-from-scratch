import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cheatsheets",
  description: "Quick reference cheatsheets for Python syntax, data structures, and more.",
};

const SHEETS = [
  { slug: "python-syntax", title: "Python Syntax", description: "Variables, operators, control flow, functions, and built-ins." },
];

export default function CheatsheetsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Cheatsheets</h1>
      <p className="text-zinc-500 mb-10">Quick reference for Python concepts.</p>

      <div className="grid sm:grid-cols-2 gap-3">
        {SHEETS.map((sheet) => (
          <div
            key={sheet.slug}
            className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4"
          >
            <h2 className="font-medium text-zinc-900 dark:text-zinc-100 mb-1">{sheet.title}</h2>
            <p className="text-sm text-zinc-500">{sheet.description}</p>
            <p className="text-xs text-zinc-400 mt-3 font-mono">
              cheatsheets/{sheet.slug}.md
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
