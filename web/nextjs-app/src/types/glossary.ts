// src/types/glossary.ts — Strict types for Python Glossary

export type GlossaryCategory =
  | "basics"
  | "data-types"
  | "control-flow"
  | "functions"
  | "oop"
  | "dunder-methods"
  | "decorators"
  | "iterators-generators"
  | "descriptors"
  | "context-managers"
  | "exceptions"
  | "modules-packages"
  | "virtual-environments"
  | "type-system"
  | "dataclasses"
  | "collections"
  | "functional"
  | "memory-internals"
  | "concurrency"
  | "async"
  | "files-io"
  | "regex"
  | "testing"
  | "databases"
  | "fastapi"
  | "cli"
  | "data-python"
  | "tooling"
  | "advanced";

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
  term: string;
  category: GlossaryCategory;
  categoryLabel: string;
  difficulty: TermDifficulty;
  definition: string;
  explanation?: string;
  syntax?: string;
  example?: string;
  output?: string;
  whyItMatters: string;
  comparison?: TermComparison;
  relatedTerms: string[]; // slugs
  relatedLessons: RelatedLessonRef[];
  tags: string[];
}

