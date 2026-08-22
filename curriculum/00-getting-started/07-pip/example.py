# example.py — pip
# Demonstrates inspecting installed packages programmatically.

import importlib.metadata
import sys


def check_package(name: str) -> None:
    try:
        version = importlib.metadata.version(name)
        print(f"✓ {name} {version} is installed")
    except importlib.metadata.PackageNotFoundError:
        print(f"✗ {name} is NOT installed")


print(f"Python {sys.version_info.major}.{sys.version_info.minor}\n")

# Check a few common packages
for pkg in ["pip", "pytest", "ruff", "requests"]:
    check_package(pkg)
