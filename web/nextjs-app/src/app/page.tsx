import type { Metadata } from "next";
import Link from "next/link";
import { PHASES, STATS } from "@/lib/curriculum";
import { SearchBar } from "@/components/SearchBar";
import { ArrowRight, BookOpen, Code2, FolderGit2, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Python From Scratch — Learn Python by Building",
  description:
    "An open-source, hands-on Python curriculum from your first print() statement to production-ready applications.",
};

const DIFFICULTY_COLOR = {
  beginner: "text-emerald-600 dark:text-emerald-400",
  intermediate: "text-amber-600 dark:text-amber-400",
  advanced: "text-rose-600 dark:text-rose-400",
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-full px-3 py-1 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Free &amp; Open Source
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
          Learn Python From Scratch.
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
          An open-source, hands-on Python curriculum from your first{" "}
          <code className="font-mono text-indigo-600 dark:text-indigo-400">print()</code>{" "}
          statement to production-ready applications.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link
            href="/curriculum/00-getting-started/"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Start Learning <ArrowRight size={16} />
          </Link>
          <Link
            href="/curriculum/"
            className="inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-700 dark:text-zinc-300 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            View Curriculum
          </Link>
          <a
            href="https://github.com/your-username/python-from-scratch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-700 dark:text-zinc-300 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <Github size={16} /> GitHub
          </a>
        </div>

        {/* Stats — derived from curriculum data */}
        <div className="flex flex-wrap justify-center gap-8 text-center">
          {[
            { label: "Phases", value: STATS.phases, icon: BookOpen },
            { label: "Lessons", value: STATS.lessons, icon: Code2 },
            { label: "Exercises", value: STATS.exercises, icon: Code2 },
            { label: "Projects", value: STATS.projects, icon: FolderGit2 },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{value}</div>
              <div className="text-sm text-zinc-500 flex items-center gap-1 justify-center">
                <Icon size={13} /> {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search */}
      <section className="max-w-2xl mx-auto px-4 pb-12 flex justify-center">
        <SearchBar />
      </section>

      {/* Learning Path */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
          Your Python Learning Path
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PHASES.map((phase) => (
            <Link
              key={phase.slug}
              href={`/curriculum/${phase.slug}/`}
              className="group block border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-mono text-zinc-400">
                  Phase {String(phase.order).padStart(2, "0")}
                </span>
                <span className={`text-xs font-medium ${DIFFICULTY_COLOR[phase.difficulty]}`}>
                  {phase.difficulty}
                </span>
              </div>
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
                {phase.title}
              </h3>
              <p className="text-xs text-zinc-500 line-clamp-2">{phase.description}</p>
              {phase.lessons.length > 0 && (
                <p className="text-xs text-zinc-400 mt-2">{phase.lessons.length} lessons</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Start Here callout */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <div className="border border-indigo-200 dark:border-indigo-800 rounded-lg p-6 bg-indigo-50/50 dark:bg-indigo-950/20">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            Never written Python before?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Start with Phase 00. It walks you through installing Python, setting up your editor,
            and running your first program — step by step.
          </p>
          <Link
            href="/curriculum/00-getting-started/"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Start Here <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
