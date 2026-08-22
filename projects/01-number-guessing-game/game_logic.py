"""
game_logic.py — Pure game logic for the Number Guessing Game.
Separated from I/O so it can be unit tested.
"""

import random


def pick_number(low: int = 1, high: int = 100) -> int:
    """Return a random integer between low and high (inclusive)."""
    return random.randint(low, high)


def evaluate_guess(guess: int, target: int) -> str:
    """
    Compare guess to target.

    Returns:
        "correct"  — guess matches target
        "too_high" — guess is above target
        "too_low"  — guess is below target
    """
    if guess == target:
        return "correct"
    if guess > target:
        return "too_high"
    return "too_low"


def feedback_message(result: str) -> str:
    messages = {
        "correct": "Correct!",
        "too_high": "Too high!",
        "too_low": "Too low!",
    }
    return messages[result]
