---
title: Expressões e operadores
description: Produza valores com aritmética, comparação, lógica e chamadas.
sidebar:
  order: 3
---

Uma expressão é um trecho de código que produz um valor. Literais como `4`, `true` e `"Pop"` são expressões. Nomes, chamadas de função e operações também são expressões.

```pop
local base = 20
local result = base * 2 + 2
```

Pop avalia a multiplicação antes da adição, portanto `result` é `42`. Parênteses podem tornar explícita uma ordem diferente:

```pop
local result = base * (2 + 2)
```

## Aritmética

Pop oferece os operadores numéricos conhecidos:

| Operador | Significado |
| --- | --- |
| `+` | adição |
| `-` | subtração |
| `*` | multiplicação |
| `/` | divisão |
| `%` | resto inteiro |

Os dois operandos devem ter o mesmo tipo numérico. Pop não mistura silenciosamente, por exemplo, `Int32` e `Int64`. O operador `%` está disponível somente para inteiros.

A aritmética de inteiros é verificada. Estouro, divisão por zero e o menor valor com sinal dividido por `-1` interrompem a execução com um trap, em vez de produzir um valor com contorno.

O operador unário `-` nega um número com sinal. Inteiros sem sinal não podem ser negados.

## Comparando valores

Operadores de comparação produzem um `Boolean`:

```pop
local same = left == right
local different = left ~= right
local smaller = left < right
local atMost = left <= right
local greater = left > right
local atLeast = left >= right
```

`==` testa igualdade e `~=` testa desigualdade. A ordenação com `<`, `<=`, `>` e `>=` está disponível para dois números do mesmo tipo.

A igualdade é deliberadamente orientada por tipos. Ela funciona para `nil`, booleanos, inteiros, strings e valores compostos aceitos. Arrays, tabelas e funções não têm igualdade geral de valores nesta versão. Classes comparam sua identidade: dois nomes são iguais quando se referem ao mesmo objeto.

## Lógica booleana

Use `and`, `or` e `not` com valores Boolean:

```pop
local canEnter = hasTicket and not banned
local needsHelp = lost or injured
```

`and` para assim que seu lado esquerdo é `false`, pois a expressão completa não pode mais se tornar verdadeira. `or` para assim que seu lado esquerdo é `true`. Esse comportamento de curto-circuito é útil quando o lado direito só deve ser executado se necessário.

## Strings e conversão

Use `..` para concatenar strings, crases para interpolação e `String(value)` para formatar primitivas explicitamente:

```pop
local count = 3
local joined = "count=" .. String(count)
local interpolated = `count={count}`
```

O operador aritmético `+` permanece intencionalmente restrito a números. Chamadas a tipos numéricos de destino realizam uma conversão explícita:

```pop
local count: Int = 42
local compact = Int8(count)
local decimal = Float64(count)
```

O estreitamento de inteiros e conversões inválidas de ponto flutuante para inteiro causam um trap, em vez de contornar o valor ou fazer suposições.

## Valores condicionais

Uma expressão `if` produz um valor selecionado de forma preguiçosa:

```pop
local description = if available then "pronto" else "ausente"
```

Sua condição é `Boolean`, exatamente um ramo é executado e ambos os ramos têm um único tipo estático.
