# example.py — Virtual Environments
# Run this after activating your virtual environment to confirm it is working.

import os
import sys

print(f"Python executable: {sys.executable}")
print(f"Virtual env active: {'VIRTUAL_ENV' in os.environ}")

venv_path = os.environ.get("VIRTUAL_ENV", "Not active")
print(f"Virtual env path: {venv_path}")
