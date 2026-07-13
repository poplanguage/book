---
title: Funções locais e closures
description: Defina comportamentos dentro de uma função e capture valores ao redor.
sidebar:
  order: 7
---

Uma função pode ser local a outra função. Isso é útil quando uma pequena operação pertence a um único algoritmo e não deve fazer parte do namespace:

```pop
namespace Calculations

function main()
    local function square(value: Int): Int
        return value * value
    end

    print(square(6))
end
```

A função local `square` existe somente dentro de `main`.

## Capturando um valor ao redor

Uma função local pode usar valores declarados ao seu redor:

```pop
function main()
    local factor = 3

    local function scale(value: Int): Int
        return value * factor
    end

    print(scale(7))
end
```

A função **captura** `factor`, portanto chamar `scale(7)` retorna `21`. Uma função junto com o estado ao redor que ela captura é chamada de **closure**.

Valores capturados permanecem disponíveis enquanto a closure precisar deles. Se uma variável local capturada receber uma atribuição, as chamadas compartilharão o armazenamento atualizado em vez de receber cópias independentes:

```pop
function main()
    local count = 0

    local function next(): Int
        count += 1
        return count
    end

    print(next())
    print(next())
end
```

Isso imprime `1` e depois `2`.

A atribuição composta atualiza a mesma célula de captura tipada. Ela não copia `count` para um ambiente dinâmico separado a cada chamada.

## Funções anônimas

A sintaxe de função também pode produzir um valor de função sem atribuir a ele um nome no nível do namespace:

```pop
local double: function(value: Int): Int = function(value: Int): Int
    return value * 2
end

print(double(5))
```

A anotação mostra o tipo da função: ela aceita um `Int` chamado `value` e retorna um `Int`. Chamar um valor de função usa os mesmos parênteses de uma chamada de função comum.

Closures são valores gerenciados. Elas podem sobreviver à chamada que as criou, e o ambiente de execução mantém o estado capturado vivo enquanto ele permanecer alcançável. Funções locais recursivas também são aceitas, embora uma solução iterativa geralmente seja mais fácil de ler em tarefas simples de contagem.
