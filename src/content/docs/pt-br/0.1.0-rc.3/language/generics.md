---
title: Genéricos explícitos
description: Especialize funções genéricas, registros e uniões marcadas na rc.3.
sidebar:
  order: 11
---

Funções podem declarar parâmetros de tipo invariantes com a sintaxe angular inspirada em Luau:

```pop
private function identity<T>(value: T): T
    return value
end

local number = identity<<Int>>(42)
local name = identity<<String>>("Ada")
```

As chamadas usam sinais de menor e maior duplicados para que os argumentos de tipo não sejam confundidos com operadores de comparação. A rc.3 exige explicitamente todos os argumentos de tipo; ela ainda não infere `T` a partir do valor.

## Registros genéricos

Declarações de registros usam a mesma forma de parâmetro de tipo. Um literal de registro recebe seu tipo concreto do contexto esperado:

```pop
private record Box<T>
    value: T
end

local box: Box<Int> = {
    value = 7,
}
```

## Uniões marcadas genéricas

A construção de um caso de união fornece argumentos de tipo explícitos:

```pop
private union Choice<T>
    Value(value: T)
    Empty
end

local choice: Choice<String> = Choice.Value<<String>>("ready")
```

A correspondência usa os casos resolvidos comuns; os vínculos da carga recebem o tipo substituído.

## Modelo de execução da rc.3

A HIR preserva a identidade genérica e os argumentos semânticos. A MIR especializa completamente toda instância concreta alcançável e elimina instanciações equivalentes duplicadas. Os backends recebem somente funções tipadas e layouts concretos — nunca argumentos de tipo em tempo de execução, dicionários dinâmicos ou busca por string.

Metadados genéricos entre Bubbles, inferência de argumentos de tipo, restrições e compartilhamento de código tipado não estão implementados nesta versão.
