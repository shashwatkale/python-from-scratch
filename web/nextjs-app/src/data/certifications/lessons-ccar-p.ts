// src/data/certifications/lessons-ccar-p.ts — Complete In-Depth Lessons for CCAR-P (Architect Professional)
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
    domains: ["solution-design-architecture", "enterprise-agent-ecosystems"],
    durationMin: 35,
    learningObjectives: [
      "Master the CCAR-P blueprint (7 domains: Integration 19%, Solution Design 17%, Evaluation 16%, Governance 14%, Models 13%, Stakeholder Communication 14%, Developer Enablement 7%)",
      "Define quantitative Service Level Agreements (SLAs: p95 latency, availability, accuracy ceilings)",
      "Model Total Cost of Ownership (TCO) across token volumes, caching, and model tiers",
    ],
    keyDecisions: [
      "Structure Architecture Decision Records (ADRs) evaluating probabilistic LLMs vs deterministic systems.",
      "Enforce tenant isolation cryptographically at the vector and database layers.",
    ],
    contentMarkdown: `### Enterprise AI Architecture & SLA Modeling

At enterprise scale, generative AI systems must operate under formal Service Level Agreements (SLAs):

1. **Latency SLA:** Time-to-First-Token (TTFT < 500ms) and End-to-End Latency (p95 < 2.5s).
2. **Availability SLA:** 99.9% uptime with automated multi-cloud failover (Direct API -> Bedrock -> Vertex AI).
3. **Accuracy & Grounding SLA:** >98% claim-evidence entailment on automated evaluation benchmarks.
4. **FinOps SLA:** Enforcing maximum cost per business transaction ($0.005 / interaction).

### Architecture Decision Records (ADR)
Every enterprise generative AI pattern must be justified in an ADR documenting Context, Decision Drivers, Evaluated Options, and Resulting Operational Tradeoffs.`,
    scenarioData: {
      title: "Real-World Scenario: Tier-1 Investment Banking Commentary",
      context: "A global wealth management division generates 500,000 personalized portfolio reviews quarterly.",
      whatWentWrong: "Single-tier monolithic generation on Claude 3 Opus exceeded cost budgets by $120,000 per quarter.",
      correctApproach: "Deploy Claude 3.5 Sonnet on AWS Bedrock inside the VPC with Prompt Caching on market decks, achieving a 75% cost reduction.",
    },
    codeSnippet: {
      language: "python",
      filename: "adr_governance.py",
      code: `import anthropic

client = anthropic.Anthropic()

def execute_sla_governed_query(query: str) -> str:
    # Production call with strict token limits and caching
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        temperature=0.0,
        system="You are an enterprise wealth management analyst. Strictly cite market metrics.",
        messages=[{"role": "user", "content": query}]
    )
    return response.content[0].text`,
    },
    commonMistakes: [
      "Deploying AI without quantitative latency and cost SLAs.",
      "Failing to document architectural tradeoffs in formal ADRs.",
    ],
    bestPractices: [
      "Implement multi-model tiering to optimize unit economics.",
      "Enforce tenant data isolation cryptographically.",
    ],
    keyTakeaways: [
      "Enterprise architecture requires strict SLA modeling and ADR documentation.",
      "Multi-cloud gateway failover guarantees high availability.",
    ],
    glossaryTerms: [
      { term: "Architecture Decision Record (ADR)", definition: "A document capturing an important architectural decision and its rationale." },
    ],
  },
  {
    id: "ccar-p-02",
    trackId: "claude-ccar-p",
    slug: "01-distributed-mcp-mesh",
    order: 2,
    title: "Enterprise Distributed MCP Mesh with mTLS",
    kind: "core",
    leadParagraph: "Deploying, discovering, and securing hundreds of microservice tools across zero-trust cloud networks.",
    domains: ["integration", "distributed-mcp-topology"],
    durationMin: 45,
    learningObjectives: [
      "Implement mutual TLS (mTLS) with short-lived X.509 certificates across distributed MCP servers",
      "Manage centralized tool service discovery, health checking, and role-based access control (RBAC)",
      "Propagate end-user OAuth identity tokens to prevent Confused Deputy privilege escalation",
    ],
    keyDecisions: [
      "Enforce mTLS and JWT role-scoped claims on every inter-agent tool invocation.",
      "Propagate delegated user identity tokens to backend tools to enforce Row-Level Security.",
    ],
    contentMarkdown: `### Zero-Trust Distributed MCP Mesh

In enterprise microservice clusters, MCP servers are deployed as independent containerized services:
- **Authentication & Encryption:** Mutual TLS (mTLS) ensures cryptographically verified communication between agents and MCP tools.
- **Identity Context Propagation:** Tools execute under the delegated identity of the authenticated end-user, not ambient superuser permissions.
- **Dynamic Service Discovery:** Centralized registries (Consul / Kubernetes DNS) provide automatic tool health monitoring and routing.`,
    scenarioData: {
      title: "Real-World Scenario: The Confused Deputy Vulnerability",
      context: "A support agent tool executes database queries using a global admin database service account.",
      whatWentWrong: "A low-privilege customer tricked the agent into querying executive salary tables.",
      correctApproach: "Pass the customer's OAuth token to the tool, enforcing PostgreSQL Row-Level Security (RLS).",
    },
  },
  {
    id: "ccar-p-03",
    trackId: "claude-ccar-p",
    slug: "02-continuous-adversarial-red-teaming",
    order: 3,
    title: "Continuous Adversarial Red Teaming in CI/CD",
    kind: "core",
    leadParagraph: "Integrating automated jailbreak attacks, indirect prompt injection tests, and data extraction probes into pull requests.",
    domains: ["compliance-governance-redteam", "evaluation-testing-optimization"],
    durationMin: 40,
    learningObjectives: [
      "Automate red-teaming pipelines in CI/CD using frameworks like Garak and PyRIT",
      "Detect indirect prompt injections, jailbreak attempts, and system prompt extraction probes before release",
      "Gate pull requests behind security benchmark pass rates (>99.5%)",
    ],
    keyDecisions: [
      "Block CI/CD pull requests that fail adversarial safety regression benchmarks.",
    ],
    contentMarkdown: `### Automated Continuous Red-Teaming

Adversarial testing must not be an annual audit—it must be an automated CI/CD release gate:
- **Probing Vectors:** Direct jailbreaks, indirect RAG context injection, ASCII/Unicode obfuscation, and prompt exfiltration probes.
- **Automated Regression Thresholds:** Pull requests must pass 100% of high-severity adversarial test probes before merging.`,
  },
  {
    id: "ccar-p-04",
    trackId: "claude-ccar-p",
    slug: "03-multitenant-isolation-and-finops",
    order: 4,
    title: "Multi-Tenant Cryptographic Isolation and Spend Governance",
    kind: "core",
    leadParagraph: "Enforcing tenant boundary guarantees and real-time budget hard caps across enterprise organizations.",
    domains: ["multitenant-resiliency", "continuous-evals-observability"],
    durationMin: 35,
    learningObjectives: [
      "Enforce strict multi-tenant data segregation across vector stores and agent state checkpoints",
      "Implement real-time token spend tracking with automated hard budget cutoffs and soft alerting",
    ],
    keyDecisions: [
      "Partition database connections and vector collections cryptographically per customer tenant.",
      "Enforce tenant-level spend quotas at the API gateway layer.",
    ],
    contentMarkdown: `### Multi-Tenant Isolation & FinOps Controls

1. **Storage Partitioning:** Dedicated database schemas or cryptographic metadata partitions per tenant ID.
2. **Gateway Spend Quotas:** Redis token bucket rate limiters coupled with real-time budget tracking to cut off compromised or runaway client accounts automatically.`,
  },
  {
    id: "ccar-p-05",
    trackId: "claude-ccar-p",
    slug: "04-shadow-traffic-evals",
    order: 5,
    title: "Shadow Traffic Evals and Dark Launching at Scale",
    kind: "core",
    leadParagraph: "Validating prompt regressions and model version migrations on live production traffic with zero customer impact.",
    domains: ["continuous-evals-observability"],
    durationMin: 35,
    learningObjectives: [
      "Architect dark launch / shadow traffic pipelines mirroring production traffic to candidate prompts",
      "Evaluate semantic drift, latency, and schema error rates on live traffic before full cutover",
    ],
    keyDecisions: [
      "Deploy shadow pipelines to evaluate model version upgrades against live production traffic without customer risk.",
    ],
    contentMarkdown: `### Dark Launching & Shadow Traffic Architecture

1. **Traffic Duplication:** API gateways duplicate incoming live requests asynchronously.
2. **Zero Customer Risk:** The primary production response is returned to the user immediately.
3. **Offline Telemetry:** The shadow candidate response is logged, evaluated by automated LLM judges, and scored for regression analysis.`,
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
      "solution-design-architecture",
      "integration",
      "evaluation-testing-optimization",
      "governance-safety-risk",
      "stakeholder-communication-lifecycle",
    ],
    durationMin: 75,
    learningObjectives: [
      "Author an end-to-end enterprise Architecture Decision Record (ADR) and technical blueprint",
      "Defend multi-region failover, mTLS MCP mesh security, and FinOps unit economics to executive stakeholders",
    ],
    keyDecisions: [
      "A complete enterprise AI platform unifies identity, security, resilience, and lifecycle governance.",
    ],
    contentMarkdown: `### The Enterprise Platform Blueprint

Synthesizing all 7 CCAR-P domains into a resilient, observable, multi-region enterprise platform architecture serving millions of transactions with 99.99% availability.`,
  },
];
