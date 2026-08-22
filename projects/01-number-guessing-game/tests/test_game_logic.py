"""
test_game_logic.py — Tests for the Number Guessing Game logic.
Run: pytest projects/01-number-guessing-game/tests/
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from game_logic import evaluate_guess, feedback_message, pick_number


def test_evaluate_guess_correct():
    assert evaluate_guess(42, 42) == "correct"


def test_evaluate_guess_too_high():
    assert evaluate_guess(80, 50) == "too_high"


def test_evaluate_guess_too_low():
    assert evaluate_guess(10, 50) == "too_low"


def test_pick_number_in_range():
    for _ in range(50):
        n = pick_number(1, 100)
        assert 1 <= n <= 100


def test_pick_number_custom_range():
    for _ in range(20):
        n = pick_number(5, 10)
        assert 5 <= n <= 10


def test_feedback_correct():
    assert feedback_message("correct") == "Correct!"


def test_feedback_too_high():
    assert feedback_message("too_high") == "Too high!"


def test_feedback_too_low():
    assert feedback_message("too_low") == "Too low!"
