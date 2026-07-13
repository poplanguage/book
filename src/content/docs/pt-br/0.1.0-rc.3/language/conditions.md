---
title: Decisões com if
description: Execute códigos diferentes de acordo com uma condição Boolean.
sidebar:
  order: 5
---

Uma instrução `if` decide se um bloco de código deve ser executado:

```pop
if temperature > 30 then
    print("Está quente")
end
```

A condição entre `if` e `then` deve ter o tipo `Boolean`. Pop não trata números, strings, objetos nem `nil` como valores verdadeiros ou falsos.

## Escolhendo entre dois caminhos

Adicione `else` quando o programa precisar executar outro bloco se a condição for falsa:

```pop
if score > 9 then
    print("Novo recorde")
else
    print("Continue tentando")
end
```

Exatamente um ramo é executado. Ambos terminam no `end` compartilhado.

## Testando vários casos

Use `elseif` para testar mais condições sem aninhamento adicional:

```pop
if score > 89 then
    print("Excelente")
elseif score > 59 then
    print("Aprovado")
else
    print("Tente novamente")
end
```

As condições são verificadas de cima para baixo; a verificação para após a primeira condição verdadeira, e todas compartilham um único `end` final. Cada ramo tem seu próprio escopo.

Consulte [Cadeias elseif](./elseif-chains/) para conhecer a ordem de avaliação, os escopos e um exemplo completo de classificação.

## Escolhendo um valor

Uma expressão `if` seleciona entre dois valores:

```pop
local label = if score > 59 then "aprovado" else "tente novamente"
```

Ela exige `else`, não tem um `end` ao final e avalia exatamente um ramo. Os valores dos dois ramos devem ter o mesmo tipo estático. Pop não usa a pontuação `?:` nem inventa uma união para ramos de tipos diferentes.

## Nomes declarados em ramos

Cada ramo é um escopo. Uma variável local declarada dentro dele fica disponível somente até o fim desse ramo:

```pop
if authenticated then
    local message = "Boas-vindas novamente"
    print(message)
end

-- message não está mais no escopo
```

Quando os ramos apenas escolhem um valor, prefira uma expressão `if`. Use uma instrução quando os ramos realizarem várias operações ou retornarem antecipadamente.
