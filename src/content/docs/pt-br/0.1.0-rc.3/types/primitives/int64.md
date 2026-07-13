---
title: Int64
description: Use um inteiro com sinal de 64 bits, a representação por trás de Int.
sidebar:
  order: 6
---

O intervalo de `Int64` vai de `-9_223_372_036_854_775_808` a `9_223_372_036_854_775_807`. `Int` é um alias exato dele e é o tipo padrão de um literal inteiro sem anotação.

```pop
local count: Int64 = 42
local ordinary: Int = count
local next = ordinary + 1
```

Use `Int` para contadores e quantidades comuns de programas. Escreva `Int64` quando a própria largura fizer parte de um formato público ou de um limite nativo.

```pop
local text = String(count)
local measurement = Float64(count)
```

Valores `Int64` grandes podem ser arredondados quando convertidos em um formato de ponto flutuante; a conversão usa a representação IEEE de destino.
