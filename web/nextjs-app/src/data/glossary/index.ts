// src/data/glossary/index.ts — Master Python & AI Engineering Glossary Aggregator
import type { GlossaryTerm, GlossaryCategoryInfo } from "@/types/glossary";

import { MATH_TRAINING_TERMS } from "./areas/math-training";
import { MODELS_INFERENCE_TERMS } from "./areas/models-inference";
import { DATA_REPRESENTATIONS_TERMS } from "./areas/data-representations";
import { RETRIEVAL_GENERATION_TERMS } from "./areas/retrieval-generation";
import { PROMPTING_CONTEXT_TERMS } from "./areas/prompting-context";
import { AGENTS_TOOLS_TERMS } from "./areas/agents-tools";
import { EVALUATION_SAFETY_TERMS } from "./areas/evaluation-safety";
import { AI_NATIVE_DEV_TERMS } from "./areas/ai-native-development";
import { INFRASTRUCTURE_SERVING_TERMS } from "./areas/infrastructure-serving";
import { RELIABILITY_OPERATIONS_TERMS } from "./areas/reliability-operations";
import { SECURITY_GOVERNANCE_TERMS } from "./areas/security-governance";
import { MULTIMODAL_SYSTEMS_TERMS } from "./areas/multimodal-systems";

export const GLOSSARY_LEARNING_AREAS: GlossaryCategoryInfo[] = [
  { id: "math-training", label: "Math & training", count: 42 },
  { id: "models-inference", label: "Models & inference", count: 29 },
  { id: "data-representations", label: "Data & representations", count: 13 },
  { id: "retrieval-generation", label: "Retrieval & generation", count: 14 },
  { id: "prompting-context", label: "Prompting & context", count: 15 },
  { id: "agents-tools", label: "Agents & tools", count: 20 },
  { id: "evaluation-safety", label: "Evaluation & safety", count: 17 },
  { id: "ai-native-development", label: "AI-native development", count: 23 },
  { id: "infrastructure-serving", label: "Infrastructure & serving", count: 18 },
  { id: "reliability-operations", label: "Reliability & operations", count: 17 },
  { id: "security-governance", label: "Security & governance", count: 20 },
  { id: "multimodal-systems", label: "Multimodal systems", count: 15 },
];

export const GLOSSARY_CATEGORIES = GLOSSARY_LEARNING_AREAS;

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  ...MATH_TRAINING_TERMS,
  ...MODELS_INFERENCE_TERMS,
  ...DATA_REPRESENTATIONS_TERMS,
  ...RETRIEVAL_GENERATION_TERMS,
  ...PROMPTING_CONTEXT_TERMS,
  ...AGENTS_TOOLS_TERMS,
  ...EVALUATION_SAFETY_TERMS,
  ...AI_NATIVE_DEV_TERMS,
  ...INFRASTRUCTURE_SERVING_TERMS,
  ...RELIABILITY_OPERATIONS_TERMS,
  ...SECURITY_GOVERNANCE_TERMS,
  ...MULTIMODAL_SYSTEMS_TERMS,
];

// Helper to look up term by slug
export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((t) => t.slug === slug);
}

// Helper to get terms by category
export function getGlossaryTermsByCategory(category: string): GlossaryTerm[] {
  if (category === "all") return GLOSSARY_TERMS;
  return GLOSSARY_TERMS.filter((t) => t.category === category);
}

// Helper for popular terms row
export function getPopularGlossaryTerms(): GlossaryTerm[] {
  const popularSlugs = [
    "activation-checkpointing",
    "adamw-optimizer",
    "retrieval-augmented-generation-rag",
    "flashattention",
    "lora-low-rank-adaptation",
    "pagedattention",
    "vector-database",
    "autonomous-ai-agent",
    "function-calling",
    "chain-of-thought-cot",
    "pydantic-validation-ai",
    "llm-as-a-judge",
  ];
  return popularSlugs
    .map((s) => getGlossaryTermBySlug(s))
    .filter((t): t is GlossaryTerm => t !== undefined);
}

// Helper to group terms alphabetically
export function getGlossaryAlphabeticalGroups(
  terms: GlossaryTerm[] = GLOSSARY_TERMS
): Record<string, GlossaryTerm[]> {
  const groups: Record<string, GlossaryTerm[]> = {};

  for (const term of terms) {
    const letter = term.term.charAt(0).toUpperCase();
    const key = letter >= "A" && letter <= "Z" ? letter : "#";
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(term);
  }

  // Sort within groups
  for (const key in groups) {
    groups[key].sort((a, b) => a.term.localeCompare(b.term));
  }

  return groups;
}
