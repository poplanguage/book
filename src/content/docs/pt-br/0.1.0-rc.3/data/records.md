---
title: Registros
description: Modele dados estruturais imutáveis com campos nomeados.
sidebar:
  order: 3
---

Um registro agrupa valores relacionados sob nomes de campos. É uma boa opção para dados como coordenadas, configurações ou a pontuação atual de um jogador.

```pop
public record Player
    name: String
    score: Int = 0
end
```

`name` é obrigatório. `score` tem um valor padrão, portanto um agregado pode omiti-lo quando o contexto ao redor espera `Player`:

```pop
function newPlayer(name: String): Player
    return {
        name = name,
    }
end
```

Um literal de agregado é verificado em relação ao tipo de registro esperado. Pop informa campos obrigatórios ausentes, campos desconhecidos, inicializadores duplicados e valores do tipo incorreto. A ordem dos inicializadores não importa.

## Lendo campos

Use um ponto para ler um campo de registro:

```pop
function showScore(player: Player)
    print(`{player.name}: {player.score}`)
end
```

Os campos de um registro descrevem um valor, não slots mutáveis de um objeto. Para produzir uma cópia modificada, use uma expressão `with`:

```pop
function award(player: Player, points: Int): Player
    return player with {
        score = player.score + points,
    }
end
```

O registro retornado tem a pontuação atualizada. O valor `player` original permanece inalterado. Os campos não mencionados após `with` mantêm seus valores anteriores.

## Valores padrão

Os valores padrão dos campos são avaliados em tempo de compilação. Portanto, eles devem usar expressões constantes, não entradas de tempo de execução. Valores padrão fazem sentido para valores universais ao tipo, como uma pontuação inicial igual a zero.

## Igualdade estrutural

Dois valores do mesmo tipo de registro são iguais quando todos os campos correspondentes são iguais. Isso só funciona quando a igualdade está disponível para cada tipo de campo. A ordem dos inicializadores não afeta a igualdade.

## Registros genéricos

Registros da rc.3 podem declarar parâmetros de tipo. Um literal de agregado recebe seus argumentos concretos do contexto esperado:

```pop
private record Box<T>
    value: T
end

local answer: Box<Int> = {
    value = 42,
}
```

Cada registro concreto alcançável é especializado em um layout de MIR concreto. A rc.3 não infere argumentos de tipo ausentes.

Use registros quando quiser dados transparentes com componentes nomeados e atualizações semelhantes às de valores. Use uma classe quando identidade, estado mutável privado ou métodos receptores forem centrais para o modelo.
