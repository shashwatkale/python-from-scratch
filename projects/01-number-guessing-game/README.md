# Project 01 — Number Guessing Game

## What This Project Covers

- Variables
- `input()` and `print()`
- `int()` type conversion
- `if / elif / else`
- `while` loops
- `random` module
- Basic game logic

## How to Run

```bash
python projects/01-number-guessing-game/main.py
```

## How to Run Tests

```bash
pytest projects/01-number-guessing-game/tests/
```

## How It Works

1. Python picks a random number between 1 and 100
2. The player guesses
3. Python says "too high", "too low", or "correct"
4. The game counts attempts and ends when the player guesses correctly

## Example Session

```
Guess the number (1–100): 50
Too high!
Guess the number (1–100): 25
Too low!
Guess the number (1–100): 37
Correct! You got it in 3 attempts.
```

## Architecture

```
main.py
  └── game_logic.py   ← pure functions (testable)
tests/
  └── test_game_logic.py
```

The game logic is separated from the I/O so it can be tested without user input.
