---
title: Enums
description: Modele um conjunto nominal fechado de casos sem payload.
sidebar:
  order: 5
---

Um enum declara um conjunto fechado de valores nomeados:

```pop
public enum Color
    Red
    Green
    Blue
end
```

Referencie um caso por meio de seu tipo enum:

```pop
local selected: Color = Color.Blue
local isBlue = selected == Color.Blue
```

Enums são nominais. Duas declarações com os mesmos nomes de casos ainda são tipos diferentes, e a igualdade ou desigualdade exige que ambos os operandos tenham exatamente o mesmo tipo enum.

## Representação e limites

Internamente, a ordem de declaração atribui um discriminante `UInt32` compacto iniciado em zero, mas não há conversão implícita entre um enum e um inteiro. Enums aceitam `==` e `~=`; ordenação e aritmética são rejeitadas.

Use um enum quando as alternativas não tiverem payload. Use uma [união etiquetada](./tagged-unions/) quando os casos carregarem dados diferentes. A rc.3 não implementa discriminantes personalizados, enums de flags, iteração de casos nem conversão explícita para inteiro.
