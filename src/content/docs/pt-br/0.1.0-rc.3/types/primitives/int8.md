---
title: Int8
description: Use um inteiro com sinal de 8 bits com aritmética verificada.
sidebar:
  order: 3
---

`Int8` armazena números inteiros de `-128` a `127`. Use-o quando um formato ou layout externo exigir especificamente um campo com sinal de 8 bits.

```pop
local temperature: Int8 = -12
local warmer = temperature + 2
local label = `temperatura={warmer}`
```

A aritmética mantém o tipo `Int8` exato e causa uma falha em caso de estouro. Ambos os operandos devem ser `Int8`; Pop não promove silenciosamente um dos lados.

```pop
local wide: Int = 100
local compact = Int8(wide)
```

`Int8(value)` realiza uma conversão verificada e causa uma falha `NumericConversion` quando o valor está fora do intervalo.
