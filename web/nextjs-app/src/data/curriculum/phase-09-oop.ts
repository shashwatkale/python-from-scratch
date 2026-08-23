// src/data/curriculum/phase-09-oop.ts — Real, concrete explanations for Phase 09 OOP
import type { RichLessonDetail } from "./types";

export const PHASE_09_LESSONS: Record<string, RichLessonDetail> = {
  "classes-and-objects": {
    slug: "classes-and-objects",
    phaseSlug: "09-object-oriented-programming",
    quote: "A class is a blueprint; an object is a living instance in memory holding its own unique state.",
    type: "Build",
    languages: "Python",
    prerequisites: "Functions, Dictionaries",
    estimatedTime: "~30 min",
    objectives: [
      "Define classes using the class keyword and PascalCase naming convention",
      "Instantiate multiple independent object instances from a single class",
      "Understand the difference between class definitions (types) and instance objects",
      "Inspect instance attributes and methods using dir() and __dict__",
    ],
    problem: {
      statement: "Representing complex real-world entities (like a BankAccount or UserProfile) using raw dictionaries scatters validation logic across disparate functions and risks corrupted keys.",
      scenario: "If 10 different functions modify account balance dictionaries directly, an invalid negative balance could be written anywhere. Encapsulating balance logic inside a BankAccount class guarantees that every deposit and withdrawal obeys invariants.",
      steps: [
        "1. Declare a class blueprint defining properties and methods.",
        "2. Instantiate objects: account1 = BankAccount('Alice', 1000).",
        "3. Invoke methods on instances: account1.deposit(250).",
      ],
    },
    concept: {
      summary: "In Python, classes are defined with the `class` keyword. An object is an instance created by calling the class. Each instance maintains its own attribute dictionary (`__dict__`).",
      syntaxBreakdown: {
        syntax: "class BankAccount:\n    def __init__(self, owner: str, balance: float = 0.0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount: float) -> None:\n        if amount <= 0:\n            raise ValueError('Amount must be positive')\n        self.balance += amount",
        parts: [
          { label: "class BankAccount", explanation: "Defines a new user-defined type." },
          { label: "__init__", explanation: "The initializer method called automatically when creating a new instance." },
          { label: "self", explanation: "Explicit reference to the specific instance currently being operated on." },
          { label: "self.owner / self.balance", explanation: "Instance attributes stored directly on the object's heap allocation." },
        ],
      },
      keyPoints: [
        "Everything in Python is an object, including integers, functions, and classes themselves.",
        "Methods inside a class must always accept `self` as their first parameter.",
        "Calling `obj.method(arg)` is syntactic sugar for `ClassName.method(obj, arg)`.",
      ],
      codeExample: {
        language: "python",
        title: "Defining a Class and Instantiating Objects",
        code: `class BankAccount:
    """A bank account with balance tracking and transaction validation."""
    def __init__(self, owner: str, initial_balance: float = 0.0):
        self.owner = owner
        self.balance = initial_balance

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.balance += amount
        print(f"Deposited \${amount:.2f}. New Balance: \${self.balance:.2f}")

    def withdraw(self, amount: float) -> None:
        if amount > self.balance:
            raise ValueError("Insufficient funds.")
        self.balance -= amount
        print(f"Withdrew \${amount:.2f}. Remaining Balance: \${self.balance:.2f}")

# Creating two distinct object instances
alice_acc = BankAccount("Alice", 500.0)
bob_acc = BankAccount("Bob", 100.0)

alice_acc.deposit(150.0)
bob_acc.withdraw(50.0)`,
        expectedOutput: "Deposited $150.00. New Balance: $650.00\nWithdrew $50.00. Remaining Balance: $50.00",
      },
    },
    buildSteps: [
      {
        title: "Step 1: Inspecting Instance State with __dict__",
        explanation: "Every Python object stores its unique instance attributes in an internal dictionary called __dict__:",
        code: {
          language: "python",
          code: `class ServerConfig:
    def __init__(self, host: str, port: int):
        self.host = host
        self.port = port

config = ServerConfig("127.0.0.1", 8000)
print("Internal Attribute Dict:", config.__dict__)`,
          expectedOutput: "Internal Attribute Dict: {'host': '127.0.0.1', 'port': 8000}",
        },
      },
    ],
    useIt: [
      "Use classes to bundle related state and behavior into a single cohesive domain entity.",
      "Use dataclasses (from dataclasses import dataclass) for lightweight data-holding structures.",
    ],
    shipIt: [
      "Build an InventoryItem class that manages stock count, unit price, and restock notifications.",
    ],
    exercises: [
      "What is the exact purpose of the 'self' keyword in Python methods?",
      "Can two instances of the same class modify each other's instance attributes directly?",
    ],
  },
};

