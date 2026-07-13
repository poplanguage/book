---
title: Repetição com laços
description: Repita tarefas com while, repeat-until e for numérico.
sidebar:
  order: 6
---

Laços executam um bloco mais de uma vez. Um laço `while` verifica sua condição antes de cada iteração:

```pop
namespace Countdown

function main()
    local number = 3

    while number > 0 do
        print(number)
        number = number - 1
    end

    print("Já!")
end
```

Esse programa imprime `3`, `2`, `1` e depois `Já!`. Quando `number > 0` se torna falso, a execução continua depois de `end`.

Como a condição é verificada primeiro, o corpo de um `while` pode não ser executado nenhuma vez:

```pop
local number = 0
while number > 0 do
    print(number) -- nunca é executado
end
```

Assim como em `if`, a condição de um laço deve ser `Boolean`.

## Executando o corpo ao menos uma vez

Um laço `repeat` verifica sua condição depois do corpo:

```pop
local number = 1

repeat
    print(number)
    number = number + 1
until number > 3
```

O corpo é executado para `1`, `2` e `3`. Mesmo quando, em princípio, a condição já é verdadeira, o corpo de um `repeat` sempre é executado uma vez antes de Pop verificar `until`.

Uma variável local declarada no corpo continua disponível para a condição de `until`, o que é útil quando a condição depende do trabalho recém-realizado:

```pop
repeat
    local next = calculateNext()
    use(next)
until finished(next)
```

Essa variável local não está disponível depois que o laço termina.

## Intervalos numéricos inclusivos

Use o `for` numérico quando um inteiro avança de um limite para outro:

```pop
for index = 1, 5 do
    print(index)
end
```

O intervalo inclui os dois limites. Uma terceira expressão opcional define o passo:

```pop
for even = 2, 10, 2 do
    print(even)
end

for countdown = 3, 1, -1 do
    print(countdown)
end
```

Os limites e o passo são avaliados uma vez, da esquerda para a direita, e devem ter o mesmo tipo inteiro fixo. O vínculo do laço é local ao corpo e imutável. Um passo igual a zero é inválido; a progressão verificada pode causar um trap em caso de estouro.

A iteração generalizada `for value in collection` não está implementada na rc.3. Arrays podem usar um intervalo numérico de `1` até `Array.length(values)`; a forma generalizada planejada aguarda os protocolos nominais `Iterable<T>` e `Iterator<T>`.

## Saindo ou pulando

`break` encerra o laço mais interno. `continue` o avança para sua condição natural ou para o passo do intervalo:

```pop
for number = 1, 10 do
    if number == 3 then
        continue
    elseif number > 6 then
        break
    end

    print(number)
end
```

As duas instruções funcionam em laços `while`, `repeat` e `for` numéricos. Elas não podem atravessar o limite de uma função aninhada nem aparecer fora de um laço.
