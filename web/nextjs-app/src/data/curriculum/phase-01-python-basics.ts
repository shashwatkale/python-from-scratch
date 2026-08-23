// src/data/curriculum/phase-01-python-basics.ts — Real, concrete explanations for Phase 01
import type { RichLessonDetail } from "./types";

export const PHASE_01_LESSONS: Record<string, RichLessonDetail> = {
  "variables-and-assignment": {
    slug: "variables-and-assignment",
    phaseSlug: "01-python-basics",
    quote: "In Python, variables are not boxes that hold values. Variables are name tags bound to objects in heap memory.",
    type: "Build",
    languages: "Python, CPython",
    prerequisites: "Your First Python Program",
    estimatedTime: "~20 min",
    objectives: [
      "Understand variable assignment as binding names to heap objects",
      "Inspect object memory addresses with id() and hex()",
      "Trace variable rebinding and reference aliasing",
      "Understand Python naming conventions (PEP 8 snake_case)",
    ],
    problem: {
      statement: "In languages like C or Java, a variable is a typed memory box (e.g. 'int x'). In Python, variables are dynamic name tags pointing to allocated PyObject structs.",
      scenario: "When you write 'a = [1, 2, 3]' followed by 'b = a', modifying 'b.append(4)' unexpectedly modifies 'a' as well. If you don't understand reference binding, this causes catastrophic state bugs.",
      steps: [
        "1. Allocate object on the heap (e.g. integer 42 or list [1, 2]).",
        "2. Bind variable name 'x' to that heap address.",
        "3. Reassigning 'x = 50' does not mutate 42; it rebinds 'x' to a new object 50.",
      ],
    },
    concept: {
      summary: "Variable assignment uses the single equals sign (=). Python is dynamically typed: you do not declare variable types explicitly; the interpreter infers the object's type at runtime.",
      syntaxBreakdown: {
        syntax: "variable_name = expression",
        parts: [
          { label: "variable_name", explanation: "Identifier following snake_case convention (letters, numbers, underscores, cannot start with a digit)." },
          { label: "= (assignment)", explanation: "Binds the left-hand name to the right-hand evaluated object address." },
          { label: "expression", explanation: "Any valid Python literal, arithmetic operation, or function call." },
        ],
      },
      keyPoints: [
        "Multiple assignment: a, b = 10, 20 assigns multiple variables in one line.",
        "Swap variables without temporary variables: a, b = b, a.",
        "id(variable) returns the integer memory address of the referenced object.",
      ],
      codeExample: {
        language: "python",
        title: "Variable Binding & Memory Inspection",
        code: `# Variable assignment
user_name = "Alice"
user_age = 28

print(f"User: {user_name}, Age: {user_age}")
print("Memory address of user_name:", hex(id(user_name)))

# Variable swapping in one atomic step
x, y = 100, 200
x, y = y, x
print(f"Swapped: x={x}, y={y}")`,
        expectedOutput: "User: Alice, Age: 28\nSwapped: x=200, y=100",
      },
    },
    buildSteps: [
      {
        title: "Step 1: Inspect Reference Aliasing",
        explanation: "Observe how two variables point to the exact same heap memory address when assigned:",
        code: {
          language: "python",
          code: `list_a = [10, 20, 30]
list_b = list_a # Binds list_b to the same memory address!

print("list_a id:", hex(id(list_a)))
print("list_b id:", hex(id(list_b)))
print("Are they identical objects?", list_a is list_b)`,
          expectedOutput: "Are they identical objects? True",
        },
      },
    ],
    useIt: [
      "Use descriptive snake_case names for variables: total_revenue, is_authenticated.",
      "Use UPPER_SNAKE_CASE for constants: MAX_RETRIES = 3, TIMEOUT_SECONDS = 30.",
    ],
    shipIt: [
      "Write a script that tracks bank balance deposits and prints the updated balance and object memory addresses.",
    ],
    exercises: [
      "What is the output of: x = 10; y = x; x = 20; print(y)? Explain why.",
      "Explain the difference between '=' (assignment) and '==' (equality).",
    ],
  },
  "data-types": {
    slug: "data-types",
    phaseSlug: "01-python-basics",
    quote: "Python's type system is strong and dynamic: objects know their type, and operations are strictly verified at runtime.",
    type: "Build",
    languages: "Python",
    prerequisites: "Variables and Assignment",
    estimatedTime: "~25 min",
    objectives: [
      "Master Python's core primitive types: int, float, bool, str, and NoneType",
      "Inspect types at runtime using type() and isinstance()",
      "Understand float precision limitations (IEEE 754 floating-point)",
      "Work with the None singleton representing the absence of a value",
    ],
    problem: {
      statement: "Computers must know how to represent different kinds of data in memory: text characters, whole numbers, fractional decimals, and true/false flags.",
      scenario: "Adding string '10' and integer 5 in Python raises TypeError: can only concatenate str (not 'int') to str. Python prevents silent data corruption by enforcing strong types.",
      steps: [
        "1. Identify the input data format.",
        "2. Store it in the correct primitive type (int, float, str, bool).",
        "3. Use isinstance() to defensively validate types in functions.",
      ],
    },
    concept: {
      summary: "Python provides built-in types: `int` (arbitrary precision integers), `float` (64-bit IEEE 754 decimals), `bool` (True/False, subclass of int), `str` (immutable Unicode sequences), and `NoneType` (None).",
      keyPoints: [
        "Python integers have arbitrary precision (they never overflow, limited only by available RAM).",
        "Floats use binary floating-point representation: 0.1 + 0.2 is 0.30000000000000004.",
        "Use isinstance(x, (int, float)) instead of type(x) == int to support subclass inheritance.",
      ],
      codeExample: {
        language: "python",
        title: "Primitive Data Types and Type Checking",
        code: `item_count = 42          # int
price_usd = 19.99         # float
is_in_stock = True        # bool
item_name = "Mechanical Keyboard" # str
discount_code = None      # NoneType

print(f"item_count type: {type(item_count).__name__}")
print(f"price_usd type:   {type(price_usd).__name__}")
print(f"is_in_stock:     {isinstance(is_in_stock, bool)}")
print(f"discount_code:   {discount_code is None}")`,
        expectedOutput: "item_count type: int\nprice_usd type: float\nis_in_stock: True\ndiscount_code: True",
      },
    },
    buildSteps: [
      {
        title: "Step 1: Type Checking with isinstance()",
        explanation: "Write robust type guards to inspect inputs before performing calculations:",
        code: {
          language: "python",
          code: `def calculate_area(radius):
    if not isinstance(radius, (int, float)):
        raise TypeError("Radius must be a numeric integer or float")
    return 3.14159 * (radius ** 2)

print("Area for radius 5:", calculate_area(5))`,
          expectedOutput: "Area for radius 5: 78.53975",
        },
      },
    ],
    useIt: [
      "Use decimal.Decimal for financial currency calculations instead of float.",
      "Use None as default parameter values for mutable arguments.",
    ],
    shipIt: [
      "Write a function that accepts an input and returns a dictionary classifying its type, length (if iterable), and boolean truthiness.",
    ],
    exercises: [
      "Why is 'bool' a subclass of 'int' in Python (i.e. True == 1)?",
      "How do you represent a billion in Python for readability (e.g. 1_000_000_000)?",
    ],
  },
};

