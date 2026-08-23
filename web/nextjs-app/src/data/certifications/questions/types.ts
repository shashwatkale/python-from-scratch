// src/data/certifications/questions/types.ts — Strict Question Schema

export type QuestionDifficulty = "easy" | "medium" | "hard" | "expert";
export type QuestionType = "single-choice" | "multiple-response" | "scenario-based";

export interface QuestionOption {
  id: "A" | "B" | "C" | "D" | "E";
  text: string;
}

export interface CertificationQuestionItem {
  id: string;
  certificationId: "claude-ccao-f" | "claude-ccdv-f" | "claude-ccar-f" | "claude-ccar-p";
  domain: string;
  domainName: string;
  topic: string;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  scenario?: string;
  question: string;
  options: QuestionOption[];
  correctAnswers: ("A" | "B" | "C" | "D" | "E")[];
  explanation: string;
  whyOtherOptionsAreWrong: {
    [key in "A" | "B" | "C" | "D" | "E"]?: string;
  };
  engineeringPrinciple: string;
  relatedLessons: string[];
  relatedGlossaryTerms?: string[];
  sourceReferences: string[];
  tags: string[];
  original: true;
  officialQuestion: false;
}

