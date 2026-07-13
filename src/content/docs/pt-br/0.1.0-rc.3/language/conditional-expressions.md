---
title: Expressões condicionais
description: Selecione um valor avaliado de forma preguiçosa com if e else.
sidebar:
  order: 6
---

Uma expressão `if` escolhe um valor sem antes declarar uma variável local mutável:

```pop
local label = if available then "ready" else "missing"
```

Ela difere de uma instrução `if` de três maneiras visíveis:

- cada ramo é uma única expressão;
- `else` é obrigatório;
- não há um `end` ao final.

A condição deve ser `Boolean`. Depois das conversões comuns permitidas, os dois ramos devem resultar em um único tipo estático idêntico.

```pop
local count: Int8 = if ready then 1 else 0
```

Esse tipo `Int8` esperado é propagado para os dois literais inteiros. O compilador rejeita ramos com tipos diferentes, em vez de inventar um tipo comum dinâmico ou uma união implícita:

```pop
local invalid = if ready then 1 else "um" -- erro de tipo
```

## Avaliação preguiçosa

A condição é executada primeiro, e exatamente um ramo é executado:

```pop
local divisor = 0
local value = if divisor == 0 then 0 else 100 / divisor
```

A divisão não é executada quando `divisor` é zero. A mesma avaliação preguiçosa se aplica durante a avaliação em tempo de compilação e a execução nativa.

Expressões condicionais podem ser aninhadas na posição de `else`:

```pop
local label = if score > 89 then "excelente" else if score > 59 then "aprovado" else "tente novamente"
```

Use a instrução `elseif` quando cada ramo contiver instruções. Pop não usa a pontuação `?:`.
