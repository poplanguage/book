---
title: Conversões numéricas
description: Converta explicitamente entre tipos numéricos fixos com semântica verificada.
sidebar:
  order: 5
---

Converta um valor numérico existente chamando o tipo de destino:

```pop
local count: Int = 42
local compact = Int8(count)
local unsigned = UInt32(count)
local measurement = Float64(count)
```

Essa sintaxe é conhecida pelo compilador; não se trata de uma sobrecarga comum nem de uma busca em tempo de execução. Ela aceita exatamente um operando numérico. Pop não realiza ampliação implícita entre valores existentes.

## De inteiro para inteiro

O resultado deve caber no intervalo exato do tipo de destino:

```pop
local wide: Int = 1_000
local compact = UInt8(wide) -- falha: maior que 255
```

A mudança de largura ou de sinal sempre é explícita. Uma conversão fora do intervalo causa uma falha `NumericConversion`; ela nunca dá a volta no intervalo.

## De inteiro para ponto flutuante

A conversão usa o arredondamento IEEE para o valor mais próximo, com desempate para o par, no formato de destino:

```pop
local count: UInt64 = 9_007_199_254_740_993
local approximate = Float64(count)
```

Inteiros grandes podem ser arredondados porque um formato de ponto flutuante não consegue representar todos os inteiros de seu intervalo.

## De ponto flutuante para inteiro

A conversão trunca em direção a zero:

```pop
local positive = Int32(12.75)  -- 12
local negative = Int32(-12.75) -- -12
```

NaN, infinito e resultados fora do intervalo causam uma falha `NumericConversion`.

## Largura de ponto flutuante

A conversão de `Float32` para `Float64` é exata. A conversão de `Float64` para `Float32` arredonda para a representação de destino:

```pop
local compact: Float32 = 1.25
local wide = Float64(compact)
local compactAgain = Float32(wide)
```

Converter um valor para seu próprio tipo numérico canônico o preserva.
