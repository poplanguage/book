---
title: Functions
description: Name reusable behavior, receive parameters, and return values.
sidebar:
  order: 2
---

Functions let us give a name to a sequence of instructions and use it more than once. We have already used the special `main` function. Ordinary functions use the same syntax:

```pop
namespace Greetings

function greet(name: String)
    print("Hello")
    print(name)
end

function main()
    greet("Ada")
    greet("Linus")
end
```

The `name: String` parameter says that `greet` needs one string. A call supplies that value between parentheses.

## Returning a value

Write the result type after the parameter list, then use `return` to send a value back to the caller:

```pop
function double(number: Int): Int
    return number * 2
end
```

Calling `double(6)` produces the value `12`:

```pop
local answer = double(6)
print(answer)
```

Pop checks both sides of the function boundary. Each argument must match its parameter type, and every returned value must match the declared result type.

Unlike local variables, a function result is not inferred. If the declaration has no result annotation, the function returns no value. Use `: Int`, `: String`, or another type whenever callers need a result.

## More than one parameter

Separate parameters and arguments with commas:

```pop
function add(left: Int, right: Int): Int
    return left + right
end

local total = add(20, 22)
```

Arguments are matched by position: `20` becomes `left`, and `22` becomes `right`.

## Returning from a decision

A result-producing function must return on every path that can reach its end:

```pop
function larger(left: Int, right: Int): Int
    if left > right then
        return left
    else
        return right
    end
end
```

Removing the `else` branch would leave a path with no result when `left` is not greater than `right`, so Pop rejects that version.

## Visibility

Functions without a visibility word are available within their current Bubble. Add `public` when code in another Bubble should be able to call one:

```pop
public function add(left: Int, right: Int): Int
    return left + right
end
```

The Modules and Packages part explains `public`, `internal`, and `private` in context. While learning, an omitted visibility is usually all you need.
