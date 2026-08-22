# Your First Python Program

## Learning Objectives

- Write a complete Python program from scratch
- Use `print()`, variables, and `input()`
- Run the program from the terminal

---

## What is a Program?

A program is a sequence of instructions that Python executes from top to bottom.

---

## The Simplest Program

```python
print("Hello, world!")
```

Output:

```
Hello, world!
```

---

## A More Complete First Program

```python
print("Welcome to Python From Scratch!")

name = input("What is your name? ")
print(f"Hello, {name}!")

print("Let's write some Python.")
```

Run it:

```bash
python example.py
```

---

## Breaking It Down

| Line | What it does |
|------|-------------|
| `print(...)` | Displays text in the terminal |
| `name = input(...)` | Asks the user to type something and stores it |
| `f"Hello, {name}!"` | An f-string — inserts the variable into the text |

---

## Common Mistakes

```python
# Missing quotes around text
print(Hello)          # NameError

# Missing closing parenthesis
print("Hello"         # SyntaxError

# Wrong indentation
  print("Hello")      # IndentationError
```

---

## Practice

1. Print your name
2. Print your age
3. Ask the user for their favourite programming language and print it back

---

## Challenge

Write a program that:
1. Asks for the user's name
2. Asks for their age
3. Prints: `Hello <name>, you will be <age+1> next year.`

---

## Summary

- `print()` outputs text to the terminal
- `input()` reads text from the user
- Variables store values
- f-strings embed variables inside strings

## Next Phase

[Phase 01 — Python Basics](../../01-python-basics/)
