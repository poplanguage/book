---
title: Keywords
description: Reserved words recognized by the 0.1.0-rc.2 lexer.
sidebar:
  order: 2
---

The following words are reserved and cannot be used as ordinary identifiers:

```text
namespace  using      public      internal    private
export     function   local       return      end
const      record     union       class       interface
enum       attribute  type        open        implements
if         then       else        while       repeat
until      for        do          match       when
with       nil        true        false       and
or         not
```

Reservation does not mean every word introduces a complete user-facing feature. In this release, `for` has no implemented loop body semantics, `export` is rejected as a declaration modifier, and `enum`, `type`, and `open` do not form complete supported features for executable programs. They remain reserved so programs cannot use them as names with meanings that would conflict with the grammar.

Built-in type names such as `Int`, `String`, and `Boolean` are language-provided names rather than keywords in the same lexical category.
