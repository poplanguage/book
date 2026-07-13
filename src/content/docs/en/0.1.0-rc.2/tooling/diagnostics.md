---
title: Reading diagnostics
description: Use Pop's error codes, spans, labels, and notes to fix a program.
sidebar:
  order: 3
---

When Pop rejects source, it reports a diagnostic with a code, message, and source location. Additional labels point to related declarations or expressions, and notes explain constraints that cannot fit in the headline.

Diagnostic code ranges group related work:

| Range | Area |
| --- | --- |
| `POP000x` | syntax and source structure |
| `POP100x` | names, imports, and visibility |
| `POP200x` | types and operations |
| `POP400x` | compile-time evaluation and attributes |
| `POP6400`–`POP6401` | documentation XML warnings |

Begin with the first diagnostic in source order. A missing `end`, for example, can make later declarations appear malformed. Fixing the earliest structural problem often removes several follow-on messages.

## Errors and warnings

An error prevents the requested compilation stage from succeeding. A warning reports a suspicious or unsafe-to-process construct without necessarily rejecting the program. Documentation XML uses warnings so malformed or unsafe markup can be corrected while its surrounding Pop declaration remains understandable.

## Small experiments

When a message is unclear, reduce the program to the smallest file that still produces it. Keep the namespace, the relevant declaration, and one call. Running `pop check reduced.pop` gives a faster and less noisy feedback loop than repeatedly building a large executable.

Include the Pop version, diagnostic code, reduced source, and exact command when reporting a compiler issue. Diagnostics and accepted syntax can differ between book versions.
