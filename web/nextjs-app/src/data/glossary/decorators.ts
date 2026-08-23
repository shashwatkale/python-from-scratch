// src/data/glossary/decorators.ts
import type { GlossaryTerm } from "@/types";

export const DECORATORS_TERMS: GlossaryTerm[] = [
  {
    slug: "decorator",
    term: "Decorator",
    category: "decorators",
    categoryLabel: "Decorators",
    difficulty: "intermediate",
    definition: "A callable that accepts a function or class, extends or alters its behavior without modifying its source code, and returns the modified callable.",
    explanation: "Applied using the `@decorator` syntactic sugar above the target definition. Equivalent to `func = decorator(func)`.",
    syntax: "@decorator\ndef my_func():\n    ...",
    example: "def log_call(func):\n    def wrapper(*args, **kwargs):\n        print(\"Executing...\")\n        return func(*args, **kwargs)\n    return wrapper\n\n@log_call\ndef greet(name):\n    return f\"Hello {name}\"\n\nprint(greet(\"Guido\"))",
    output: "Executing...\nHello Guido",
    whyItMatters: "Standard Python idiom for logging, authentication, caching/memoization, timing, and rate-limiting across frameworks like FastAPI and Flask.",
    comparison: {
      title: "Decorator vs Closure",
      differences: [
        { name: "Closure", description: "A function retaining access to variables from an outer scope." },
        { name: "Decorator", description: "A higher-order function that takes another function and uses closures to wrap its execution." },
      ],
    },
    relatedTerms: ["closure", "higher-order-function", "functools-wraps"],
    relatedLessons: [{ title: "Decorators in Depth", phaseSlug: "10-advanced-python", lessonSlug: "decorators" }],
    tags: ["decorators", "metaprogramming", "advanced"],
  },
  {
    slug: "functools-wraps",
    term: "functools.wraps",
    category: "decorators",
    categoryLabel: "Decorators",
    difficulty: "intermediate",
    definition: "A helper decorator from the standard library used inside custom decorators to preserve the original function's metadata (name, docstring, annotations).",
    explanation: "Without `@wraps`, the decorated function assumes the name `'wrapper'` and loses its original `__name__` and `__doc__`.",
    example: "import functools\n\ndef my_dec(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@my_dec\ndef compute():\n    \"\"\"Perform calculation.\"\"\"\n    return 42\n\nprint(compute.__name__, compute.__doc__)",
    output: "compute Perform calculation.",
    whyItMatters: "Crucial for debugging, introspection, generating API documentation, and test frameworks.",
    relatedTerms: ["decorator", "docstring", "metadata"],
    relatedLessons: [{ title: "Decorators in Depth", phaseSlug: "10-advanced-python", lessonSlug: "decorators" }],
    tags: ["decorators", "stdlib", "introspection"],
  },
  {
    slug: "decorator-factory",
    term: "Decorator Factory",
    category: "decorators",
    categoryLabel: "Decorators",
    difficulty: "advanced",
    definition: "A function that accepts configuration arguments and returns a decorator function.",
    explanation: "Requires three levels of nested functions: the factory (takes arguments) → the decorator (takes target function) → the wrapper (executes).",
    example: "def repeat(num_times):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            for _ in range(num_times):\n                result = func(*args, **kwargs)\n            return result\n        return wrapper\n    return decorator\n\n@repeat(num_times=2)\ndef ping():\n    print(\"Pong!\")\n\nping()",
    output: "Pong!\nPong!",
    whyItMatters: "Enables parameterized decorators such as `@app.get('/users')` in FastAPI or `@pytest.mark.parametrize`.",
    relatedTerms: ["decorator", "closure", "higher-order-function"],
    relatedLessons: [{ title: "Advanced Decorators", phaseSlug: "10-advanced-python", lessonSlug: "decorator-factories" }],
    tags: ["decorators", "metaprogramming"],
  },
];

