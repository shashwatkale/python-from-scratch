// src/data/curriculum/phase-03-functions.ts — Real, concrete explanations for Phase 03 Functions
import type { RichLessonDetail } from "./types";

export const PHASE_03_LESSONS: Record<string, RichLessonDetail> = {
  "defining-calling-functions": {
    slug: "defining-calling-functions",
    phaseSlug: "03-functions",
    quote: "Functions are the fundamental unit of software abstraction: take inputs, apply transformations, return results.",
    type: "Build",
    languages: "Python",
    prerequisites: "Control Flow, Control Structures",
    estimatedTime: "~25 min",
    objectives: [
      "Define functions with the def keyword, parameters, and explicit return statements",
      "Understand why functions without an explicit return statement return None",
      "Apply the Single Responsibility Principle to function design",
      "Annotate functions with PEP 484 type hints and docstrings",
    ],
    problem: {
      statement: "Copy-pasting the same 10 lines of code in 5 different places creates maintenance debt. If a bug is found or requirements change, you must update all 5 copies.",
      scenario: "Consider calculating sales tax and formatting an invoice string. Wrapping this logic in a function allows you to call calculate_invoice_total(subtotal, tax_rate) anywhere in the application with guaranteed consistency.",
      steps: [
        "1. Identify repeated logic.",
        "2. Encapsulate it in a 'def function_name(parameters):' block.",
        "3. Pass arguments into the function and receive the calculated return value.",
      ],
    },
    concept: {
      summary: "A function is defined with `def`, followed by the function name, parentheses containing optional parameters, and a colon. Code inside must be indented. The `return` keyword terminates execution and yields a value back to the caller.",
      syntaxBreakdown: {
        syntax: "def function_name(param1: type, param2: type = default) -> return_type:\n    \"\"\"Docstring explaining purpose.\"\"\"\n    # Function body\n    return result",
        parts: [
          { label: "def", explanation: "Keyword declaring the start of a function definition." },
          { label: "parameters", explanation: "Variables in the function header that receive input values (arguments) when called." },
          { label: "docstring", explanation: "Triple-quoted string on the first line documenting inputs, outputs, and purpose." },
          { label: "return", explanation: "Exits the function and passes the calculated result back to the caller." },
        ],
      },
      keyPoints: [
        "Functions are first-class citizens in Python: they can be assigned to variables, passed as arguments, and returned from other functions.",
        "A function stops executing the instant a return statement is reached.",
        "If execution reaches the end of a function without encountering return, it implicitly returns None.",
      ],
      codeExample: {
        language: "python",
        title: "Defining Functions with Return Values",
        code: `def calculate_gross_salary(base_hourly_rate: float, hours_worked: float) -> float:
    """Calculate total gross pay including 1.5x overtime for hours over 40."""
    if hours_worked <= 40:
        return base_hourly_rate * hours_worked
    
    # Overtime calculation
    regular_pay = base_hourly_rate * 40
    overtime_hours = hours_worked - 40
    overtime_pay = overtime_hours * (base_hourly_rate * 1.5)
    return regular_pay + overtime_pay

# Calling the function
pay = calculate_gross_salary(base_hourly_rate=30.0, hours_worked=45)
print(f"Gross Pay: \${pay:.2f}")`,
        expectedOutput: "Gross Pay: $1425.00",
      },
    },
    buildSteps: [
      {
        title: "Step 1: Multiple Return Values with Tuples",
        explanation: "Python functions can return multiple values packed as a tuple, which the caller can unpack in one line:",
        code: {
          language: "python",
          code: `def min_max_average(numbers: list[int | float]) -> tuple[float, float, float]:
    minimum = min(numbers)
    maximum = max(numbers)
    avg = sum(numbers) / len(numbers)
    return minimum, maximum, avg

# Unpacking multiple return values
low, high, mean = min_max_average([10, 20, 30, 40, 50])
print(f"Min: {low}, Max: {high}, Avg: {mean:.1f}")`,
          expectedOutput: "Min: 10, Max: 50, Avg: 30.0",
        },
      },
    ],
    useIt: [
      "Keep functions small (ideally under 30 lines) and focused on a single task.",
      "Always provide type hints: def find_user(user_id: int) -> dict | None:.",
    ],
    shipIt: [
      "Write a currency conversion utility with functions: convert_currency(amount, from_curr, to_curr).",
    ],
    exercises: [
      "What happens if you call a function before its def statement in a script? Why?",
      "Write a function 'is_prime(n: int) -> bool' that returns True if n is a prime number.",
    ],
  },
};

