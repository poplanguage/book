---
title: Records
description: Model immutable structural data with named fields.
sidebar:
  order: 3
---

A record groups related values under field names. It is a good fit for data such as coordinates, configuration, or a player’s current score.

```pop
public record Player
    name: String
    score: Int = 0
end
```

`name` is required. `score` has a default value, so an aggregate may omit it when the surrounding context expects `Player`:

```pop
function newPlayer(name: String): Player
    return {
        name = name,
    }
end
```

An aggregate literal is checked against its expected record type. Pop reports missing required fields, unknown fields, duplicate initializers, and values of the wrong type. The order of the initializers does not matter.

## Reading fields

Use a dot to read a record field:

```pop
function showScore(player: Player)
    print(player.name)
    print(player.score)
end
```

Record fields describe a value rather than mutable object slots. To produce a changed copy, use a `with` expression:

```pop
function award(player: Player, points: Int): Player
    return player with {
        score = player.score + points,
    }
end
```

The returned record has the updated score. The original `player` value is unchanged. Fields not mentioned after `with` keep their previous values.

## Defaults

Field defaults are evaluated at compile time. They must therefore use constant expressions rather than runtime input. Defaults make sense for values that are universal for the type, such as a starting score of zero.

## Structural equality

Two values of the same record type compare equal when all corresponding fields compare equal. This works only when equality is available for every field type. Initializer order has no effect on equality.

Use records when you want transparent data with named components and value-like updates. Use a class when identity, private mutable state, or receiver methods are central to the model.
