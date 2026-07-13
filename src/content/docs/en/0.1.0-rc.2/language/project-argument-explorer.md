---
title: Project: an argument explorer
description: Combine variables, functions, conditions, arrays, and loops in one program.
sidebar:
  order: 8
---

We have learned the main building blocks of a small Pop program. Let us combine them into a command-line tool that counts its arguments and prints each one.

Create `explore.pop` with the code in Listing 2-1:

```pop title="explore.pop"
namespace Explorer

function showArguments(arguments: Array<String>)
    local index = 1

    while Array.length(arguments) > index - 1 do
        print(Array.get(arguments, index))
        index = index + 1
    end
end

function main(arguments: Array<String>)
    local count = Array.length(arguments)

    print("Argument count")
    print(count)

    if count > 0 then
        print("Arguments")
        showArguments(arguments)
    else
        print("No arguments were supplied")
    end
end
```

_Listing 2-1: Counting and displaying command-line arguments_

Run it with a few values:

```sh
pop run explore.pop -- Pop "two words" 42
```

The result is:

```text
Argument count
3
Arguments
Pop
two words
42
```

The final `42` is still a string because every command-line argument arrives as text. `print` chooses its string overload from that type.

## Following the program

Execution begins in `main`. It asks the array for its length and stores that `Int` in `count`. The `if` then chooses between calling `showArguments` and printing the empty case.

`showArguments` starts at position `1`, because Pop array positions are one-based. Its loop condition is another way to say that the current position is no greater than the array length: while `length > index - 1`, an element exists at `index`. After printing that element, assignment advances the position.

The length does not change during the loop because arrays are fixed-length. That makes the condition stable and ensures the loop stops after the last item.

## Try it yourself

Change the program to print `First argument` and only the first item before it prints the complete list. Remember to do this only inside the `count > 0` branch, where position `1` is known to exist.

Then add a local named `remaining` initialized to `count - 1` and print it. These small changes practice reading a value, performing checked integer arithmetic, and keeping an array access inside the condition that makes it safe.
