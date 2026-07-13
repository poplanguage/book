---
title: Break e continue
description: Saia do laço mais interno ou avance-o.
sidebar:
  order: 8
---

`break` encerra o laço `while`, `repeat` ou `for` numérico mais interno:

```pop
local number = 1

while true do
    if number > 3 then
        break
    end

    print(number)
    number += 1
end
```

`continue` avança o laço mais interno sem executar o restante de seu corpo:

```pop
for number = 1, 6 do
    if number == 3 then
        continue
    end

    print(number)
end
```

Seu destino depende do loop:

| Laço | `continue` prossegue para |
| --- | --- |
| `while` | a condição |
| `repeat` | a condição de `until` |
| `for` numérico | o avanço verificado do intervalo |

Ambas as instruções atuam somente sobre o laço mais interno e não recebem rótulo nem valor. Uma função local aninhada cria um limite: ela não pode executar `break` nem `continue` no laço de quem a chamou.

Na rc.3, um `repeat` que declara no corpo uma variável local usada por `until` não pode também usar `continue` para chegar a essa condição, pois a declaração ignorada poderia deixar a condição sem um valor inicializado.
