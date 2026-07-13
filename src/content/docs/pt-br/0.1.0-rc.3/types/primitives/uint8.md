---
title: UInt8
description: Use um inteiro sem sinal do tamanho de um byte.
sidebar:
  order: 7
---

`UInt8` armazena valores de `0` a `255`. `Byte` é um alias exato dele.

```pop
local red: UInt8 = 220
local green: Byte = 128
local brighter = red + 1
```

Inteiros sem sinal não aceitam `-` unário. A aritmética é verificada, portanto somar `1` a `255` causa uma falha em vez de dar a volta para zero.

```pop
local value: Int = 200
local octet = UInt8(value)
```

A conversão causa uma falha se a origem for negativa ou maior que `255`.
