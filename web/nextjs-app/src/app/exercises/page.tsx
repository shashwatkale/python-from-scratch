import type { Metadata } from "next";
import { EXERCISES } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "Exercises",
  description: "Practice Python with exercises from beginner to interview level.",
};

const DIFFICULTY_COLOR = {
  beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  easy: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  hard: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  interview: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

const DIFFICULTIES = ["beginner", "easy", "medium", "hard", "interview"] as const;

export default function ExercisesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Exercises</h1>
      <p className="text-zinc-500 mb-10">
        {EXERCISES.length} exercises · beginner to interview level
      </p>

      {DIFFICULTIES.map((diff) => {
        const items = EXERCISES.filter((e) => e.difficulty === diff);
        if (items.length === 0) return null;
        return (
          <section key={diff} className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              {diff}
            </h2>
            <div className="space-y-2">
              {items.map((ex) => (
                <div
                  key={ex.slug}
                  id={ex.slug}
                  className="border border-zinc-200 dark:border-zinc-800 rounded-lg px-5 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">
                          {ex.title}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLOR[ex.difficulty]}`}>
                          {ex.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-500">{ex.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {ex.tags.map((tag) => (
                          <span key={tag} className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
