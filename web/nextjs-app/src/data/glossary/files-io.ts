// src/data/glossary/files-io.ts
import type { GlossaryTerm } from "@/types";

export const FILES_IO_TERMS: GlossaryTerm[] = [
  {
    slug: "pathlib",
    term: "pathlib.Path",
    category: "files-io",
    categoryLabel: "Files & I/O",
    difficulty: "intermediate",
    definition: "An object-oriented filesystem path module in the standard library that replaces legacy string-based `os.path` operations.",
    explanation: "Provides clean operator overloading (`path / 'subfolder'`), cross-platform path handling, and built-in methods like `.read_text()`, `.write_text()`, and `.exists()`.",
    syntax: "from pathlib import Path\np = Path(\"folder\") / \"file.txt\"",
    example: "from pathlib import Path\n\np = Path(\"sample.txt\")\np.write_text(\"Python From Scratch\")\nprint(p.exists(), p.read_text())",
    output: "True Python From Scratch",
    whyItMatters: "Eliminates platform-specific slash errors (`/` vs `\\`) and provides modern, chainable filesystem manipulation.",
    relatedTerms: ["file-object", "context-manager"],
    relatedLessons: [{ title: "Modern File Handling with pathlib", phaseSlug: "06-file-handling", lessonSlug: "pathlib" }],
    tags: ["files", "stdlib", "pathlib", "modern-python"],
  },
  {
    slug: "file-object",
    term: "File Object",
    category: "files-io",
    categoryLabel: "Files & I/O",
    difficulty: "beginner",
    definition: "An object returned by `open()` representing an active stream to an underlying file on disk, supporting reading and writing operations.",
    explanation: "Best managed within a `with open(...) as f:` block to ensure immediate OS handle release upon exit.",
    example: "with open(\"data.txt\", \"w\") as f:\n    f.write(\"Line 1\\nLine 2\")\n\nwith open(\"data.txt\", \"r\") as f:\n    print(f.readline().strip())",
    output: "Line 1",
    whyItMatters: "The core interface for reading, writing, and processing disk data in Python.",
    relatedTerms: ["with-statement", "pathlib", "context-manager"],
    relatedLessons: [{ title: "Reading & Writing Files", phaseSlug: "06-file-handling", lessonSlug: "file-reading-writing" }],
    tags: ["files", "io", "basics"],
  },
];

