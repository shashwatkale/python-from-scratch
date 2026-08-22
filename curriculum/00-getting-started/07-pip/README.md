# pip — Python Package Manager

## Learning Objectives

- Understand what pip is
- Install, upgrade, and remove packages
- Use requirements.txt

---

## What is pip?

pip is the standard package manager for Python.

It downloads packages from **PyPI** (Python Package Index) at https://pypi.org.

---

## Common pip Commands

```bash
# Install a package
pip install requests

# Install a specific version
pip install requests==2.31.0

# Install from requirements.txt
pip install -r requirements.txt

# Upgrade a package
pip install --upgrade requests

# Uninstall a package
pip uninstall requests

# List installed packages
pip list

# Show info about a package
pip show requests

# Save installed packages to a file
pip freeze > requirements.txt
```

---

## requirements.txt

A plain text file listing your project's dependencies:

```
requests==2.31.0
pytest==8.0.0
ruff==0.4.0
```

Pin versions for reproducibility.

---

## Checking What is Installed

```bash
pip list
```

Output:

```
Package    Version
---------- -------
pip        24.0
requests   2.31.0
```

---

## pip vs pip3

On some systems, `pip` points to Python 2's pip.

Use `pip3` to be explicit, or use:

```bash
python -m pip install requests
```

This always uses the pip associated with the current Python.

---

## Next Lesson

[08 — First Python Program](../08-first-python-program/)
