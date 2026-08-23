// src/data/glossary/advanced.ts
import type { GlossaryTerm } from "@/types";

export const ADVANCED_TERMS: GlossaryTerm[] = [
  {
    slug: "metaclass",
    term: "Metaclass",
    category: "advanced",
    categoryLabel: "Advanced Python",
    difficulty: "advanced",
    definition: "The class of a class. Just as an object is an instance of a class, a class in Python is an instance of a metaclass (by default, `type`).",
    explanation: "Metaclasses intercept class creation at module load time to validate, modify, or register classes dynamically.",
    example: "class Meta(type):\n    def __new__(cls, name, bases, dct):\n        dct['version'] = 1.0\n        return super().__new__(cls, name, bases, dct)\n\nclass App(metaclass=Meta):\n    pass\n\nprint(App.version)",
    output: "1.0",
    whyItMatters: "Powers deep framework internals such as ORM model registration, API schema generation, and abstract base class validation.",
    relatedTerms: ["class", "object", "type"],
    relatedLessons: [{ title: "Metaclasses in Depth", phaseSlug: "10-advanced-python", lessonSlug: "metaclasses" }],
    tags: ["metaprogramming", "advanced", "oop"],
  },
  {
    slug: "slots",
    term: "__slots__",
    category: "advanced",
    categoryLabel: "Advanced Python",
    difficulty: "advanced",
    definition: "A class-level attribute that restricts valid instance attributes to a fixed tuple of names, preventing the creation of a dynamic per-instance `__dict__`.",
    explanation: "Saves significant memory per instance (40–50% reduction) and speeds up attribute access when creating millions of small objects.",
    example: "class Point:\n    __slots__ = ('x', 'y')\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\np = Point(1, 2)\nprint(hasattr(p, '__dict__'))",
    output: "False",
    whyItMatters: "Essential optimization for high-throughput data processing where memory footprint is a critical bottleneck.",
    relatedTerms: ["dataclass", "memory-internals", "class"],
    relatedLessons: [{ title: "Memory Optimization with __slots__", phaseSlug: "10-advanced-python", lessonSlug: "slots" }],
    tags: ["memory", "optimization", "dunder", "advanced"],
  },
];

