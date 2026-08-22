# The Python REPL

## Learning Objectives

- Open the Python REPL
- Use the REPL to experiment with Python expressions
- Understand when to use the REPL vs a file

---

## What is the REPL?

REPL stands for **Read-Eval-Print Loop**.

It is an interactive Python shell where you type one expression at a time and see the result immediately.

---

## Opening the REPL

```bash
python
```

You will see:

```
Python 3.12.0 (...)
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

The `>>>` prompt means Python is waiting for input.

---

## Using the REPL

```python
>>> 2 + 2
4
>>> "hello".upper()
'HELLO'
>>> name = "Python"
>>> print(f"Hello, {name}!")
Hello, Python!
```

---

## Multi-line Input

The REPL uses `...` for continuation:

```python
>>> for i in range(3):
...     print(i)
...
0
1
2
```

---

## Exiting the REPL

```python
>>> exit()
```

Or press `Ctrl+D` (macOS/Linux) / `Ctrl+Z` then Enter (Windows).

---

## REPL vs Files

| REPL | File |
|------|------|
| Quick experiments | Permanent code |
| One-off calculations | Reusable programs |
| Testing a function | Full applications |
| Learning syntax | Projects |

---

## Useful REPL Tricks

```python
# Get help on any object
>>> help(str)

# See all methods on an object
>>> dir([])

# Check the type of a value
>>> type(42)
<class 'int'>
```

---

## Next Lesson

[06 — Virtual Environments](../06-virtual-environments/)
