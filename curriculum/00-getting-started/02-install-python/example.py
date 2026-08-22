# Install Python
#
# This lesson has no runnable code — it covers installation steps.
# Once Python is installed, run this file to confirm it works.

import sys

print(f"Python version: {sys.version}")
print(f"Python executable: {sys.executable}")

major = sys.version_info.major
minor = sys.version_info.minor

if major == 3 and minor >= 10:
    print("✓ Python 3.10+ detected. You are good to go.")
elif major == 3:
    print(f"Python 3.{minor} detected. Consider upgrading to 3.11+.")
else:
    print("Python 2 detected. Please install Python 3.")
