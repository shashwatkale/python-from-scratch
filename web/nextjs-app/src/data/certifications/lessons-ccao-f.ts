// src/data/certifications/lessons-ccao-f.ts — Complete In-Depth Lessons for CCAO-F (Associate Foundations)
import type { CertificationLessonDetail } from "@/types/certifications";
import { CLAUDE_ASSOCIATE_LESSONS } from "./claude-associate/lessons";

// Map the rich Phase 1 & 2 lessons into CertificationLessonDetail items
const BASE_ASSOCIATE_DETAILS: CertificationLessonDetail[] = CLAUDE_ASSOCIATE_LESSONS.map((l) => ({
  id: l.id,
  trackId: "claude-ccao-f",
  slug: l.slug,
  order: l.order,
  title: l.title,
  kind: "core" as const,
  leadParagraph: l.description,
  domains: ["core-claude-concepts", "api-interaction-model"],
  durationMin: parseInt(l.estimatedTime) || 45,
  learningObjectives: l.learningObjectives,
  keyDecisions: l.bestPractices,
  contentMarkdown: l.conceptMarkdown,
  codeSnippet: l.codeExample,
  productLandscape: l.productLandscape,
  scenarioData: l.scenario,
  examples: l.examples,
  practicalPromptExample: l.practicalPromptExample,
  commonMistakes: l.commonMistakes,
  bestPractices: l.bestPractices,
  keyTakeaways: l.keyTakeaways,
  glossaryTermsList: l.glossaryTerms,
  exercisesList: l.exercises,
  knowledgeChecksList: l.knowledgeChecks,
}));

