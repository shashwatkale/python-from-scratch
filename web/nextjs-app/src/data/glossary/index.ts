// src/data/glossary/index.ts — Master Glossary Aggregator
import type { GlossaryTerm, GlossaryCategory } from "@/types";
import { BASICS_TERMS } from "./basics";
import { DATA_TYPES_TERMS } from "./data-types";
import { CONTROL_FLOW_TERMS } from "./control-flow";
import { FUNCTIONS_TERMS } from "./functions";
import { OOP_TERMS } from "./oop";
import { DUNDER_METHODS_TERMS } from "./dunder-methods";
import { DECORATORS_TERMS } from "./decorators";
import { ITERATORS_GENERATORS_TERMS } from "./iterators-generators";
import { DESCRIPTORS_TERMS } from "./descriptors";
import { CONTEXT_MANAGERS_TERMS } from "./context-managers";
import { EXCEPTIONS_TERMS } from "./exceptions";
import { MODULES_PACKAGES_TERMS } from "./modules-packages";
import { VIRTUAL_ENVIRONMENTS_TERMS } from "./virtual-environments";
import { TYPE_SYSTEM_TERMS } from "./type-system";
import { DATACLASSES_TERMS } from "./dataclasses";
import { COLLECTIONS_TERMS } from "./collections";
import { FUNCTIONAL_TERMS } from "./functional";
import { MEMORY_INTERNALS_TERMS } from "./memory-internals";
import { CONCURRENCY_TERMS } from "./concurrency";
import { ASYNC_PYTHON_TERMS } from "./async-python";
import { FILES_IO_TERMS } from "./files-io";
import { REGEX_TERMS } from "./regex";
import { TESTING_TERMS } from "./testing";
import { DATABASES_TERMS } from "./databases";
import { FASTAPI_TERMS } from "./fastapi";
import { CLI_TERMS } from "./cli";
import { DATA_PYTHON_TERMS } from "./data-python";
import { TOOLING_TERMS } from "./tooling";
import { ADVANCED_TERMS } from "./advanced";

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  ...BASICS_TERMS,
  ...DATA_TYPES_TERMS,
  ...CONTROL_FLOW_TERMS,
  ...FUNCTIONS_TERMS,
  ...OOP_TERMS,
  ...DUNDER_METHODS_TERMS,
  ...DECORATORS_TERMS,
  ...ITERATORS_GENERATORS_TERMS,
  ...DESCRIPTORS_TERMS,
  ...CONTEXT_MANAGERS_TERMS,
  ...EXCEPTIONS_TERMS,
  ...MODULES_PACKAGES_TERMS,
  ...VIRTUAL_ENVIRONMENTS_TERMS,
  ...TYPE_SYSTEM_TERMS,
  ...DATACLASSES_TERMS,
  ...COLLECTIONS_TERMS,
  ...FUNCTIONAL_TERMS,
  ...MEMORY_INTERNALS_TERMS,
  ...CONCURRENCY_TERMS,
  ...ASYNC_PYTHON_TERMS,
  ...FILES_IO_TERMS,
  ...REGEX_TERMS,
  ...TESTING_TERMS,
  ...DATABASES_TERMS,
  ...FASTAPI_TERMS,
  ...CLI_TERMS,
  ...DATA_PYTHON_TERMS,
  ...TOOLING_TERMS,
  ...ADVANCED_TERMS,
].sort((a, b) => a.term.localeCompare(b.term));

export const GLOSSARY_CATEGORIES: { id: GlossaryCategory; label: string }[] = [
  { id: "basics", label: "Basics" },
  { id: "data-types", label: "Data Types" },
  { id: "control-flow", label: "Control Flow" },
  { id: "functions", label: "Functions" },
  { id: "oop", label: "OOP" },
  { id: "dunder-methods", label: "Dunder Methods" },
  { id: "decorators", label: "Decorators" },
  { id: "iterators-generators", label: "Iterators & Generators" },
  { id: "descriptors", label: "Descriptors" },
  { id: "context-managers", label: "Context Managers" },
  { id: "exceptions", label: "Exceptions" },
  { id: "modules-packages", label: "Modules & Packages" },
  { id: "virtual-environments", label: "Virtual Environments" },
  { id: "type-system", label: "Type System" },
  { id: "dataclasses", label: "Dataclasses" },
  { id: "collections", label: "Collections" },
  { id: "functional", label: "Functional" },
  { id: "memory-internals", label: "Memory & Internals" },
  { id: "concurrency", label: "Concurrency & GIL" },
  { id: "async", label: "Async Python" },
  { id: "files-io", label: "Files & I/O" },
  { id: "regex", label: "Regex" },
  { id: "testing", label: "Testing" },
  { id: "databases", label: "Databases & Backend" },
  { id: "fastapi", label: "FastAPI" },
  { id: "cli", label: "CLI & Automation" },
  { id: "data-python", label: "Python for Data" },
  { id: "tooling", label: "Developer Tooling" },
  { id: "advanced", label: "Advanced Python" },
];

export const POPULAR_TERM_SLUGS = [
  "generator",
  "decorator",
  "iterator",
  "descriptor",
  "context-manager",
  "closure",
  "dataclass",
  "lambda",
  "list-comprehension",
  "async-await",
  "gil",
  "pytest",
];

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((t) => t.slug === slug);
}

export function getPopularGlossaryTerms(): GlossaryTerm[] {
  return POPULAR_TERM_SLUGS.map((slug) => getGlossaryTermBySlug(slug)).filter(
    (t): t is GlossaryTerm => t !== undefined
  );
}

export function getGlossaryAlphabeticalGroups(): Record<string, GlossaryTerm[]> {
  const groups: Record<string, GlossaryTerm[]> = {};
  for (const term of GLOSSARY_TERMS) {
    let firstLetter = term.term.charAt(0).toUpperCase();
    if (firstLetter === "_" || firstLetter === "@") {
      firstLetter = "_";
    }
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(term);
  }
  return groups;
}

