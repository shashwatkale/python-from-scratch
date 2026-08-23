// src/data/certifications/questions/index.ts — Master Question Bank & Exam Generator Engine
import type { CertificationQuestionItem, QuestionDifficulty } from "./types";
import { CCAO_F_QUESTIONS } from "./track-01-ccao-f";
import { CCDV_F_QUESTIONS } from "./track-02-ccdv-f";
import { CCAR_F_QUESTIONS } from "./track-03-ccar-f";
import { CCAR_P_QUESTIONS } from "./track-04-ccar-p";

export * from "./types";
export * from "./track-01-ccao-f";
export * from "./track-02-ccdv-f";
export * from "./track-03-ccar-f";
export * from "./track-04-ccar-p";

export const ALL_CERTIFICATION_QUESTIONS: CertificationQuestionItem[] = [
  ...CCAO_F_QUESTIONS,
  ...CCDV_F_QUESTIONS,
  ...CCAR_F_QUESTIONS,
  ...CCAR_P_QUESTIONS,
];

export function getQuestionsByTrack(trackId: string): CertificationQuestionItem[] {
  const norm = trackId.toLowerCase();
  return ALL_CERTIFICATION_QUESTIONS.filter(
    (q) => q.certificationId.toLowerCase() === norm || q.certificationId.replace("claude-", "").toLowerCase() === norm
  );
}

export function getQuestionsByDomain(trackId: string, domainId: string): CertificationQuestionItem[] {
  return getQuestionsByTrack(trackId).filter(
    (q) => q.domain.toLowerCase() === domainId.toLowerCase()
  );
}

export function getQuestionsByDifficulty(trackId: string, difficulty: QuestionDifficulty): CertificationQuestionItem[] {
  return getQuestionsByTrack(trackId).filter((q) => q.difficulty === difficulty);
}

export function generateMockExam(trackId: string, count: number = 60): CertificationQuestionItem[] {
  const trackQuestions = getQuestionsByTrack(trackId);
  if (trackQuestions.length <= count) {
    return shuffleArray([...trackQuestions]);
  }

  // Shuffle and slice
  return shuffleArray([...trackQuestions]).slice(0, count);
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

