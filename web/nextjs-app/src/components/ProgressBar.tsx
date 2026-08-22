"use client";

import { useEffect, useState } from "react";
import { phaseProgress } from "@/lib/progress";

interface ProgressBarProps {
  phaseSlug: string;
  totalLessons: number;
}

export function ProgressBar({ phaseSlug, totalLessons }: ProgressBarProps) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    setPct(phaseProgress(phaseSlug, totalLessons));
  }, [phaseSlug, totalLessons]);

  return (
    <div style={{ width: "100%" }}>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
