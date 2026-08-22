import type { Metadata } from "next";
import { PHASES } from "@/lib/curriculum";
import { ArrowDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Python From Scratch learning roadmap and build status.",
};

const STATUS = {
  complete: { label: "Complete", color: "bg-emerald-500" },
  progress: { label: "In Progress", color: "bg-amber-500" },
  planned: { label: "Planned", color: "bg-zinc-300 dark:bg-zinc-600" },
};

function phaseStatus(phase: { lessons: unknown[] }) {
  if (phase.lessons.length > 0) return "progress";
  return "planned";
}

export default function RoadmapPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Roadmap</h1>
      <p className="text-zinc-500 mb-10">Learning path and current build status.</p>

      <div className="flex flex-col items-center">
        {PHASES.map((phase, i) => {
          const s = phaseStatus(phase);
          const statusInfo = STATUS[s];
          return (
            <div key={phase.slug} className="flex flex-col items-center w-full">
              <div className="w-full border border-zinc-200 dark:border-zinc-800 rounded-lg px-5 py-4 flex items-center gap-4">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusInfo.color}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-zinc-400">
                      Phase {String(phase.order).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-zinc-400">·</span>
                    <span className="text-xs text-zinc-400">{statusInfo.label}</span>
                  </div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{phase.title}</p>
                </div>
                {phase.lessons.length > 0 && (
                  <span className="text-xs text-zinc-400 shrink-0">
                    {phase.lessons.length} lessons
                  </span>
                )}
              </div>
              {i < PHASES.length - 1 && (
                <div className="py-1 text-zinc-300 dark:text-zinc-700">
                  <ArrowDown size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
