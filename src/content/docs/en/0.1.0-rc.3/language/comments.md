---
title: Comments and documentation
description: Leave notes for readers and attach documentation to declarations.
sidebar:
  order: 4
---

Comments explain code to people and are ignored when the program runs. An ordinary Pop comment begins with two hyphens and continues to the end of the line:

```pop
-- Increase the score after a correct answer.
score = score + 1
```

A comment can also follow code:

```pop
local attempts = 3 -- the player starts with three tries
```

Prefer comments that explain _why_ a decision exists. A comment such as `-- add one` above `count = count + 1` repeats the code without helping its reader.

## Documentation comments

Three hyphens begin a documentation comment. Place consecutive documentation lines directly before a declaration:

```pop
--- Adds two integers.
--- The operation traps if the result overflows Int.
public function add(left: Int, right: Int): Int
    return left + right
end
```

Documentation comments contain XML fragments, which allows tools to preserve structured information. They attach to the next declaration even when attributes appear between the comment and declaration. A blank line or an ordinary `--` comment breaks that attachment.

Malformed XML produces a compiler warning. Document type declarations, entity declarations, and processing instructions are also warned about because documentation should be safe for tools to process.

Documentation generation is not yet exposed as a finished command in 0.1.0-rc.3, but the syntax and compiler validation are implemented. Writing useful documentation now keeps public declarations ready for future tooling.
