---
title: UInt32
description: Use um inteiro sem sinal portátil de 32 bits.
sidebar:
  order: 9
---

`UInt32` armazena valores de `0` a `4_294_967_295`.

```pop
local flags: UInt32 = 1_024
local doubled = flags * 2
local description = `valor={doubled}`
```

A rc.3 implementa aritmética e ordenação, mas não operadores bit a bit nem deslocamentos. Use `UInt32` para um valor inteiro com essa representação, não como promessa de uma API de máscaras de bits.

`Int64(flags)` é uma conversão inteira verificada exata porque todo valor `UInt32` cabe em `Int64`.
