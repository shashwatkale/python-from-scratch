// src/data/glossary/cli.ts
import type { GlossaryTerm } from "@/types";

export const CLI_TERMS: GlossaryTerm[] = [
  {
    slug: "argparse",
    term: "argparse",
    category: "cli",
    categoryLabel: "CLI & Automation",
    difficulty: "intermediate",
    definition: "The standard library module for writing user-friendly command-line interfaces with automatic `--help` generation and argument parsing.",
    explanation: "Parses `sys.argv` and converts positional arguments and flags into structured attributes.",
    example: "import argparse\n\nparser = argparse.ArgumentParser(description=\"Sample CLI\")\nparser.add_argument(\"--name\", default=\"Dev\")\nargs = parser.parse_args([\"--name\", \"Ada\"])\nprint(f\"Hello, {args.name}!\")",
    output: "Hello, Ada!",
    whyItMatters: "Standard built-in tool for building command-line utilities and scripts without external dependencies.",
    relatedTerms: ["cli", "argument", "flag"],
    relatedLessons: [{ title: "Building CLI Tools with argparse", phaseSlug: "17-automation", lessonSlug: "argparse" }],
    tags: ["cli", "stdlib", "automation"],
  },
  {
    slug: "click-typer",
    term: "Click & Typer",
    category: "cli",
    categoryLabel: "CLI & Automation",
    difficulty: "intermediate",
    definition: "Popular modern Python libraries for building beautiful command-line interfaces. Typer builds on Click using Python type hints.",
    explanation: "Allows building complex CLI apps with nested subcommands, autocompletion, and colored terminal output with minimal decorator syntax.",
    example: "# Typer example:\n# import typer\n# def main(name: str = \"Dev\"): ...\n# if __name__ == '__main__': typer.run(main)",
    output: "",
    whyItMatters: "Greatly accelerates CLI developer tooling development compared to raw argument parsing.",
    relatedTerms: ["argparse", "type-hint"],
    relatedLessons: [{ title: "Modern CLI Tools", phaseSlug: "17-automation", lessonSlug: "cli-tools" }],
    tags: ["cli", "tooling", "automation"],
  },
];

