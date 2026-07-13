---
title: Valores padrão de campos
description: Forneça valores padrão de tempo de compilação para campos de registros e classes.
sidebar:
  order: 4
---

Campos de registros e classes podem fornecer um inicializador padrão:

```pop
public record Settings
    retries: Int = 3
    verbose: Boolean = false
    label: String = `retries={3}`
end
```

Quando um agregado é criado em um contexto que espera `Settings`, os campos omitidos usam seus valores padrão:

```pop
function defaults(): Settings
    return {}
end
```

Quem chama pode substituir qualquer um dos campos:

```pop
function verboseSettings(): Settings
    return { verbose = true }
end
```

Os valores padrão são avaliados em tempo de compilação. Isso garante que construir um valor não esconda uma chamada arbitrária em tempo de execução e que o valor padrão esteja disponível de maneira consistente onde quer que o tipo seja usado.

O inicializador pode usar literais, formatação primitiva/composição de strings, expressões condicionais, constantes e funções de tempo de compilação válidas. Ele não pode ler o estado de tempo de execução:

```pop
function currentRetries(): Int
    return 5
end

public record Invalid
    retries: Int = currentRetries() -- rejeitada: chamada disponível somente em tempo de execução
end
```

Valores padrão não tornam um campo opcional no sentido do sistema de tipos. Depois da construção, `settings.retries` ainda é um `Int`, não um `Int?`. Um valor padrão apenas permite que a construção omita esse campo.

Use valores padrão para valores previsíveis que sejam válidos em todas as construções. Mantenha um campo obrigatório quando for menos provável cometer erros ao forçar quem chama a fazer uma escolha.
