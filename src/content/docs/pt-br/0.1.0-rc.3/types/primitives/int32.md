---
title: Int32
description: Use um inteiro com sinal portátil de 32 bits.
sidebar:
  order: 5
---

O intervalo de `Int32` vai de `-2_147_483_648` a `2_147_483_647`.

```pop
local population: Int32 = 1_500_000
local projected = population + 25_000
local asFloat = Float64(projected)
```

A ordenação aceita `<`, `<=`, `>` e `>=` quando ambos os lados têm o mesmo tipo numérico. A igualdade usa `==` e `~=`.

`Int32(floatValue)` trunca em direção a zero e causa uma falha para NaN, infinito ou um resultado fora do intervalo. Ele nunca dá a volta silenciosamente.
