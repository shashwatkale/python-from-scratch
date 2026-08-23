// src/data/certifications/claude-associate/phases.ts — Phase Definitions
import type { AssociatePhaseItem } from "./types";
import { CLAUDE_ASSOCIATE_LESSONS } from "./lessons";

export const CLAUDE_ASSOCIATE_PHASES: AssociatePhaseItem[] = [
  {
    id: "phase-1",
    phaseNumber: 1,
    title: "Claude Foundations: Understanding the Model, the API, and the Interaction Model",
    domainCoverage: "Core Claude concepts · API interaction model · Prompting basics · Response understanding",
    certificationRelevance: "Foundational domain — tested across all CCAO-F question categories",
    prerequisiteFor: "All subsequent phases",
    lessons: CLAUDE_ASSOCIATE_LESSONS,
  },
];

