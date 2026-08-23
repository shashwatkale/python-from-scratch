// src/data/certifications/claude-associate/types.ts — Schema for Claude Associate Curriculum

export interface AssociateKnowledgeCheckOption {
  id: "A" | "B" | "C" | "D";
  text: string;
}

export interface AssociateKnowledgeCheck {
  id: string;
  question: string;
  options: AssociateKnowledgeCheckOption[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
}

export interface AssociateExercise {
  id: string;
  title: string;
  description: string;
  tasks: string[];
}

export interface AssociateGoodBadExample {
  title: string;
  bad: {
    label: string;
    codeOrPrompt: string;
    explanation: string;
  };
  good: {
    label: string;
    codeOrPrompt: string;
    explanation: string;
  };
}

export interface AssociateLessonItem {
  id: string;
  slug: string;
  phaseId: string;
  order: number;
  lessonNumber: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  prerequisites: string;
  learningObjectives: string[];
  conceptMarkdown: string;
  productLandscape?: {
    surface: string;
    whatItIs: string;
    typicalUser: string;
  }[];
  scenario: {
    title: string;
    context: string;
    whatWentWrong: string;
    correctApproach: string;
  };
  examples: AssociateGoodBadExample[];
  practicalPromptExample?: {
    title: string;
    prompt: string;
    explanation: string;
  };
  codeExample: {
    language: string;
    filename?: string;
    code: string;
    note?: string;
  };
  commonMistakes: string[];
  bestPractices: string[];
  keyTakeaways: string[];
  glossaryTerms: {
    term: string;
    definition: string;
  }[];
  relatedLessons: {
    lessonNumber: string;
    title: string;
    slug: string;
  }[];
  exercises: AssociateExercise[];
  knowledgeChecks: AssociateKnowledgeCheck[];
}

export interface AssociatePhaseItem {
  id: string;
  phaseNumber: number;
  title: string;
  domainCoverage: string;
  certificationRelevance: string;
  prerequisiteFor: string;
  lessons: AssociateLessonItem[];
}

