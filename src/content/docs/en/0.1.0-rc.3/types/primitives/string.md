---
title: String
description: Compose immutable UTF-8 text with rc.3 operations.
sidebar:
  order: 13
---

`String` is immutable UTF-8 text. Unicode is preserved in literals and runtime values.

```pop
local language: String = "Pop"
local symbol = "🫧"
local greeting = symbol .. " Hello, " .. language
```

Use `..`, not `+`, for concatenation. Use backticks when interpolation is clearer:

```pop
local release = "0.1.0-rc.3"
local ready = true
local message = `Pop {release}: ready={ready}`
```

`String(value)` explicitly formats a string, boolean, integer, or floating-point primitive. Strings compare by UTF-8 content with `==` and `~=`.

See the full [Strings guide](../strings/) for escapes, interpolation punctuation, formatting rules, and current library boundaries.
