// src/types/glossary.ts — Strict types for Python & AI Glossary
export type GlossaryCategory =
  | "math-training"
  | "models-inference"
  | "data-representations"
  | "retrieval-generation"
  | "prompting-context"
  | "agents-tools"
  | "evaluation-safety"
  | "ai-native-development"
  | "infrastructure-serving"
  | "reliability-operations"
  | "security-governance"
  | "multimodal-systems"
  | string;

export type TermDifficulty = "beginner" | "intermediate" | "advanced";

export interface RelatedLessonRef {
  title: string;
  phaseSlug: string;
  lessonSlug: string;
}

export interface ComparisonDiff {
  name: string;
  description: string;
}

export interface TermComparison {
  title: string;
  differences: ComparisonDiff[];
}

export interface GlossaryTerm {
  slug: string;
  refNumber?: string; // e.g. "REF 001"
  term: string;
  category: GlossaryCategory;
  categoryLabel: string;
  difficulty: TermDifficulty;
  definition: string;
  explanation?: string;
  whyItMatters: string;
  inPractice?: string;
  syntax?: string;
  example?: string;
  output?: string;
  comparison?: TermComparison;
  relatedTerms: string[];
  relatedLessons: RelatedLessonRef[];
  tags: string[];
}

export interface GlossaryCategoryInfo {
  id: GlossaryCategory;
  label: string;
  description?: string;
  count?: number;
}
