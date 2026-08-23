// src/data/certifications/lessons-ccar-f.ts — Complete Lessons for CCAR-F (Architect Foundations)
import type { CertificationLessonDetail } from "@/types/certifications";

export const CCAR_F_LESSONS: CertificationLessonDetail[] = [
  {
    id: "ccar-f-01",
    trackId: "claude-ccar-f",
    slug: "00-architect-foundations-overview",
    order: 1,
    title: "The Four Primitives of AI Systems Architecture",
    kind: "orientation",
    leadParagraph: "Decomposing modern AI systems into deterministic compute, semantic retrieval, constrained generation, and autonomous action.",
    domains: ["agentic-architecture-orchestration"],
    durationMin: 30,
    learningObjectives: [
      "Understand the CCAR-F blueprint (5 domains: Agentic Architecture 27%, Claude Code 20%, Prompting & Structured Output 20%, Tool Design & MCP 18%, Eval & Safety 15%).",
      "Deconstruct enterprise AI architectures into four distinct execution layers.",
      "Isolate non-deterministic model generation from deterministic transactional logic.",
    ],
    keyDecisions: [
      "Keep authorization, database transactions, and safety invariants deterministic outside the prompt.",
      "Structure multi-agent handoffs with explicit typed contracts.",
    ],
    contentMarkdown: `
# 01 · The Four Primitives of AI Systems Architecture

Modern AI systems consist of four distinct layers:
1. **Deterministic Compute**: Business logic, database transactions, routing, and access control.
2. **Semantic Retrieval**: Hybrid search, vector databases, and prompt-cached knowledge bases.
3. **Constrained Generation**: Structured JSON extraction and schema-validated reasoning.
4. **Autonomous Action**: Bounded tool loops and MCP server interfaces.
`,
  },
  {
    id: "ccar-f-02",
    trackId: "claude-ccar-f",
    slug: "01-rag-vs-long-context",
    order: 2,
    title: "RAG vs 200k Context Windows: Economic & Latency Tradeoffs",
    kind: "core",
    leadParagraph: "When to index vectors vs when to leverage Claude's 200k prompt cache for instant multi-document context.",
    domains: ["agentic-architecture-orchestration", "prompt-engineering-structured-output"],
    durationMin: 35,
    learningObjectives: [
      "Formulate mathematical cost and latency models for RAG vs Long-Context Prompt Caching.",
      "Select the right architecture based on document update frequency and query volume.",
    ],
    keyDecisions: [
      "Use **Prompt Caching** for static corpora (< 200k tokens) with high query rates (100+ calls/day).",
      "Use **Vector RAG** for multi-million token dynamic datasets with frequent updates.",
    ],
    contentMarkdown: `
# 02 · RAG vs 200k Context Windows

Comparing vector similarity search with 200k-token prompt caching across retrieval fidelity, latency, and operational cost.
`,
  },
  {
    id: "ccar-f-03",
    trackId: "claude-ccar-f",
    slug: "02-multi-agent-topologies",
    order: 3,
    title: "Designing Multi-Agent Topology: Supervisor vs Peer Mesh",
    kind: "core",
    leadParagraph: "Structuring agent hierarchies to avoid infinite message storms, state corruption, and context explosion.",
    domains: ["agentic-architecture-orchestration"],
    durationMin: 40,
    learningObjectives: [
      "Design hierarchical supervisor topologies vs decentralized peer meshes.",
      "Enforce termination conditions and prevent cyclic message storms.",
    ],
    keyDecisions: [
      "Prefer **Supervisor Hierarchies** for enterprise workflows where an orchestrator routes to specialized subagents.",
    ],
    contentMarkdown: `
# 03 · Designing Multi-Agent Topology

Supervisor patterns ensure central coordination, traceable execution paths, and bounded context windows.
`,
  },
  {
    id: "ccar-f-04",
    trackId: "claude-ccar-f",
    slug: "03-mcp-network-architecture",
    order: 4,
    title: "MCP Architecture Across Microservice Clusters",
    kind: "core",
    leadParagraph: "Deploying secure, isolated MCP servers over SSE behind authenticated reverse proxies.",
    domains: ["tool-design-mcp-integration"],
    durationMin: 40,
    learningObjectives: [
      "Architect Model Context Protocol (MCP) server meshes over Server-Sent Events (SSE).",
      "Implement zero-trust mTLS and scoped bearer tokens for tool authentication.",
    ],
    keyDecisions: [
      "Deploy MCP servers as independent containerized microservices behind an API gateway.",
    ],
    contentMarkdown: `
# 04 · MCP Architecture Across Microservice Clusters

Connecting Claude agent runtimes to enterprise tools using secure, authenticated SSE transport layers.
`,
  },
  {
    id: "ccar-f-05",
    trackId: "claude-ccar-f",
    slug: "04-resilience-and-circuit-breakers",
    order: 5,
    title: "Designing for 99.99% Availability Under Provider Degradation",
    kind: "core",
    leadParagraph: "Implementing circuit breakers, exponential jitter backoff, and graceful fallback cascades.",
    domains: ["agentic-architecture-orchestration", "eval-safety-context-governance"],
    durationMin: 35,
    learningObjectives: [
      "Implement circuit breaker patterns to fail fast during upstream API degradation.",
      "Design model cascading fallbacks from Claude 3.5 Sonnet to Claude 3.5 Haiku.",
    ],
    keyDecisions: [
      "Combine token bucket rate limiters in Redis with circuit breakers to protect against provider outages.",
    ],
    contentMarkdown: `
# 05 · Designing for 99.99% Availability

Resilience patterns for generative AI systems to guarantee continuous service availability.
`,
  },
  {
    id: "ccar-f-06",
    trackId: "claude-ccar-f",
    slug: "05-architect-capstone",
    order: 6,
    title: "Design and Defend an Enterprise Customer Support Architecture",
    kind: "capstone",
    leadParagraph: "Drafting a complete technical architecture document including security boundaries, failover plans, and cost models.",
    domains: [
      "agentic-architecture-orchestration",
      "claude-code-configuration-workflows",
      "prompt-engineering-structured-output",
      "tool-design-mcp-integration",
      "eval-safety-context-governance",
    ],
    durationMin: 75,
    learningObjectives: [
      "Draft a complete enterprise architecture specification for a production Claude deployment.",
      "Defend latency, cost, security, and failover design decisions.",
    ],
    keyDecisions: [
      "A complete architectural design balances cost models, security trust boundaries, and failover mechanisms.",
    ],
    contentMarkdown: `
# 06 · Capstone: Design and Defend Enterprise Architecture

Assemble the full architecture design document for an enterprise customer support platform serving 50,000 requests per day with 99.99% uptime.
`,
  },
];
