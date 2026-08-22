# VS Code Setup for Python

## Learning Objectives

- Install VS Code
- Install the Python extension
- Open a Python file and run it inside VS Code
- Configure basic settings for Python development

---

## Why VS Code?

VS Code is a free, open-source editor with excellent Python support:

- Syntax highlighting
- IntelliSense (autocomplete)
- Integrated terminal
- Debugger
- Linting and formatting

---

## Step 1 — Install VS Code

Download from: https://code.visualstudio.com/

---

## Step 2 — Install the Python Extension

1. Open VS Code
2. Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS)
3. Search for **Python** by Microsoft
4. Click Install

---

## Step 3 — Select Your Python Interpreter

1. Open a `.py` file
2. Press `Ctrl+Shift+P` → type **Python: Select Interpreter**
3. Choose the Python 3 version you installed

---

## Step 4 — Open the Integrated Terminal

Press `` Ctrl+` `` to open the terminal inside VS Code.

Run Python directly from here:

```bash
python example.py
```

---

## Recommended Extensions

| Extension | Purpose |
|-----------|---------|
| Python (Microsoft) | Core Python support |
| Pylance | Fast type checking and IntelliSense |
| Ruff | Fast linting |
| GitLens | Git integration |

---

## Useful Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.rulers": [88],
  "python.defaultInterpreterPath": "${workspaceFolder}/.venv/bin/python"
}
```

---

## Running Python Files in VS Code

Three ways:

1. Right-click the file → **Run Python File in Terminal**
2. Click the ▶ button in the top-right corner
3. Open the terminal and run `python filename.py`

---

## Next Lesson

[04 — Running Python](../04-running-python/)
