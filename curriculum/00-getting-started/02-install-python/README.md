# Install Python

## Learning Objectives

- Download and install Python 3
- Verify the installation from the terminal
- Understand what gets installed with Python

---

## Step 1 — Download Python

Go to: https://www.python.org/downloads/

Download the latest **Python 3** release for your operating system.

---

## Step 2 — Install Python

### Windows

1. Run the installer
2. **Check "Add Python to PATH"** before clicking Install
3. Click "Install Now"

### macOS

Option A — Official installer from python.org  
Option B — Homebrew:

```bash
brew install python
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

---

## Step 3 — Verify Installation

Open a terminal and run:

```bash
python --version
```

Expected output:

```
Python 3.12.x
```

If `python` does not work, try `python3`:

```bash
python3 --version
```

---

## Step 4 — Verify pip

pip is the Python package manager. It is installed with Python.

```bash
pip --version
```

---

## What Gets Installed

| Component | Purpose |
|-----------|---------|
| `python` | The interpreter |
| `pip` | Package manager |
| `venv` | Virtual environment tool |
| IDLE | Basic built-in editor (optional) |

---

## Common Issues

**"python is not recognized"** (Windows)  
→ Re-run the installer and check "Add Python to PATH"

**`python` runs Python 2** (macOS/Linux)  
→ Use `python3` instead, or set up an alias

---

## Confirm It Works

Run the example file:

```bash
python curriculum/00-getting-started/02-install-python/example.py
```

---

## Next Lesson

[03 — VS Code Setup](../03-vscode-setup/)
