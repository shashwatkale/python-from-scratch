import { PHASES } from "@/lib/curriculum";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { LessonSidebar } from "@/components/LessonSidebar";
import { LessonMarkComplete } from "@/components/LessonMarkComplete";
import { CodeBlock } from "@/components/CodeBlock";

interface Props {
  params: Promise<{ phase: string; lesson: string }>;
}

export function generateStaticParams() {
  const out: { phase: string; lesson: string }[] = [];
  for (const phase of PHASES) {
    for (const lesson of phase.lessons) {
      out.push({ phase: phase.slug, lesson: lesson.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { phase: phaseSlug, lesson: lessonSlug } = await params;
  const phase = PHASES.find((p) => p.slug === phaseSlug);
  const lesson = phase?.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return {};
  return {
    title: lesson.title,
    description: lesson.description,
  };
}

/* ── Sample lesson content for Phase 00 lessons ─────────────── */
const LESSON_CONTENT: Record<string, { quote: string; estimatedTime: string; sections: { heading: string; body: string }[]; code?: { language: string; snippet: string } }> = {
  "what-is-python": {
    quote: "Python is an experiment in how much freedom programmers need. — Guido van Rossum",
    estimatedTime: "15 minutes",
    sections: [
      { heading: "What is Python?", body: "Python is a high-level, general-purpose programming language created by Guido van Rossum and first released in 1991. It is designed to be readable and simple — Python code looks closer to plain English than most other languages." },
      { heading: "Why Python?", body: "Python is versatile, readable, and has a massive ecosystem. It is used in web development, data analysis, automation, APIs, machine learning, and more. It is consistently one of the most in-demand languages professionally." },
      { heading: "Interpreted vs Compiled", body: "Python is an interpreted language. Rather than compiling to machine code before running, Python executes code line by line at runtime via an interpreter. This makes it faster to write and iterate on, at the cost of raw execution speed." },
    ],
    code: { language: "python", snippet: `# Python is readable\nprint("Hello, world!")\n\n# Variables are simple\nname = "Python"\nversion = 3\nprint(f"Welcome to {name} {version}")` },
  },
  "install-python": {
    quote: "A good setup is invisible. A bad setup is all you think about.",
    estimatedTime: "10 minutes",
    sections: [
      { heading: "Download Python", body: "Go to https://www.python.org/downloads/ and download the latest Python 3 release for your operating system. Always use Python 3 — Python 2 reached end-of-life in 2020." },
      { heading: "Windows Installation", body: "Run the installer. Before clicking Install Now, check 'Add Python to PATH'. This is the most common mistake beginners make — without it, Python won't be found in the terminal." },
      { heading: "Verify Installation", body: "Open a terminal and run: python --version\n\nYou should see: Python 3.12.x\n\nIf python doesn't work, try python3." },
    ],
    code: { language: "bash", snippet: `# Verify Python is installed\npython --version\n# Python 3.12.x\n\n# Verify pip is installed\npip --version` },
  },
  "vscode-setup": {
    quote: "Your editor is your workshop. Set it up well.",
    estimatedTime: "10 minutes",
    sections: [
      { heading: "Install VS Code", body: "Download VS Code from https://code.visualstudio.com/ — it is free, open-source, and has excellent Python support." },
      { heading: "Install the Python Extension", body: "Open VS Code, press Ctrl+Shift+X, search for 'Python' by Microsoft, and click Install. This gives you syntax highlighting, IntelliSense, debugging, and linting." },
      { heading: "Select Your Interpreter", body: "Press Ctrl+Shift+P, type 'Python: Select Interpreter', and choose the Python 3 version you installed. VS Code will use this for all Python operations." },
    ],
    code: { language: "json", snippet: `// .vscode/settings.json\n{\n  "editor.formatOnSave": true,\n  "editor.rulers": [88],\n  "python.defaultInterpreterPath": "\${workspaceFolder}/.venv/bin/python"\n}` },
  },
  "running-python": {
    quote: "The only way to learn a new programming language is by writing programs in it. — Dennis Ritchie",
    estimatedTime: "10 minutes",
    sections: [
      { heading: "Running a File", body: "Save a file as hello.py, then run it from the terminal with: python hello.py\n\nPython reads the file top to bottom and executes each statement in order." },
      { heading: "Command-Line Arguments", body: "You can pass arguments to a script using sys.argv. sys.argv[0] is always the script name. Additional arguments follow." },
    ],
    code: { language: "python", snippet: `import sys\n\nprint("Script:", sys.argv[0])\n\nif len(sys.argv) > 1:\n    print("Arguments:", sys.argv[1:])\nelse:\n    print("No arguments passed.")` },
  },
  "python-repl": {
    quote: "The REPL is your laboratory. Use it constantly.",
    estimatedTime: "10 minutes",
    sections: [
      { heading: "What is the REPL?", body: "REPL stands for Read-Eval-Print Loop. It is an interactive Python shell where you type one expression at a time and see the result immediately. Open it by running: python" },
      { heading: "Using the REPL", body: "The >>> prompt means Python is waiting for input. Type any expression and press Enter to see the result. Use it to test ideas, explore APIs, and learn syntax quickly." },
    ],
    code: { language: "python", snippet: `>>> 2 + 2\n4\n>>> "hello".upper()\n'HELLO'\n>>> [1, 2, 3][::-1]\n[3, 2, 1]\n>>> type(42)\n<class 'int'>` },
  },
  "virtual-environments": {
    quote: "Isolation is not a limitation — it is a feature.",
    estimatedTime: "15 minutes",
    sections: [
      { heading: "Why Virtual Environments?", body: "Different projects need different package versions. Without virtual environments, all packages install globally and versions conflict. A virtual environment is an isolated Python installation for a single project." },
      { heading: "Creating and Activating", body: "Create: python -m venv .venv\n\nActivate on macOS/Linux: source .venv/bin/activate\nActivate on Windows: .venv\\Scripts\\activate\n\nYour prompt changes to (.venv) when active." },
    ],
    code: { language: "bash", snippet: `# Create\npython -m venv .venv\n\n# Activate (macOS/Linux)\nsource .venv/bin/activate\n\n# Activate (Windows)\n.venv\\Scripts\\activate\n\n# Deactivate\ndeactivate` },
  },
  "pip": {
    quote: "pip is the gateway to Python's ecosystem of over 500,000 packages.",
    estimatedTime: "10 minutes",
    sections: [
      { heading: "What is pip?", body: "pip is the standard package manager for Python. It downloads packages from PyPI (Python Package Index) at https://pypi.org." },
      { heading: "Common Commands", body: "Install: pip install requests\nInstall specific version: pip install requests==2.31.0\nUpgrade: pip install --upgrade requests\nUninstall: pip uninstall requests\nList installed: pip list\nSave dependencies: pip freeze > requirements.txt" },
    ],
    code: { language: "bash", snippet: `# Install a package\npip install requests\n\n# Install from requirements.txt\npip install -r requirements.txt\n\n# Save current environment\npip freeze > requirements.txt` },
  },
  "first-python-program": {
    quote: "Every expert was once a beginner who wrote their first print().",
    estimatedTime: "20 minutes",
    sections: [
      { heading: "Your First Program", body: "A program is a sequence of instructions that Python executes from top to bottom. The simplest program is a single print() call." },
      { heading: "Getting User Input", body: "The input() function reads text from the user. It always returns a string. Use int() or float() to convert to numbers." },
      { heading: "f-strings", body: "f-strings let you embed variables directly inside strings. Prefix the string with f and wrap variables in curly braces: f\"Hello, {name}!\"" },
    ],
    code: { language: "python", snippet: `print("Welcome to Python From Scratch!")\n\nname = input("What is your name? ")\nage = int(input("How old are you? "))\n\nprint(f"Hello {name}!")\nprint(f"Next year you will be {age + 1}.")` },
  },
};

export default async function LessonPage({ params }: Props) {
  const { phase: phaseSlug, lesson: lessonSlug } = await params;
  const phase = PHASES.find((p) => p.slug === phaseSlug);
  if (!phase) notFound();

  const lessonIndex = phase.lessons.findIndex((l) => l.slug === lessonSlug);
  if (lessonIndex === -1) notFound();

  const lesson = phase.lessons[lessonIndex];
  const prevLesson = phase.lessons[lessonIndex - 1];
  const nextLesson = phase.lessons[lessonIndex + 1];
  const content = LESSON_CONTENT[lessonSlug];

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 3.25rem)" }}>
      {/* ── Left Sidebar ─────────────────────────────────────── */}
      <LessonSidebar phase={phase} currentLesson={lesson} />

      {/* ── Main Content ─────────────────────────────────────── */}
      <article
        style={{
          flex: 1,
          minWidth: 0,
          padding: "3rem 3rem 5rem",
          maxWidth: "800px",
          borderRight: "1px solid var(--color-border)",
        }}
      >
        {/* Breadcrumb */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-ink-3)",
            marginBottom: "2rem",
          }}
        >
          <Link href="/curriculum/" style={{ color: "var(--color-ink-3)", textDecoration: "none" }}>Curriculum</Link>
          {" / "}
          <Link href={`/curriculum/${phase.slug}/`} style={{ color: "var(--color-ink-3)", textDecoration: "none" }}>{phase.title}</Link>
          {" / "}
          <span style={{ color: "var(--color-ink)" }}>{lesson.title}</span>
        </p>

        {/* Lesson title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "var(--color-ink)",
            lineHeight: 1.05,
            marginBottom: "1rem",
          }}
        >
          {lesson.title}
        </h1>

        {/* Quote */}
        {content?.quote && (
          <blockquote
            style={{
              borderLeft: "3px solid var(--color-accent)",
              paddingLeft: "1.25rem",
              margin: "1.5rem 0 2rem",
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: "1rem",
              color: "var(--color-ink-3)",
              lineHeight: 1.7,
            }}
          >
            {content.quote}
          </blockquote>
        )}

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            padding: "1rem 1.25rem",
            backgroundColor: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            marginBottom: "2.5rem",
          }}
        >
          {[
            { label: "Type", value: "Learn" },
            { label: "Language", value: "Python" },
            { label: "Phase", value: `Phase ${String(phase.order).padStart(2, "0")}` },
            { label: "Time", value: content?.estimatedTime ?? "~15 min" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-3)", marginBottom: "0.2rem" }}>
                {label}
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 600, color: "var(--color-ink)" }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Tags */}
        {lesson.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2.5rem" }}>
            {lesson.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Content sections */}
        <div className="lesson-prose">
          {content ? (
            <>
              {content.sections.map((section) => (
                <div key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.body.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ))}

              {content.code && (
                <>
                  <h2>Example</h2>
                  <CodeBlock
                    code={content.code.snippet}
                    language={content.code.language}
                    showLineNumbers
                  />
                </>
              )}
            </>
          ) : (
            <div
              style={{
                border: "1px dashed var(--color-border-2)",
                padding: "3rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-ink-3)",
                  marginBottom: "0.5rem",
                }}
              >
                Full lesson content lives in
              </p>
              <code
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-accent-text)",
                  backgroundColor: "var(--color-surface-2)",
                  padding: "0.25rem 0.75rem",
                  border: "1px solid var(--color-border)",
                }}
              >
                curriculum/{phase.slug}/{lesson.order}-{lesson.slug}/README.md
              </code>
            </div>
          )}
        </div>

        {/* Mark complete */}
        <LessonMarkComplete
          phaseSlug={phase.slug}
          lessonSlug={lesson.slug}
        />

        {/* Lesson nav */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          {prevLesson ? (
            <Link
              href={`/curriculum/${phase.slug}/${prevLesson.slug}/`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--color-ink-3)",
                textDecoration: "none",
              }}
            >
              ← {prevLesson.title}
            </Link>
          ) : <span />}
          {nextLesson && (
            <Link
              href={`/curriculum/${phase.slug}/${nextLesson.slug}/`}
              className="btn-primary"
              style={{ textDecoration: "none" }}
            >
              {nextLesson.title} →
            </Link>
          )}
        </div>
      </article>

      {/* ── Right TOC ─────────────────────────────────────────── */}
      <aside className="lesson-toc">
        <div style={{ padding: "0 1rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-ink-3)",
              marginBottom: "1rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            On This Page
          </p>
          {content?.sections.map((s) => (
            <p
              key={s.heading}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--color-ink-3)",
                marginBottom: "0.6rem",
                lineHeight: 1.4,
                cursor: "default",
              }}
            >
              {s.heading}
            </p>
          ))}
          {content?.code && (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--color-ink-3)",
                marginBottom: "0.6rem",
              }}
            >
              Example
            </p>
          )}

          <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid var(--color-border)" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-ink-3)",
                marginBottom: "0.75rem",
              }}
            >
              Phase Progress
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--color-ink-3)",
                marginBottom: "0.4rem",
              }}
            >
              {lessonIndex + 1} / {phase.lessons.length}
            </p>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${Math.round(((lessonIndex + 1) / phase.lessons.length) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
