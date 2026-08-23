// src/data/curriculum/types.ts — Strict schema for rich interactive curriculum lessons

export interface CodeSnippet {
  language: string;
  title?: string;
  code: string;
  expectedOutput?: string;
}

export interface SyntaxBreakdown {
  syntax: string;
  parts: { label: string; explanation: string }[];
}

export interface BuildStep {
  title: string;
  explanation: string;
  code: CodeSnippet;
}

export interface InteractiveChallenge {
  prompt: string;
  initialCode: string;
  expectedOutput: string;
  hint: string;
  solution: string;
}

export interface RichLessonDetail {
  slug: string;
  phaseSlug: string;
  quote: string;
  type: "Build" | "Learn" | "Concept" | "Lab";
  languages: string;
  prerequisites: string;
  estimatedTime: string;
  objectives: string[];
  problem: {
    statement: string;
    scenario: string;
    steps: string[];
  };
  concept: {
    summary: string;
    syntaxBreakdown?: SyntaxBreakdown;
    keyPoints: string[];
    codeExample: CodeSnippet;
  };
  buildSteps: BuildStep[];
  commonPitfalls?: { pitfall: string; whyItFails: string; howToFix: string }[];
  useIt: string[];
  shipIt: string[];
  challenge?: InteractiveChallenge;
  exercises: string[];
}

