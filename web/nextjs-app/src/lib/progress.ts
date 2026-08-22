// src/lib/progress.ts — localStorage-based progress tracking

import type { Progress } from "@/types";

const KEY = "pfs_progress";

const DEFAULT: Progress = {
  completedLessons: [],
  completedExercises: [],
  quizScores: {},
  currentPhase: "00-getting-started",
};

export function loadProgress(): Progress {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Progress) : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export function saveProgress(progress: Progress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(progress));
}

export function markLessonComplete(slug: string): void {
  const p = loadProgress();
  if (!p.completedLessons.includes(slug)) {
    p.completedLessons.push(slug);
    saveProgress(p);
  }
}

export function markExerciseComplete(slug: string): void {
  const p = loadProgress();
  if (!p.completedExercises.includes(slug)) {
    p.completedExercises.push(slug);
    saveProgress(p);
  }
}

export function saveQuizScore(phase: string, score: number): void {
  const p = loadProgress();
  p.quizScores[phase] = score;
  saveProgress(p);
}

export function phaseProgress(phaseSlug: string, totalLessons: number): number {
  if (totalLessons === 0) return 0;
  const p = loadProgress();
  const completed = p.completedLessons.filter((s) =>
    s.startsWith(phaseSlug)
  ).length;
  return Math.round((completed / totalLessons) * 100);
}
