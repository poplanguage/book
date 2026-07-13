---
title: Operadores e precedência
description: Consulte os operadores unários e binários implementados.
sidebar:
  order: 3
---

Os operadores estão agrupados abaixo da menor para a maior precedência. Parênteses sempre podem tornar explícito o agrupamento pretendido.

| Grupo | Operadores | Operandos |
| --- | --- | --- |
| alternativa lógica | `or` | `Boolean` |
| conjunção lógica | `and` | `Boolean` |
| igualdade | `==`, `~=` | tipos compatíveis com igualdade |
| ordenação | `<`, `<=`, `>`, `>=` | tipos numéricos correspondentes |
| concatenação | `..` | dois valores `String` |
| aditivos | `+`, `-` | tipos numéricos correspondentes |
| multiplicativos | `*`, `/`, `%` | tipos numéricos correspondentes; `%` apenas para inteiros |
| unários | `not`, `-` | `Boolean`; tipo numérico com sinal |

`and` e `or` usam curto-circuito. Outros operadores binários avaliam seus operandos conforme a avaliação comum de expressões.

A atribuição usa `=`, mas é uma operação de instrução, não uma expressão binária geral que produz um valor. Ela pode ter como destino uma variável local mutável, uma variável local capturada, um campo mutável de classe, um elemento de array ou uma entrada de tabela quando os tipos do destino e do valor coincidem. Parâmetros e vínculos de um `for` numérico são imutáveis.

A atribuição composta deriva das operações implementadas: `+=`, `-=`, `*=`, `/=` e `%=` atualizam destinos numéricos, enquanto `..=` atualiza uma `String`. `%=` funciona apenas com inteiros. Um receptor ou índice é avaliado uma única vez.

A sintaxe de membros e chamadas possui precedência maior que a dos grupos binários:

```pop
value.field
value:method(argument)
functionName(argument)
array[index]
Generic.call<<Type>>(argument)
```

`String(value)` formata explicitamente uma string, um booleano ou um primitivo inteiro ou de ponto flutuante. É uma conversão conhecida pelo compilador, não um método universal. Chamadas de tipos numéricos de destino, como `Int32(value)` e `Float64(value)`, realizam uma conversão explícita verificada.

O símbolo `|` pertence à sintaxe de tipos união, como `String | nil`; ele não é um operador OR bit a bit em tempo de execução. Operadores bit a bit e deslocamentos não estão implementados na versão 0.1.0-rc.3.
