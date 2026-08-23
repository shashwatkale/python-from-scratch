// src/data/certifications/lessons-ccao-f.ts — Complete In-Depth Lessons for CCAO-F (Associate Foundations)
import type { CertificationLessonDetail } from "@/types/certifications";

export const CCAO_F_LESSONS: CertificationLessonDetail[] = [
  {
    id: "ccao-01",
    trackId: "claude-ccao-f",
    slug: "00-study-the-decisions-not-the-vocabulary",
    order: 1,
    title: "Study the Decisions, Not the Vocabulary",
    kind: "orientation",
    leadParagraph: "A certification blueprint is a map of decisions a competent practitioner can defend. Treat it as a list of terms and you will study the least useful part of the exam.",
    domains: ["prompting-task-execution"],
    durationMin: 75,
    learningObjectives: [
      "Convert a certification blueprint into a weighted study plan.",
      "Separate stable engineering principles from product details that can change.",
      "Build an evidence ledger that records decisions, reasons, and official sources.",
      "Practice scenario judgment without using dumps or reconstructing live questions.",
      "Define a readiness gate based on domain performance, not one flattering mock score.",
    ],
    keyDecisions: [
      "Focus study on decision boundaries: what Claude should do vs what human review must verify.",
      "Weight preparation strictly according to domain percentage points.",
      "Categorize knowledge into Know (facts), Do (procedures), and Decide (tradeoffs under constraints).",
    ],
    contentMarkdown: `
# 01 · Study the Decisions, Not the Vocabulary

A certification blueprint is a map of decisions a competent practitioner can defend. Treat it as a list of terms and you will study the least useful part of the exam.

### The Problem
Maya has spent two weeks memorizing feature names. She can define a Project, a context window, and a connector. Then she meets a scenario.

A team wants to summarize a confidential weekly report. The source file changes every Friday. The final summary goes to executives. The options include pasting the report into a new chat, adding it to an old Project, connecting the live source, and building a custom application. Every option can produce a summary. Only one fits the update cadence, review requirement, data policy, and maintenance burden.

Maya searches her memory for the definition of a connector. The scenario is asking for a decision.

That distinction controls this entire curriculum. The official guides describe tasks such as selecting a product, validating an output, managing knowledge, and escalating risk. A definition can support those tasks. It cannot perform them for you.

The exams also use a scaled score. A practice percentage is not an official score, and no community mock can predict the result. Your job is to build enough judgment that unfamiliar scenarios still feel structured.

---

### The Concept: The blueprint is a job model
Each domain represents part of the work expected from the target role. The weight estimates how much of the scored exam is drawn from that domain. Weight is not difficulty. A small domain can still contain difficult questions. Weight tells you how to allocate practice.

For Associate Foundations, the largest domain is output evaluation and validation (21%). That is a signal. The role is not merely someone who can ask Claude for an answer. It is someone who can decide whether the answer is fit to use.

Use three labels while reading every objective:
- **Know**: facts or vocabulary you must recall.
- **Do**: a procedure you must perform.
- **Decide**: a tradeoff you must resolve from constraints.

Most weak study plans overinvest in Know. Most scenario questions concentrate on Do and Decide.

---

### Stable principles and changeable facts
Some knowledge changes slowly:
- Sensitive data needs an approved handling path.
- A claim needs evidence before it enters a consequential deliverable.
- Persistent instructions should be concise, scoped, and maintained.
- Irreversible actions deserve stronger review than reversible drafts.
- A larger model is wasteful when a smaller model meets the measured requirement.

Other knowledge can change over time:
- Model names, prices, and context limits.
- Plan eligibility and feature availability.
- Product navigation and interface labels.
- Connector capabilities and approval behavior.
- Certification fees, policies, and access rules.

The second group must carry a verification date and an official source. Before scheduling an exam, open the current official guide and certification FAQ again.

---

### The scenario decision stack
When several answers sound reasonable, inspect the scenario in this order:
1. **State the required outcome**
2. **Extract constraints** (latency, cost, privacy, freshness)
3. **Classify risk and reversibility**
4. **Choose the smallest sufficient capability**
5. **Add evidence and review**
6. **Check maintenance and ownership**

The smallest sufficient capability matters. If a direct chat produces a one-time draft safely, a managed Project may be unnecessary. If a source changes every day, a pasted copy may be too stale. If the workflow performs a consequential action, convenience does not outrank approval.

---

### Wrong answers are usually locally correct
Good distractors are rarely nonsense. They solve the wrong problem, ignore one constraint, or add unnecessary machinery:
- **Capability without fit**: The feature can do the task, but not under the stated privacy or freshness requirement.
- **Maximum power by default**: The largest model is selected without a measured need.
- **Prompt-only repair**: A prompt is rewritten when the failure actually comes from stale knowledge or a missing source.
- **Automation without ownership**: A workflow has no reviewer, escalation route, or maintenance owner.
- **Policy after execution**: Sensitive material is processed first and classified later.
- **One successful example**: A single polished output is treated as evidence of reliability.

---

### Build an evidence ledger
Your notes should record decisions, not copied paragraphs. Use one entry per objective:

\`\`\`json
{
  "objective": "Choose when human verification is required",
  "decision_rule": "Require independent review when an error could create material harm or the claim lacks authoritative evidence",
  "counterexample": "A low-risk brainstorming list can be reviewed by the author during normal editing",
  "artifact": "claim-evidence matrix",
  "official_source": "URL and verification date",
  "confidence": "practiced"
}
\`\`\`

The counterexample is essential. If you cannot name when a rule should not apply, you probably memorized a slogan rather than learned a boundary.

---

### Build It
Create a seven-row Associate Foundations ledger, one row per domain. For each row, write:
1. The domain weight.
2. Two decisions you expect to make.
3. One artifact that proves you can perform the work.
4. One failure mode you want to recognize quickly.
5. One official source.
6. Your current confidence: *unseen, understood, practiced, or timed*.

Use this formula for study allocation:
\`domain hours = total hours × domain weight × weakness multiplier\`

---

### Use a cadence, not a cram pile
Use this four-stage cadence:
- **Orient**: Read the current guide, take one untouched diagnostic, and map every miss to an objective and a confidence level.
- **Build**: Complete the required lessons and learner-owned artifacts. Run the tests rather than treating code, policy, or architecture examples as prose.
- **Transfer**: Solve new scenarios, defend why each plausible alternative loses, and repair weak domains using the error log.
- **Simulate**: Take fresh timed sets under published closed-book rules, review correct guesses, and stop adding new material immediately before assessment.

---

### Exam Decision Patterns
- Prefer the option that satisfies all explicit constraints over the option with the most features.
- Treat words such as *current, confidential, recurring, approved, auditable,* and *executive* as architectural inputs.
- Separate content quality from workflow quality. A good answer produced through an unapproved data path is still the wrong solution.
- Prefer a maintained source over a copied snapshot when freshness matters.
- Add human review where consequence, uncertainty, or irreversibility is high.
- Verify product facts against current official material instead of trusting a remembered interface.

---

### Common Traps
- Using live-question dumps. They violate program rules and train recognition instead of judgment.
- Treating a longer answer as more likely to be correct.
- Memorizing exact prices without a date.
- Equating the biggest model with the safest choice.
- Taking many low-quality mocks instead of studying explanations.
- Counting a familiar scenario as proof you can handle an unfamiliar one.
- Confusing a raw practice percentage with the official scaled score.
`,
    interactiveLabPrompt:
      "Run the local scenario scorer, then change one confidence label and observe the weighted study order. Reconcile domain weights and allocated hours to confirm your plan.",
  },
  {
    id: "ccao-02",
    trackId: "claude-ccao-f",
    slug: "01-choose-the-smallest-surface",
    order: 2,
    title: "Choose the Smallest Surface That Can Carry the Work",
    kind: "core",
    leadParagraph: "Product selection is architecture at knowledge-work scale. The wrong surface can make correct output stale, unreviewable, or needlessly expensive.",
    domains: ["product-model-selection"],
    durationMin: 30,
    learningObjectives: [
      "Select between Claude Chat, Claude Projects, Artifacts, and API automations.",
      "Understand context isolation between separate project folders and conversations.",
    ],
    keyDecisions: [
      "Use Claude Projects when persistent reference documents need to be shared across multiple team prompts.",
      "Use Artifacts when the output is a standalone code file, SVG, HTML document, or markdown memo that requires separate iterative editing.",
    ],
    contentMarkdown: `
# 02 · Choose the Smallest Surface That Can Carry the Work

Selecting the right Claude interface prevents workflow friction and ensures team artifacts remain maintainable.

### Decision Matrix for Knowledge Workers
- **Claude Chat**: One-off exploration, quick drafting, unstructured questions.
- **Claude Projects**: Team-wide knowledge repositories, recurring weekly report drafting, maintaining style guides.
- **Artifacts**: Dedicated code snippets, interactive UI prototypes, standalone policy memos.
`,
    interactiveLabPrompt: "Determine which surface is optimal for a legal team reviewing supplier contracts against a 200-page standard clause library.",
  },
  {
    id: "ccao-03",
    trackId: "claude-ccao-f",
    slug: "02-spend-capability-where-failure-is-expensive",
    order: 3,
    title: "Spend Capability Where Failure Is Expensive",
    kind: "core",
    leadParagraph: "Model selection is not a ranking exercise. It is an allocation problem across quality, latency, context, and cost.",
    domains: ["product-model-selection", "troubleshooting-optimization"],
    durationMin: 30,
    learningObjectives: [
      "Select between Claude 3.5 Haiku, Claude 3.5 Sonnet, and Claude 3 Opus for knowledge workflows.",
      "Balance turnaround speed with analytical depth.",
    ],
    keyDecisions: [
      "Use Haiku for high-volume email triage, classification, and first-pass extraction.",
      "Use Sonnet for nuanced contract analysis, complex synthesis, and technical drafting.",
      "Use Opus for deep multi-perspective philosophical or high-stakes policy synthesis.",
    ],
    contentMarkdown: `
# 03 · Spend Capability Where Failure Is Expensive

Always choose the fastest and most efficient model that safely accomplishes the task.
`,
  },
  {
    id: "ccao-04",
    trackId: "claude-ccao-f",
    slug: "03-turn-a-request-into-a-testable-contract",
    order: 4,
    title: "Turn a Request Into a Testable Contract",
    kind: "core",
    leadParagraph: "A strong prompt does not merely describe what to write. It makes success observable before generation begins.",
    domains: ["prompting-task-execution", "troubleshooting-optimization"],
    durationMin: 35,
    learningObjectives: [
      "Draft prompts with explicit audience definitions, output constraints, and negative examples.",
      "Decompose vague business requests into observable verification criteria.",
    ],
    keyDecisions: [
      "Always define output format, length limits, forbidden phrases, and required sections.",
    ],
    contentMarkdown: `
# 04 · Turn a Request Into a Testable Contract

Transforming vague requests into testable specifications is the fundamental skill of prompt engineering.
`,
  },
  {
    id: "ccao-05",
    trackId: "claude-ccao-f",
    slug: "04-put-each-fact-in-the-right-kind-of-context",
    order: 5,
    title: "Put Each Fact in the Right Kind of Context",
    kind: "core",
    leadParagraph: "Context is temporary attention. Knowledge is maintained evidence. Memory is continuity. Caching is reuse. Mixing them creates confident stale answers.",
    domains: ["configuration-knowledge-management", "product-model-selection"],
    durationMin: 30,
    learningObjectives: [
      "Manage Project knowledge uploads effectively without exceeding context budgets.",
      "Differentiate between temporary chat context and permanent Project documents.",
    ],
    keyDecisions: [
      "Keep Project knowledge curated: remove outdated policy versions to prevent conflicting answers.",
    ],
    contentMarkdown: `
# 05 · Put Each Fact in the Right Kind of Context

Uploading multiple conflicting versions of a company handbook causes the model to generate contradictory guidance. Always prune stale documentation.
`,
  },
  {
    id: "ccao-06",
    trackId: "claude-ccao-f",
    slug: "05-validate-the-claim-not-the-confidence",
    order: 6,
    title: "Validate the Claim, Not the Confidence",
    kind: "core",
    leadParagraph: "Fluency is presentation quality. Validation is evidence that the output can safely do its job.",
    domains: ["output-evaluation-validation", "troubleshooting-optimization"],
    durationMin: 35,
    learningObjectives: [
      "Fact-check model claims against authoritative source documents.",
      "Identify subtle hallucinations, overreach, and omitted caveats.",
    ],
    keyDecisions: [
      "Mandate bracketed source citations [Document Name, Page X] for all factual assertions.",
    ],
    contentMarkdown: `
# 06 · Validate the Claim, Not the Confidence

Never evaluate an answer solely by how articulate or convincing it sounds. Always cross-check citations against uploaded files.
`,
  },
  {
    id: "ccao-07",
    trackId: "claude-ccao-f",
    slug: "06-put-authority-around-capability",
    order: 7,
    title: "Put Authority Around Capability",
    kind: "core",
    leadParagraph: "A model can produce an answer without having permission to see the data, make the decision, or take the action.",
    domains: ["governance-risk-responsible-use"],
    durationMin: 30,
    learningObjectives: [
      "Enforce data privacy, PII protection, and organizational AI acceptable use policies.",
      "Identify high-risk use cases requiring mandatory human escalation.",
    ],
    keyDecisions: [
      "Never paste un-redacted customer SSNs, credit cards, or internal proprietary secrets into public web chats.",
    ],
    contentMarkdown: `
# 07 · Put Authority Around Capability

Establish clear organizational guardrails regarding which data categories can be processed by AI and where human sign-off is non-negotiable.
`,
  },
  {
    id: "ccao-08",
    trackId: "claude-ccao-f",
    slug: "07-design-the-handoff-before-the-automation",
    order: 8,
    title: "Design the Handoff Before the Automation",
    kind: "core",
    leadParagraph: "A workflow is not complete when Claude finishes. It is complete when the next person can verify, decide, act, and recover.",
    domains: ["workflow-integration-solution-design", "output-evaluation-validation"],
    durationMin: 35,
    learningObjectives: [
      "Design seamless handoffs between AI drafting and human expert review.",
      "Structure reviewable summary formats that make verification effortless.",
    ],
    keyDecisions: [
      "Format outputs with clear 'Assumptions Made' and 'Recommended Next Actions' sections.",
    ],
    contentMarkdown: `
# 08 · Design the Handoff Before the Automation

The output of an AI task is the input to a human colleague's workday. Design the handoff so verification takes seconds rather than hours.
`,
  },
  {
    id: "ccao-09",
    trackId: "claude-ccao-f",
    slug: "29-associate-workflow-capstone",
    order: 9,
    title: "Ship a Week of Work, Not a Perfect Prompt",
    kind: "capstone",
    leadParagraph: "Your capstone is a governed decision workflow: sources in, claims checked, human authority preserved, and state handed off.",
    domains: [
      "prompting-task-execution",
      "output-evaluation-validation",
      "product-model-selection",
      "workflow-integration-solution-design",
      "configuration-knowledge-management",
      "governance-risk-responsible-use",
      "troubleshooting-optimization",
    ],
    durationMin: 60,
    learningObjectives: [
      "Synthesize all 7 CCAO-F domains into an end-to-end enterprise workflow.",
      "Deliver an executive briefing with verified citations and audit trail.",
    ],
    keyDecisions: [
      "A complete enterprise solution integrates knowledge setup, prompt execution, claim verification, and governance review.",
    ],
    contentMarkdown: `
# 09 · Capstone: Ship a Week of Work, Not a Perfect Prompt

Assemble your complete knowledge workflow project:
1. Curate and upload 3 reference policy documents into a Claude Project.
2. Formulate a structured prompt template producing an executive report.
3. Validate every cited claim against the source texts.
4. Document the human approval escalation policy.
`,
    interactiveLabPrompt: "Complete the capstone project checklist and verify that all 7 blueprint domains are satisfied.",
  },
];
