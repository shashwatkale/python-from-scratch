"""
Exercise: Two Sum
Difficulty: interview

Description:
  Given a list of integers and a target, return the indices of the
  two numbers that add up to the target.
  Assume exactly one solution exists. Do not use the same element twice.

Input:  nums=[2, 7, 11, 15], target=9
Output: [0, 1]

Input:  nums=[3, 2, 4], target=6
Output: [1, 2]

Constraints:
  - 2 <= len(nums) <= 10^4
  - Each input has exactly one solution

Hints:
  1. A brute-force approach uses two nested loops — O(n²)
  2. A hash map approach solves it in O(n)
"""


def two_sum(nums: list[int], target: int) -> list[int]:
    # TODO: implement
    pass


if __name__ == "__main__":
    print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
    print(two_sum([3, 2, 4], 6))       # [1, 2]
