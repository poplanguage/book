---
title: Break and continue
description: Leave or advance the innermost loop.
sidebar:
  order: 8
---

`break` exits the innermost `while`, `repeat`, or numeric `for` loop:

```pop
local number = 1

while true do
    if number > 3 then
        break
    end

    print(number)
    number += 1
end
```

`continue` advances the innermost loop without running the rest of its body:

```pop
for number = 1, 6 do
    if number == 3 then
        continue
    end

    print(number)
end
```

Its destination depends on the loop:

| Loop | `continue` proceeds to |
| --- | --- |
| `while` | the condition |
| `repeat` | the `until` condition |
| numeric `for` | checked range advancement |

Both statements target only the innermost loop and take no label or value. A nested local function creates a boundary; it cannot `break` or `continue` its caller's loop.

In rc.3, a `repeat` that declares a body local used by `until` cannot also `continue` to that condition, because the skipped declaration might leave the condition without an initialized value.
