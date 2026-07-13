---
title: De tabelas universais a dados bem definidos
description: Substitua cada papel das tabelas Luau pelo agregado Pop que expressa seu verdadeiro contrato.
sidebar:
  order: 3
---

As tabelas Luau são intencionalmente versáteis. Pop, por sua vez, pede que você declare qual papel uma coleção ou um objeto desempenha. Isso oferece ao verificador um layout, uma regra de chaves, um modelo de mutação, uma regra de igualdade e um contrato público estáveis.

## Primeiro, classifique a tabela antiga

Antes de traduzir a sintaxe, classifique cada tabela Luau:

| Papel da tabela Luau | Abordagem em Pop |
| --- | --- |
| Coleção posicional densa | Array |
| Dicionário de tempo de execução | Tabela tipada |
| Dados nomeados fixos | Registro |
| Objeto com estado e identidade | Classe |
| Contrato de comportamento compartilhado | Interface |
| Conjunto fechado de nomes | Enum |
| Conjunto fechado de casos com payloads diferentes | União etiquetada |
| Namespace retornado por um módulo | Declarações de namespace |

Às vezes, uma tabela Luau desempenha vários papéis ao mesmo tempo. Separe-a quando esses papéis tiverem ciclos de vida ou invariantes diferentes.

## Arrays são sequências homogêneas e fixas

```pop
local names: {String} = { "Ada", "Grace", "Linus" }
```

Cada elemento é `String`, as posições começam em `1` e o tamanho é fixo após a construção.

A consulta comum representa uma posição inválida com um opcional:

```pop
local possible: String? = names[1]
```

Use uma leitura verificada depois de provar que a posição é válida:

```pop
if Array.length(names) > 0 then
    print(Array.get(names, 1))
end
```

A atribuição substitui um elemento e causa uma falha quando o índice está fora do array. Ela não adiciona elementos. Na rc.3, não há `table.insert`, lista dinâmica nem iterador generalizado de arrays.

## Tabelas são dicionários tipados

```pop
local scores: {[String]: Int} = {
    ada = 10,
}

scores["grace"] = 20
local possible: Int? = scores["ada"]
```

A chave é sempre `String`; o valor armazenado é sempre `Int`; a consulta é sempre `Int?`.

As famílias de chaves aceitas são Boolean, inteiros de largura fixa e `String`. Tabelas não combinam campos nomeados de objetos, elementos posicionais e métodos. Elas também não oferecem exclusão nem enumeração na rc.3.

Use uma tabela somente quando as chaves forem descobertas em tempo de execução. Se as chaves forem uma parte fixa do significado do tipo, use um registro.

## Registros são valores transparentes

```pop
private record Player
    name: String
    score: Int
end

local player: Player = {
    name = "Ada",
    score = 10,
}
```

O compilador conhece todos os campos. Campos com erro de grafia, ausentes, duplicados ou de tipo incorreto são erros de tempo de compilação.

Os registros são atualizados produzindo outro valor:

```pop
local promoted = player with {
    score = player.score + 5,
}
```

Use esse modelo para configurações, coordenadas, mensagens, instantâneos e outros dados transparentes. Não introduza identidade de classe quando a semântica pretendida for igualdade de valores e cópia.

## Classes possuem identidade e mutação

```pop
public class Counter
    private value: Int = 0

    public function Counter:increment()
        self.value += 1
    end

    public function Counter:current(): Int
        return self.value
    end
end
```

```pop
local counter = Counter {}
local alias = counter

alias:increment()
print(counter:current())
```

As duas variáveis locais se referem ao mesmo objeto gerenciado. Os campos e métodos pertencem a uma declaração nominal, não a entradas instaladas por meio de `__index`.

Use uma classe para estado mutável que precise preservar invariantes por trás de métodos. Pop não tem metatabelas no código-fonte, metamétodos, cadeia de protótipos nem herança geral de classes na rc.3.

## Interfaces declaram comportamento compartilhado

Uma interface não é um formato estrutural de tabela inferido. Uma classe a implementa explicitamente, dando um significado nominal à conformidade.

Use uma interface quando quem chama deve depender de um comportamento compartilhado por diferentes classes nominais. Use um registro quando quem chama precisa de campos transparentes. Apenas ter métodos com nomes parecidos não cria conformidade acidental.

## Enums e uniões substituem convenções de etiquetas

Uma etiqueta de string de Luau pode se tornar um enum quando os casos não têm payload:

```pop
private enum Direction
    North
    South
    East
    West
end
```

Uma união etiquetada modela casos com dados diferentes:

```pop
private union Result
    Success(value: String)
    Failure(message: String)
end
```

A correspondência exaustiva faz com que adicionar ou esquecer um caso fique visível para o verificador. Você não precisa de uma tabela com um campo `kind` mutável e campos opcionais com pouca relação entre si.

## Evite portar estruturas que misturam papéis

Suponha que uma tabela Luau contenha elementos numéricos, campos de configuração e métodos:

```lua
local queue = { "primeiro", "segundo" }
queue.limit = 20
function queue:clear() end
```

Não force esse formato a caber em uma única tabela Pop. Modele-o como uma classe com um campo de array declarado e um limite declarado:

```pop
public class Queue
    private values: {String}
    private limit: Int

    public function Queue:limitValue(): Int
        return self.limit
    end
end
```

O array atual tem tamanho fixo, portanto uma fila que realmente cresça também precisa de uma futura API de coleções ou de um design de capacidade fixa específico para o domínio. A resposta correta é reconhecer esse limite da rc.3, não simular crescimento dinâmico com um comportamento de tabela sem relação com ele.

## A igualdade segue o modelo escolhido

- valores primitivos usam a igualdade de valores definida;
- registros comparam os campos correspondentes quando isso é aceito;
- classes comparam a identidade do objeto;
- arrays e tabelas não recebem igualdade estrutural na rc.3;
- funções não têm igualdade.

Portanto, escolher um tipo também escolhe o que “ser o mesmo” pode significar. Muitas vezes, isso era implícito em um design de tabela Luau.

## A mutação segue o modelo escolhido

| Tipo | Modelo de mutação |
| --- | --- |
| Array | substituir uma posição existente verificada |
| Tabela | inserir ou substituir uma associação de chave tipada |
| Registro | produzir um valor atualizado com `with` |
| Classe | modificar campos declarados por meio do código permitido |
| Enum | nenhum estado de payload para modificar |
| União etiquetada | construir o valor de outro caso |

Não há uma operação genérica de mutação de campos compartilhada por todos os agregados.

## Um exercício de decisão

Para cada tabela Luau de um programa, escreva uma frase:

- “Isto é uma sequência porque…”
- “Isto é um dicionário porque…”
- “Isto é um registro porque…”
- “Isto é um objeto porque…”
- “Isto é um conjunto fechado de casos porque…”

Se você não conseguir terminar uma das frases, a tabela provavelmente mistura papéis. Separe as responsabilidades antes de escolher a sintaxe Pop.

Em seguida, [Módulos, Bubbles e execução nativa](./modules-and-execution/) substitui o modelo de módulo executado e ambiente hospedeiro de Luau.
