// src/data/certifications/lessons-ccar-p.ts — Complete Enterprise Lessons for CCAR-P (Architect Professional)
import type { CertificationLessonDetail } from "@/types/certifications";

export const CCAR_P_LESSONS: CertificationLessonDetail[] = [
  {
    id: "ccar-p-01",
    trackId: "claude-ccar-p",
    slug: "00-enterprise-scale-principles",
    order: 1,
    title: "Enterprise Architecture Principles for Claude",
    kind: "orientation",
    leadParagraph: "Designing systems where non-deterministic intelligence operates within strict mathematical, financial, and compliance guardrails.",
    domains: ["solution-design-architecture"],
    durationMin: 35,
    learningObjectives: [
      "Master the CCAR-P blueprint (7 domains: Integration 19%, Solution Design 17%, Evaluation 16%, Governance 14%, Models 13%, Operations 11%, Discovery 10%).",
      "Define enterprise platform invariants for large-scale multi-tenant Claude fleets.",
      "Establish mathematical safety and compliance guardrails across distributed systems.",
    ],
    keyDecisions: [
      "Isolate tenant execution state with cryptographic identifiers and enforce least privilege globally.",
    ],
    contentMarkdown: `
# 01 · Enterprise Architecture Principles for Claude

At enterprise scale, AI systems must guarantee tenant isolation, regulatory compliance (EU AI Act, SOC2 Type II), and deterministic failover.
`,
  },
  {
    id: "ccar-p-02",
    trackId: "claude-ccar-p",
    slug: "01-distributed-mcp-mesh",
    order: 2,
    title: "Enterprise Distributed MCP Mesh with mTLS",
    kind: "core",
    leadParagraph: "Deploying, discovering, and securing hundreds of microservice tools across zero-trust cloud networks.",
    domains: ["integration", "governance-safety-risk"],
    durationMin: 45,
    learningObjectives: [
      "Implement mutual TLS (mTLS) with short-lived X.509 certificates across MCP servers.",
      "Manage centralized tool service discovery, health checking, and role-based access control.",
    ],
    keyDecisions: [
      "Enforce mTLS and JWT role-scoped claims on every inter-agent tool invocation.",
    ],
    contentMarkdown: `
# 02 · Enterprise Distributed MCP Mesh with mTLS

Scaling hundreds of MCP servers across Kubernetes clusters with zero-trust security and dynamic service discovery.
`,
  },
  {
    id: "ccar-p-03",
    trackId: "claude-ccar-p",
    slug: "02-continuous-adversarial-red-teaming",
    order: 3,
    title: "Continuous Adversarial Red Teaming in CI/CD",
    kind: "core",
    leadParagraph: "Integrating automated jailbreak attacks, indirect prompt injection tests, and data extraction probes into pull requests.",
    domains: ["governance-safety-risk", "evaluation-testing-optimization"],
    durationMin: 40,
    learningObjectives: [
      "Automate red-teaming pipelines in CI/CD using frameworks like Garak and PyRIT.",
      "Detect indirect prompt injections and system prompt extraction probes before release.",
    ],
    keyDecisions: [
      "Block pull requests that drop adversarial jailbreak defense pass rates below 99.5%.",
    ],
    contentMarkdown: `
# 03 · Continuous Adversarial Red Teaming in CI/CD

Automated security verification pipelines that probe generative models for vulnerabilities on every git commit.
`,
  },
  {
    id: "ccar-p-04",
    trackId: "claude-ccar-p",
    slug: "03-multitenant-isolation-and-finops",
    order: 4,
    title: "Multi-Tenant Cryptographic Isolation and Spend Governance",
    kind: "core",
    leadParagraph: "Enforcing tenant boundary guarantees and real-time budget hard caps across enterprise organizations.",
    domains: ["solution-design-architecture", "production-deployment-operations"],
    durationMin: 35,
    learningObjectives: [
      "Enforce strict multi-tenant data segregation across vector stores and agent state checkpoints.",
      "Implement real-time token spend tracking with automated hard budget cutoffs.",
    ],
    keyDecisions: [
      "Partition database connections and vector collections cryptographically per customer tenant.",
    ],
    contentMarkdown: `
# 04 · Multi-Tenant Isolation and FinOps

Architectural strategies for multi-tenant SaaS platforms to eliminate cross-tenant data leakage and runaway API costs.
`,
  },
  {
    id: "ccar-p-05",
    trackId: "claude-ccar-p",
    slug: "04-shadow-traffic-evals",
    order: 5,
    title: "Shadow Traffic Evals and Dark Launching at Scale",
    kind: "core",
    leadParagraph: "Validating prompt regressions and model version migrations on live production traffic with zero customer impact.",
    domains: ["evaluation-testing-optimization", "production-deployment-operations"],
    durationMin: 40,
    learningObjectives: [
      "Design shadow traffic pipelines to duplicate live production traffic asynchronously.",
      "Use LLM-as-a-judge comparison to measure quality parity between model generations.",
    ],
    keyDecisions: [
      "Always validate model migrations via dark launched shadow traffic before switching production endpoints.",
    ],
    contentMarkdown: `
# 05 · Shadow Traffic Evals and Dark Launching

Validating new model versions and complex prompt refactors against live user traffic with zero risk.
`,
  },
  {
    id: "ccar-p-06",
    trackId: "claude-ccar-p",
    slug: "05-professional-capstone",
    order: 6,
    title: "Architect a Global Enterprise Multi-Agent Core Platform",
    kind: "capstone",
    leadParagraph: "Comprehensive architecture specification for a Fortune 500 company deploying autonomous Claude agent fleets across 5 continents.",
    domains: [
      "integration",
      "solution-design-architecture",
      "evaluation-testing-optimization",
      "governance-safety-risk",
      "models-prompting-context",
      "production-deployment-operations",
      "discovery-requirements",
    ],
    durationMin: 90,
    learningObjectives: [
      "Author an end-to-end global enterprise AI platform architecture document.",
      "Defend cross-region latency, disaster recovery, zero-trust security, and continuous evaluation gates.",
    ],
    keyDecisions: [
      "An enterprise AI platform requires unified governance, zero-trust MCP networks, and automated CI/CD safety gates.",
    ],
    contentMarkdown: `
# 06 · Capstone: Global Enterprise Multi-Agent Platform

Assemble and defend the complete architectural specification for a multi-region enterprise AI deployment serving 1,000,000 daily queries with 99.999% reliability.
`,
  },
];
