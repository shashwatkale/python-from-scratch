import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Python From Scratch — a free, open-source Python learning platform.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">About</h1>

      <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-7">
        <p>
          <strong className="text-zinc-900 dark:text-zinc-100">Python From Scratch</strong> is a
          free, open-source Python curriculum built for people who want to learn Python by
          actually writing code.
        </p>

        <p>
          Every lesson follows a consistent structure: concept, explanation, syntax, example,
          real-world use, common mistakes, exercises, and interview questions. No lesson is
          purely theoretical.
        </p>

        <p>
          The goal is to take a complete beginner from their first{" "}
          <code className="font-mono text-sm bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400">
            print()
          </code>{" "}
          statement to building production-quality Python applications.
        </p>

        <p>
          The entire project — curriculum, code, exercises, projects, and this website — is
          open source under the MIT license.
        </p>

        <div className="flex gap-4 pt-2">
          <a
            href="https://github.com/your-username/python-from-scratch"
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            GitHub →
          </a>
          <Link
            href="/contributing/"
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Contributing →
          </Link>
        </div>
      </div>
    </div>
  );
}
