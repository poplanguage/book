---
title: Float32
description: Use um valor de ponto flutuante IEEE 754 de 32 bits.
sidebar:
  order: 11
---

`Float32` armazena um valor de ponto flutuante IEEE 754 de 32 bits. Uma anotação faz um literal decimal usar esse formato:

```pop
local ratio: Float32 = 0.5
local scientific: Float32 = 2.5e3
local doubled = ratio * 2.0
```

A aritmética arredonda para `Float32`. A divisão por zero segue o comportamento IEEE e pode produzir infinito. A ordenação com NaN é sempre falsa.

```pop
local count: Int = 7
local ratio = Float32(count)
local wide = Float64(ratio)
```

A conversão de inteiro para ponto flutuante usa o arredondamento IEEE para o valor mais próximo, com desempate para o par. A ampliação de `Float32` para `Float64` é exata.
