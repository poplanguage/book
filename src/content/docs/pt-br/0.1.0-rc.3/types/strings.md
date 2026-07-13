---
title: Strings
description: Armazene, compare e imprima texto UTF-8.
sidebar:
  order: 5
---

`String` representa texto UTF-8 válido. Escreva um literal de string entre aspas duplas:

```pop
local language = "Pop"
local greeting = "Olá, mundo!"
local symbol = "🫧"
```

Textos que não sejam ASCII são preservados. O compilador e o ambiente de execução não substituem texto Unicode válido por uma aproximação orientada a bytes.

## Escapes

Strings entre aspas aceitam escapes portáveis, como `\\`, `\"`, `\n`, `\r`, `\t`, `\0`, `\x41` e `\u{1FAE7}`:

```pop
local twoLines = "primeira\nsegunda"
local quoted = "diga \"Pop\""
local bubble = "\u{1FAE7}"
```

## Concatenação

O operador `..`, inspirado no Luau, une duas strings:

```pop
local directory = "src"
local path = directory .. "/main.pop"
```

O operador numérico `+` intencionalmente não concatena strings. Converta uma primitiva explicitamente antes de uni-la:

```pop
local count = 3
local message = "contagem=" .. String(count)
```

`String(value)` formata `String`, `Boolean` e qualquer primitiva inteira ou de ponto flutuante. Essa não é uma operação `toString` universal e rejeita arrays, tabelas, registros, classes e funções.

## Interpolação

As crases interpolam o mesmo conjunto fechado de primitivas. As expressões entre chaves são avaliadas da esquerda para a direita:

```pop
local count = 3
local enabled = true
local summary = `contagem={count}, habilitado={enabled}`
```

Use `\{`, `\}` e `\`` para representar literalmente a pontuação de interpolação dentro de crases. `${value}` não é uma sintaxe do Pop.

## Igualdade

`==` compara o conteúdo das strings e `~=` verifica se os conteúdos são diferentes:

```pop
local expected = "Pop"
local actual = "Pop"
local same = expected == actual -- true
```

A comparação é feita pelo valor UTF-8, não pela identidade dos objetos de string gerenciados.

## Impressão

A base Standard fornece `print(String)`, que escreve a string seguida por uma nova linha:

```pop
print("uma linha")
print("outra linha")
```

Juntamente com `print(Int)`, essa é toda a superfície de sobrecargas de saída de uso geral na rc.3. Concatenação, interpolação e formatação de primitivas são operações da linguagem; APIs de biblioteca para fatiar, pesquisar, alterar maiúsculas e minúsculas, analisar números e inspecionar caracteres Unicode ainda não estão expostas.

A composição de strings pode alocar armazenamento gerenciado. A formatação é determinística e independente da localidade: booleanos usam `true`/`false`, inteiros usam a base dez e valores de ponto flutuante usam grafias portáveis, incluindo `nan`, `inf` e `-inf`.

A página [Composição e formatação de strings](./string-composition-and-formatting/) reúne as orientações práticas para escolher entre `..`, crases e `String(value)`.
