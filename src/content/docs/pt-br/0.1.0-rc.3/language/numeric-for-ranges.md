---
title: Intervalos de for numérico
description: Conte em intervalos inclusivos de inteiros fixos.
sidebar:
  order: 7
---

A primeira forma de `for` da rc.3 percorre um intervalo inclusivo de inteiros:

```pop
for index = 1, 5 do
    print(index)
end
```

Isso imprime de `1` a `5`. O limite final é incluído quando a progressão o alcança.

## Escolhendo um passo

Omita a terceira expressão para usar um passo de `1` ou forneça um explicitamente:

```pop
for even = 2, 10, 2 do
    print(even)
end

for countdown = 5, 1, -1 do
    print(countdown)
end
```

Um passo positivo continua enquanto o vínculo for `<=` ao limite final. Um passo negativo continua enquanto ele for `>=` ao limite final. Um intervalo pode estar vazio quando sua direção não permite alcançar o limite.

## Regras estáticas

O limite inicial, o limite final e o passo opcional:

- são avaliados exatamente uma vez, da esquerda para a direita, antes do laço;
- devem ter o mesmo tipo inteiro fixo;
- não podem usar um tipo de ponto flutuante;
- usam aritmética de progressão verificada.

O vínculo do laço é imutável e existe somente dentro do corpo:

```pop
for index: Int8 = 1, 3 do -- a anotação de tipo não faz parte da gramática do intervalo
    index = 2              -- também é inválido: o vínculo não pode receber atribuição
end
```

Em vez disso, escreva os limites com o contexto desejado:

```pop
local first: Int8 = 1
local last: Int8 = 3

for index = first, last do
    print(String(index))
end
```

Um passo igual a zero conhecido estaticamente é rejeitado. Um passo igual a zero em tempo de execução causa um trap `InvalidRangeStep` antes da primeira iteração.

## Arrays atualmente

Arrays usam base um, portanto um intervalo de índices cobre suas posições de maneira direta:

```pop
for index = 1, Array.length(names) do
    print(Array.get(names, index))
end
```

A rc.3 não implementa `for name in names`. A iteração generalizada continua adiada até que os protocolos nominais `Iterable<T>` e `Iterator<T>` estejam completos; não há alternativa dinâmica de iterador.
