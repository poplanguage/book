---
title: Cadeias elseif
description: Teste várias condições Boolean com um único end final.
sidebar:
  order: 6
---

Uma cadeia `elseif` mantém vários ramos de instruções no mesmo nível de indentação:

```pop
if score >= 90 then
    print("excelente")
elseif score >= 60 then
    print("aprovado")
elseif score > 0 then
    print("continue tentando")
else
    print("sem pontuação")
end
```

Pop verifica as condições de cima para baixo. A verificação para após a primeira condição verdadeira; portanto, as condições posteriores e seus efeitos não são executados. O `else` opcional trata o caso restante. Um único `end` final encerra toda a cadeia.

Toda condição deve ser `Boolean`; números, strings, objetos e `nil` não possuem valor-verdade implícito.

## Escopos dos ramos

Cada ramo tem seu próprio escopo local:

```pop
if first then
    local message = "primeiro"
    print(message)
elseif second then
    local message = "segundo"
    print(message)
end
```

Nenhuma das variáveis `message` existe depois da cadeia. Reutilizar o nome local é seguro porque os vínculos pertencem a ramos diferentes.

Use `elseif` para blocos de instruções. Quando cada ramo apenas escolhe um valor, uma expressão `if` costuma ser mais curta:

```pop
local label = if ready then "pronto" else "aguardando"
```
