---
title: Tipos inteiros
description: Escolha larguras de inteiros e entenda a aritmética verificada.
sidebar:
  order: 2
---

Inteiros representam números inteiros. Pop oferece quatro larguras com sinal e quatro sem sinal.

| Tipo | Mínimo | Máximo |
| --- | ---: | ---: |
| `Int8` | -128 | 127 |
| `Int16` | -32,768 | 32,767 |
| `Int32` | -2,147,483,648 | 2,147,483,647 |
| `Int64` / `Int` | -9,223,372,036,854,775,808 | 9,223,372,036,854,775,807 |
| `UInt8` / `Byte` | 0 | 255 |
| `UInt16` | 0 | 65,535 |
| `UInt32` | 0 | 4,294,967,295 |
| `UInt64` | 0 | 18,446,744,073,709,551,615 |

Use `Int` para trabalhos comuns com números inteiros. Escolha uma largura fixa quando um formato de arquivo, protocolo, interface nativa ou layout de memória exigir isso. Tipos sem sinal são apropriados quando o formato representado é explicitamente sem sinal; eles não substituem a validação de que um valor não é negativo.

## Escrevendo literais inteiros

Literais inteiros usam dígitos decimais. Sublinhados podem separar grupos para facilitar a leitura:

```pop
local population = 8_100_000_000
local mask: UInt8 = 255
```

O sublinhado não altera o valor. Esta versão não implementa prefixos de literais hexadecimais, octais ou binários.

Um valor negativo é escrito aplicando o `-` unário a um literal ou a outra expressão com sinal:

```pop
local temperature = -12
```

Valores sem sinal não aceitam negação unária.

## Aritmética verificada

Pop verifica `+`, `-` e `*` em relação ao intervalo de seu tipo exato. Se um resultado não puder ser representado, a execução falha:

```pop
local maximum: UInt8 = 255
local overflow = maximum + 1 -- falha
```

A divisão e o resto causam uma falha quando o divisor é zero. A divisão com sinal também causa uma falha ao dividir o valor mínimo por `-1`, pois o resultado positivo é uma unidade maior do que o tipo consegue representar.

Não ocorre promoção aritmética. Ambos os operandos já devem ter o mesmo tipo:

```pop
local left: Int32 = 10
local right: Int64 = 20
local total = left + right -- erro de tipo
```

## Conversão explícita

Converta entre tipos numéricos com uma chamada ao tipo de destino:

```pop
local count: Int = 120
local compact = UInt8(count)
local ratio = Float64(count)
```

As conversões nunca são implícitas. O estreitamento de inteiros e a conversão de ponto flutuante para inteiro causam uma falha `NumericConversion` quando o resultado é inválido ou está fora do intervalo de destino. A conversão de ponto flutuante para inteiro trunca em direção a zero.

Use as [páginas individuais de primitivas](./primitives/int8/) para consultar exemplos e intervalos específicos.

A página de [Conversões numéricas](./numeric-conversions/) apresenta todas as famílias de conversão e suas regras de falha.
