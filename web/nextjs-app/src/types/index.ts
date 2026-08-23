// src/types/index.ts — Strict types for the entire platform

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  phase: string;
  order: number;
  difficulty: Difficulty;
  prerequisites: string[];
  tags: string[];
  hasCode: boolean;
}

export interface Phase {
  slug: string;
  title: string;
  description: string;
  order: number;
  difficulty: Difficulty;
  lessons: Lesson[];
}

export interface Exercise {
  slug: string;
  title: string;
  description: string;
  difficulty: "beginner" | "easy" | "medium" | "hard" | "interview";
  tags: string[];
  hints: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  concepts: string[];
  order: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number; // index into options
  explanation: string;
}

export interface Quiz {
  phase: string;
  title: string;
  questions: QuizQuestion[];
}

export interface Progress {
  completedLessons: string[];   // lesson slugs
  completedExercises: string[]; // exercise slugs
  quizScores: Record<string, number>; // phase slug → score
  currentPhase: string;
}

export * from "./glossary";
export * from "./roadmap";
export * from "./certifications";

export interface SearchResult {
  title: string;
  description: string;
  category: "lesson" | "exercise" | "project" | "cheatsheet" | "glossary" | "certification";
  href: string;
  tags: string[];
}
