"""
main.py — Number Guessing Game
Run: python main.py
"""

from game_logic import evaluate_guess, feedback_message, pick_number

LOW, HIGH = 1, 100


def get_guess() -> int:
    while True:
        raw = input(f"Guess the number ({LOW}–{HIGH}): ").strip()
        if raw.isdigit():
            value = int(raw)
            if LOW <= value <= HIGH:
                return value
        print(f"Please enter a number between {LOW} and {HIGH}.")


def play() -> None:
    print("=== Number Guessing Game ===")
    target = pick_number(LOW, HIGH)
    attempts = 0

    while True:
        guess = get_guess()
        attempts += 1
        result = evaluate_guess(guess, target)
        print(feedback_message(result))

        if result == "correct":
            print(f"You got it in {attempts} attempt{'s' if attempts != 1 else ''}!")
            break


if __name__ == "__main__":
    play()
