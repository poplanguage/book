---
title: Reading command-line arguments
description: Let a Pop program receive text from the command line.
sidebar:
  order: 4
---

The Hello World program always prints the same message. We can make it a little more useful by letting the person running it choose a name.

Replace the contents of `hello.pop` with Listing 1-2:

```pop title="hello.pop"
namespace Hello

function main(arguments: Array<String>)
    if Array.length(arguments) > 0 then
        local name = Array.get(arguments, 1)
        print("Hello")
        print(name)
    else
        print("Hello, stranger")
    end
end
```

_Listing 1-2: Greeting the name supplied on the command line_

Run the program and place an argument after `--`:

```sh
pop run hello.pop -- Ada
```

The program prints:

```text
Hello
Ada
```

The `--` separates options meant for the `pop` command from arguments meant for your program. Try running the program without an argument:

```sh
pop run hello.pop
```

This time it prints `Hello, stranger`.

## Receiving arguments

Our first `main` used empty parentheses. The new declaration asks Pop to give the function an array of strings:

```pop
function main(arguments: Array<String>)
```

`arguments` is the name we chose for the value. `Array<String>` means an ordered collection whose elements are strings. Pop does not include the program’s own filename in this array, so the first item is the first value written after `--`.

Before reading an item, the program checks whether the array contains anything:

```pop
if Array.length(arguments) > 0 then
```

`Array.length(arguments)` gives the number of items. The `if` expression runs the following block only when that number is greater than zero. If it is not, the `else` block runs instead.

Inside the first branch, this line obtains the first item:

```pop
local name = Array.get(arguments, 1)
```

`local` creates a name that can be used within the current block. Pop arrays are numbered from `1`, so index `1` is the first item. `Array.get` expects a valid position; our length check makes that true.

Finally, the program prints a greeting and the supplied name:

```pop
print("Hello")
print(name)
```

The Standard foundation in this release prints each call on its own line and does not yet provide general string formatting or concatenation. Command-line arguments are always strings, even when their text looks like a number. We will learn how arrays, conditions, and types work in detail in later chapters.
