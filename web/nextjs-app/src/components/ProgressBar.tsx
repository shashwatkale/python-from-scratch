"use client";

import { useEffect, useState } from "react";
import { phaseProgress } from "@/lib/progress";

interface ProgressBarProps {
  phaseSlug: string;
  totalLessons: number;
  label: string;
}

export function ProgressBar({ phaseSlug, totalLessons, label }: ProgressBarProps) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    setPct(phaseProgress(phaseSlug, totalLessons));
  }, [phaseSlug, totalLessons]);

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-zinc-500 mb-1">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
