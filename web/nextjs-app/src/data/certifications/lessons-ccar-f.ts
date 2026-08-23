// src/data/certifications/lessons-ccar-f.ts — Complete In-Depth Lessons for CCAR-F (Architect Foundations)
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
      "Understand the CCAR-F blueprint (5 domains: Agentic Architecture 27%, Claude Code 20%, Prompting & Structured Output 20%, Tool Design & MCP 18%, Context & Reliability 15%)",
      "Deconstruct enterprise AI architectures into four distinct execution layers",
      "Isolate non-deterministic model generation from deterministic transactional logic",
    ],
    keyDecisions: [
      "Keep authorization, database transactions, and safety invariants deterministic outside the prompt.",
      "Structure multi-agent handoffs with explicit typed contracts.",
    ],
    contentMarkdown: `### The Four Execution Primitives

Modern generative AI architecture separates software into four distinct layers:

1. **Deterministic Compute:** Business rules, database ACID transactions, access control, routing, and schema validation.
2. **Semantic Retrieval:** Vector search, BM25 sparse keyword indices, and prompt-cached document repositories.
3. **Constrained Generation:** Structured JSON extraction, reasoning in \`<thinking>\` tags, and schema contracts.
4. **Autonomous Action:** Bounded tool execution loops, Model Context Protocol (MCP) servers, and agent harnesses.

### The Architect's Golden Rule
Never use a probabilistic LLM where a deterministic SQL query, regex, or Python function can solve the problem with 100% certainty. Use Claude for semantic reasoning, nuance extraction, and synthesis.`,
    scenarioData: {
      title: "Real-World Scenario: The Telecom Support Agent Architecture",
      context: "A telecom provider receives 100,000 inquiries daily across billing, SIM activation, and network outages.",
      whatWentWrong: "Attempting to build a single monolithic agent with 65 tools led to context dilution and incorrect tool invocations.",
      correctApproach: "Refactor into a Hierarchical Router-Worker pattern with lightweight classification routers (Haiku) and domain-scoped specialist workers (Sonnet) with 3–5 tools each.",
    },
    codeSnippet: {
      language: "python",
      filename: "hierarchical_router.py",
      code: `import anthropic

client = anthropic.Anthropic()

def route_request(query: str) -> str:
    # 1. Fast, deterministic routing
    triage = client.messages.create(
        model="claude-3-5-haiku-20241022",
        max_tokens=20,
        temperature=0.0,
        system="Classify into: [BILLING, NETWORK, GENERAL]. Output only the tag.",
        messages=[{"role": "user", "content": query}]
    )
    domain = triage.content[0].text.strip()

    # 2. Delegate to specialist worker
    if domain == "BILLING":
        return execute_billing_worker(query)
    elif domain == "NETWORK":
        return execute_network_worker(query)
    return "Handled by General Assistant."`,
    },
    commonMistakes: [
      "Giving a single agent too many tools (50+), causing tool selection errors.",
      "Placing deterministic business logic inside probabilistic system prompts.",
    ],
    bestPractices: [
      "Scope sub-agent toolsets to 3–5 tools per domain.",
      "Enforce deterministic security boundaries in pre-execution hooks.",
    ],
    keyTakeaways: [
      "Deconstruct architectures into deterministic compute vs constrained generation.",
      "Hierarchical topologies outperform monolithic agent designs.",
    ],
    glossaryTerms: [
      { term: "Hierarchical Topology", definition: "An architecture where a coordinator agent routes requests to specialized worker subagents." },
    ],
  },
  {
    id: "ccar-f-02",
    trackId: "claude-ccar-f",
    slug: "01-rag-vs-long-context",
    order: 2,
    title: "RAG vs 200k Context Windows: Economic and Accuracy Tradeoffs",
    kind: "core",
    leadParagraph: "When to index vectors vs when to leverage Claude's 200k prompt cache for instant multi-document context.",
    domains: ["agentic-architecture-orchestration", "prompt-engineering-structured-output"],
    durationMin: 35,
    learningObjectives: [
      "Formulate mathematical cost and latency models for RAG vs Long-Context Prompt Caching",
      "Select the right architecture based on document update frequency and query volume",
      "Prevent context chunk fragmentation in complex cross-referencing legal/financial tasks",
    ],
    keyDecisions: [
      "Use **Prompt Caching** for static corpora (< 200k tokens) with high query rates (100+ calls/day).",
      "Use **Vector RAG** for multi-million token dynamic datasets with frequent updates.",
    ],
    contentMarkdown: `### RAG vs Full-Context Ingestion Decision Matrix

| Metric | Vector RAG Pipeline | 200k Prompt Caching |
| :--- | :--- | :--- |
| **Corpus Scale** | Billions of tokens | Up to 200,000 tokens |
| **Update Frequency** | High (Real-time updates) | Low (Static / Weekly updates) |
| **Query Cross-References** | Poor (Chunk fragmentation) | Excellent (Full global attention) |
| **Cost per 1,000 Calls** | Higher embedding/vector cost | 90% discount on cached reads |
| **Setup Complexity** | High (Embeddings, DB, Rerankers) | Low (Single system prompt block) |`,
    scenarioData: {
      title: "Real-World Scenario: Municipal Code Compliance",
      context: "A legal tech firm allows lawyers to query a 160,000-token city building code.",
      whatWentWrong: "Vector RAG fragmented interrelated definitions across pages, causing 30% extraction errors.",
      correctApproach: "Ingest the full 160k document into Claude 3.5 Sonnet's context window with Prompt Caching.",
    },
    codeSnippet: {
      language: "python",
      filename: "cached_context.py",
      code: `import anthropic

client = anthropic.Anthropic()

def query_legal_corpus(corpus_text: str, query: str) -> str:
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=[
            {"type": "text", "text": "You are a legal compliance specialist."},
            {"type": "text", "text": corpus_text, "cache_control": {"type": "ephemeral"}}
        ],
        messages=[{"role": "user", "content": query}]
    )
    return response.content[0].text`,
    },
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
      "Design hierarchical supervisor topologies vs decentralized peer meshes",
      "Enforce termination conditions and prevent cyclic message storms",
      "Implement cycle and dead-end detection middleware",
    ],
    keyDecisions: [
      "Prefer **Supervisor Hierarchies** for enterprise workflows where an orchestrator routes to specialized subagents.",
      "Implement cycle detection to halt agents if identical tool calls fail twice consecutively.",
    ],
    contentMarkdown: `### Multi-Agent Topologies

1. **Supervisor-Worker (Hierarchical):** A central coordinator receives user input, delegates sub-tasks to workers, and aggregates results. Best for enterprise audits and workflows.
2. **Sequential Chain (Pipeline):** Output of Agent A becomes input to Agent B. Best for multi-pass document translation and verification.
3. **Peer-to-Peer Mesh:** Agents communicate directly without a coordinator. High risk of infinite message loops and non-deterministic deadlocks.`,
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
      "Architect Model Context Protocol (MCP) server meshes over Server-Sent Events (SSE)",
      "Implement zero-trust mTLS and scoped bearer tokens for tool authentication",
      "Enforce idempotent tool design with idempotency keys",
    ],
    keyDecisions: [
      "Deploy MCP servers as independent containerized microservices behind an API gateway.",
      "Require idempotency keys on all write/payment tools.",
    ],
    contentMarkdown: `### Enterprise MCP Network Design

Deploying MCP servers across enterprise clusters requires:
- **Transport Security:** Running remote MCP servers over Server-Sent Events (SSE) secured with TLS 1.3 and mTLS.
- **Least-Privilege Scoping:** Connecting MCP database tools using restricted read-only credentials.
- **Idempotent Operations:** Ensuring retry storms do not create duplicate real-world financial or data modifications.`,
  },
  {
    id: "ccar-f-05",
    trackId: "claude-ccar-f",
    slug: "04-resilience-and-circuit-breakers",
    order: 5,
    title: "Designing for 99.99% Availability Under Provider Degradation",
    kind: "core",
    leadParagraph: "Implementing circuit breakers, exponential jitter backoff, and graceful fallback cascades.",
    domains: ["context-management-reliability"],
    durationMin: 35,
    learningObjectives: [
      "Implement circuit breaker patterns to fail fast during upstream API degradation",
      "Design model cascading fallbacks from Claude 3.5 Sonnet to Claude 3.5 Haiku or secondary cloud partners",
      "Manage client-side request queues during viral traffic spikes",
    ],
    keyDecisions: [
      "Combine token bucket rate limiters in Redis with circuit breakers to protect against provider outages.",
      "Deploy multi-cloud failover (Anthropic Direct -> AWS Bedrock -> GCP Vertex AI).",
    ],
    contentMarkdown: `### High-Availability Architecture Patterns

1. **Circuit Breaker Pattern:** Automatically trip open when consecutive 5xx errors exceed 5%, routing traffic to fallback models.
2. **Multi-Provider Gateways:** Route primary requests to Anthropic Direct API; failover transparently to Amazon Bedrock upon outage.
3. **Graceful Throttling:** Buffer spikes in asynchronous message queues (SQS/Celery) with progress feedback.`,
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
      "context-management-reliability",
    ],
    durationMin: 75,
    learningObjectives: [
      "Draft a complete enterprise architecture specification for a production Claude deployment",
      "Defend latency, cost, security, and failover design decisions across all 6 exam scenarios",
    ],
    keyDecisions: [
      "A complete architectural design balances cost models, security trust boundaries, and failover mechanisms.",
    ],
    contentMarkdown: `### The Complete Architecture Blueprint

Synthesizing all 5 CCAR-F domains into an enterprise-ready system architecture serving 100,000 requests per day with 99.99% SLA availability.`,
  },
];
