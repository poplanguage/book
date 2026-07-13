---
title: Constantes em código de tempo de execução
description: Use um valor determinístico de tempo de compilação dentro de funções executáveis.
sidebar:
  order: 2
---

Uma constante de namespace é avaliada uma vez pelo front-end e pode ser referenciada pelo nome em código comum de tempo de execução:

```pop
namespace Limits

private const MAXIMUM_ATTEMPTS: Int = 3

function main()
    print(`máximo de tentativas={MAXIMUM_ATTEMPTS}`)
end
```

O compilador substitui o valor `Int` já verificado no HIR tipado. Ele não cria armazenamento mutável de módulo, consulta de nome em tempo de execução nem uma global implícita.

## Valores de funções de tempo de compilação

O inicializador pode chamar funções de tempo de compilação elegíveis:

```pop
@CompileTime
private function doubled(value: Int): Int
    return value * 2
end

private const BUFFER_SIZE = doubled(512)

function main()
    print(`tamanho do buffer={BUFFER_SIZE}`)
end
```

`doubled` é executada durante a compilação, e cada uso em tempo de execução recebe `1024`.

## Formatos utilizáveis em tempo de execução

A rc.3 pode substituir estes valores imutáveis:

- `nil`, `Boolean`, inteiros, valores de ponto flutuante e `String`;
- tuplas fixas compostas recursivamente por esses primitivos.

Agregados mutáveis ou com identidade ainda não são formatos de constantes de tempo de execução. A visibilidade continua valendo quando outro Module ou Bubble referencia a declaração.
