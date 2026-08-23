// src/data/certifications/lessons-ccdv-f.ts — Complete In-Depth Lessons for CCDV-F (Developer Foundations)
import type { CertificationLessonDetail } from "@/types/certifications";

export const CCDV_F_LESSONS: CertificationLessonDetail[] = [
  /* ── Lesson 1 ────────────────────────────────────────────────── */
  {
    id: "ccdv-01",
    trackId: "claude-ccdv-f",
    slug: "00-certification-strategy",
    order: 1,
    title: "Study the Decisions, Not the Vocabulary",
    kind: "orientation",
    leadParagraph: "A certification blueprint is a map of decisions a competent practitioner can defend. Treat it as a list of terms and you will study the least useful part of the exam.",
    domains: ["applications-integration"],
    durationMin: 25,
    learningObjectives: [
      "Convert the CCDV-F blueprint (8 domains) into a prioritized, decision-focused study plan",
      "Understand the highest weighted domains: Applications & Integration (33.1%), Model Selection (16.8%), and Agents & Workflows (14.7%)",
      "Structure an evidence ledger connecting API code patterns to official Anthropic documentation",
    ],
    keyDecisions: [
      "Focus 65%+ of preparation time on the top 3 domains: Applications, Model Optimization, and Agents.",
      "Always design systems where the client application owns state, verification, and boundary controls.",
    ],
    contentMarkdown: `### The Developer Mindset: Decisions Over Definitions

The Developer Foundations exam evaluates whether you can build, secure, and debug real-world applications using the Messages API, Tool Calling, MCP servers, and the Claude Agent SDK.

Engineers often memorize SDK parameter names without understanding operational failure modes. When an API call fails with a 429 rate limit or an agent enters an infinite loop, memorized parameters do not solve the problem—defensive system design does.

### The 8 Blueprint Domains in Production

1. **Applications & Integration (33.1%)**: Messages API lifecycle, streaming, thinking tokens, prompt caching, batch API.
2. **Model Selection & Optimization (16.8%)**: Haiku vs Sonnet vs Opus tradeoffs, token budget estimation, temperature/top_p sampling.
3. **Agents & Workflows (14.7%)**: Custom agent loops, Claude Agent SDK, subagent hierarchies, deterministic hooks.
4. **Prompt & Context Engineering (11.0%)**: XML structure, system prompts, few-shot examples, dynamic context assembly.
5. **Tools & MCPs (10.6%)**: Tool definitions, tool_use/tool_result state protocol, Model Context Protocol servers.
6. **Security & Safety (8.1%)**: Indirect prompt injection defenses, XML boundaries, least-privilege tool execution.
7. **Claude Code (3.1%)**: CLAUDE.md hierarchy, slash commands, headless CI/CD execution.
8. **Eval, Testing & Debugging (2.6%)**: Golden datasets, error taxonomy, automated regression assertions.`,
    scenarioData: {
      title: "Real-World Scenario: The Over-Engineered Autonomous Agent",
      context: "A developer builds an autonomous customer refund agent with open-ended while-loops. On day 2, a customer crafts a prompt that traps the agent in a 50-step loop issuing multiple small refunds.",
      whatWentWrong: "The developer assumed the LLM would self-regulate loop termination without hard client-side iteration caps or deterministic database checks.",
      correctApproach: "Wrap all agent loops in strict client-side iteration ceilings (`max_steps=5`), require human authorization for disbursements > $50, and enforce idempotency keys on payment tools.",
    },
    codeSnippet: {
      language: "python",
      filename: "defensive_agent_loop.py",
      code: `import anthropic

client = anthropic.Anthropic()

def execute_bounded_loop(user_query: str, max_steps: int = 5) -> str:
    messages = [{"role": "user", "content": user_query}]

    for step in range(max_steps):
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            temperature=0.0,
            system="You are a customer service assistant. Use tools when needed.",
            messages=messages
        )

        if response.stop_reason == "tool_use":
            # Process tool execution defensively
            messages.append({"role": "assistant", "content": response.content})
            # Simulated tool result
            messages.append({
                "role": "user",
                "content": [{"type": "tool_result", "tool_use_id": "call_123", "content": "STATUS_OK"}]
            })
        else:
            return response.content[0].text

    raise RuntimeError("Agent loop exceeded maximum step limit.")`,
    },
    commonMistakes: [
      "Memorizing SDK parameters instead of understanding state-machine lifecycles.",
      "Allowing agents to run without hard iteration limits.",
      "Failing to catch HTTP 429 rate limit exceptions with exponential backoff.",
    ],
    bestPractices: [
      "Prioritize Applications & Integration (33.1%) and Model Selection (16.8%) during preparation.",
      "Enforce deterministic validation rules outside the model.",
      "Always set temperature=0.0 for structured data extraction and tool routing.",
    ],
    keyTakeaways: [
      "The CCDV-F exam tests production decision-making, not trivia.",
      "The Messages API is stateless; your application is the state machine.",
      "Client applications must own tool execution, security guardrails, and termination criteria.",
    ],
    glossaryTerms: [
      { term: "Agentic Loop", definition: "A client-side execution loop where Claude proposes tool calls and the application executes them iteratively." },
      { term: "Statelessness", definition: "The API architecture where each HTTP request contains the entire required context." },
    ],
    exercises: [
      {
        id: "ccdv-ex-1a",
        title: "Exercise 1.1 — Blueprint Priority Mapping",
        description: "Calculate study time allocation across the 8 CCDV-F domains for a 30-hour preparation plan.",
        tasks: ["Allocate hours proportionally to domain weights.", "Identify hands-on coding requirements for Domain 2."],
      },
    ],
    knowledgeChecks: [
      {
        id: "ccdv-kc-1a",
        question: "Which domain accounts for the single largest portion of questions on the CCDV-F exam?",
        options: [
          { id: "A", text: "Security and Safety (8.1%)" },
          { id: "B", text: "Applications and Integration (33.1%)" },
          { id: "C", text: "Claude Code (3.1%)" },
          { id: "D", text: "Tools and MCPs (10.6%)" },
        ],
        correctAnswer: "B",
        explanation: "Applications and Integration represents 33.1% of the exam, covering Messages API lifecycles, streaming, caching, and structured outputs.",
      },
    ],
  },

  /* ── Lesson 2 ────────────────────────────────────────────────── */
  {
    id: "ccdv-02",
    trackId: "claude-ccdv-f",
    slug: "08-messages-api-and-application-lifecycle",
    order: 2,
    title: "The Messages API Is a State Machine",
    kind: "core",
    leadParagraph: "The Messages API is stateless; your application is the state machine. Learn how to manage message arrays, tool_use blocks, and streaming chunks cleanly.",
    domains: ["applications-integration"],
    durationMin: 35,
    learningObjectives: [
      "Implement the complete Messages API lifecycle with Python's anthropic SDK",
      "Manage message history arrays without duplicating system prompts or leaking context",
      "Handle tool_use stop_reason and correlate tool_result messages correctly",
    ],
    keyDecisions: [
      "The client is responsible for storing and resending conversation history on every API call.",
      "When Claude returns a tool_use block, the client must preserve the assistant message and respond with a user message containing matching tool_result blocks.",
    ],
    codeSnippet: {
      language: "python",
      filename: "messages_api_loop.py",
      code: `import anthropic

client = anthropic.Anthropic()

messages = [
    {"role": "user", "content": "What is the status of server cluster A?"}
]

# 1. Send request with tool definitions
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=[{
        "name": "get_cluster_status",
        "description": "Fetch real-time cluster health metrics",
        "input_schema": {
            "type": "object",
            "properties": {"cluster_id": {"type": "string"}},
            "required": ["cluster_id"]
        }
    }],
    messages=messages
)

# 2. Check for tool invocation
if response.stop_reason == "tool_use":
    messages.append({"role": "assistant", "content": response.content})
    tool_block = next(b for b in response.content if b.type == "tool_use")
    result = {"status": "healthy", "cpu_percent": 24.5}

    # 3. Respond with tool_result block in user role
    messages.append({
        "role": "user",
        "content": [{
            "type": "tool_result",
            "tool_use_id": tool_block.id,
            "content": str(result)
        }]
    })

    # 4. Final synthesis
    final_res = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=messages
    )
    print(final_res.content[0].text)`,
    },
    contentMarkdown: `### State Preservation Invariants

The Messages API requires strict alternation between \`user\` and \`assistant\` roles.

1. **Never discard the assistant message containing the \`tool_use\` block:** The conversation history must show that Claude initiated the tool call before receiving the result.
2. **The \`tool_use_id\` in the \`tool_result\` block must match exactly:** Claude uses this ID to correlate the output with the specific function invocation.
3. **System prompts must be passed in the top-level \`system\` parameter:** Never inject persistent operator rules inside the \`messages\` list.`,
    scenarioData: {
      title: "Real-World Scenario: The Missing Tool ID Bug",
      context: "A developer builds a customer lookup tool. When returning the database record, the developer passes a plain text user message: 'Here is the user record: Active'.",
      whatWentWrong: "The API returned an HTTP 400 error because an active tool_use block was not answered with a corresponding tool_result block referencing the tool_use_id.",
      correctApproach: "Always return structured tool results using `{'type': 'tool_result', 'tool_use_id': tool_block.id, 'content': json_str}`.",
    },
    commonMistakes: [
      "Sending consecutive user messages without alternating roles.",
      "Omitting the `tool_use_id` from `tool_result` content blocks.",
      "Forgetting to check `stop_reason == 'max_tokens'` on truncated responses.",
    ],
    bestPractices: [
      "Use streaming (`client.messages.stream`) for responsive user interfaces.",
      "Implement exponential backoff on `anthropic.RateLimitError` and `anthropic.APIStatusError`.",
    ],
    keyTakeaways: [
      "Every tool invocation requires a 4-step handshake: Request -> tool_use -> tool_result -> Final response.",
      "The `system` parameter applies globally and sits outside the conversation turns.",
    ],
    glossaryTerms: [
      { term: "tool_use", definition: "An API response content block where Claude requests the execution of a named function." },
      { term: "tool_result", definition: "A user message content block providing the execution outcome back to Claude." },
    ],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 3 ────────────────────────────────────────────────── */
  {
    id: "ccdv-03",
    trackId: "claude-ccdv-f",
    slug: "09-structured-output-and-defensive-parsing",
    order: 3,
    title: "Structured Output Is an Untrusted Contract",
    kind: "core",
    leadParagraph: "LLMs generate strings, not types. Learn how to force guaranteed JSON schemas using Pydantic, tool calling constraints, and defensive validation.",
    domains: ["applications-integration", "prompt-context-engineering"],
    durationMin: 30,
    learningObjectives: [
      "Extract structured Pydantic models using tool-calling constraints (`tool_choice: {'type': 'tool', 'name': '...'}`)",
      "Validate partial streamed JSON defensively without breaking runtime integrity",
      "Implement automated retry repair loops when schema validation fails",
    ],
    keyDecisions: [
      "Use forced tool calling (`tool_choice`) for structured extraction rather than asking for raw JSON in text.",
      "Always validate parsed JSON with strict Pydantic schemas before writing to production databases.",
    ],
    codeSnippet: {
      language: "python",
      filename: "structured_extraction.py",
      code: `from pydantic import BaseModel, Field
import anthropic

class InvoiceExtraction(BaseModel):
    vendor: str = Field(description="Name of the billing company")
    amount_usd: float = Field(gt=0, description="Total amount in USD")
    tax_id: str | None = Field(default=None)

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=[{
        "name": "record_invoice",
        "description": "Record validated invoice data",
        "input_schema": InvoiceExtraction.model_json_schema()
    }],
    tool_choice={"type": "tool", "name": "record_invoice"},
    messages=[{"role": "user", "content": "Invoice from Acme Corp for $1,250.00. Tax ID: AC-991"}]
)

tool_call = response.content[0]
invoice = InvoiceExtraction.model_validate(tool_call.input)
print(f"Validated: {invoice.vendor} -> \${invoice.amount_usd}")`,
    },
    contentMarkdown: `### Forcing Valid Schemas with tool_choice

Prompting a model with *"Respond in JSON"* leaves formatting up to chance. Claude may include conversational markdown fences (\`\`\`json) or conversational preamble.

By defining a tool with your target JSON Schema and setting \`tool_choice={"type": "tool", "name": "..."}\`, you guarantee that Claude's output will be pre-parsed into the \`tool_call.input\` dictionary, ready for immediate Pydantic validation.`,
    scenarioData: {
      title: "Real-World Scenario: The Broken Pipeline Preamble",
      context: "A data pipeline crashes with JSONDecodeError when processing Claude's output because the model included 'Here is the JSON you requested:' before the JSON object.",
      whatWentWrong: "The application called `json.loads(response.content[0].text)` directly on unstructured text.",
      correctApproach: "Use `tool_choice` for structured extraction, or wrap JSON in `<json_data>` tags and extract with regex before parsing.",
    },
    commonMistakes: [
      "Trusting LLM-generated JSON without schema validation.",
      "Parsing raw response text without stripping markdown backticks.",
    ],
    bestPractices: [
      "Use Pydantic `model_validate()` on `tool_call.input`.",
      "Set `temperature=0.0` for all structured extraction pipelines.",
    ],
    keyTakeaways: [
      "tool_choice provides the highest reliability for structured data extraction.",
      "Always validate parsed dictionaries with Pydantic or Zod schemas before writing to databases.",
    ],
    glossaryTerms: [
      { term: "tool_choice", definition: "An API parameter that forces Claude to invoke a specific tool or any tool." },
    ],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 4 ────────────────────────────────────────────────── */
  {
    id: "ccdv-04",
    trackId: "claude-ccdv-f",
    slug: "04-context-knowledge-memory-and-caching",
    order: 4,
    title: "Put Each Fact in the Right Kind of Context",
    kind: "core",
    leadParagraph: "Prompt Caching reduces latency by up to 80% and cost by up to 90%. Learn the exact rules for cache breakpoints and 5-minute TTL invalidation.",
    domains: ["applications-integration", "prompt-context-engineering"],
    durationMin: 35,
    learningObjectives: [
      "Configure `cache_control: {'type': 'ephemeral'}` on large system prompts and document corpora",
      "Understand prefix matching rules: cache hits require exact 1:1 token matches from the beginning of the prompt",
      "Calculate 5-minute TTL cache economics and write cost models",
    ],
    keyDecisions: [
      "Place large static documents at the top of the message list with a cache breakpoint.",
      "Keep dynamic user queries and frequent edits strictly after the cache breakpoint.",
    ],
    codeSnippet: {
      language: "python",
      filename: "prompt_caching.py",
      code: `import anthropic

client = anthropic.Anthropic()

# Load a massive 100k-token repository codebase or policy manual
with open("massive_codebase.txt") as f:
    codebase_corpus = f.read()

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": f"You are a senior code reviewer for this codebase:\\n{codebase_corpus}",
            "cache_control": {"type": "ephemeral"} # Cache this 100k token block
        }
    ],
    messages=[
        {"role": "user", "content": "How is authentication handled in api/auth.py?"}
    ]
)

print(f"Cache Creation Tokens: {response.usage.cache_creation_input_tokens}")
print(f"Cache Read Tokens:     {response.usage.cache_read_input_tokens}")`,
    },
    contentMarkdown: `### Prompt Caching Architecture & Economics

Prompt Caching allows caching up to 4 distinct breakpoints in a single request. Cached tokens are refreshed for 5 minutes each time a cache read occurs.

1. **Prefix Match Invariant:** Any single token change before a cache breakpoint invalidates the entire cache for that block and all subsequent blocks.
2. **Economic Benefit:** Cached tokens cost 90% less than base input tokens ($0.30/M vs $3.00/M on Sonnet).
3. **Minimum Size:** Caching requires at least 1,024 tokens on Sonnet (2,048 tokens on Haiku).`,
    scenarioData: {
      title: "Real-World Scenario: Inadvertent Cache Invalidation",
      context: "A legal search platform places a dynamic `user_id` and `current_timestamp` on line 1 of the prompt before a 150,000-token legal corpus. Cache hit rate is 0%.",
      whatWentWrong: "Dynamic timestamps at the prompt prefix change on every call, breaking exact prefix matching and invalidating the cache.",
      correctApproach: "Move static legal documents to the top with `cache_control`, and pass dynamic timestamps at the end of the prompt.",
    },
    commonMistakes: [
      "Placing dynamic text before static cached blocks.",
      "Attempting to cache text blocks smaller than the minimum token threshold.",
    ],
    bestPractices: [
      "Order prompts: Static System Prompt -> Static Reference Documents (Cached) -> Dynamic Conversation History.",
    ],
    keyTakeaways: [
      "Prompt caching requires exact 1:1 prefix matching.",
      "Caches have a 5-minute TTL that refreshes on each successful read.",
    ],
    glossaryTerms: [
      { term: "cache_control", definition: "A metadata property in content blocks marking prompt cache breakpoints." },
    ],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 5 ────────────────────────────────────────────────── */
  {
    id: "ccdv-05",
    trackId: "claude-ccdv-f",
    slug: "10-tool-use-and-agentic-loops",
    order: 5,
    title: "A Tool Loop Is Controlled Delegation",
    kind: "core",
    leadParagraph: "Build bounded, deterministic agent loops that prevent infinite recursion, handle tool exceptions gracefully, and enforce maximum iteration limits.",
    domains: ["agents-workflows", "tools-mcps"],
    durationMin: 40,
    learningObjectives: [
      "Author robust while-loops with hard iteration ceilings (e.g. `max_steps=10`)",
      "Catch tool runtime errors and return informative error strings back to Claude rather than crashing the process",
      "Handle multi-tool calls in a single assistant turn",
    ],
    keyDecisions: [
      "Never allow unconstrained agent loops without a maximum iteration guard.",
      "Always return structured error feedback in tool_result so the model can self-correct.",
    ],
    codeSnippet: {
      language: "python",
      filename: "robust_tool_loop.py",
      code: `import anthropic
import json

client = anthropic.Anthropic()

def execute_agent(task: str, max_iterations: int = 5) -> str:
    messages = [{"role": "user", "content": task}]

    for iteration in range(max_iterations):
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            tools=[{"name": "fetch_user", "input_schema": {"type": "object", "properties": {"id": {"type": "string"}}}}],
            messages=messages
        )

        if response.stop_reason == "tool_use":
            messages.append({"role": "assistant", "content": response.content})
            tool_block = next(b for b in response.content if b.type == "tool_use")
            # Safe tool execution with error handling
            try:
                result = {"name": "Alice", "role": "Admin"}
            except Exception as e:
                result = {"error": str(e)}

            messages.append({
                "role": "user",
                "content": [{"type": "tool_result", "tool_use_id": tool_block.id, "content": json.dumps(result)}]
            })
        else:
            return response.content[0].text

    return "Error: Maximum iteration limit reached."`,
    },
    contentMarkdown: `### Designing Resilient Agent Loops

An autonomous agent loop must be guarded against three failure modes:
1. **Infinite Retry Storms:** Claude repeatedly calling a failing tool with identical arguments.
2. **Unhanded Tool Exceptions:** Backend exceptions crashing the orchestration process.
3. **Context Explosion:** Unbounded accumulation of tool outputs exceeding the context window.`,
    scenarioData: {
      title: "Real-World Scenario: The Recursive Search Storm",
      context: "An agent searches a database for 'User 1234'. The DB returns 404. Claude modifies capitalization and retries 100 times in 2 minutes.",
      whatWentWrong: "No cycle detection or iteration limit was configured in the Python while-loop.",
      correctApproach: "Implement `max_iterations=5` and return explicit error messages: 'User not found. Do not retry lookup.'",
    },
    commonMistakes: [
      "Using `while True:` without an iteration counter.",
      "Crashing the process on tool exceptions instead of returning `is_error=True`.",
    ],
    bestPractices: [
      "Limit agent loop depth to 5–10 steps.",
      "Log full trajectory traces for post-mortem debugging.",
    ],
    keyTakeaways: [
      "The client application is in control of whether the agent continues executing.",
      "Informative error messages enable Claude to course-correct dynamically.",
    ],
    glossaryTerms: [
      { term: "Iteration Ceiling", definition: "A hard numerical cap on the number of tool-execution cycles an agent can perform." },
    ],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 6 ────────────────────────────────────────────────── */
  {
    id: "ccdv-06",
    trackId: "claude-ccdv-f",
    slug: "11-mcp-server-design-and-integration",
    order: 6,
    title: "MCP Separates Capability From Host",
    kind: "core",
    leadParagraph: "Build narrow, secure Model Context Protocol (MCP) servers that advertise tools and resources through explicit trust boundaries.",
    domains: ["tools-mcps", "applications-integration"],
    durationMin: 45,
    learningObjectives: [
      "Implement standardized MCP servers exposing Resources, Tools, and Prompts over stdio and SSE",
      "Configure client connection settings in `claude_desktop_config.json` and Claude Code",
      "Enforce least-privilege security perimeters on MCP database and shell tools",
    ],
    keyDecisions: [
      "Expose passive data as MCP Resources and active functions as MCP Tools.",
      "Run MCP servers with dedicated, restricted credentials rather than administrator privileges.",
    ],
    codeSnippet: {
      language: "python",
      filename: "mcp_server_example.py",
      code: `# Conceptual FastMCP Server Definition
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("CustomerService")

@mcp.tool()
def query_ticket_status(ticket_id: str) -> str:
    """Retrieve current status and priority of a customer support ticket."""
    # Read-only database query
    return f"Ticket {ticket_id}: Status=OPEN, Priority=HIGH"

if __name__ == "__main__":
    mcp.run()`,
    },
    contentMarkdown: `### Model Context Protocol (MCP) Primitives

1. **Resources:** Read-only data sources (database schemas, file trees, API documentation).
2. **Tools:** Executable functions callable by the model with side effects.
3. **Prompts:** Pre-engineered prompt workflows published by the server.`,
    scenarioData: {
      title: "Real-World Scenario: The Superuser MCP Vulnerability",
      context: "A team attaches an MCP server connecting Claude to PostgreSQL using the `postgres` superuser role.",
      whatWentWrong: "A prompt injection tricked Claude into emitting `DROP TABLE users;` via the MCP tool.",
      correctApproach: "Connect MCP servers using dedicated read-only database credentials (`GRANT SELECT ON ...`).",
    },
    commonMistakes: [
      "Running MCP servers with administrator credentials.",
      "Omitting parameter descriptions in `@mcp.tool()` definitions.",
    ],
    bestPractices: [
      "Use `stdio` transport for local processes and `SSE` for remote microservices.",
      "Enforce strict input validation on all MCP tool parameters.",
    ],
    keyTakeaways: [
      "MCP standardizes tool and resource sharing across Claude applications.",
      "Resources provide passive context; Tools perform active execution.",
    ],
    glossaryTerms: [
      { term: "FastMCP", definition: "A Python framework for building Model Context Protocol servers rapidly." },
    ],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 7 ────────────────────────────────────────────────── */
  {
    id: "ccdv-07",
    trackId: "claude-ccdv-f",
    slug: "12-claude-agent-sdk-and-hooks",
    order: 7,
    title: "The Agent SDK Is a Harness, Not Permission",
    kind: "core",
    leadParagraph: "An agent becomes dependable when the loop, tools, context, hooks, and termination policy are explicit enough to inspect and constrain.",
    domains: ["agents-workflows", "security-safety"],
    durationMin: 40,
    learningObjectives: [
      "Implement `before_tool_call` and `after_tool_call` middleware hooks",
      "Enforce human approval gates on destructive actions",
      "Manage persistent multi-turn agent state",
    ],
    keyDecisions: [
      "Enforce security and compliance boundaries in deterministic hooks rather than relying on prompt text.",
    ],
    contentMarkdown: `### Agent Middleware & Governance Hooks

Production agents require middleware hooks to inspect arguments, enforce rate limits, and sanitize outputs.

- **Pre-execution hooks (\`before_tool_call\`):** Validate parameters, check permissions, and require human approval for high-risk actions.
- **Post-execution hooks (\`after_tool_call\`):** Sanitize sensitive customer PII from tool outputs before injecting into Claude's context.`,
    scenarioData: {
      title: "Real-World Scenario: Intercepting Destructive Actions",
      context: "An IT agent has access to `delete_s3_bucket`. A developer adds a pre-execution hook that halts the agent and sends a Slack approval request to the engineering lead before executing.",
    },
    codeSnippet: {
      language: "python",
      filename: "agent_hook.py",
      code: `def before_tool_call(tool_name: str, arguments: dict) -> bool:
    if tool_name == "delete_s3_bucket":
        # Block execution and require explicit confirmation
        print(f"SECURITY ALERT: {tool_name} requires human approval.")
        return False
    return True`,
    },
    commonMistakes: ["Relying on system prompts to prevent destructive tool calls."],
    bestPractices: ["Enforce authorization in pre-execution hooks outside the model."],
    keyTakeaways: ["Hooks provide deterministic guardrails around probabilistic agent loops."],
    glossaryTerms: [{ term: "Pre-execution Hook", definition: "Middleware function running before a tool executes." }],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 8 ────────────────────────────────────────────────── */
  {
    id: "ccdv-08",
    trackId: "claude-ccdv-f",
    slug: "13-application-security-and-secrets",
    order: 8,
    title: "Application Security and Secrets Management",
    kind: "core",
    leadParagraph: "Defend production Claude applications against direct prompt injection, indirect context poisoning, and secret leakage.",
    domains: ["security-safety"],
    durationMin: 35,
    learningObjectives: [
      "Manage Anthropic API keys securely using environment variables and vault secret managers",
      "Mitigate direct and indirect prompt injection using structural XML delimiters",
      "Sanitize tool parameters to prevent SQL injection and remote code execution",
    ],
    keyDecisions: [
      "Never expose API keys in client-side frontend code.",
      "Treat all retrieved external data as untrusted payload within XML tags.",
    ],
    contentMarkdown: `### Defense-in-Depth for Claude Applications

1. **Secret Management:** Never hardcode \`ANTHROPIC_API_KEY\` in code or client-side bundles.
2. **Indirect Prompt Injection:** Isolate untrusted web and user data inside XML tags (\`<user_input>\`).
3. **Tool Parameter Sanitization:** Use parameterized database queries; never string-concatenate tool arguments into raw SQL statements.`,
    scenarioData: {
      title: "Real-World Scenario: The Public API Key Incident",
      context: "A developer commits a React app containing `apiKey: 'sk-ant-...'` to a public GitHub repo, incurring $5,000 in unauthorized usage in 4 hours.",
    },
    codeSnippet: {
      language: "python",
      filename: "secure_api_init.py",
      code: `import os
import anthropic

# Retrieve key securely from environment
api_key = os.environ.get("ANTHROPIC_API_KEY")
if not api_key:
    raise ValueError("ANTHROPIC_API_KEY environment variable missing.")

client = anthropic.Anthropic(api_key=api_key)`,
    },
    commonMistakes: ["Hardcoding API keys in frontend bundles."],
    bestPractices: ["Use secret vaults (AWS Secrets Manager / Vault)."],
    keyTakeaways: ["Security must be enforced at the infrastructure, middleware, and prompt levels."],
    glossaryTerms: [{ term: "Prompt Injection", definition: "Manipulating an LLM through adversarial input text." }],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 9 ────────────────────────────────────────────────── */
  {
    id: "ccdv-09",
    trackId: "claude-ccdv-f",
    slug: "14-evals-testing-debugging-and-observability",
    order: 9,
    title: "Evals, Testing, and Observability",
    kind: "core",
    leadParagraph: "Implement continuous evaluation harnesses, golden test datasets, and OpenTelemetry distributed tracing.",
    domains: ["eval-testing-debugging"],
    durationMin: 30,
    learningObjectives: [
      "Build automated eval pipelines asserting schema compliance on golden test datasets",
      "Trace distributed multi-agent calls using OpenTelemetry metadata",
    ],
    keyDecisions: [
      "Gate all prompt modifications behind automated CI/CD eval benchmarks.",
    ],
    contentMarkdown: `### Automated CI/CD Regression Testing

Every prompt modification must be evaluated against a versioned golden dataset of test cases to measure regression rates on edge cases.`,
    scenarioData: {
      title: "Real-World Scenario: Catching Regressions in CI",
      context: "A developer shortens an extraction prompt. The automated CI eval test suite catches a 12% accuracy drop on date parsing before deployment.",
    },
    codeSnippet: {
      language: "python",
      filename: "eval_runner.py",
      code: `def test_prompt_regression():
    # Execute eval suite against golden dataset
    assert run_eval_benchmark() >= 0.95, "Accuracy dropped below 95% threshold"`,
    },
    commonMistakes: ["Testing prompts manually on 1 sample input."],
    bestPractices: ["Maintain versioned golden datasets in source control."],
    keyTakeaways: ["Automated evaluation benchmarks prevent silent production regressions."],
    glossaryTerms: [{ term: "Golden Dataset", definition: "A curated collection of verified test inputs and expected outputs." }],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 10 ───────────────────────────────────────────────── */
  {
    id: "ccdv-10",
    trackId: "claude-ccdv-f",
    slug: "15-claude-code-for-development-teams",
    order: 10,
    title: "Claude Code for Development Teams",
    kind: "core",
    leadParagraph: "Supercharge developer productivity with Claude Code: managing `CLAUDE.md`, multi-file refactoring, and headless CI/CD test automation.",
    domains: ["claude-code"],
    durationMin: 30,
    learningObjectives: [
      "Configure repository-level `CLAUDE.md` guidelines",
      "Execute automated test-driven development loops in the terminal",
    ],
    keyDecisions: [
      "Use `CLAUDE.md` to define repository build, test, and style conventions.",
    ],
    contentMarkdown: `### Repository Guidelines with CLAUDE.md

Claude Code reads \`CLAUDE.md\` in the project root to learn project commands:
- Build & test commands (\`pytest\`, \`npm test\`)
- Code style and architecture guidelines
- Safety rules and forbidden file edits`,
    scenarioData: {
      title: "Real-World Scenario: Standardizing Team Workflows",
      context: "A team adds a `CLAUDE.md` file specifying `pytest -m unit`. Claude Code automatically uses that command during all refactoring tasks.",
    },
    codeSnippet: {
      language: "yaml",
      code: `# Project Guidelines
## Commands
- Run tests: \`pytest tests/unit\`
- Lint: \`ruff check .\`

## Style
- Always use Python type hints.`,
    },
    commonMistakes: ["Omitting `CLAUDE.md` in complex repositories."],
    bestPractices: ["Keep `CLAUDE.md` concise and focused on executable commands."],
    keyTakeaways: ["`CLAUDE.md` aligns the agent with team development standards."],
    glossaryTerms: [{ term: "CLAUDE.md", definition: "The configuration markdown file read by Claude Code in project repositories." }],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 11 ───────────────────────────────────────────────── */
  {
    id: "ccdv-11",
    trackId: "claude-ccdv-f",
    slug: "01-claude-product-and-model-landscape",
    order: 11,
    title: "Choose the Smallest Surface That Can Carry the Work",
    kind: "core",
    leadParagraph: "Product selection is architecture at knowledge-work scale. Choose between chat, Projects, API, and Claude Code.",
    domains: ["model-selection-optimization", "applications-integration"],
    durationMin: 25,
    learningObjectives: ["Map developer use cases across Claude product surfaces."],
    keyDecisions: ["Use APIs for scalable backend automation; use Claude Code for local engineering."],
    contentMarkdown: `### Surface Selection for Developers

Developers interact primarily through the Messages API and Claude Code.`,
    scenarioData: { title: "Scenario: Surface Mapping", context: "Choosing between CLI agents and backend API endpoints." },
    codeSnippet: { language: "python", filename: "surface.py", code: "# API interaction" },
    commonMistakes: [],
    bestPractices: [],
    keyTakeaways: ["Select the surface matching the automation scale."],
    glossaryTerms: [],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 12 ───────────────────────────────────────────────── */
  {
    id: "ccdv-12",
    trackId: "claude-ccdv-f",
    slug: "02-model-selection-and-token-economics",
    order: 12,
    title: "Spend Capability Where Failure Is Expensive",
    kind: "core",
    leadParagraph: "Model selection is an allocation problem across quality, latency, context, and cost.",
    domains: ["model-selection-optimization"],
    durationMin: 30,
    learningObjectives: ["Balance Haiku, Sonnet, and Opus across production pipelines."],
    keyDecisions: ["Use Haiku for high-speed triage; Sonnet for complex reasoning."],
    contentMarkdown: `### Model Tier Economics

- **Haiku:** Lowest latency and cost for high-volume classification.
- **Sonnet:** Gold standard for coding, reasoning, and agents.
- **Opus:** Maximum depth for open-ended strategic analysis.`,
    scenarioData: { title: "Scenario: Tiered Routing", context: "Routing 1M requests per day." },
    codeSnippet: { language: "python", filename: "tiered_routing.py", code: "# Tiered routing example" },
    commonMistakes: [],
    bestPractices: [],
    keyTakeaways: ["Tiered routing cuts operational API costs by 70%+."],
    glossaryTerms: [],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 13 ───────────────────────────────────────────────── */
  {
    id: "ccdv-13",
    trackId: "claude-ccdv-f",
    slug: "03-prompting-and-task-decomposition",
    order: 13,
    title: "Turn a Request Into a Testable Contract",
    kind: "core",
    leadParagraph: "A strong prompt makes success observable before generation begins. Use XML tags and quantitative bounds.",
    domains: ["prompt-context-engineering"],
    durationMin: 30,
    learningObjectives: ["Author prompt contracts with measurable success criteria."],
    keyDecisions: ["Enforce quantitative boundaries instead of subjective qualifiers."],
    contentMarkdown: `### The Directness Principle in Code

Eliminate prompt ambiguity using structural XML delimiters and explicit fallbacks.`,
    scenarioData: { title: "Scenario: Contract Extraction", context: "Extracting legal terms reliably." },
    codeSnippet: { language: "python", filename: "prompt_contract.py", code: "# Prompt contract" },
    commonMistakes: [],
    bestPractices: [],
    keyTakeaways: ["Observable criteria eliminate format drift."],
    glossaryTerms: [],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 14 ───────────────────────────────────────────────── */
  {
    id: "ccdv-14",
    trackId: "claude-ccdv-f",
    slug: "05-output-evaluation-and-validation",
    order: 14,
    title: "Validate the Claim, Not the Confidence",
    kind: "core",
    leadParagraph: "Fluency is presentation quality. Validation is evidence that the output can safely do its job.",
    domains: ["prompt-context-engineering", "eval-testing-debugging"],
    durationMin: 25,
    learningObjectives: ["Verify claim-evidence entailment and validate numbers programmatically."],
    keyDecisions: ["Recalculate mathematical assertions using deterministic code."],
    contentMarkdown: `### Evidence Entailment

Never assume model confidence implies factual truth. Verify citations and numbers in code.`,
    scenarioData: { title: "Scenario: Arithmetic Check", context: "Checking financial calculations in Python." },
    codeSnippet: { language: "python", filename: "validate_math.py", code: "# Validate math" },
    commonMistakes: [],
    bestPractices: [],
    keyTakeaways: ["Use code for arithmetic; use LLMs for semantic reasoning."],
    glossaryTerms: [],
    exercises: [],
    knowledgeChecks: [],
  },

  /* ── Lesson 15 ───────────────────────────────────────────────── */
  {
    id: "ccdv-15",
    trackId: "claude-ccdv-f",
    slug: "30-developer-application-capstone",
    order: 15,
    title: "Developer Application Capstone",
    kind: "capstone",
    leadParagraph: "Synthesize tool calling, MCP servers, prompt caching, and defensive parsing into an end-to-end production AI service.",
    domains: ["applications-integration", "agents-workflows", "security-safety"],
    durationMin: 60,
    learningObjectives: ["Build and defend a production-grade autonomous customer resolution service."],
    keyDecisions: ["Integrate defense-in-depth security, caching, and bounded loops."],
    contentMarkdown: `### The Complete Developer Architecture

The capstone brings together all 8 CCDV-F domains into a production-ready application.`,
    scenarioData: { title: "Capstone Scenario", context: "End-to-end customer resolution agent." },
    codeSnippet: { language: "python", filename: "capstone.py", code: "# Full capstone implementation" },
    commonMistakes: [],
    bestPractices: [],
    keyTakeaways: ["A production AI service requires robust error handling, caching, and security."],
    glossaryTerms: [],
    exercises: [],
    knowledgeChecks: [],
  },
];
