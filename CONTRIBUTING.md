# Contributing to Python From Scratch

Thank you for your interest in contributing. This project is built by the community, for the community.

---

## Ways to Contribute

- Fix a typo or error in a lesson
- Improve an explanation
- Add a new lesson
- Add exercises or solutions
- Add a project
- Improve the website
- Report issues

---

## Before You Start

1. Read the [README](README.md) to understand the project structure.
2. Check open issues to avoid duplicate work.
3. For large changes, open an issue first to discuss.

---

## How to Add a Lesson

Every lesson lives in `curriculum/<phase>/<lesson>/`.

### Required files

```
curriculum/01-python-basics/01-variables/
├── README.md       ← lesson content
├── example.py      ← runnable example
├── practice.py     ← practice problems with TODO stubs
└── solution.py     ← completed solutions
```

### Lesson README structure

```markdown
# Lesson Title

## Learning Objectives
## What is it?
## Why is it used?
## Syntax
## Example
## Real-World Example
## Common Mistakes
## Practice
## Challenge
## Interview Questions
## Quiz
## Summary
## Next Lesson
```

### Code standards

- PEP 8 compliant
- Beginner-friendly variable names
- Comments only where they add clarity
- Every example must be runnable with `python example.py`

---

## How to Add an Exercise

Exercises live in `exercises/<difficulty>/`.

### Required fields in each exercise file

```python
"""
Problem: <title>

Difficulty: beginner | easy | medium | hard | interview

Description:
  <what the learner must do>

Input:
  <what input the function receives>

Output:
  <what the function must return>

Example:
  Input: ...
  Output: ...

Constraints:
  - ...

Hints:
  1. ...
"""

def solve():
    # TODO: implement
    pass
```

Solutions go in `solutions/<difficulty>/` with the same filename.

---

## How to Add a Project

Projects live in `projects/<number>-<name>/`.

### Required structure

```
projects/01-number-guessing-game/
├── README.md
├── main.py
├── requirements.txt   (if needed)
└── tests/
    └── test_main.py
```

The README must include:
- What the project does
- How to run it
- How to run tests
- What concepts it covers

---

## Pull Request Workflow

1. Fork the repository
2. Create a branch: `git checkout -b add-lesson-variables`
3. Make your changes
4. Run tests: `pytest`
5. Run lint: `ruff check .`
6. Commit with a clear message: `git commit -m "Add variables lesson to Phase 01"`
7. Push and open a pull request

### PR title format

```
[Phase 01] Add variables lesson
[Exercise] Add medium string reversal exercise
[Project] Add expense tracker project
[Fix] Correct typo in Phase 02 loops lesson
[Web] Add curriculum page
```

---

## Code of Conduct

Be respectful. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## Questions

Open a GitHub Discussion or Issue.
