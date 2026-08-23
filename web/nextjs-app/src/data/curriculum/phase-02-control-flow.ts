// src/data/curriculum/phase-02-control-flow.ts — Real, concrete explanations for Phase 02
import type { RichLessonDetail } from "./types";

export const PHASE_02_LESSONS: Record<string, RichLessonDetail> = {
  "conditional-statements": {
    slug: "conditional-statements",
    phaseSlug: "02-control-flow",
    quote: "A program without conditional branching is just a fixed recipe. Decisions make software intelligent.",
    type: "Build",
    languages: "Python",
    prerequisites: "Variables, Primitive Data Types",
    estimatedTime: "~25 min",
    objectives: [
      "Master the if, elif, and else control flow statements in Python",
      "Understand boolean expression evaluation and truthy/falsy values",
      "Enforce Python's strict 4-space indentation scoping rules",
      "Structure multi-branch conditional trees without redundant checks",
    ],
    problem: {
      statement: "Real-world programs cannot execute the exact same instructions every time they run. They must evaluate state and choose distinct execution paths.",
      scenario: "Consider an age verification checkpoint: if a user is 18 or older, grant adult access; otherwise, redirect them to a minor portal. Without conditional statements, your code would execute both paths or crash.",
      steps: [
        "1. Capture an input value (e.g. age = 20).",
        "2. Evaluate a boolean condition (age >= 18).",
        "3. If True, execute the indented block under 'if'.",
        "4. If False, skip the 'if' block and evaluate 'elif' or fall back to 'else'.",
      ],
    },
    concept: {
      summary: "Python uses keywords `if`, `elif` (short for else if), and `else` followed by an expression and a colon (:). The indented block of code directly beneath is executed only when the condition evaluates to True.",
      syntaxBreakdown: {
        syntax: "if condition:\n    statement_1\nelif alternate_condition:\n    statement_2\nelse:\n    fallback_statement",
        parts: [
          { label: "condition", explanation: "An expression that evaluates to a boolean (True or False), such as age >= 18." },
          { label: "colon (:)", explanation: "Required punctuation that terminates the header and begins an indented block." },
          { label: "indentation (4 spaces)", explanation: "Python does not use curly braces {}. Indentation defines block scope." },
          { label: "elif", explanation: "Optional intermediate branch tested only if all preceding conditions were False." },
          { label: "else", explanation: "Catch-all default block executed only when every preceding condition is False." },
        ],
      },
      keyPoints: [
        "Python evaluates conditions sequentially from top to bottom.",
        "As soon as one condition evaluates to True, Python executes that block and immediately exits the entire if-elif-else chain.",
        "Non-boolean values are evaluated for truthiness: 0, \"\", [], {}, and None are falsy; non-zero numbers and non-empty collections are truthy.",
      ],
      codeExample: {
        language: "python",
        title: "Basic If-Elif-Else Branching",
        code: `age = 20

if age >= 21:
    print("Full adult access (21+)")
elif age >= 18:
    print("Standard adult access (18+)")
else:
    print("Minor access restricted")`,
        expectedOutput: "Standard adult access (18+)",
      },
    },
    buildSteps: [
      {
        title: "Step 1: Write a Single-Branch Guard",
        explanation: "The simplest condition is a standalone 'if'. If the condition is false, execution skips the block and continues:",
        code: {
          language: "python",
          code: `temperature = 35

if temperature > 30:
    print("Warning: High temperature alert!")

print("Monitoring operational.")`,
          expectedOutput: "Warning: High temperature alert!\nMonitoring operational.",
        },
      },
      {
        title: "Step 2: Add Binary Choice with Else",
        explanation: "When you have two mutually exclusive outcomes, pair 'if' with 'else':",
        code: {
          language: "python",
          code: `user_role = "editor"

if user_role == "admin":
    print("Access: Full permissions granted")
else:
    print("Access: Read/Write restricted permissions")`,
          expectedOutput: "Access: Read/Write restricted permissions",
        },
      },
      {
        title: "Step 3: Multi-Branch Grading Classifier with Elif",
        explanation: "Use multiple 'elif' blocks to partition a continuous numerical score into discrete letter grades:",
        code: {
          language: "python",
          code: `score = 87

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Final Score: {score} -> Grade: {grade}")`,
          expectedOutput: "Final Score: 87 -> Grade: B",
        },
      },
    ],
    commonPitfalls: [
      {
        pitfall: "Using assignment '=' instead of comparison '=='",
        whyItFails: "In Python, writing 'if x = 5:' raises a SyntaxError because single '=' is for assignment, not equality testing.",
        howToFix: "Always use '==' for equality and '!=' for inequality.",
      },
      {
        pitfall: "Ordering elif conditions from smallest to largest",
        whyItFails: "If you check 'if score >= 60:' before 'elif score >= 90:', a score of 95 will match the first check and return grade D instead of A.",
        howToFix: "Order numerical threshold ranges from most restrictive to least restrictive.",
      },
    ],
    useIt: [
      "Use if-statements for input validation before processing arguments.",
      "Use ternary conditional expressions for concise inline assignments: status = 'active' if count > 0 else 'idle'.",
    ],
    shipIt: [
      "Write a Python script that takes a transaction amount and customer risk score, then outputs 'APPROVE', 'MANUAL_REVIEW', or 'REJECT'.",
    ],
    challenge: {
      prompt: "Write a condition that checks if a number 'n = 15' is divisible by both 3 and 5 (FizzBuzz check). Print 'FizzBuzz' if true, 'Fizz' if divisible only by 3, 'Buzz' if divisible only by 5, or the number itself.",
      initialCode: `n = 15\n\n# Your conditional logic here\n`,
      expectedOutput: "FizzBuzz",
      hint: "Check (n % 3 == 0 and n % 5 == 0) or (n % 15 == 0) first before checking 3 or 5 individually.",
      solution: `n = 15\nif n % 15 == 0:\n    print("FizzBuzz")\nelif n % 3 == 0:\n    print("Fizz")\nelif n % 5 == 0:\n    print("Buzz")\nelse:\n    print(n)`,
    },
    exercises: [
      "Explain what happens when an if-statement tests an empty list 'if []:'.",
      "Refactor nested if-statements into a single condition using logical 'and'.",
      "Write a leap-year validator using modulo arithmetic: divisible by 4, except century years unless divisible by 400.",
    ],
  },
  "comparison-logical-operators": {
    slug: "comparison-logical-operators",
    phaseSlug: "02-control-flow",
    quote: "Truth in Python is unambiguous: comparisons compute facts, logic combines them.",
    type: "Build",
    languages: "Python",
    prerequisites: "Conditional Statements",
    estimatedTime: "~20 min",
    objectives: [
      "Master comparison operators: ==, !=, <, <=, >, >=",
      "Combine expressions with boolean operators: and, or, not",
      "Understand short-circuit evaluation in logical expressions",
      "Differentiate value equality (==) from object identity (is)",
    ],
    problem: {
      statement: "Real business rules often require multiple conditions to be satisfied simultaneously (e.g. user must be logged in AND have admin rights OR be on localhost).",
      scenario: "Checking multiple variables with separate nested if-statements leads to deeply indented, unreadable 'pyramid of doom' code. Logical operators allow clean compound expressions.",
      steps: [
        "1. Evaluate left expression.",
        "2. Apply boolean logic table.",
        "3. Leverage short-circuiting: 'and' halts on first False; 'or' halts on first True.",
      ],
    },
    concept: {
      summary: "Python provides three logical operators: `and` (both must be True), `or` (at least one must be True), and `not` (inverts truth value). Comparisons chain naturally in Python: `18 <= age < 65`.",
      keyPoints: [
        "Chained comparisons: 0 < x < 100 is equivalent to (0 < x) and (x < 100).",
        "Short-circuit evaluation prevents unnecessary evaluation of subsequent expensive functions.",
        "Never use 'is' for numbers or strings; use 'is' exclusively for singleton identity checks like 'x is None'.",
      ],
      codeExample: {
        language: "python",
        title: "Compound Boolean Logic & Chained Comparisons",
        code: `age = 25
has_license = True
has_insurance = False

# Compound logic with 'and', 'or', 'not'
can_drive = (age >= 18) and has_license and (has_insurance or age > 21)
print("Eligible to drive:", can_drive)

# Chained comparison
score = 85
is_valid_score = 0 <= score <= 100
print("Score in valid range (0-100):", is_valid_score)`,
        expectedOutput: "Eligible to drive: True\nScore in valid range (0-100): True",
      },
    },
    buildSteps: [
      {
        title: "Step 1: Short-Circuiting in Action",
        explanation: "Observe how Python avoids calling error-prone or slow functions if the first condition is decisive:",
        code: {
          language: "python",
          code: `def dangerous_operation():
    print("Dangerous operation called!")
    return True

# Since False is encountered first in 'and', the second function is never executed!
result = False and dangerous_operation()
print("Result:", result)`,
          expectedOutput: "Result: False",
        },
      },
    ],
    useIt: [
      "Use 'is None' or 'is not None' for default argument validation.",
      "Use chained comparisons like 0 <= index < len(items) to check bounds cleanly.",
    ],
    shipIt: [
      "Write a password strength validator checking: length >= 8 and has_upper and has_digit and has_special.",
    ],
    exercises: [
      "Why does '[] or 42' evaluate to 42 in Python?",
      "Explain the exact difference between 'a == b' and 'a is b'.",
    ],
  },
  "for-loops-and-range": {
    slug: "for-loops-and-range",
    phaseSlug: "02-control-flow",
    quote: "Python's for-loop is not a counter; it is an iterator over sequences.",
    type: "Build",
    languages: "Python",
    prerequisites: "Comparison & Logical Operators",
    estimatedTime: "~25 min",
    objectives: [
      "Iterate over lists, strings, dictionaries, and ranges with for loops",
      "Generate sequences using range(start, stop, step)",
      "Track index and element simultaneously with enumerate()",
      "Iterate over multiple parallel sequences with zip()",
    ],
    problem: {
      statement: "Applying an operation across 1,000 items manually is impossible. We need automated iteration that traverses each item until the collection is exhausted.",
      scenario: "Processing a batch of user transactions: calculate sales tax on every invoice and format the output.",
      steps: [
        "1. Obtain an iterable sequence.",
        "2. The for loop requests the next element from the iterator on each step.",
        "3. Binds the element to the loop variable and executes the indented body.",
        "4. Automatically terminates when StopIteration is reached.",
      ],
    },
    concept: {
      summary: "Unlike C-style for-loops (for i=0; i<N; i++), Python's `for element in iterable:` statement operates directly on items. `range(start, stop, step)` generates integer sequences on-demand with O(1) memory.",
      keyPoints: [
        "range(stop) generates 0 to stop-1 (the stop bound is exclusive).",
        "range(start, stop, step) allows counting backwards: range(10, 0, -1).",
        "enumerate(iterable, start=0) yields (index, item) tuples cleanly.",
        "zip(list_a, list_b) pairs elements from multiple lists together.",
      ],
      codeExample: {
        language: "python",
        title: "For Loops with range(), enumerate(), and zip()",
        code: `# 1. Iterating over range
for i in range(3):
    print(f"Step {i}")

# 2. Enumerate with 1-based indexing
items = ["apple", "banana", "cherry"]
for idx, fruit in enumerate(items, start=1):
    print(f"{idx}. {fruit}")

# 3. Zip parallel lists
prices = [1.20, 0.50, 2.75]
for fruit, price in zip(items, prices):
    print(f"{fruit}: \${price:.2f}")`,
        expectedOutput: "Step 0\nStep 1\nStep 2\n1. apple\n2. banana\n3. cherry\napple: $1.20\nbanana: $0.50\ncherry: $2.75",
      },
    },
    buildSteps: [
      {
        title: "Step 1: Accumulator Pattern",
        explanation: "Iterate over a sequence to compute a cumulative aggregate sum:",
        code: {
          language: "python",
          code: `transactions = [120, 45, 300, 80]
total = 0

for amount in transactions:
    total += amount

print("Total Revenue:", total)`,
          expectedOutput: "Total Revenue: 545",
        },
      },
    ],
    useIt: [
      "Use enumerate() instead of maintaining a manual 'i += 1' counter.",
      "Use zip(strict=True) in Python 3.10+ to ensure parallel lists have identical lengths.",
    ],
    shipIt: [
      "Write a script that parses a log file line by line and counts total error occurrences.",
    ],
    exercises: [
      "How does range() maintain O(1) memory even for range(1_000_000_000)?",
      "Write a loop that prints only even numbers from 20 down to 2 using range(start, stop, step).",
    ],
  },
};