export const CCAO_F_LESSONS: CertificationLessonDetail[] = [
  ...BASE_ASSOCIATE_DETAILS,
  {
    id: "ccao-01",
    trackId: "claude-ccao-f",
    slug: "00-certification-strategy",
    order: 7,
    title: "Certification Strategy: Decisions Over Definitions",
    kind: "orientation",
    leadParagraph: "A certification blueprint is a map of decisions a competent practitioner can defend. Treat it as a list of terms and you will study the least useful part of the exam.",
    domains: ["prompting-task-execution"],
    durationMin: 45,
    learningObjectives: [
      "Analyze the 7 CCAO-F domains and align study time proportionally to exam weights",
      "Classify exam blueprint objectives into Know (facts), Do (procedures), and Decide (tradeoffs)",
      "Evaluate business scenarios using constraint-first decision frameworks",
    ],
    keyDecisions: [
      "Focus 50%+ of study time on Output Evaluation (21%) and Solution Design (16%).",
      "Weight preparation strictly according to domain percentage points.",
    ],
    contentMarkdown: `### The CCAO-F Decision Framework

The CCAO-F exam tests practical operational judgment. You are evaluated on your ability to select the right Claude surface, formulate robust prompts, validate model outputs against source evidence, and enforce enterprise governance.

The single largest mistake candidates make is over-indexing on vocabulary definitions (e.g., memorizing what a token is) while ignoring operational tradeoffs (e.g., deciding when to escalate an ambiguous output to a human reviewer).`,
    scenarioData: {
      title: "Real-World Scenario: Healthcare Privacy Decisions",
      context: "A clinical director evaluates whether to use consumer chat or Amazon Bedrock for drafting patient summaries under HIPAA compliance.",
      whatWentWrong: "Using consumer accounts without a signed Business Associate Agreement (BAA) violates HIPAA.",
      correctApproach: "Deploy Claude via Amazon Bedrock or Google Vertex AI under enterprise VPC boundaries with mandatory clinician sign-off.",
    },
    codeSnippet: {
      language: "python",
      filename: "strategy_eval.py",
      code: `import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=256,
    temperature=0.0,
    system="You are an enterprise AI governance advisor.",
    messages=[{"role": "user", "content": "Evaluate HIPAA deployment requirements."}]
)
print(response.content[0].text)`,
    },
    commonMistakes: [
      "Memorizing feature lists rather than understanding operational tradeoffs.",
      "Overlooking human-in-the-loop validation requirements in regulated industries.",
    ],
    bestPractices: [
      "Dedicate study time proportionally to domain weights (Domain 2 is 21%).",
      "Read scenario questions looking for hard constraints (budget, latency, compliance).",
    ],
    keyTakeaways: [
      "CCAO-F tests practical scenario judgment, not coding.",
      "Constraints dictate the correct architectural choice.",
    ],
  },
  {
    id: "ccao-02",
    trackId: "claude-ccao-f",
    slug: "01-claude-product-and-model-landscape",
    order: 8,
    title: "Choose the Smallest Surface That Can Carry the Work",
    kind: "core",
    leadParagraph: "Product selection is architecture at knowledge-work scale. Choose between individual chat, Claude Projects, APIs, and Claude Code.",
    domains: ["product-model-selection"],
    durationMin: 45,
    learningObjectives: [
      "Differentiate between claude.ai, Claude Projects, Anthropic API, and Cloud Partners",
      "Match organizational collaboration requirements to Claude Projects",
    ],
    keyDecisions: [
      "Use Claude Projects for non-technical team collaboration with shared reference files.",
      "Use Cloud Partners (Bedrock/Vertex) when enterprise compliance mandates VPC data isolation.",
    ],
    contentMarkdown: `### Enterprise Surface Mapping

- **claude.ai:** Individual knowledge work and exploratory drafting.
- **Claude Projects:** Team workspaces with shared persistent files (Project Knowledge) and unified system prompts.
- **Anthropic API:** Automated backend integrations and programmatic data pipelines.
- **Cloud Partners (Bedrock / Vertex AI):** Enterprise VPC deployments governed by corporate IAM and BAAs.`,
    scenarioData: {
      title: "Real-World Scenario: The Legal Team Workspace",
      context: "A 10-person paralegal team needs access to 15 standard lease templates for drafting amendments without writing code.",
      whatWentWrong: "Considering building an expensive custom web app.",
      correctApproach: "Set up a Claude Project on a Team plan with the 15 templates in Project Knowledge.",
    },
  },
  {
    id: "ccao-03",
    trackId: "claude-ccao-f",
    slug: "02-model-selection-and-token-economics",
    order: 9,
    title: "Spend Capability Where Failure Is Expensive",
    kind: "core",
    leadParagraph: "Model selection is an allocation problem across quality, latency, context, and cost.",
    domains: ["product-model-selection"],
    durationMin: 45,
    learningObjectives: [
      "Allocate Haiku, Sonnet, and Opus across business workflows",
      "Design tiered routing pipelines to reduce API operational costs by 80%+",
    ],
    keyDecisions: [
      "Use Haiku for high-volume simple classification; Sonnet for nuanced reasoning and document synthesis.",
    ],
    contentMarkdown: `### Model Tier Economics

- **Claude Haiku:** Fast, lowest-cost tier for high-volume triage and classification.
- **Claude Sonnet:** The optimal enterprise tier for coding, reasoning, and document analysis.
- **Claude Opus:** Deepest reasoning for complex open-ended analysis.`,
    codeSnippet: {
      language: "python",
      filename: "routing.py",
      code: `# Tiered router example using Haiku for triage and Sonnet for complex resolution`,
    },
  },
  {
    id: "ccao-04",
    trackId: "claude-ccao-f",
    slug: "03-prompting-and-task-decomposition",
    order: 10,
    title: "Turn a Request Into a Testable Contract",
    kind: "core",
    leadParagraph: "A strong prompt makes success observable before generation begins. Use XML delimiters and quantitative boundaries.",
    domains: ["prompting-task-execution"],
    durationMin: 50,
    learningObjectives: [
      "Decompose complex multi-step workflows into sequential prompt stages",
      "Isolate untrusted data using XML tags to prevent indirect prompt injection",
    ],
    keyDecisions: [
      "Enforce exact bullet and word limits to prevent length drift.",
    ],
    contentMarkdown: `### Task Decomposition & Directness

Decomposing multi-step knowledge work into sequential phases (Extraction -> Synthesis -> Formatting) eliminates skipped steps and hallucinations.`,
  },
  {
    id: "ccao-05",
    trackId: "claude-ccao-f",
    slug: "04-context-knowledge-memory-and-caching",
    order: 11,
    title: "Put Each Fact in the Right Kind of Context",
    kind: "core",
    leadParagraph: "Context is temporary attention. Knowledge is maintained evidence. Memory is continuity. Caching is reuse.",
    domains: ["configuration-knowledge-management"],
    durationMin: 45,
    learningObjectives: [
      "Differentiate between Context, Knowledge, Memory, and Prompt Caching",
      "Apply Prompt Caching (cache_control) to reduce repeated long-context costs by 90%",
    ],
    keyDecisions: [
      "Place static reference text at the beginning of the prompt with cache_control.",
    ],
    contentMarkdown: `### Knowledge Management Architecture

- **Prompt Context:** Ephemeral attention for the single request.
- **Project Knowledge:** Maintained document files in team workspaces.
- **Prompt Caching:** Server-side caching of static prompt prefixes, slashing input token costs.`,
  },
  {
    id: "ccao-06",
    trackId: "claude-ccao-f",
    slug: "05-output-evaluation-and-validation",
    order: 12,
    title: "Validate the Claim, Not the Confidence",
    kind: "core",
    leadParagraph: "Fluency is presentation quality. Validation is evidence that the output can safely do its job.",
    domains: ["output-evaluation-validation"],
    durationMin: 60,
    learningObjectives: [
      "Audit claim-evidence entailment against provided reference documents",
      "Verify mathematical assertions using deterministic Python/spreadsheet scripts",
      "Design Human-in-the-Loop review gates for high-stakes business deliverables",
    ],
    keyDecisions: [
      "Always verify arithmetic calculations using deterministic code.",
      "Universal qualifiers ('all', 'never') indicate potential claim overreach.",
    ],
    contentMarkdown: `### Claim-Evidence Entailment Auditing

Language models generate text with high grammatical confidence regardless of factual accuracy. Enterprise output evaluation requires line-by-line verification against source documents.`,
  },
  {
    id: "ccao-07",
    trackId: "claude-ccao-f",
    slug: "06-governance-safety-and-responsible-use",
    order: 13,
    title: "Governance, Safety, and Responsible Use",
    kind: "core",
    leadParagraph: "Understand Constitutional AI, commercial data privacy policies, and PII data minimization.",
    domains: ["governance-risk-responsible-use"],
    durationMin: 50,
    learningObjectives: [
      "Explain how Constitutional AI trains internalized safety boundaries",
      "Apply data minimization by masking PII before API transmission",
      "Enforce human approval gates on high-consequence business actions",
    ],
    keyDecisions: [
      "Commercial API and Team/Enterprise customer data is not used for model training.",
      "Never delegate autonomous authority for consequential legal or financial commitments.",
    ],
    contentMarkdown: `### Enterprise AI Governance

Anthropic's commercial terms commit to not training models on customer data submitted via the API or Team/Enterprise plans by default. Data minimization requires stripping PII before prompt ingestion.`,
  },
  {
    id: "ccao-08",
    trackId: "claude-ccao-f",
    slug: "07-workflow-design-and-human-handoffs",
    order: 14,
    title: "Workflow Design and Human Handoffs",
    kind: "core",
    leadParagraph: "Architect collaborative human-AI business workflows with threshold-based escalation triggers.",
    domains: ["workflow-integration-solution-design"],
    durationMin: 55,
    learningObjectives: [
      "Design end-to-end human-AI collaborative workflows",
      "Establish automated escalation triggers for complex edge cases",
      "Capture human corrections to continuously refine system prompts",
    ],
    keyDecisions: [
      "Automate routine extraction while routing high-risk edge cases to human specialists.",
    ],
    contentMarkdown: `### Human-AI Collaborative Loops

Workflows succeed when routine drafting is accelerated by Claude and edge cases are routed to human specialists with rich structured context.`,
  },
  {
    id: "ccao-09",
    trackId: "claude-ccao-f",
    slug: "29-associate-workflow-capstone",
    order: 15,
    title: "Associate Workflow Capstone & Troubleshooting",
    kind: "capstone",
    leadParagraph: "Synthesize all 7 CCAO-F domains into an end-to-end production workflow with systematic troubleshooting.",
    domains: ["troubleshooting-optimization"],
    durationMin: 60,
    learningObjectives: [
      "Diagnose root causes of prompt underperformance and token truncation",
      "Synthesize all domain principles into a complete business capstone",
    ],
    keyDecisions: [
      "Always check stop_reason == 'end_turn' before accepting model outputs downstream.",
    ],
    contentMarkdown: `### The Associate Diagnostic Protocol

1. **Check Stop Reason:** Was the output truncated by \`max_tokens\`?
2. **Audit Constraints:** Are formatting and length rules quantitative and unambiguous?
3. **Verify Context:** Does the provided reference text actually contain the required facts?`,
  },
];
