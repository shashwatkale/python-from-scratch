// src/data/certifications/claude-associate/lessons.ts — Complete Phase 1 & Phase 2 Lessons
import type { AssociateLessonItem } from "./types";

export const CLAUDE_ASSOCIATE_LESSONS: AssociateLessonItem[] = [
  /* ── Lesson 1.01 ───────────────────────────────────────────── */
  {
    id: "lesson-1-01",
    slug: "what-claude-is",
    phaseId: "phase-1",
    order: 1,
    lessonNumber: "Lesson 1.01",
    title: "What Claude Is (and What It Is Not)",
    description: "Before writing a single line of code or prompt, a practitioner needs a clear mental model of what Claude actually is: a large language model with specific capabilities, constraints, and a defined interaction model. This lesson establishes that foundation by contrasting accurate understanding against common misconceptions.",
    difficulty: "Beginner",
    estimatedTime: "40 minutes",
    prerequisites: "None",
    learningObjectives: [
      "Distinguish Claude as a probabilistic language model from deterministic software systems",
      "Explain the role of training versus prompting in shaping Claude's behaviour",
      "Identify the difference between Claude's knowledge cutoff and real-time awareness",
      "Describe how Claude's responses are generated (token-by-token prediction)",
      "Recognize the product layers: claude.ai, the API, Claude Code, and partner platforms",
    ],
    conceptMarkdown: `### Claude as a Language Model

Claude is a large language model (LLM) created by Anthropic. At its core, it generates text by predicting the most probable next token given everything in its context window — the system prompt, the conversation history, and the current user message. It does not "look up" answers, run database queries, or access the internet by default. Every response is generated fresh at inference time.

This has several practical implications that practitioners must internalize:

1. **Responses are probabilistic, not deterministic.**
   Ask Claude the same question twice with temperature > 0 and you may get two different but both-valid answers. This is not a bug. It reflects the model sampling from a probability distribution over possible next tokens. For applications requiring reproducibility, lower temperature values (closer to 0) reduce variance.

2. **Knowledge has a cutoff.**
   Claude's training data has a knowledge cutoff date. It does not know about events that occurred after that date unless you provide that information in the prompt. Asking Claude for "today's stock price" will produce a hallucination or a refusal, not a real price. When building applications, practitioners must supply time-sensitive context explicitly.

3. **Context window is the scope of awareness.**
   Claude has no memory between separate API calls (conversations). Each call to the API is stateless unless you include prior conversation turns in the messages array. Within a single call, Claude can "see" everything in the context window — which for current models extends up to 200,000 tokens.

4. **Claude is trained with values, not just capabilities.**
   Anthropic trains Claude with a set of values and guidelines — including honesty, helpfulness, and harmlessness — through a process that includes Constitutional AI and reinforcement learning from human feedback (RLHF). This means Claude will decline certain requests not because of a hard-coded filter, but because of internalized behaviour patterns from training.`,
    productLandscape: [
      { surface: "claude.ai", whatItIs: "Web, mobile, and desktop chat interface", typicalUser: "End users, knowledge workers" },
      { surface: "Anthropic API", whatItIs: "REST/SDK interface for building applications", typicalUser: "Developers" },
      { surface: "Claude Code", whatItIs: "CLI and IDE-integrated coding agent", typicalUser: "Software engineers" },
      { surface: "Amazon Bedrock / Google Vertex AI / Microsoft Foundry", whatItIs: "Claude accessed through cloud partner platforms", typicalUser: "Enterprise cloud customers" },
    ],
    scenario: {
      title: "Real-World Scenario: The Fintech Chatbot Assumption",
      context: "A junior developer at a fintech startup is asked to build a customer-facing chatbot using Claude. On day one they assume they can ask Claude 'what is the current interest rate?' and get a live answer. After wiring up the API, the bot returns a confident but outdated figure — embarrassing in a regulated industry.",
      whatWentWrong: "The developer treated Claude like a search engine with live data access. Claude has no network access by default. Its answer came from training data, not a live source.",
      correctApproach: "The developer should retrieve the current rate from the company's data systems and inject it into the system prompt or user message: 'The current base rate is 5.25%. The user is asking: [user question].' Claude then reasons over accurate, provided data.",
    },
    examples: [
      {
        title: "Treating Claude as a Database vs. Injecting Real-Time Context",
        bad: {
          label: "❌ Bad — Treating Claude as a database or search engine",
          codeOrPrompt: "User: What is ACME Corp's current share price?",
          explanation: "Claude has no live market data. Any answer it gives is either from training data (stale) or fabricated.",
        },
        good: {
          label: "✅ Good — Injecting real-time context",
          codeOrPrompt: "System: You are a financial assistant. The current ACME Corp share price as of [timestamp] is $142.30, retrieved from our market data feed.\nUser: What is ACME Corp's current share price?",
          explanation: "Now Claude reasons over accurate, provided data.",
        },
      },
    ],
    practicalPromptExample: {
      title: "Context Injection Over Live Retrieval",
      prompt: "System: You are a support assistant for OrderFlow, a logistics platform. Today's date is [dynamic date]. The user's most recent order (#ORD-8821) shipped yesterday via FedEx. Tracking number: 1Z999AA10123456784. Estimated delivery: tomorrow by 8pm.\nUser: Has my order shipped yet?",
      explanation: "Claude's response will accurately reflect the injected data — not invent tracking information. The developer's job is to supply the dynamic data; Claude's job is to reason over it and respond naturally.",
    },
    codeExample: {
      language: "python",
      filename: "context_injection_example.py",
      code: `import anthropic
from datetime import date

# --- Always initialize the client once ---
client = anthropic.Anthropic()  # uses ANTHROPIC_API_KEY env var

# --- Dynamic context injection ---
today = date.today().strftime("%B %d, %Y")
share_price = fetch_from_data_source("ACME")  # your live data call

system_prompt = f"""You are a financial assistant for ACME Corp employees.
Today's date is {today}.
Current ACME Corp share price: \${share_price} (live market data).
Do not speculate about price movements.
Answer only based on what the user asks and the data you have been given."""

response = client.messages.create(
    model="claude-sonnet-4-6",  # current recommended model as of 2026
    max_tokens=512,
    system=system_prompt,
    messages=[
        {"role": "user", "content": "What's our stock trading at right now?"}
    ]
)

print(response.content[0].text)`,
      note: "Always use the most current model string from the official models page. Model strings change as new versions release.",
    },
    commonMistakes: [
      "Assuming Claude has live internet access. It does not, unless a tool-use integration has been built explicitly.",
      "Expecting exact reproducibility. With temperature > 0, outputs vary. Use temperature=0 for classification tasks requiring consistency.",
      "Conflating the chatbot (claude.ai) with the API. They share the same underlying model but behave differently in terms of memory, system prompts, and interface features.",
      "Forgetting that each API call is stateless. If you want Claude to remember turn 1 when answering turn 3, you must include turns 1 and 2 in the messages array of the turn-3 call.",
      "Treating Claude's refusal as a technical error. When Claude declines a request, this is trained behaviour, not a bug. The solution is prompt redesign, not error handling.",
    ],
    bestPractices: [
      "Always specify the model string explicitly; don't rely on defaults that may change.",
      "Inject all time-sensitive or domain-specific data into the system prompt.",
      "For reproducible outputs (classification, extraction), set temperature=0.",
      "Read the Anthropic models overview before starting a project to choose the right model tier.",
      "Design your application around Claude's stateless nature; build your own session/memory layer if continuity is needed.",
    ],
    keyTakeaways: [
      "Claude generates text probabilistically; it is not a database or search engine.",
      "Knowledge has a cutoff — inject live data rather than relying on Claude to 'know' it.",
      "Each API call is stateless; conversation history must be explicitly provided.",
      "Claude's values are trained in, not rule-filtered at runtime.",
      "Multiple product surfaces exist; the API is the primary surface for developers.",
    ],
    glossaryTerms: [
      { term: "Context window", definition: "The maximum amount of text (in tokens) Claude can process in a single API call" },
      { term: "Token", definition: "The basic unit of text Claude processes; roughly 0.75 words on average in English" },
      { term: "Temperature", definition: "A sampling parameter (0–1) controlling response randomness; 0 = deterministic" },
      { term: "Knowledge cutoff", definition: "The date after which Claude has no training data on world events" },
      { term: "Stateless", definition: "Each API call is independent; no memory persists between calls by default" },
      { term: "Constitutional AI", definition: "Anthropic's training approach that uses a set of principles to guide model behaviour" },
    ],
    relatedLessons: [
      { lessonNumber: "Lesson 1.02", title: "The Messages API: Anatomy of a Request", slug: "messages-api-anatomy" },
      { lessonNumber: "Lesson 1.03", title: "System Prompts: Setting Context and Persona", slug: "system-prompts-architecture" },
      { lessonNumber: "Lesson 2.01", title: "Prompt Engineering: Clarity and Specificity", slug: "clarity-specificity-directness" },
      { lessonNumber: "Lesson 4.01", title: "Responsible AI: Understanding Claude's Values", slug: "responsible-ai-values" },
    ],
    exercises: [
      {
        id: "ex-1-01-a",
        title: "Exercise 1.01-A — Context Injection Design",
        description: "You are building a real estate assistant. A user asks: 'What are current mortgage rates?' Design a system prompt that correctly handles this using injected data.",
        tasks: [
          "Write the system prompt template with placeholder variables.",
          "Identify what dynamic data your application code must retrieve from an external API before calling Claude.",
          "Specify the refusal or boundary rules to ensure Claude does not speculate if rates are unavailable.",
        ],
      },
      {
        id: "ex-1-01-b",
        title: "Exercise 1.01-B — Temperature Selection",
        description: "For each task below, choose the appropriate temperature setting (0, 0.3, 0.7, or 1.0) and explain your reasoning:",
        tasks: [
          "Classifying customer support tickets into one of 5 categories",
          "Writing creative product descriptions for an e-commerce site",
          "Extracting structured data (names, dates, amounts) from invoices",
          "Generating diverse brainstorming ideas for a marketing campaign",
        ],
      },
      {
        id: "ex-1-01-c",
        title: "Exercise 1.01-C — Stateless Design",
        description: "A user has a 4-turn conversation with a support chatbot.",
        tasks: [
          "Sketch the messages array you would send in the 4th API call to preserve full conversation context.",
          "What are the cost and latency implications of this approach as the conversation scales to 50 turns?",
        ],
      },
      {
        id: "ex-1-01-d",
        title: "Exercise 1.01-D — Product Surface Mapping",
        description: "Match each use case to the most appropriate Claude product surface, and justify your choice:",
        tasks: [
          "A developer building a document Q&A tool for 10,000 users",
          "A software engineer wanting Claude to help refactor a large Python codebase interactively",
          "A knowledge worker drafting emails and summarising meeting notes daily",
        ],
      },
    ],
    knowledgeChecks: [
      {
        id: "kc-1-01-1",
        question: "A developer notices that Claude gives a different answer to the same question on two consecutive API calls. What is the most likely cause?",
        options: [
          { id: "A", text: "A bug in the Anthropic API" },
          { id: "B", text: "The model was updated between calls" },
          { id: "C", text: "Temperature is set above 0, producing probabilistic sampling" },
          { id: "D", text: "The context window was exceeded" },
        ],
        correctAnswer: "C",
        explanation: "Temperature > 0 causes the model to sample from a distribution rather than always selecting the highest-probability token, producing variation.",
      },
      {
        id: "kc-1-01-2",
        question: "Your application asks Claude: 'What is the weather in Mumbai today?' Claude responds with a plausible but incorrect weather report. What is the root cause?",
        options: [
          { id: "A", text: "Claude's API connection to weather services failed" },
          { id: "B", text: "Claude hallucinated — it has no real-time data access without explicit tool integration" },
          { id: "C", text: "The model string was incorrect" },
          { id: "D", text: "Temperature was set too low" },
        ],
        correctAnswer: "B",
        explanation: "Claude has no live internet access by default. It generated a plausible-sounding answer from training data patterns, not a live weather source.",
      },
      {
        id: "kc-1-01-3",
        question: "Which of the following correctly describes the relationship between claude.ai and the Anthropic API?",
        options: [
          { id: "A", text: "They are the same product with the same interface" },
          { id: "B", text: "claude.ai is built on top of the same Claude models accessible via the API, but with different UX, memory, and feature layers" },
          { id: "C", text: "The API provides access to older model versions than claude.ai" },
          { id: "D", text: "claude.ai has no connection to the API" },
        ],
        correctAnswer: "B",
        explanation: "claude.ai is Anthropic's consumer interface built on the same Claude models, but it adds its own conversation memory, UI features, and tooling that are not automatically present in direct API calls.",
      },
      {
        id: "kc-1-01-4",
        question: "You want to build a legal document analyser that extracts specific clause types from contracts. Which temperature setting is most appropriate and why?",
        options: [
          { id: "A", text: "1.0 — for maximum creativity in interpretation" },
          { id: "B", text: "0.7 — for balanced accuracy and variation" },
          { id: "C", text: "0 — for consistent, reproducible extraction with minimal randomness" },
          { id: "D", text: "0.3 — because extraction tasks need some creativity" },
        ],
        correctAnswer: "C",
        explanation: "Extraction tasks benefit from deterministic behaviour. temperature=0 means Claude will consistently select the highest-probability tokens, producing stable, reproducible outputs across repeated runs on the same document.",
      },
    ],
  },

  /* ── Lesson 1.02 ───────────────────────────────────────────── */
  {
    id: "lesson-1-02",
    slug: "messages-api-anatomy",
    phaseId: "phase-1",
    order: 2,
    lessonNumber: "Lesson 1.02",
    title: "The Messages API: Anatomy of a Request",
    description: "The Messages API is the primary interface for interacting with Claude programmatically. This lesson dissects every parameter of an API call — required and optional — so practitioners understand what they are controlling, why it matters, and what the tradeoffs are.",
    difficulty: "Beginner",
    estimatedTime: "60 minutes",
    prerequisites: "Lesson 1.01",
    learningObjectives: [
      "Construct a valid Messages API request with all required parameters",
      "Explain the role and effect of each API parameter (model, max_tokens, temperature, system, messages, stop_sequences)",
      "Describe the alternating role structure of the messages array",
      "Interpret a Messages API response object",
      "Identify the difference between input tokens, output tokens, and their cost implications",
    ],
    conceptMarkdown: `### The Messages API Request Structure

Every call to the Claude Messages API is an HTTP POST to \`/v1/messages\`. The Python SDK wraps this into \`client.messages.create(...)\`.

**Required Parameters:**
- \`model\` — Which Claude model to use (e.g. \`claude-sonnet-4-6\`)
- \`max_tokens\` — Hard ceiling on output length (in tokens)
- \`messages\` — The conversation: array of \`{role, content}\` objects

**Optional (but commonly used) Parameters:**
- \`system\` — The system prompt (global instructions for the session)
- \`temperature\` — Sampling randomness (0.0–1.0, default varies by model)
- \`stop_sequences\` — List of strings where Claude should stop generating
- \`top_p\` — Nucleus sampling parameter (alternative to temperature)
- \`top_k\` — Limits the token sampling pool`,
    scenario: {
      title: "Real-World Scenario: The Truncated Summarisation Service",
      context: "A team building a document summarisation service discovers that 20% of their summaries are truncated mid-sentence. Users are complaining about incomplete output.",
      whatWentWrong: "The team set max_tokens=256 globally for all documents, not realising that some documents require 600-800 token summaries. Claude reached the ceiling and stopped.",
      correctApproach: "Either increase max_tokens for the summarisation task, or implement dynamic token budgeting based on input document length. Additionally, check response.stop_reason == 'max_tokens' and flag those responses for review or retry with higher limits.",
    },
    examples: [
      {
        title: "Ignoring stop_reason vs. Defensive Truncation Handling",
        bad: {
          label: "❌ Bad — Ignoring stop_reason",
          codeOrPrompt: "response = client.messages.create(...)\nsummary = response.content[0].text # blindly use the text\nprint(summary) # may be truncated with no warning",
          explanation: "Silent truncation causes corrupted or incomplete data to flow into production systems.",
        },
        good: {
          label: "✅ Good — Checking stop_reason",
          codeOrPrompt: "response = client.messages.create(...)\nif response.stop_reason == 'max_tokens':\n    logger.warning(f'Response truncated. Input tokens: {response.usage.input_tokens}')\nsummary = response.content[0].text",
          explanation: "Checking stop_reason allows the application layer to trigger retries, increase token limits, or alert the user.",
        },
      },
    ],
    codeExample: {
      language: "python",
      filename: "summarise_document.py",
      code: `import anthropic

client = anthropic.Anthropic()

def summarise_document(document_text: str, max_words: int = 200) -> dict:
    output_token_budget = int(max_words * 1.5) + 100

    system_prompt = """You are a professional document summariser.
- Write in clear, professional prose
- Capture the main purpose, key points, and any action items
- Use the word count target provided by the user
- Do not add opinions or information not in the source document"""

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=output_token_budget,
        temperature=0.2,
        system=system_prompt,
        messages=[
            {
                "role": "user",
                "content": f"Summarise the following document in approximately {max_words} words:\\n\\n{document_text}"
            }
        ],
        stop_sequences=["[END]"]
    )

    return {
        "summary": response.content[0].text,
        "stop_reason": response.stop_reason,
        "truncated": response.stop_reason == "max_tokens",
        "input_tokens": response.usage.input_tokens,
        "output_tokens": response.usage.output_tokens,
        "model": response.model
    }`,
      note: "Notice how output_token_budget dynamically scales with the requested word count plus a safety buffer.",
    },
    commonMistakes: [
      "Not checking stop_reason — Silent truncation is a production bug waiting to happen.",
      "Setting max_tokens too low and wondering why responses are cut off.",
      "Including the system prompt inside the messages array — It belongs in the separate system parameter.",
      "Not alternating roles correctly — Two consecutive 'user' entries will cause an API error.",
      "Confusing top_p and temperature — Use one or the other, not both simultaneously.",
    ],
    bestPractices: [
      "Store the model string in a configuration constant, not scattered across code.",
      "Always log input_tokens and output_tokens for cost monitoring.",
      "Implement stop_reason handling from day one, not as an afterthought.",
      "Use temperature=0 for extraction/classification; temperature=0.3–0.7 for drafting.",
    ],
    keyTakeaways: [
      "Three parameters are required: model, max_tokens, messages.",
      "The system prompt is separate from messages and applies globally to the conversation.",
      "Messages must strictly alternate between user and assistant roles.",
      "Always check stop_reason in the response.",
    ],
    glossaryTerms: [
      { term: "Messages API", definition: "Anthropic's primary API endpoint for conversational interaction with Claude" },
      { term: "max_tokens", definition: "Hard ceiling on the number of tokens Claude will generate in one response" },
      { term: "stop_reason", definition: "Why Claude stopped generating: end_turn, max_tokens, or stop_sequence" },
    ],
    relatedLessons: [
      { lessonNumber: "Lesson 1.01", title: "What Claude Is (and What It Is Not)", slug: "what-claude-is" },
      { lessonNumber: "Lesson 1.03", title: "System Prompts: Setting Context and Persona", slug: "system-prompts-architecture" },
    ],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 1.03 ───────────────────────────────────────────── */
  {
    id: "lesson-1-03",
    slug: "system-prompts-architecture",
    phaseId: "phase-1",
    order: 3,
    lessonNumber: "Lesson 1.03",
    title: "System Prompts: Architecture, Patterns, and Pitfalls",
    description: "The system prompt is the most powerful lever a developer has for shaping Claude's behaviour in a deployed application. This lesson covers architectural patterns, operator vs user context, and failure modes.",
    difficulty: "Intermediate",
    estimatedTime: "75 minutes",
    prerequisites: "Lessons 1.01, 1.02",
    learningObjectives: [
      "Design effective system prompts using established structural patterns",
      "Distinguish between persona, task, format, and constraint components",
      "Apply the concept of operator vs user instructions in deployed applications",
    ],
    conceptMarkdown: `### What the System Prompt Actually Does

The system prompt is injected into the context window before any user messages. Claude processes it as the foundational frame for the entire conversation.`,
    scenario: {
      title: "Real-World Scenario: The Legal Review Assistant",
      context: "A legal tech startup builds a contract review assistant.",
      whatWentWrong: "Claude offered direct legal advice outside its domain.",
      correctApproach: "Redesigned system prompt with strict boundary constraints.",
    },
    examples: [],
    codeExample: {
      language: "python",
      filename: "dynamic_system_prompt.py",
      code: `# Example dynamic prompt code`,
      note: "Dynamic context injection personalizes assistant tone at runtime.",
    },
    commonMistakes: ["Writing system prompts like chat messages."],
    bestPractices: ["Use clear section headers (ROLE, TASK, FORMAT, CONSTRAINTS)."],
    keyTakeaways: ["The system prompt is the operator's primary tool for customising Claude."],
    glossaryTerms: [],
    relatedLessons: [],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 2.01 ───────────────────────────────────────────── */
  {
    id: "lesson-2-01",
    slug: "clarity-specificity-directness",
    phaseId: "phase-2",
    order: 4,
    lessonNumber: "Lesson 2.01",
    title: "Clarity, Specificity, and Directness",
    description: "Prompt engineering with Claude starts with precision. Because Claude does not require obscure jailbreaks or ritualistic phrasing, the most effective prompts are direct, explicit, and unambiguous. This lesson teaches core principles of instruction design, boundary enforcement, and eliminating subjectivity.",
    difficulty: "Beginner",
    estimatedTime: "50 minutes",
    prerequisites: "Lesson 1.01, Lesson 1.02, Lesson 1.03",
    learningObjectives: [
      "Formulate prompts that state the exact task, context, constraints, and success criteria upfront",
      "Eliminate ambiguous directives like 'be concise' in favor of measurable specifications",
      "Apply negative constraints effectively without inducing unintended model fixation",
      "Differentiate between providing context versus cluttering the prompt with irrelevant tokens",
      "Structure complex task instructions using sequential ordering and explicit boundary delimiters",
    ],
    conceptMarkdown: `### The Directness Principle

Claude responds best to direct, straightforward instructions written in natural, professional English. Unlike earlier language models that required elaborate persona hacks ("Act as a 30-year veteran professor..."), Claude interprets direct imperative instructions with high fidelity.

When designing prompts for production systems, apply the **Directness Triad**:
1. **Explicit Objective:** State exactly what output should be produced in the very first sentence.
2. **Operational Constraints:** Define what the model must *never* do, what it must *always* do, and what fallback behavior to exhibit when data is missing.
3. **Verification Rubric:** Provide observable rules that a human or automated test can verify (e.g., word limits, bullet counts, required key names).

### Eliminating Ambiguity: Relative vs. Absolute Constraints

Ambiguous instructions create non-deterministic outputs across repeated API calls:
- *Ambiguous (Relative):* "Summarize this quickly and don't make it too long."
- *Unambiguous (Absolute):* "Provide a 3-bullet summary. Each bullet must contain exactly 1 sentence under 25 words focusing on financial metrics."`,
    productLandscape: [
      { surface: "Direct Prompts", whatItIs: "Imperative instructions with explicit parameters", typicalUser: "Backend engineers, API integrations" },
      { surface: "System Instructions", whatItIs: "Persistent persona and boundary rules", typicalUser: "Application operators" },
    ],
    scenario: {
      title: "Real-World Scenario: Clinical Telehealth Summaries",
      context: "A telehealth startup wants Claude to draft post-consultation summaries for patients based on doctor-patient audio transcripts. The team initially prompts: 'Write a nice, simple summary of this consultation for the patient.'",
      whatWentWrong: "Claude generated lengthy, jargon-heavy essays that alarmed patients and speculated on unmentioned diagnoses.",
      correctApproach: "The team rewrites the prompt with strict boundary conditions: specifying a 6th-grade reading level, limiting content to items spoken by the doctor under explicit headers, and mandating a hard refusal rule against suggesting unmentioned treatments.",
    },
    examples: [
      {
        title: "Vague and Open-Ended vs. Clear, Specific, and Measurable",
        bad: {
          label: "❌ Bad — Vague and Open-Ended",
          codeOrPrompt: "Review this loan application. Tell me if it looks risky and what we should do.",
          explanation: "Subjective criteria like 'risky' lead to inconsistent evaluations across calls.",
        },
        good: {
          label: "✅ Good — Clear, Specific, and Measurable",
          codeOrPrompt: `You are an underwriting assistant for Horizon Credit. Evaluate the attached loan application against the following 3 criteria:
1. Debt-to-Income (DTI) ratio must be <= 43%.
2. Minimum credit score must be >= 660.
3. Continuous employment history must be >= 24 months.

Output Format:
- Metric Assessment Table: [Criterion | Applicant Value | Threshold Met (Yes/No)]
- Recommendation: [APPROVE | REJECT | ESCALATE TO SENIOR UNDERWRITER]
Do not evaluate criteria outside these three rules.`,
          explanation: "Provides exact quantitative thresholds and observable output formats.",
        },
      },
    ],
    codeExample: {
      language: "python",
      filename: "underwriting_decision.py",
      code: `import anthropic

client = anthropic.Anthropic()

def extract_underwriting_decision(applicant_notes: str) -> str:
    system_prompt = """You are a mortgage compliance auditor.
Evaluate the user-provided applicant notes.
Output your findings in exactly this structure:
STATUS: [COMPLIANT | NON-COMPLIANT | INSUFFICIENT_DATA]
DEFECT_COUNT: [Integer]
SUMMARY: [One sentence explaining the primary defect or confirming compliance]

Constraints:
- Never assume missing income verification documents exist.
- Flag any undocumented gift funds exceeding $5,000 as NON-COMPLIANT."""

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=256,
        temperature=0.0,
        system=system_prompt,
        messages=[
            {
                "role": "user",
                "content": f"Applicant Notes:\\n{applicant_notes}"
            }
        ]
    )
    return response.content[0].text`,
      note: "Using temperature=0.0 guarantees deterministic evaluation against fixed audit rules.",
    },
    commonMistakes: [
      "Using conversational politeness instead of directness (wastes tokens and weakens imperatives).",
      "Leaving negative constraints without explicit fallback actions.",
      "Mixing task instructions with input data in one unseparated paragraph.",
      "Using subjective adjectives like 'brief' or 'concise' for length control.",
    ],
    bestPractices: [
      "Place primary task instructions at the beginning, followed by structural delimiters for data.",
      "Quantify length constraints in sentences, words, or structural items.",
      "Use uppercase tags or clear markdown headers (TASK:, CONSTRAINTS:, OUTPUT FORMAT:).",
      "Always provide a deterministic fallback instruction for missing data (e.g., 'Return null if not found').",
    ],
    keyTakeaways: [
      "Claude excels with direct, clear, imperative instructions rather than conversational filler.",
      "Ambiguity in prompts is the primary cause of hallucination and format drift in production.",
      "Concrete quantitative constraints replace subjective qualifiers like 'short' or 'detailed'.",
      "Separate instructions from context data using clear structural delimiters.",
      "Deterministic tasks require temperature=0.0 and explicit fallback definitions.",
    ],
    glossaryTerms: [
      { term: "Directness Triad", definition: "The framework combining explicit objective, operational constraints, and verification rubrics." },
      { term: "Prompt Ambiguity", definition: "Lack of precision in instructions that causes non-deterministic output formats." },
      { term: "Negative Constraint", definition: "A directive specifying behaviors or formatting patterns the model must avoid." },
      { term: "Instruction Delimiter", definition: "Formatting markers (XML tags, headers) that separate instructions from payload data." },
      { term: "Deterministic Fallback", definition: "An explicit instruction specifying what exact token or string to return when input data is incomplete." },
    ],
    relatedLessons: [
      { lessonNumber: "Lesson 1.02", title: "The Messages API: Anatomy of a Request", slug: "messages-api-anatomy" },
      { lessonNumber: "Lesson 2.02", title: "Few-Shot Prompting and Examples", slug: "few-shot-prompting-examples" },
      { lessonNumber: "Lesson 2.03", title: "Chain-of-Thought and Structured Output", slug: "chain-of-thought-structured-output" },
    ],
    exercises: [
      {
        id: "ex-2-01-a",
        title: "Exercise 2.01-A — Ambiguity Removal",
        description: "Rewrite a vague customer ticket triage prompt into an unambiguous, production-grade specification.",
        tasks: [
          "Define exact ticket categories: [BILLING, TECHNICAL, OUTAGE, ACCOUNT].",
          "Specify output structure with mandatory customer sentiment score (1-5).",
        ],
      },
    ],
    knowledgeChecks: [
      {
        id: "kc-2-01-1",
        question: "A developer wants Claude to classify user feedback into [BUG, FEATURE, PRAISE, OTHER]. Which prompt design adheres best to the Directness Principle?",
        options: [
          { id: "A", text: "Please read the following user feedback carefully and do your best to categorize it." },
          { id: "B", text: "Classify the input text into exactly one category from this list: [BUG, FEATURE, PRAISE, OTHER]. Output only the category name in uppercase. If unclear, output OTHER." },
          { id: "C", text: "You are a world-class product manager who has triaged millions of tickets." },
          { id: "D", text: "Categorize this text briefly and accurately without making any mistakes." },
        ],
        correctAnswer: "B",
        explanation: "Option B provides an explicit list, exact formatting rules, an unambiguous single-word constraint, and a deterministic fallback (OTHER).",
      },
    ],
  },

  /* ── Lesson 2.02 ───────────────────────────────────────────── */
  {
    id: "lesson-2-02",
    slug: "few-shot-prompting-examples",
    phaseId: "phase-2",
    order: 5,
    lessonNumber: "Lesson 2.02",
    title: "Few-Shot Prompting and Examples",
    description: "While zero-shot prompting relies entirely on natural language instructions, few-shot prompting provides Claude with concrete input-output demonstration pairs. This lesson explores in-context learning mechanics, curating balanced examples, XML tag formatting, and avoiding bias.",
    difficulty: "Intermediate",
    estimatedTime: "60 minutes",
    prerequisites: "Lesson 2.01, Lesson 1.02",
    learningObjectives: [
      "Explain the mechanism of in-context learning and how few-shot examples calibrate Claude's output distribution",
      "Curate balanced, high-quality demonstration pairs that represent target edge cases without overfitting",
      "Format few-shot demonstrations cleanly using XML tags (<examples>, <example>)",
      "Identify and mitigate common few-shot failure modes (label bias, majority bias, recency bias)",
      "Determine when few-shot prompting is superior to zero-shot instruction or fine-tuning",
    ],
    conceptMarkdown: `### In-Context Learning Mechanics

Few-shot prompting does not update model weights. Instead, it places examples directly into Claude's context window. Claude conditions its next-token probability distribution on the syntactic patterns, vocabulary, stylistic tone, and structural boundaries demonstrated in those examples.

### Anatomy of a Clean Few-Shot Prompt

Anthropic recommends wrapping few-shot examples in XML tags:

\`\`\`xml
<instructions>
Classify the sentiment of financial earnings commentary into: [BULLISH, BEARISH, NEUTRAL].
</instructions>

<examples>
  <example>
    <input>Operating margins expanded by 240 basis points year-over-year.</input>
    <output>BULLISH</output>
  </example>
  <example>
    <input>Supply chain bottlenecks increased inventory holding costs by 12%.</input>
    <output>BEARISH</output>
  </example>
</examples>
\`\`\``,
    scenario: {
      title: "Real-World Scenario: Legal Liability Cap Extraction",
      context: "A legal team wants Claude to extract indemnification liability caps from commercial contracts into JSON.",
      whatWentWrong: "In zero-shot mode, Claude wrote conversational paragraphs instead of extracting exact dollar formulas, mixing up aggregate caps with per-incident limits.",
      correctApproach: "The team incorporates three curated <example> blocks in the system prompt: one aggregate dollar cap, one 12-month multiplier, and one uncapped liability clause with fallback notation. Claude immediately matches the exact target schema.",
    },
    examples: [
      {
        title: "Imbalanced vs. Balanced Examples",
        bad: {
          label: "❌ Bad — Imbalanced Class Distribution",
          codeOrPrompt: "Examples: 4 positive reviews, 1 negative review.",
          explanation: "Skewed example counts create majority class bias, distorting neutral evaluations.",
        },
        good: {
          label: "✅ Good — Balanced Edge-Case Examples",
          codeOrPrompt: "<examples><example>Positive</example><example>Negative</example><example>Neutral / Edge-case</example></examples>",
          explanation: "Maintains balanced prior probability distribution across all target classes.",
        },
      },
    ],
    codeExample: {
      language: "python",
      filename: "syslog_parser.py",
      code: `import anthropic

client = anthropic.Anthropic()

FEW_SHOT_SYSTEM_PROMPT = """You are a cybersecurity log parser.
Extract security incident metadata from unstructured syslog entries.

<examples>
  <example>
    <log>Sep 14 03:12:01 srv-auth sshd[1249]: Failed password for invalid user admin from 192.168.1.105 port 55212 ssh2</log>
    <output>{"event_type": "AUTH_FAILURE", "source_ip": "192.168.1.105", "target_user": "admin", "severity": "MEDIUM"}</output>
  </example>
</examples>

Output only the JSON object corresponding to the provided log entry."""`,
      note: "XML-tagged demonstration pairs keep examples semantically isolated from live input.",
    },
    commonMistakes: [
      "Providing too many repetitive, homogenous examples instead of diverse edge cases.",
      "Introducing conflicting labels across different examples.",
      "Formatting examples differently from the live query format.",
    ],
    bestPractices: [
      "Aim for 3–5 highly diverse, curated demonstration pairs.",
      "Ensure equal representation across all classification categories.",
      "Wrap examples in XML tags (<examples>, <example>, <input>, <output>).",
    ],
    keyTakeaways: [
      "Few-shot prompting dynamically shapes next-token probability distributions via in-context learning.",
      "Balanced distributions prevent majority and recency biases.",
      "XML tags provide the clearest delimiter structure for few-shot demonstrations.",
    ],
    glossaryTerms: [
      { term: "Few-Shot Prompting", definition: "Providing one or more demonstration pairs within the prompt to guide model behavior." },
      { term: "In-Context Learning", definition: "The ability to learn patterns from prompt demonstrations without weight updates." },
      { term: "Majority Class Bias", definition: "Skew in model predictions toward the category appearing most frequently in examples." },
    ],
    relatedLessons: [],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 2.03 ───────────────────────────────────────────── */
  {
    id: "lesson-2-03",
    slug: "chain-of-thought-structured-output",
    phaseId: "phase-2",
    order: 6,
    lessonNumber: "Lesson 2.03",
    title: "Chain-of-Thought and Structured Output (XML Tags, JSON)",
    description: "Complex reasoning and production interoperability require structured execution. This lesson covers Chain-of-Thought (CoT) prompting to dramatically improve reasoning accuracy on multi-step problems, and structured output formatting using XML tags and JSON schemas.",
    difficulty: "Intermediate",
    estimatedTime: "70 minutes",
    prerequisites: "Lesson 2.01, Lesson 2.02",
    learningObjectives: [
      "Implement Chain-of-Thought (CoT) prompting techniques using <thinking> and <scratchpad> XML tags",
      "Explain why generating intermediate reasoning tokens improves accuracy on complex logic tasks",
      "Direct Claude to produce clean, valid, unencumbered JSON for programmatic API consumption",
      "Use XML tags to structure multi-part inputs and isolate reasoning from final answers",
    ],
    conceptMarkdown: `### Why Chain-of-Thought (CoT) Works

Because language models generate text token-by-token, their reasoning occurs *during* token generation. If a prompt forces Claude to output the final answer immediately in the very first token (e.g., \`{"verdict": "APPROVE"}\`), the model has zero computational tokens allocated for evaluating dependencies or performing calculations.

By instructing Claude to think step-by-step before producing its conclusion, we provide the model with "working memory" in the context window.`,
    scenario: {
      title: "Real-World Scenario: Anti-Money Laundering Structuring Detection",
      context: "A compliance team uses Claude to analyze bank wire transaction logs for suspicious structuring activity.",
      whatWentWrong: "Forced immediate boolean output caused Claude to miss subtle multi-account transaction patterns.",
      correctApproach: "Requiring a <scratchpad> section where Claude sums 24-hour transaction volumes per account before outputting final JSON increased structuring ring detection from 64% to 96%.",
    },
    examples: [],
    codeExample: {
      language: "python",
      filename: "contract_risk_analyzer.py",
      code: `import anthropic
import json
import re

client = anthropic.Anthropic()

def analyze_contract_risk(contract_text: str) -> dict:
    system_prompt = """You are a senior commercial contract analyst.
Structure your response into two distinct parts:
1. Inside <analysis> tags, write a step-by-step chain of thought.
2. Inside <output_json> tags, provide strictly valid JSON matching:
{"risk_score": 1-10, "risk_category": "LOW"|"MEDIUM"|"HIGH", "summary": "string"}"""

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        temperature=0.0,
        system=system_prompt,
        messages=[{"role": "user", "content": f"<contract_clause>{contract_text}</contract_clause>"}]
    )

    json_match = re.search(r"<output_json>(.*?)</output_json>", response.content[0].text, re.DOTALL)
    return json.loads(json_match.group(1).strip())`,
      note: "Extracting JSON from XML tags separates intermediate reasoning from machine-readable data.",
    },
    commonMistakes: [
      "Demanding raw JSON while forbidding all thinking on complex logic.",
      "Parsing raw response text without extracting structured tags.",
    ],
    bestPractices: [
      "Use <thinking> tags to give Claude working memory for reasoning.",
      "Extract JSON payload from XML tags programmatically before parsing.",
    ],
    keyTakeaways: [
      "Chain-of-Thought prompting provides intermediate tokens that serve as working memory.",
      "Isolating reasoning in <thinking> tags keeps downstream JSON clean.",
    ],
    glossaryTerms: [
      { term: "Chain-of-Thought (CoT)", definition: "Generating intermediate reasoning steps prior to producing the final answer." },
      { term: "Scratchpad / Thinking Tags", definition: "XML containers used to hold intermediate reasoning that is stripped before UI presentation." },
    ],
    relatedLessons: [],
    exercises: [],
    knowledgeChecks: [],
  },
];
