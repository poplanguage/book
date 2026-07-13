---
title: Constantes
description: Dê nomes a valores avaliados durante a compilação.
sidebar:
  order: 1
---

Uma constante dá um nome a um valor conhecido enquanto o programa é compilado:

```pop
namespace Limits

public const MAXIMUM_ATTEMPTS: Int = 3
const GREETING = "Boas-vindas"
```

As constantes ficam no escopo do namespace. Seus nomes podem ser usados por declarações posteriores e por código executável:

```pop
function main()
    print(GREETING)
    print(`Máximo de tentativas: {MAXIMUM_ATTEMPTS}`)
end
```

A anotação de tipo é opcional quando Pop consegue determinar o tipo a partir do inicializador. Escrevê-la pode deixar mais claro o contrato de uma constante pública.

Ao contrário de uma variável local, não é possível atribuir um novo valor a uma constante. Seu inicializador deve ser uma expressão de tempo de compilação; ele não pode depender de entrada da linha de comando, estado mutável, alocação em tempo de execução ou uma função comum disponível somente em tempo de execução.

A avaliação em tempo de compilação usa as mesmas regras numéricas verificadas do código executável. Estouro de inteiro, divisão por zero, chamadas inválidas e ciclos de avaliação são diagnosticados durante a compilação, em vez de serem adiados para o programa finalizado.

Constantes são úteis para limites compartilhados, rótulos fixos, argumentos de atributos e valores padrão de campos de registros ou classes. Seus nomes usam `UPPER_SNAKE_CASE`. Prefira uma variável local quando o valor pertencer a uma execução de uma função, mesmo que essa variável nunca receba uma nova atribuição.

Consulte [Constantes em código de tempo de execução](./runtime-constants/) para ver os formatos exatos de valor que a rc.3 substitui no HIR executável.
