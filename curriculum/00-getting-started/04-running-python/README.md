# Running Python Files

## Learning Objectives

- Run a Python file from the terminal
- Understand what happens when Python executes a file
- Pass arguments to a Python script

---

## Running a File

Save a file as `hello.py`:

```python
print("Hello, world!")
```

Run it from the terminal:

```bash
python hello.py
```

Output:

```
Hello, world!
```

---

## What Happens When You Run a File

1. Python reads the file top to bottom
2. Each statement is executed in order
3. The program exits when it reaches the end (or an error)

---

## Running Files from Any Directory

Always run Python from the project root:

```bash
cd python-from-scratch
python curriculum/00-getting-started/04-running-python/example.py
```

---

## Command-Line Arguments

You can pass arguments to a script using `sys.argv`:

```python
import sys

print("Arguments:", sys.argv)
```

Run:

```bash
python script.py hello world
```

Output:

```
Arguments: ['script.py', 'hello', 'world']
```

`sys.argv[0]` is always the script name.

---

## Common Errors When Running Files

| Error | Cause |
|-------|-------|
| `No such file or directory` | Wrong path or filename |
| `SyntaxError` | Invalid Python syntax in the file |
| `ModuleNotFoundError` | Imported package not installed |
| `IndentationError` | Inconsistent indentation |

---

## Next Lesson

[05 — Python REPL](../05-python-repl/)
