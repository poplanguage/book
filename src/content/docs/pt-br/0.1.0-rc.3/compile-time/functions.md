---
title: Funções de tempo de compilação
description: Avalie lógica auxiliar pura enquanto o programa é compilado.
sidebar:
  order: 2
---

O atributo confiável `@CompileTime` marca uma função que pode ser executada durante a compilação:

```pop
@CompileTime
function doubled(value: Int): Int
    return value * 2
end

const BUFFER_SIZE: Int = doubled(512)
```

Aqui, a chamada é avaliada pelo compilador, e `BUFFER_SIZE` se torna `1024` antes que o código de tempo de execução seja emitido. Os usos da constante em tempo de execução recebem esse `Int` já avaliado; não há consulta de nome em tempo de execução nem global mutável.

Funções de tempo de compilação podem dar suporte a declarações de constantes, valores padrão de campos, argumentos de atributos e validadores de atributos. Seus parâmetros e resultados continuam usando tipos comuns de Pop, e seus corpos passam por verificação de tipos como os de outras funções.

## Chamadas fechadas em tempo de compilação

Uma função de tempo de compilação não pode chamar código arbitrário de tempo de execução. Toda função Pop que ela chamar também deve estar marcada com `@CompileTime`:

```pop
function runtimeOnly(): Int
    return 42
end

@CompileTime
function invalid(): Int
    return runtimeOnly() -- rejeitada
end
```

Esse grafo de chamadas fechado mantém a execução em tempo de compilação independente de efeitos disponíveis somente em tempo de execução. O compilador também detecta ciclos de avaliação recursivos e impõe limites de recursos para que uma computação de constante incorreta não seja executada para sempre.

Expressões condicionais preservam a avaliação preguiçosa em tempo de compilação:

```pop
@CompileTime
function choose(flag: Boolean): Int
    return if flag then 42 else 1 / 0
end

const ANSWER = choose(true)
```

A divisão não selecionada não é avaliada.

Funções de tempo de compilação são removidas do MIR de tempo de execução quando existem apenas para a compilação. Não use `@CompileTime` como dica de desempenho para uma função auxiliar comum de tempo de execução; use-o quando o ambiente pretendido da função for realmente o compilador.
