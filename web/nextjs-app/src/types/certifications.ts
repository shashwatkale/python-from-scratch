// src/types/certifications.ts — Type definitions for Claude Certification Tracks
export type TrackLevel =
  | "foundational"
  | "foundational-technical"
  | "foundational-architecture"
  | "professional-architecture";

export interface ExamDomain {
  id: string;
  name: string;
  weightPercent: number;
  description: string;
  subtopics: string[];
}

export interface OptionalExtensionRef {
  title: string;
  subtitle: string;
  lessonPath: string;
}

export interface StudyPlanSchedule {
  name: string;
  duration: string;
  weeklyCommitment: string;
  breakdown: string[];
}

export interface CertificationLessonRef {
  id: string;
  slug: string;
  order: number;
  title: string;
  kind: "orientation" | "core" | "capstone";
  leadParagraph: string;
  domains: string[];
  durationMin?: number;
}

export interface CertificationLessonDetail extends CertificationLessonRef {
  trackId: string;
  learningObjectives: string[];
  keyDecisions: string[];
  contentMarkdown: string;
  codeSnippet?: {
    language: string;
    filename?: string;
    code: string;
    note?: string;
  };
  interactiveLabPrompt?: string;
  productLandscape?: { surface: string; whatItIs: string; typicalUser: string }[];
  scenarioData?: {
    title: string;
    context: string;
    whatWentWrong?: string;
    correctApproach?: string;
  };
  examples?: {
    title: string;
    bad: { label: string; codeOrPrompt: string; explanation: string };
    good: { label: string; codeOrPrompt: string; explanation: string };
  }[];
  practicalPromptExample?: { title: string; prompt: string; explanation: string };
  commonMistakes?: string[];
  bestPractices?: string[];
  keyTakeaways?: string[];
  glossaryTermsList?: { term: string; definition: string }[];
  glossaryTerms?: { term: string; definition: string }[];
  exercisesList?: { id: string; title: string; description: string; tasks: string[] }[];
  exercises?: { id: string; title: string; description: string; tasks: string[] }[];
  knowledgeChecksList?: {
    id: string;
    question: string;
    options: { id: string; text: string }[];
    correctAnswer: string;
    explanation: string;
  }[];
  knowledgeChecks?: {
    id: string;
    question: string;
    options: { id: string; text: string }[];
    correctAnswer: string;
    explanation: string;
  }[];
}

export interface AssessmentQuestion {
  id: string;
  scenario: string;
  domainId: string;
  domainName: string;
  isMultiSelect?: boolean;
  options: string[];
  correctAnswerIndices: number[]; // 0-indexed
  explanation: string;
}

export interface CertificationAssessment {
  id: string;
  trackId: string;
  title: string;
  type: "diagnostic" | "mock";
  questionsCount?: number;
  timeLimitMin: number;
  passingScore: number;
  description?: string;
  questions: AssessmentQuestion[];
}

export interface CertificationTrack {
  id: string;
  code: string;
  title: string;
  levelBadge: string;
  levelType: TrackLevel;
  tagline: string;
  description: string;
  questionsCount: number;
  timeLimitMin: number;
  passingScore: number;
  examFee: string;
  format: string;
  validity: string;
  officialGuideUrl?: string;
  partnerRestrictedNotice?: string;
  domains: ExamDomain[];
  lessons: CertificationLessonRef[];
  optionalExtensions: OptionalExtensionRef[];
  assessments: {
    diagnosticId: string;
    mockId: string;
  };
  studyPlans: StudyPlanSchedule[];
}

