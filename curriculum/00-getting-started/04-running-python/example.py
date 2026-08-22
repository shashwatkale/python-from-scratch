# example.py — Running Python Files

import sys

print("This file is running.")
print(f"Python version: {sys.version_info.major}.{sys.version_info.minor}")
print(f"Script name: {sys.argv[0]}")

if len(sys.argv) > 1:
    print(f"Arguments passed: {sys.argv[1:]}")
else:
    print("No extra arguments passed.")
    print("Try: python example.py hello world")
