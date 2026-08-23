// src/data/certifications/index.ts — Master Certification Data Aggregator
import type {
  CertificationTrack,
  CertificationLessonDetail,
  CertificationAssessment,
} from "@/types/certifications";

import { CERTIFICATION_TRACKS } from "./tracks";
import { CCAO_F_LESSONS } from "./lessons-ccao-f";
import { CCDV_F_LESSONS } from "./lessons-ccdv-f";
import { CCAR_F_LESSONS } from "./lessons-ccar-f";
import { CCAR_P_LESSONS } from "./lessons-ccar-p";
import { CERTIFICATION_ASSESSMENTS } from "./assessments";

export * from "./tracks";
export * from "./lessons-ccao-f";
export * from "./lessons-ccdv-f";
export * from "./lessons-ccar-f";
export * from "./lessons-ccar-p";
export * from "./assessments";
export * from "./sources";
export * from "./questions";

export const ALL_CERTIFICATION_LESSONS: CertificationLessonDetail[] = [
  ...CCAO_F_LESSONS,
  ...CCDV_F_LESSONS,
  ...CCAR_F_LESSONS,
  ...CCAR_P_LESSONS,
];

export function getCertificationTrackById(
  id: string
): CertificationTrack | undefined {
  return CERTIFICATION_TRACKS.find(
    (t) =>
      t.id.toLowerCase() === id.toLowerCase() ||
      t.code.toLowerCase() === id.toLowerCase() ||
      t.id.replace("claude-", "").toLowerCase() === id.toLowerCase()
  );
}

export function getAllCertificationTracks(): CertificationTrack[] {
  return CERTIFICATION_TRACKS;
}

export function getCertificationLesson(
  trackId: string,
  slug: string
): CertificationLessonDetail | undefined {
  const normTrackId = trackId.toLowerCase();
  const found = ALL_CERTIFICATION_LESSONS.find(
    (l) =>
      (l.trackId.toLowerCase() === normTrackId ||
        l.trackId.replace("claude-", "").toLowerCase() === normTrackId) &&
      l.slug.toLowerCase() === slug.toLowerCase()
  );
  if (found) return found;

  const track = getCertificationTrackById(trackId);
  if (!track) return undefined;

  const summaryLesson = track.lessons.find((l) => l.slug.toLowerCase() === slug.toLowerCase());
  if (!summaryLesson) return undefined;

  return {
    ...summaryLesson,
    trackId: track.id,
    learningObjectives: [
      `Understand the core concepts of ${summaryLesson.title}.`,
      "Analyze architectural trade-offs in enterprise production deployments.",
      "Apply hands-on code patterns to pass official certification questions.",
    ],
    keyDecisions: [
      "Prioritize deterministic controls and testable specifications.",
      "Optimize cost, context window utilization, and latency budgets.",
    ],
    contentMarkdown: `
# ${summaryLesson.order.toString().padStart(2, "0")} · ${summaryLesson.title}

${summaryLesson.leadParagraph}

---

### Core Architectural Concepts

This lesson is part of the **${track.title} (${track.code})** official preparation curriculum.

### Key Focus Areas
${summaryLesson.domains.map((d) => `- **Domain**: \`${d}\``).join("\n")}

### Engineering Takeaway
Focus on making decisions that you can defend in production: specify contracts clearly, enforce boundaries deterministically, and validate behavior with empirical evaluation.
`,
    interactiveLabPrompt: `Apply the principles of ${summaryLesson.title} to an enterprise scenario.`,
  };
}

export function getAllLessonsForTrack(
  trackId: string
): CertificationLessonDetail[] {
  const track = getCertificationTrackById(trackId);
  if (!track) return [];

  return track.lessons.map((ref) => {
    return (
      getCertificationLesson(trackId, ref.slug) || {
        ...ref,
        trackId: track.id,
        learningObjectives: [],
        keyDecisions: [],
        contentMarkdown: `# ${ref.title}\n\n${ref.leadParagraph}`,
      }
    );
  });
}
