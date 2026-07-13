---
title: Funções
description: Dê nome a comportamentos reutilizáveis, receba parâmetros e retorne valores.
sidebar:
  order: 2
---

Funções nos permitem dar um nome a uma sequência de instruções e usá-la mais de uma vez. Já usamos a função especial `main`. Funções comuns usam a mesma sintaxe:

```pop
namespace Greetings

function greet(name: String)
    print(`Olá, {name}!`)
end

function main()
    greet("Ada")
    greet("Linus")
end
```

O parâmetro `name: String` indica que `greet` precisa de uma string. Uma chamada fornece esse valor entre parênteses.

## Retornando um valor

Escreva o tipo do resultado depois da lista de parâmetros e use `return` para enviar um valor de volta a quem chamou:

```pop
function double(number: Int): Int
    return number * 2
end
```

Chamar `double(6)` produz o valor `12`:

```pop
local answer = double(6)
print(answer)
```

Pop verifica os dois lados do limite da função. Cada argumento deve corresponder ao tipo de seu parâmetro, e todo valor retornado deve corresponder ao tipo de resultado declarado.

Ao contrário das variáveis locais, o resultado de uma função não é inferido. Se a declaração não tiver uma anotação de resultado, a função não retornará valor. Use `: Int`, `: String` ou outro tipo sempre que quem chama precisar de um resultado.

## Mais de um parâmetro

Separe parâmetros e argumentos com vírgulas:

```pop
function add(left: Int, right: Int): Int
    return left + right
end

local total = add(20, 22)
```

Os argumentos são associados pela posição: `20` se torna `left`, e `22` se torna `right`.

## Retornando a partir de uma decisão

Uma função que produz resultado deve retornar em todo caminho capaz de chegar ao seu final:

```pop
function larger(left: Int, right: Int): Int
    return if left > right then left else right
end
```

Uma expressão `if` sempre tem um `else`, e os dois ramos têm o tipo de resultado `Int` da função. No caso de ramos com várias instruções, uma instrução `if` pode, em vez disso, retornar explicitamente em todo caminho alcançável.

## Vários resultados e genéricos

Funções da rc.3 podem retornar um pacote fixo exato, como `(Int, String)`, e declarar parâmetros de tipo, como `identity<T>`. Consulte [Múltiplos retornos e atribuição](./multiple-returns-and-assignment/) e [Genéricos explícitos](./generics/) para ver as regras completas do código-fonte.

## Visibilidade

Funções sem uma palavra de visibilidade ficam disponíveis em sua Bubble atual. Adicione `public` quando o código de outra Bubble precisar poder chamá-la:

```pop
public function add(left: Int, right: Int): Int
    return left + right
end
```

A parte Módulos e Pacotes explica `public`, `internal` e `private` em contexto. Durante o aprendizado, normalmente basta omitir a visibilidade.
