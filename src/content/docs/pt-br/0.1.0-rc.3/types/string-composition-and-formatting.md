---
title: Composição e formatação de strings
description: Escolha entre concatenação, interpolação ou formatação explícita de primitivas.
sidebar:
  order: 7
---

A rc.3 oferece três ferramentas relacionadas e estaticamente tipadas para construir texto.

## Una duas strings com `..`

Use a concatenação quando os operandos já forem strings:

```pop
local directory = "src"
local path = directory .. "/main.pop"
```

Ambos os operandos devem ser `String`. `"count=" .. 3` é um erro de tipo, e `+` continua sendo exclusivamente numérico.

## Interpole primitivas com crases

Use crases para criar textos mistos legíveis:

```pop
local count = 3
local ready = true
local summary = `contagem={count}, pronto={ready}`
```

A interpolação aceita somente `String`, `Boolean`, primitivas inteiras e primitivas de ponto flutuante. Os segmentos são avaliados uma única vez, da esquerda para a direita. Arrays, tabelas, registros, classes, funções e objetos arbitrários são rejeitados.

As crases usam `{expression}`, não `${expression}` do JavaScript. Use `\{`, `\}` e `\`` como escapes para pontuação literal.

## Formate uma primitiva com `String(value)`

Use a formatação explícita quando outra operação precisar de um valor de string completo:

```pop
local count = 3
local prefix = "contagem="
local summary = prefix .. String(count)
```

A formatação é determinística e independe da localidade. Não há `toString` herdado, inspeção de tipo em tempo de execução ou fallback dinâmico.

A composição de strings e a formatação que não seja identidade podem alocar memória. `String(existingString)` é uma operação de identidade.
