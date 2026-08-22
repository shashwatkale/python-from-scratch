# Virtual Environments

## Learning Objectives

- Understand why virtual environments exist
- Create a virtual environment
- Activate and deactivate it
- Install packages inside it

---

## Why Virtual Environments?

Different projects need different package versions.

Without virtual environments, all packages install globally — versions conflict.

A virtual environment is an **isolated Python installation** for a single project.

```
project-a/
  .venv/   ← has requests==2.28
project-b/
  .venv/   ← has requests==2.31
```

Each project has its own packages. No conflicts.

---

## Creating a Virtual Environment

```bash
python -m venv .venv
```

This creates a `.venv/` folder in your current directory.

---

## Activating

**Windows (Command Prompt):**
```cmd
.venv\Scripts\activate
```

**Windows (PowerShell):**
```powershell
.venv\Scripts\Activate.ps1
```

**macOS / Linux:**
```bash
source .venv/bin/activate
```

After activation, your prompt changes:

```
(.venv) $
```

---

## Deactivating

```bash
deactivate
```

---

## Installing Packages Inside the Environment

With the environment active:

```bash
pip install requests
```

This installs `requests` only inside `.venv/`, not globally.

---

## Saving Dependencies

```bash
pip freeze > requirements.txt
```

This creates a file listing all installed packages and versions.

---

## Restoring Dependencies

On a new machine or after cloning a repo:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

---

## Always Add .venv to .gitignore

```
.venv/
```

Never commit the virtual environment folder to Git.

---

## Next Lesson

[07 — pip](../07-pip/)
