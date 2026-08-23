// src/data/certifications/sources.ts — Source Attribution Ledger & Documentation Ledger

export interface CertificationSourceRecord {
  trackCode: string;
  guideVersion: string;
  effectiveDate: string;
  officialGuideUrl: string;
  sourceRepo: string;
  license: string;
  lastVerified: string;
}

export const CERTIFICATION_SOURCES: CertificationSourceRecord[] = [
  {
    trackCode: "CCAO-F",
    guideVersion: "1.0",
    effectiveDate: "July 2026",
    officialGuideUrl: "https://anthropic-partners.skilljar.com/page/claude-certification-exam-prep-courses",
    sourceRepo: "https://github.com/rohitg00/ai-engineering-from-scratch",
    license: "MIT License (Copyright (c) 2026 Rohit Ghumare)",
    lastVerified: "August 9, 2026",
  },
  {
    trackCode: "CCDV-F",
    guideVersion: "1.0",
    effectiveDate: "July 2026",
    officialGuideUrl: "https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542875%2FClaude+Certified+Developer+%E2%80%93+Foundations+Exam+Guide.pdf",
    sourceRepo: "https://github.com/rohitg00/ai-engineering-from-scratch",
    license: "MIT License (Copyright (c) 2026 Rohit Ghumare)",
    lastVerified: "August 9, 2026",
  },
  {
    trackCode: "CCAR-F",
    guideVersion: "1.0",
    effectiveDate: "July 2026",
    officialGuideUrl: "https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf",
    sourceRepo: "https://github.com/rohitg00/ai-engineering-from-scratch",
    license: "MIT License (Copyright (c) 2026 Rohit Ghumare)",
    lastVerified: "August 9, 2026",
  },
  {
    trackCode: "CCAR-P",
    guideVersion: "1.0",
    effectiveDate: "July 2026",
    officialGuideUrl: "https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542810%2FClaude+Certified+Architect+%E2%80%93+Professional+Exam+Guide.pdf",
    sourceRepo: "https://github.com/rohitg00/ai-engineering-from-scratch",
    license: "MIT License (Copyright (c) 2026 Rohit Ghumare)",
    lastVerified: "August 9, 2026",
  },
];

