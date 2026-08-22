# What is Python?

## Learning Objectives

- Understand what Python is and where it came from
- Know the main use cases for Python
- Understand why Python is a good first language
- Know the difference between interpreted and compiled languages

---

## What is Python?

Python is a high-level, general-purpose programming language created by **Guido van Rossum** and first released in **1991**.

It is designed to be readable and simple. Python code looks closer to plain English than most other languages.

```python
# Python
print("Hello, world!")
```

Compare that to Java:

```java
// Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```

Python does the same thing in one line.

---

## Why Python?

- **Readable** — clean syntax, minimal boilerplate
- **Versatile** — web, data, automation, scripting, APIs, ML
- **Large ecosystem** — hundreds of thousands of packages on PyPI
- **Strong community** — extensive documentation and support
- **In-demand** — consistently one of the most used languages professionally

---

## What is Python Used For?

| Domain | Examples |
|--------|---------|
| Web development | Django, Flask, FastAPI |
| Data analysis | Pandas, NumPy |
| Automation | scripts, file processing, bots |
| APIs | REST APIs, microservices |
| DevOps | tooling, infrastructure scripts |
| Machine learning | TensorFlow, PyTorch, scikit-learn |
| Testing | pytest, automation testing |

---

## Interpreted vs Compiled

Python is an **interpreted** language.

- **Compiled** languages (C, Go, Rust) translate your code to machine code before running.
- **Interpreted** languages (Python, Ruby) execute code line by line at runtime via an interpreter.

This means:
- Python is slower at raw execution than compiled languages
- Python is faster to write and iterate on
- No separate compile step — just run the file

---

## Python Versions

The current major version is **Python 3**.

Python 2 reached end-of-life in 2020. Always use Python 3.

Check your version:

```bash
python --version
# or
python3 --version
```

---

## Interview Questions

1. What is Python?
2. Is Python interpreted or compiled?
3. What is dynamic typing?
4. Name three use cases for Python.
5. What is the difference between Python 2 and Python 3?

---

## Summary

- Python is a high-level, interpreted, general-purpose language
- Created in 1991 by Guido van Rossum
- Known for readable syntax and a large ecosystem
- Used in web, data, automation, APIs, and more
- Always use Python 3

## Next Lesson

[02 — Install Python](../02-install-python/)
