// src/data/glossary/descriptors.ts
import type { GlossaryTerm } from "@/types";

export const DESCRIPTORS_TERMS: GlossaryTerm[] = [
  {
    slug: "descriptor",
    term: "Descriptor",
    category: "descriptors",
    categoryLabel: "Descriptors",
    difficulty: "advanced",
    definition: "An object attribute whose access, assignment, and deletion are customized by implementing methods of the descriptor protocol (`__get__`, `__set__`, or `__delete__`).",
    explanation: "Descriptors power core Python mechanisms including properties, methods, `classmethod`, `staticmethod`, and ORM model fields.",
    example: "class PositiveNumber:\n    def __set_name__(self, owner, name):\n        self.name = name\n    def __get__(self, obj, objtype=None):\n        if obj is None: return self\n        return obj.__dict__.get(self.name, 0)\n    def __set__(self, obj, value):\n        if value < 0: raise ValueError(\"Must be positive\")\n        obj.__dict__[self.name] = value\n\nclass Product:\n    price = PositiveNumber()\n\np = Product()\np.price = 99\nprint(p.price)",
    output: "99",
    whyItMatters: "The underlying mechanism behind reusable attribute validation, lazy-loading attributes, and database ORMs like SQLAlchemy and Django.",
    comparison: {
      title: "Descriptor vs Property",
      differences: [
        { name: "Property (`@property`)", description: "Created per-class on individual methods for quick attribute getters/setters." },
        { name: "Descriptor", description: "A standalone class implementing the protocol; reusable across multiple classes and attributes." },
      ],
    },
    relatedTerms: ["descriptor-protocol", "property", "dunder-methods"],
    relatedLessons: [{ title: "Python Descriptors", phaseSlug: "10-advanced-python", lessonSlug: "descriptors" }],
    tags: ["descriptors", "oop", "advanced", "metaprogramming"],
  },
  {
    slug: "descriptor-protocol",
    term: "Descriptor Protocol",
    category: "descriptors",
    categoryLabel: "Descriptors",
    difficulty: "advanced",
    definition: "The formal Python standard consisting of `__get__()`, `__set__()`, and `__delete__()` methods defining how attributes are looked up and mutated on classes.",
    explanation: "When an attribute on a class defines any of these methods, Python invokes the descriptor method instead of standard dictionary lookup.",
    example: "class Constant:\n    def __init__(self, val):\n        self.val = val\n    def __get__(self, obj, owner=None):\n        return self.val\n\nclass Config:\n    VERSION = Constant(\"2.0.0\")\n\nprint(Config().VERSION)",
    output: "2.0.0",
    whyItMatters: "Provides complete control over object attribute lifecycle and binding behavior.",
    relatedTerms: ["descriptor", "dunder-methods", "property"],
    relatedLessons: [{ title: "Descriptors & Protocols", phaseSlug: "10-advanced-python", lessonSlug: "descriptors" }],
    tags: ["protocols", "oop", "advanced"],
  },
  {
    slug: "data-descriptor",
    term: "Data Descriptor",
    category: "descriptors",
    categoryLabel: "Descriptors",
    difficulty: "advanced",
    definition: "A descriptor that defines `__set__()` or `__delete__()` (and typically `__get__()`).",
    explanation: "Data descriptors have higher precedence in attribute lookup than an instance's `__dict__`. Non-data descriptors only define `__get__()` (like standard methods).",
    example: "class DataDesc:\n    def __get__(self, obj, owner):\n        return \"descriptor\"\n    def __set__(self, obj, val):\n        pass\n\nclass Item:\n    attr = DataDesc()\n\ni = Item()\ni.__dict__[\"attr\"] = \"instance\"\nprint(i.attr)  # Data descriptor wins over instance dict",
    output: "descriptor",
    whyItMatters: "Crucial for understanding attribute lookup priority and implementing strict data integrity controls.",
    comparison: {
      title: "Data vs Non-Data Descriptor",
      differences: [
        { name: "Data Descriptor", description: "Implements `__set__` or `__delete__`. Takes precedence over instance `__dict__`." },
        { name: "Non-Data Descriptor", description: "Implements only `__get__` (e.g. methods). Overridden by instance `__dict__` entries." },
      ],
    },
    relatedTerms: ["descriptor", "descriptor-protocol"],
    relatedLessons: [{ title: "Advanced Descriptors", phaseSlug: "10-advanced-python", lessonSlug: "descriptors" }],
    tags: ["descriptors", "internals", "advanced"],
  },
];

