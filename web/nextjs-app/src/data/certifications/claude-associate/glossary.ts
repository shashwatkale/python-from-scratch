// src/data/certifications/claude-associate/glossary.ts — Complete Glossary Terms
export interface AssociateGlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  category: string;
}

export const ASSOCIATE_GLOSSARY_TERMS: AssociateGlossaryTerm[] = [
  /* ── Phase 1 Terms ─────────────────────────────────────────── */
  {
    slug: "context-window",
    term: "Context window",
    definition: "The maximum amount of text (in tokens) Claude can process in a single API call.",
    category: "Architecture",
  },
  {
    slug: "token",
    term: "Token",
    definition: "The basic unit of text Claude processes; roughly 0.75 words on average in English.",
    category: "Fundamentals",
  },
  {
    slug: "temperature",
    term: "Temperature",
    definition: "A sampling parameter (0–1) controlling response randomness; 0 = deterministic.",
    category: "Sampling",
  },
  {
    slug: "knowledge-cutoff",
    term: "Knowledge cutoff",
    definition: "The date after which Claude has no training data on world events.",
    category: "Model Mechanics",
  },
  {
    slug: "stateless",
    term: "Stateless",
    definition: "Each API call is independent; no memory persists between calls by default.",
    category: "API Design",
  },
  {
    slug: "constitutional-ai",
    term: "Constitutional AI",
    definition: "Anthropic's training approach that uses a set of principles to guide model behaviour.",
    category: "Safety & Governance",
  },
  {
    slug: "messages-api",
    term: "Messages API",
    definition: "Anthropic's primary API endpoint for conversational interaction with Claude.",
    category: "API Design",
  },
  {
    slug: "max-tokens",
    term: "max_tokens",
    definition: "Hard ceiling on the number of tokens Claude will generate in one response.",
    category: "Parameters",
  },
  {
    slug: "stop-reason",
    term: "stop_reason",
    definition: "Why Claude stopped generating: end_turn, max_tokens, or stop_sequence.",
    category: "API Response",
  },
  {
    slug: "stop-sequences",
    term: "stop_sequences",
    definition: "Strings you specify where Claude should halt generation.",
    category: "Parameters",
  },
  {
    slug: "top-p",
    term: "top_p",
    definition: "Nucleus sampling — limits sampling to the smallest set of tokens whose cumulative probability exceeds p.",
    category: "Sampling",
  },
  {
    slug: "input-tokens",
    term: "Input tokens",
    definition: "Tokens in your prompt (system + messages); billed differently from output tokens.",
    category: "FinOps & Billing",
  },
  {
    slug: "output-tokens",
    term: "Output tokens",
    definition: "Tokens Claude generates in its response.",
    category: "FinOps & Billing",
  },
  {
    slug: "operator",
    term: "Operator",
    definition: "The developer or organisation deploying Claude via the API.",
    category: "Roles & Permissions",
  },
  {
    slug: "user",
    term: "User",
    definition: "The end person interacting with the deployed Claude application.",
    category: "Roles & Permissions",
  },
  {
    slug: "system-prompt",
    term: "System prompt",
    definition: "Instructions placed in the system parameter; establishes the foundation for the conversation.",
    category: "Prompting",
  },
  {
    slug: "persona",
    term: "Persona",
    definition: "A defined role or character Claude adopts in a deployment.",
    category: "Prompting",
  },
  {
    slug: "dynamic-injection",
    term: "Dynamic injection",
    definition: "Filling system prompt templates at runtime with live, user-specific data.",
    category: "Integration",
  },
  {
    slug: "constraint",
    term: "Constraint",
    definition: "An instruction defining what Claude should not do in a given deployment.",
    category: "Prompting",
  },

  /* ── Phase 2 Terms ─────────────────────────────────────────── */
  {
    slug: "directness-triad",
    term: "Directness Triad",
    definition: "The prompt engineering framework combining explicit objective, operational constraints, and verification rubrics.",
    category: "Prompt Engineering",
  },
  {
    slug: "prompt-ambiguity",
    term: "Prompt Ambiguity",
    definition: "Lack of precision in instructions that causes non-deterministic or divergent output formats.",
    category: "Prompt Engineering",
  },
  {
    slug: "negative-constraint",
    term: "Negative Constraint",
    definition: "A prompt directive specifying behaviors, topics, or formatting patterns the model must avoid.",
    category: "Prompt Engineering",
  },
  {
    slug: "instruction-delimiter",
    term: "Instruction Delimiter",
    definition: "Formatting markers (XML tags, markdown headers, brackets) that separate instructions from payload data.",
    category: "Prompt Engineering",
  },
  {
    slug: "deterministic-fallback",
    term: "Deterministic Fallback",
    definition: "An explicit instruction specifying what exact token or string to return when input data is incomplete or invalid.",
    category: "Prompt Engineering",
  },
  {
    slug: "few-shot-prompting",
    term: "Few-Shot Prompting",
    definition: "Providing one or more input-output demonstration pairs within the prompt to guide model behavior.",
    category: "In-Context Learning",
  },
  {
    slug: "in-context-learning",
    term: "In-Context Learning",
    definition: "The ability of language models to learn patterns and tasks from prompt demonstrations without weight updates.",
    category: "In-Context Learning",
  },
  {
    slug: "majority-class-bias",
    term: "Majority Class Bias",
    definition: "The skew in model predictions toward the category that appears most frequently in few-shot examples.",
    category: "In-Context Learning",
  },
  {
    slug: "recency-bias",
    term: "Recency Bias",
    definition: "The tendency of a model to give higher weight or stylistic preference to the final example in the demonstration list.",
    category: "In-Context Learning",
  },
  {
    slug: "zero-shot-prompting",
    term: "Zero-Shot Prompting",
    definition: "Providing instructions and task input without any preceding input-output demonstration pairs.",
    category: "In-Context Learning",
  },
  {
    slug: "chain-of-thought",
    term: "Chain-of-Thought (CoT)",
    definition: "A prompting technique where the model generates intermediate reasoning steps prior to producing the final answer.",
    category: "Reasoning",
  },
  {
    slug: "scratchpad-tags",
    term: "Scratchpad / Thinking Tags",
    definition: "XML containers (<thinking>, <scratchpad>) used to hold intermediate reasoning that is stripped before UI presentation.",
    category: "Reasoning",
  },
  {
    slug: "structured-output",
    term: "Structured Output",
    definition: "Machine-readable output formatted according to a strict syntactic specification (JSON, XML, CSV).",
    category: "Integration",
  },
  {
    slug: "schema-enforcement",
    term: "Schema Enforcement",
    definition: "Techniques ensuring model outputs adhere strictly to predefined keys, types, and value constraints.",
    category: "Integration",
  },
  {
    slug: "token-level-reasoning",
    term: "Token-Level Reasoning",
    definition: "The computational mechanism whereby generating intermediate tokens allows the model to condition its final prediction on step-by-step logic.",
    category: "Reasoning",
  },
];
