---
title: Type aliases
description: Give an existing type a readable source name with no runtime wrapper.
sidebar:
  order: 4
---

A namespace `type` declaration aliases another type:

```pop
public type PlayerId = Int64
private type Scores = {[String]: Int}
```

The alias follows normal namespace visibility. It can appear in signatures, local annotations, and nested type expressions:

```pop
public function increase(id: PlayerId, scores: Scores): PlayerId
    return id + 1
end
```

An alias erases recursively to its target before HIR. It has exactly the target's operations, layout, conversions, and runtime identity. It is not a nominal wrapper and adds no constructor.

Alias chains are allowed:

```pop
private type Score = Int
private type ScoreList = {Score}
```

Direct and indirect cycles are rejected. The initial rc.3 alias form has no type parameters, so `Score<String>` and `type Box<T> = ...` are not supported.
