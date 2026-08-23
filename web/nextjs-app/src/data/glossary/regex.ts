// src/data/glossary/regex.ts
import type { GlossaryTerm } from "@/types";

export const REGEX_TERMS: GlossaryTerm[] = [
  {
    slug: "regex",
    term: "Regular Expression (re)",
    category: "regex",
    categoryLabel: "Regular Expressions",
    difficulty: "intermediate",
    definition: "A specialized sequence of characters defining a search pattern used for string matching, parsing, and text replacement via the built-in `re` module.",
    explanation: "Patterns use raw strings (`r'\\d+'`) to prevent Python escape character conflicts.",
    example: "import re\n\ntext = \"Order #4582 processed\"\nmatch = re.search(r\"#(\\d+)\", text)\nif match:\n    print(\"Order ID:\", match.group(1))",
    output: "Order ID: 4582",
    whyItMatters: "Indispensable for text extraction, format validation (emails, phone numbers, UUIDs), data cleaning, and log parsing.",
    relatedTerms: ["string", "capture-group"],
    relatedLessons: [{ title: "Regular Expressions", phaseSlug: "05-strings", lessonSlug: "regex" }],
    tags: ["regex", "strings", "stdlib", "parsing"],
  },
  {
    slug: "re-sub",
    term: "re.sub()",
    category: "regex",
    categoryLabel: "Regular Expressions",
    difficulty: "intermediate",
    definition: "A function in the `re` module that replaces occurrences of a regex pattern in a string with a replacement string or the result of a callback function.",
    explanation: "Enables advanced text normalization and cleaning beyond simple `str.replace()`.",
    example: "import re\n\ncleaned = re.sub(r\"\\s+\", \" \", \"Too   much    space\")\nprint(cleaned)",
    output: "Too much space",
    whyItMatters: "Standard tool for text sanitization, whitespace normalization, and template substitution.",
    relatedTerms: ["regex", "string"],
    relatedLessons: [{ title: "Regular Expressions", phaseSlug: "05-strings", lessonSlug: "regex" }],
    tags: ["regex", "strings", "cleaning"],
  },
];

