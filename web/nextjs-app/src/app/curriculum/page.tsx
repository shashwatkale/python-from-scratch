import type { Metadata } from "next";
import Link from "next/link";
import { PHASES } from "@/lib/curriculum";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Curriculum",
  description: "Complete Python curriculum from beginner to advanced.",
};

const DIFFICULTY_COLOR = {
  beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  advanced: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
};

export default function CurriculumPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Curriculum</h1>
      <p className="text-zinc-500 mb-10">
        {PHASES.length} phases · progress from absolute beginner to production Python
      </p>

      <div className="space-y-2">
        {PHASES.map((phase, i) => (
          <div key={phase.slug}>
            <Link
              href={`/curriculum/${phase.slug}/`}
              className="group flex items-center gap-4 border border-zinc-200 dark:border-zinc-800 rounded-lg px-5 py-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
            >
              <span className="text-sm font-mono text-zinc-400 w-8 shrink-0">
                {String(phase.order).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {phase.title}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLOR[phase.difficulty]}`}>
                    {phase.difficulty}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 truncate">{phase.description}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {phase.lessons.length > 0 && (
                  <span className="text-xs text-zinc-400">{phase.lessons.length} lessons</span>
                )}
                <ArrowRight size={16} className="text-zinc-400 group-hover:text-indigo-500 transition-colors" />
              </div>
            </Link>
            {i < PHASES.length - 1 && (
              <div className="flex justify-center py-1">
                <div className="w-px h-3 bg-zinc-200 dark:bg-zinc-800" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
