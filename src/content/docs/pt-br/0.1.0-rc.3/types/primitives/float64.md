---
title: Float64
description: Use o formato padrão de ponto flutuante de 64 bits.
sidebar:
  order: 12
---

`Float64` é o tipo padrão de um literal que contém um ponto decimal ou expoente. `Float` é um alias exato.

```pop
local distance = 12.75
local scale = 6.02e23
local tiny = 2e-3
```

`Float64` aceita `+`, `-`, `*`, `/`, `-` unário e os quatro operadores de ordenação com outro `Float64`.

```pop
local whole = Int32(distance) -- 12
local text = String(distance)
```

A conversão de ponto flutuante para inteiro trunca em direção a zero e causa uma falha para NaN, infinito ou um resultado fora do intervalo. A formatação de strings de primitivas independe da localidade.
