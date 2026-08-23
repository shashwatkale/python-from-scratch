// src/data/certifications/assessments.ts — Scenario-Based Practice Questions & Assessments
import type { CertificationAssessment } from "@/types/certifications";

export const CERTIFICATION_ASSESSMENTS: CertificationAssessment[] = [
  /* ── 1. CCAO-F Diagnostic (Associate Foundations) ──────────── */
  {
    id: "ccao-diagnostic",
    trackId: "claude-ccao-f",
    title: "Associate Foundations Diagnostic",
    type: "diagnostic",
    timeLimitMin: 25,
    passingScore: 720,
    questions: [
      {
        id: "ccao-d-001",
        domainId: "prompting-task-execution",
        domainName: "Prompting and Task Execution",
        isMultiSelect: false,
        scenario:
          "A director asks Claude to produce a comprehensive monthly report, but gives no audience, sources, or definition of success. What should the operator do first?",
        options: [
          "Add a role saying Claude is an expert director",
          "Choose the most capable available model and keep the original request",
          "Choose the strongest available model and ask it to infer an executive audience, likely sources, and a comprehensive structure",
          "Define the decision, audience, authoritative sources, constraints, output shape, and pass criteria",
        ],
        correctAnswerIndices: [3],
        explanation:
          "The missing artifact is a prompt contract. It makes the outcome and checks observable before generation. More length, a role, or a larger model cannot establish absent requirements or evidence.",
      },
      {
        id: "ccao-d-002",
        domainId: "prompting-task-execution",
        domainName: "Prompting and Task Execution",
        isMultiSelect: true,
        scenario:
          "A team is building a source-backed policy briefing. Which two stage boundaries most improve verification? Select two.",
        options: [
          "Let separate conversations independently discover sources and draft sections, then reconcile citations only after the full briefing is assembled",
          "Verify the source inventory before extracting claims",
          "Draft recommendations during extraction; check later",
          "Verify extracted claims before interpreting patterns",
        ],
        correctAnswerIndices: [1, 3],
        explanation:
          "Source approval and claim extraction are meaningful verification boundaries. Arbitrary paragraph splits add coordination cost, while recommending before evidence validation pushes defects downstream.",
      },
      {
        id: "ccao-d-003",
        domainId: "output-evaluation-validation",
        domainName: "Output Evaluation and Validation",
        isMultiSelect: false,
        scenario:
          "A response cites a real policy page beside the claim that all refunds require director approval. The page only says some refunds require approval. What is the primary defect?",
        options: [
          "The claim overreaches the cited evidence",
          "The response needs a friendlier tone",
          "The citation is acceptable because the linked page discusses the same refund policy and therefore supports the stronger summary",
          "The context window is necessarily full",
        ],
        correctAnswerIndices: [0],
        explanation:
          "Citation presence is not proof. The universal claim is stronger than the source, so claim-evidence entailment fails. Tone and context capacity do not repair the factual overreach.",
      },
      {
        id: "ccao-d-004",
        domainId: "output-evaluation-validation",
        domainName: "Output Evaluation and Validation",
        isMultiSelect: true,
        scenario:
          "Which two checks should be handled first by deterministic code rather than subjective model judgment? Select two.",
        options: [
          "Whether JSON parses against the required schema",
          "Whether an executive will find the recommendation persuasive",
          "Whether a policy tradeoff is ethically acceptable",
          "Whether regional subtotals equal the stated total",
        ],
        correctAnswerIndices: [0, 3],
        explanation:
          "Schema validity and arithmetic reconciliation have exact repeatable answers. Ethical acceptability and audience persuasion require contextual criteria and often qualified human judgment.",
      },
      {
        id: "ccao-d-005",
        domainId: "product-model-selection",
        domainName: "Product and Model Selection",
        isMultiSelect: false,
        scenario:
          "A team repeats the same internal planning workflow each week using maintained instructions and an approved reference set. Which starting surface best fits?",
        options: [
          "A fresh Claude Chat conversation each time",
          "A dedicated Claude Project with curated knowledge and project instructions",
          "An unbounded API agent loop",
          "An export to standalone Artifacts with no stored context",
        ],
        correctAnswerIndices: [1],
        explanation:
          "Claude Projects are specifically designed for recurring team workflows that share persistent, maintained instructions and reference knowledge documents.",
      },
      {
        id: "ccao-d-006",
        domainId: "governance-risk-responsible-use",
        domainName: "Governance, Risk, and Responsible Use",
        isMultiSelect: false,
        scenario:
          "An employee wants to paste raw customer support transcripts containing unredacted credit card numbers into a public web chat for quick summarization. What is the correct policy action?",
        options: [
          "Instruct Claude in the prompt to ignore the credit card numbers",
          "Proceed because the chat interface is encrypted in transit",
          "Block the action and run a deterministic PII de-identification sanitizer before any external LLM processing",
          "Ask Claude to redact the numbers and output the cleaned version back",
        ],
        correctAnswerIndices: [2],
        explanation:
          "Security and privacy live outside the prompt. Unredacted sensitive PII must never cross the trust boundary into external model context without deterministic local sanitization.",
      },
      {
        id: "ccao-d-007",
        domainId: "troubleshooting-optimization",
        domainName: "Troubleshooting and Optimization",
        isMultiSelect: false,
        scenario:
          "A prompt asking for extraction from a 50-page document occasionally misses tables located near the end of the text. Which optimization most reliably restores retrieval accuracy?",
        options: [
          "Add five exclamation marks to the prompt instructing Claude to pay attention",
          "Place the document text first, followed by clear extraction instructions and XML-tagged anchor queries at the bottom",
          "Increase model temperature to 1.0",
          "Switch to an older model with smaller context",
        ],
        correctAnswerIndices: [1],
        explanation:
          "Structuring the prompt with long reference context first and explicit task instructions/XML anchors at the end mitigates recency bias and optimizes attention distribution across the context window.",
      },
      {
        id: "ccao-d-008",
        domainId: "workflow-integration-solution-design",
        domainName: "Workflow Integration and Solution Design",
        isMultiSelect: false,
        scenario:
          "What makes a human handoff effective when Claude completes an automated draft for a high-consequence compliance report?",
        options: [
          "Presenting a raw 40-page markdown dump without comments",
          "Including a concise executive summary, an assumptions list, and direct bracketed citations to verified source paragraphs",
          "Omitting any indication that the draft was machine-assisted",
          "Relying solely on Claude's self-reported confidence score",
        ],
        correctAnswerIndices: [1],
        explanation:
          "A reviewable handoff minimizes verification burden by surfacing assumptions, highlighted decision points, and unambiguous citations to source evidence.",
      },
    ],
  },

  /* ── 2. CCDV-F Diagnostic (Developer Foundations) ──────────── */
  {
    id: "ccdv-diagnostic",
    trackId: "claude-ccdv-f",
    title: "Developer Foundations Diagnostic",
    type: "diagnostic",
    timeLimitMin: 30,
    passingScore: 720,
    questions: [
      {
        id: "ccdv-d-001",
        domainId: "agents-workflows",
        domainName: "Agents and Workflows",
        isMultiSelect: false,
        scenario:
          "A ticket system must classify one request, validate a fixed schema, and route it to one of four queues. The steps never change. Which architecture is the strongest default?",
        options: [
          "An unbounded autonomous agent with every support tool",
          "A manager, queue-specialist, and validation-subagent hierarchy that encodes routing policy in agent prompts rather than fixed branches",
          "A remote MCP server that lets the model invent new queues",
          "A deterministic workflow containing one model classification step",
        ],
        correctAnswerIndices: [3],
        explanation:
          "The sequence and branch set are known, so a deterministic workflow is easier to test, secure, and operate. Agentic planning earns its complexity when observations determine an unknown path, not when the process is already explicit.",
      },
      {
        id: "ccdv-d-002",
        domainId: "agents-workflows",
        domainName: "Agents and Workflows",
        isMultiSelect: true,
        scenario:
          "A repository agent must never read secret files and must format every edited Python file. Which controls belong in the harness? Select all that apply.",
        options: [
          "A post-tool hook that runs the formatter after edits",
          "A filesystem sandbox that excludes credential locations",
          "Use model policy review to approve each filesystem path",
          "A pre-tool policy hook that denies configured secret paths",
        ],
        correctAnswerIndices: [0, 1, 3],
        explanation:
          "Pre-tool policy blocks before access, post-tool automation formats completed edits, and sandboxing limits impact if the hook is incomplete. Prompt guidance remains useful but is not deterministic isolation.",
      },
      {
        id: "ccdv-d-003",
        domainId: "applications-integration",
        domainName: "Applications and Integration",
        isMultiSelect: true,
        scenario:
          "Claude returns a tool_use block with ID toolu_9. Which elements must the client preserve in the next Messages API request? Select all that apply.",
        options: [
          "The prior conversation context still required by the task",
          "Send the result text in a standalone user-role message",
          "The assistant message containing the original tool_use block",
          "A user-role tool_result whose tool_use_id is toolu_9",
        ],
        correctAnswerIndices: [0, 2, 3],
        explanation:
          "The client owns state. It resends required history, preserves the assistant tool request, and appends the correlated user tool result. Sending only the result loses the protocol context.",
      },
      {
        id: "ccdv-d-004",
        domainId: "applications-integration",
        domainName: "Applications and Integration",
        isMultiSelect: false,
        scenario:
          "A streamed structured response currently contains {\"status\":\"read. What should the application do before updating the order record?",
        options: [
          "Buffer until the content block and message complete, then parse, validate, and authorize",
          "Retry the request for every new character",
          "Append missing JSON characters itself",
          "Treat the syntactically plausible prefix as provisional JSON, fill the expected closing characters, then validate before updating the record",
        ],
        correctAnswerIndices: [0],
        explanation:
          "Streamed chunks are provisional fragments. The application must buffer until completion, parse with strict JSON validation, validate against Pydantic models, and authorize before mutating database state.",
      },
      {
        id: "ccdv-d-005",
        domainId: "prompt-context-engineering",
        domainName: "Prompt and Context Engineering",
        isMultiSelect: false,
        scenario:
          "An application sends a 150k token API documentation payload on every user question. How can the developer minimize latency and cost using Prompt Caching?",
        options: [
          "Set cache_control: {\"type\": \"ephemeral\"} on the documentation block and place dynamic user queries at the end",
          "Place user queries at the top of the message list before the cached document",
          "Compress documentation by removing all spaces and punctuation",
          "Disable caching and split the documentation into 50 separate API calls",
        ],
        correctAnswerIndices: [0],
        explanation:
          "Prompt Caching matches static prefix tokens from top to bottom. Setting cache_control on the large static documentation block and keeping dynamic user queries at the tail achieves ~90% cost savings and drastic latency reductions.",
      },
      {
        id: "ccdv-d-006",
        domainId: "tools-mcps",
        domainName: "Tools and MCPs",
        isMultiSelect: false,
        scenario:
          "What is the primary architectural role of the Model Context Protocol (MCP)?",
        options: [
          "To replace REST APIs with raw text streams",
          "To decouple tool implementations and data resources from specific model hosts via a standard protocol",
          "To eliminate the need for schema validation in Python",
          "To allow AI models to execute code without user permission",
        ],
        correctAnswerIndices: [1],
        explanation:
          "MCP provides an open standard separating tool capabilities, prompts, and resources from host LLM clients, enabling modular, reusable integrations across IDEs and agent runners.",
      },
      {
        id: "ccdv-d-007",
        domainId: "security-safety",
        domainName: "Security and Safety",
        isMultiSelect: false,
        scenario:
          "An agent downloads untrusted external HTML to extract price quotes. How should the system protect against indirect prompt injection?",
        options: [
          "Tell Claude in system instructions to ignore all instructions in the web page",
          "Enclose untrusted external content in distinct XML boundary tags and enforce read-only tool permissions for extraction",
          "Assume that SSL encryption prevents prompt injection",
          "Increase model temperature to bypass injection tokens",
        ],
        correctAnswerIndices: [1],
        explanation:
          "Isolating untrusted content in distinct boundary tags (e.g. `<untrusted_content>`) combined with least-privilege tool execution prevents injected directives from hijacking tool calls.",
      },
      {
        id: "ccdv-d-008",
        domainId: "eval-testing-debugging",
        domainName: "Eval, Testing, and Debugging",
        isMultiSelect: false,
        scenario:
          "Why should an evaluation suite test golden datasets deterministically in CI/CD rather than relying on interactive playground tests?",
        options: [
          "Playground testing is slower to click",
          "Systematic evals measure regression rates, schema pass percentages, and cost over hundreds of representative edge cases",
          "Anthropic requires automated testing before issuing API keys",
          "Automated tests eliminate the need for model prompt tuning",
        ],
        correctAnswerIndices: [1],
        explanation:
          "Continuous evaluation against structured benchmark test suites turns subjective prompts into repeatable engineering assertions with measurable accuracy rates.",
      },
    ],
  },

  /* ── 3. Full Mock: CCDV-F Developer Mock ───────────────────── */
  {
    id: "ccdv-mock-01",
    trackId: "claude-ccdv-f",
    title: "Developer Foundations Full Mock",
    type: "mock",
    timeLimitMin: 120,
    passingScore: 720,
    questions: [
      {
        id: "ccdv-m-001",
        domainId: "applications-integration",
        domainName: "Applications and Integration",
        isMultiSelect: false,
        scenario:
          "When implementing tool use with the Messages API, what is the required sequence when Claude requests a tool call?",
        options: [
          "Send the tool result in a new conversation session",
          "Execute the tool locally and return a user message containing a tool_result block matching the tool_use_id",
          "Ask Claude to generate mock tool data itself",
          "Discard the assistant message and send only the tool result",
        ],
        correctAnswerIndices: [1],
        explanation:
          "The client executes the tool and appends a `user` role message containing `type: 'tool_result'` with the corresponding `tool_use_id` back to the existing conversation context.",
      },
      {
        id: "ccdv-m-002",
        domainId: "model-selection-optimization",
        domainName: "Model Selection and Optimization",
        isMultiSelect: false,
        scenario:
          "A high-throughput service processes 500,000 document classifications per day with strict p99 < 300ms latency requirements. Which model selection is most appropriate?",
        options: [
          "Claude 3 Opus",
          "Claude 3.5 Haiku",
          "Claude 3.5 Sonnet with 200k context",
          "Claude 2.1",
        ],
        correctAnswerIndices: [1],
        explanation:
          "Claude 3.5 Haiku provides frontier-class classification speed and ultra-low token latency at exceptional cost efficiency, ideal for sub-second high-volume classification pipelines.",
      },
      {
        id: "ccdv-m-003",
        domainId: "agents-workflows",
        domainName: "Agents and Workflows",
        isMultiSelect: false,
        scenario:
          "Which pattern is best suited for an autonomous coding agent that must inspect errors, run tests, and iteratively repair syntax failures?",
        options: [
          "Single-turn zero-shot prompt",
          "ReAct / Evaluator-Optimizer tool loop with loop iteration limits and automated test execution",
          "Hardcoded regex replacement scripts",
          "Chained linear prompts without tool execution feedback",
        ],
        correctAnswerIndices: [1],
        explanation:
          "An Evaluator-Optimizer agent loop executes the code, captures test output in tool results, and iteratively refines fixes until test suite assertions pass or max iterations are reached.",
      },
      {
        id: "ccdv-m-004",
        domainId: "prompt-context-engineering",
        domainName: "Prompt and Context Engineering",
        isMultiSelect: false,
        scenario:
          "What is the recommended structure for system prompts to ensure Claude adheres to strict output formatting constraints?",
        options: [
          "Use emotional pleading phrases like 'please do your best'",
          "Use explicit XML tags (e.g., <instructions>, <constraints>, <output_format>, <examples>)",
          "Repeat the prompt 10 times in a single sentence",
          "Only provide prompt instructions inside the user role",
        ],
        correctAnswerIndices: [1],
        explanation:
          "Anthropic models excel at XML boundary parsing. Structuring prompts with clear semantic XML tags eliminates ambiguity and enhances instruction following fidelity.",
      },
      {
        id: "ccdv-m-005",
        domainId: "claude-code",
        domainName: "Claude Code",
        isMultiSelect: false,
        scenario:
          "What is the purpose of the CLAUDE.md file in a software repository when using Claude Code?",
        options: [
          "To license the repository under MIT",
          "To provide project-specific commands, architectural invariants, code style conventions, and testing instructions to Claude Code",
          "To store user passwords and API keys",
          "To compile the application into WebAssembly",
        ],
        correctAnswerIndices: [1],
        explanation:
          "CLAUDE.md acts as persistent project memory for Claude Code, defining build/test commands, formatting standards, and non-negotiable architectural boundaries.",
      },
    ],
  },

  /* ── 4. CCAR-F Diagnostic (Architect Foundations) ──────────── */
  {
    id: "ccar-f-diagnostic",
    trackId: "claude-ccar-f",
    title: "Architect Foundations Diagnostic",
    type: "diagnostic",
    timeLimitMin: 30,
    passingScore: 720,
    questions: [
      {
        id: "ccar-f-d-001",
        domainId: "agentic-architecture-orchestration",
        domainName: "Agentic Architecture and Orchestration",
        isMultiSelect: false,
        scenario:
          "An enterprise architecture requires an agent to process customer claims by interacting with three internal REST microservices. To ensure predictable latency, traceability, and prevent infinite tool recursion, which design is recommended?",
        options: [
          "Deploy an unbounded single-agent loop that discovers and invokes all tools ad-hoc without step limits",
          "Implement a supervisor coordinator agent with explicit state machine transitions, maximum step bounds (e.g., max_steps=6), and typed Pydantic handoff schemas",
          "Pass all raw database tables directly into the model context in each turn",
          "Rely on client-side regexes to parse unstructured conversational replies",
        ],
        correctAnswerIndices: [1],
        explanation:
          "Enterprise agentic architectures require explicit supervisor coordination, hard step ceilings, and typed schema validation to prevent runaway token costs and state corruption.",
      },
      {
        id: "ccar-f-d-002",
        domainId: "tool-design-mcp-integration",
        domainName: "Tool Design and MCP Integration",
        isMultiSelect: false,
        scenario:
          "When connecting multiple microservices to a Claude Agent fleet, what is the primary benefit of deploying Model Context Protocol (MCP) servers over SSE transport rather than embedding custom API wrappers inside the prompt?",
        options: [
          "It eliminates the need for network security and SSL certificates",
          "It decouples tool capabilities, authorization scopes, and schema definitions from the client application host, allowing unified reuse across IDEs, CLI agents, and backend microservices",
          "It makes LLM tokens completely free of charge",
          "It forces Claude to always produce deterministic mathematical outputs",
        ],
        correctAnswerIndices: [1],
        explanation:
          "MCP standardizes tool and resource discovery across disparate runtime hosts, allowing clean separation between tool implementation, authorization policies, and LLM orchestration.",
      },
    ],
  },

  /* ── 5. CCAR-P Diagnostic (Architect Professional) ─────────── */
  {
    id: "ccar-p-diagnostic",
    trackId: "claude-ccar-p",
    title: "Architect Professional Diagnostic",
    type: "diagnostic",
    timeLimitMin: 35,
    passingScore: 720,
    questions: [
      {
        id: "ccar-p-d-001",
        domainId: "integration",
        domainName: "Integration",
        isMultiSelect: false,
        scenario:
          "A multi-region enterprise platform processes 10,000 queries/minute across 5 continents. To maintain 99.999% availability during cloud provider incidents without compromising data sovereignty (GDPR), which architecture should the lead architect mandate?",
        options: [
          "Route all global traffic to a single monolithic API cluster in us-east-1",
          "Deploy multi-region active-active clusters with geo-DNS routing, regional Claude API fallback endpoints, prompt-cached tenant contexts, and localized PII tokenization gateways",
          "Disable all authentication and encryption across inter-service calls to reduce network overhead",
          "Store all user conversation history unencrypted in client cookies",
        ],
        correctAnswerIndices: [1],
        explanation:
          "Professional-grade enterprise architecture requires active-active regional routing, localized data protection gateways to satisfy regulatory boundaries, and automated multi-endpoint fallback cascades.",
      },
    ],
  },
];

export function getAssessmentById(id: string): CertificationAssessment | undefined {
  return CERTIFICATION_ASSESSMENTS.find(
    (a) => a.id.toLowerCase() === id.toLowerCase() || a.trackId.toLowerCase().includes(id.toLowerCase())
  );
}

export function getAssessmentsByTrack(trackId: string): CertificationAssessment[] {
  const norm = trackId.toLowerCase();
  return CERTIFICATION_ASSESSMENTS.filter(
    (a) => a.trackId.toLowerCase() === norm || a.trackId.replace("claude-", "").toLowerCase() === norm
  );
}
