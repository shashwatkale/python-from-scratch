# Python Syntax Cheatsheet

## Variables & Types

```python
x = 10          # int
y = 3.14        # float
name = "Alice"  # str
flag = True     # bool
nothing = None  # NoneType

type(x)         # <class 'int'>
isinstance(x, int)  # True
```

## String Formatting

```python
f"Hello, {name}!"
"Hello, {}!".format(name)
"Hello, %s!" % name
```

## Operators

```python
# Arithmetic
+ - * / // % **

# Comparison
== != < > <= >=

# Logical
and  or  not

# Identity
is   is not

# Membership
in   not in
```

## Control Flow

```python
if x > 0:
    print("positive")
elif x == 0:
    print("zero")
else:
    print("negative")

# Ternary
result = "yes" if x > 0 else "no"
```

## Loops

```python
for i in range(5):
    print(i)

for item in my_list:
    print(item)

while condition:
    do_something()
    if done:
        break
```

## Functions

```python
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

# Lambda
square = lambda x: x ** 2

# *args / **kwargs
def func(*args, **kwargs):
    print(args, kwargs)
```

## Lists

```python
lst = [1, 2, 3]
lst.append(4)
lst.pop()
lst[0]       # first
lst[-1]      # last
lst[1:3]     # slice
[x*2 for x in lst]  # comprehension
```

## Dictionaries

```python
d = {"key": "value"}
d["key"]          # access
d.get("key")      # safe access
d.keys()
d.values()
d.items()
{k: v for k, v in d.items()}  # comprehension
```

## Sets

```python
s = {1, 2, 3}
s.add(4)
s.remove(1)
s1 & s2   # intersection
s1 | s2   # union
s1 - s2   # difference
```

## Tuples

```python
t = (1, 2, 3)
a, b, c = t   # unpacking
t[0]          # indexing (immutable)
```

## Exception Handling

```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
except (TypeError, ValueError):
    pass
else:
    print("No error")
finally:
    print("Always runs")
```

## File Handling

```python
with open("file.txt", "r") as f:
    content = f.read()

with open("file.txt", "w") as f:
    f.write("hello")
```

## Classes

```python
class Dog:
    def __init__(self, name: str) -> None:
        self.name = name

    def bark(self) -> str:
        return f"{self.name} says woof!"

dog = Dog("Rex")
print(dog.bark())
```

## Comprehensions

```python
[x**2 for x in range(10)]
{x: x**2 for x in range(5)}
{x for x in range(5) if x % 2 == 0}
(x**2 for x in range(10))  # generator
```

## Useful Built-ins

```python
len(x)
range(start, stop, step)
enumerate(iterable)
zip(a, b)
map(func, iterable)
filter(func, iterable)
sorted(iterable, key=..., reverse=True)
min(x)  max(x)  sum(x)
any(iterable)  all(iterable)
```
