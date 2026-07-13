---
title: Para quem vem do Luau
description: Mantenha a sintaxe familiar enquanto substitui as suposições do Luau pelo modelo estático e compilado do Pop.
sidebar:
  order: 4
---

Pop parece familiar para quem lê Luau de propósito. As duas linguagens usam `local`, `function`, `if ... then`, `while ... do`, `repeat ... until` e blocos fechados por `end`. Ambas usam `~=` para desigualdade e `..` para concatenação de strings.

Essa semelhança facilita a leitura, mas não é uma promessa de compatibilidade. Pop não é um dialeto do Luau, não é executado dentro da VM do Luau e não herda o modelo de execução do Lua centrado em tabelas.

A primeira regra mais útil é:

> Mantenha sua intuição sobre fluxo de controle, mas reconstrua sua intuição sobre tipos, dados, módulos e ambiente de execução.

## A comparação resumida

| Área | Expectativa no Luau | Modelo do Pop rc.3 |
| --- | --- | --- |
| Tipagem | tipagem gradual com rotas de escape dinâmicas | tipos estáticos sem `any` ou fallback dinâmico |
| Condições | todo valor tem veracidade | as condições devem ser `Boolean` |
| Números | principalmente um único tipo `number` | primitivas fixas com sinal, sem sinal e de ponto flutuante |
| Tabelas | estrutura de dados mutável universal | agregado tipado de chave e valor com função restrita |
| Arrays | convenção de tabela que pode crescer | agregado separado, tipado, de tamanho fixo e com índices começando em um |
| Objetos | tabelas, metatabelas e formas estruturais | registros, classes, interfaces e uniões |
| Módulos | executar um script por meio de `require` e receber um valor | compilar arquivos em namespaces dentro de uma Bubble |
| Dados ausentes | `nil`, frequentemente usado para remover campos de tabelas | tipos opcionais; sem exclusão de tabelas na rc.3 |
| Execução | ambiente de scripts hospedado por uma VM | compilação nativa antecipada |
| Erros | erros em tempo de execução podem ser capturados com recursos do Luau | diagnósticos em tempo de compilação e falhas não capturáveis em tempo de execução |

## Use este guia como um minilivro

Esta página apresenta o mapa completo. As páginas específicas desenvolvem cada mudança com comparações menores, regras de portabilidade e exercícios:

1. [Tipos, veracidade e valores](./types-and-values/) substitui suposições graduais e coercivas pelo modelo estático exato do Pop.
2. [Funções e fluxo de controle](./functions-and-control-flow/) separa a sintaxe familiar de blocos dos contratos exatos de funções e laços.
3. [De tabelas universais a dados deliberados](./data-modeling/) ajuda a escolher entre arrays, tabelas, registros, classes, interfaces, enums e uniões.
4. [Módulos, Bubbles e execução nativa](./modules-and-execution/) substitui `require`, tabelas exportadas, globais e expectativas de uma VM hospedeira.
5. [Portando um programa Luau](./porting-a-program/) percorre as decisões de projeto antes de traduzir a sintaxe.

Leia-as nessa ordem se Pop for sua primeira linguagem depois do Luau. Se você precisar corrigir apenas uma expectativa, vá diretamente para a página correspondente.

## O que você não precisa reaprender

Várias formas são transferidas de maneira suficientemente direta para reduzir a carga inicial de sintaxe.

### Variáveis locais e blocos

```pop
local score = 10

if score >= 10 then
    print("aprovado")
else
    print("tente novamente")
end
```

`local`, `if`, `then`, `else` e `end` têm a forma que um programador Luau espera. O escopo continua seguindo o bloco ao redor.

### Formas dos laços

```pop
while running do
    update()
end

repeat
    retry()
until finished

for index = 1, 10 do
    print(index)
end
```

`while`, `repeat` e intervalos numéricos inclusivos de `for` são familiares. `break` e `continue` operam sobre o laço mais interno.

### Operadores lógicos e de texto familiares

```pop
local allowed = active and not blocked
local fullName = first .. " " .. last

if left ~= right then
    print("diferente")
end
```

Pop usa `and`, `or`, `not`, `==`, `~=` e `..`. As regras dos operandos são mais estritas, mas a notação é reconhecível.

### Posições de arrays começando em um

Os arrays de Pop começam na posição `1`, como nas convenções comuns de arrays do Luau:

```pop
local names: {String} = { "Ada", "Grace" }
local first = Array.get(names, 1)
```

O que muda é que um array Pop é seu próprio agregado tipado de tamanho fixo, e não apenas uma tabela usada com chaves inteiras consecutivas.

### Atribuição múltipla

```pop
local left, right = 10, 20
left, right = right, left
```

Todos os valores à direita são avaliados antes dos armazenamentos, portanto a troca continua natural. Pop exige aridade exata e tipos estáticos compatíveis.

### Chamadas de método com dois-pontos

```pop
counter:increment()
```

A forma no local da chamada é familiar. O receptor pertence ao contrato de uma classe ou interface declarada, em vez de ser fornecido por uma convenção de metatabela.

## A primeira mudança de modelo mental: os tipos são um contrato fechado

No Luau, anotações podem descrever o código gradualmente enquanto alguns valores ainda atravessam `any` ou outros limites dinâmicos. Pop não tem `any`, `unknown` nem um tipo de fallback dinâmico.

```pop
local score = 10
score = 20

-- Rejeitado: score foi inferido como Int.
-- score = "vinte"
```

A inferência economiza sintaxe; ela não torna o valor dinâmico. Depois que Pop infere `score: Int`, toda atribuição posterior deve continuar sendo `Int`.

Os limites das funções declaram os tipos de parâmetros e resultados:

```pop
function double(value: Int): Int
    return value * 2
end
```

Pop verifica os chamadores e todo retorno alcançável. Não existe um modo em que uma relação de tipos inválida se torne uma operação não verificada em tempo de execução.

### Resultados de funções não são inferidos

Uma anotação de resultado omitida significa que a função não retorna valor:

```pop
function announce(message: String)
    print(message)
end
```

Para retornar um valor, escreva o tipo dele:

```pop
function lengthLabel(length: Int): String
    return `comprimento={length}`
end
```

Não porte uma função Luau presumindo que Pop inferirá seu resultado público a partir das instruções `return`.

### Parâmetros são imutáveis

Parâmetros de função não podem ser reatribuídos na rc.3. Crie um valor local de trabalho:

```pop
function countDown(start: Int)
    local current = start

    while current > 0 do
        print(current)
        current -= 1
    end
end
```

A variável local tem um único tipo estático, mas continua mutável.

## Condições são booleanas, não valores com veracidade

Luau trata apenas `false` e `nil` como falsos em uma condição. Pop não define veracidade geral.

Este padrão do Luau não é transferível:

```lua
if count then
    print("presente")
end
```

Escreva a pergunta real em Pop:

```pop
if count > 0 then
    print("positivo")
end
```

A condição de `if`, `elseif`, `while`, `until` e de uma expressão condicional deve ser `Boolean`.

Essa regra evita vários hábitos ambíguos:

- `0` não significa verdadeiro nem falso;
- uma `String` vazia não é uma condição;
- uma referência de objeto não é uma condição;
- um valor opcional não pode ser usado como teste automático de presença.

Prefira funções e comparações que respondam explicitamente a uma pergunta booleana.

## `nil` passa a fazer parte do tipo

No Luau, `nil` circula com frequência pelo código comum e também remove chaves de tabelas. No Pop, a possibilidade de ausência aparece em um tipo opcional:

```pop
function findScore(scores: {[String]: Int}, name: String): Int?
    return scores[name]
end
```

`Int?` significa `Int | nil`. Ele não é intercambiável com `Int`.

A rc.3 do Pop tem, intencionalmente, poucos recursos convenientes para opcionais:

- o estreitamento completo do fluxo de opcionais não está implementado;
- não há um operador geral para desembrulhar opcionais;
- atualmente, um literal `nil` isolado não é ampliado para todos os contextos opcionais;
- atribuir `nil` a uma chave de tabela não significa exclusão.

Use operações verificadas quando a violação de uma pré-condição deve causar uma falha e preserve `V?` nas APIs em que a ausência é um resultado real.

## Números não são um único `number` universal

Programadores Luau costumam pensar em termos do tipo `number`. Pop expõe primitivas numéricas exatas:

- inteiros com sinal: `Int8`, `Int16`, `Int32`, `Int64`;
- inteiros sem sinal: `UInt8`, `UInt16`, `UInt32`, `UInt64`;
- ponto flutuante: `Float32`, `Float64`;
- aliases convenientes, como `Int` e `Byte`.

```pop
local attempts: UInt8 = 3
local population: Int64 = 8_000_000
local ratio: Float64 = 0.75
```

Larguras numéricas misturadas não se transformam silenciosamente em um único valor de ponto flutuante. Use uma conversão explícita para o tipo de destino:

```pop
local small: Int16 = 120
local wide = Int64(small)
local decimal = Float64(wide)
```

As conversões são verificadas. O estouro de inteiros e as conversões inválidas seguem um comportamento de falha definido, em vez de herdarem as regras de coerção da VM.

Ao portar código, decida o que o número representa: uma contagem, byte, identificador, medida ou valor fracionário. Escolha o tipo a partir desse significado.

## Strings: mantenha `..`, substitua a coerção

A concatenação de strings continua usando `..`:

```pop
local fullName = first .. " " .. last
```

`+` é exclusivamente numérico. Ele nunca recorre à concatenação de strings como fallback:

```pop
-- Rejeitado:
-- local message = "pontuação: " + score
```

Use `String(value)` para converter uma primitiva aceita:

```pop
local message = "pontuação: " .. String(score)
```

Ou use interpolação com crases:

```pop
local message = `pontuação: {score}`
```

A forma da interpolação deve parecer familiar para usuários do Luau moderno. Pop ainda verifica cada expressão incorporada e não chama um metamétodo arbitrário para transformar um objeto em string.

## Tabelas deixam de ser a resposta universal

Esta é a maior mudança no modelo de dados.

No Luau, uma única tabela pode servir como:

- um array;
- um dicionário;
- um valor com formato de registro;
- estado mutável de um objeto;
- um namespace retornado por um módulo;
- um objeto cujo comportamento é fornecido por uma metatabela.

Pop fornece tipos separados para essas funções. Escolha com base no significado dos dados.

| Necessidade | Modelo do Pop |
| --- | --- |
| Posições homogêneas fixas | Array |
| Associações em tempo de execução por chave tipada | Tabela |
| Campos nomeados, fixos e transparentes | Registro |
| Identidade nominal e estado mutável | Classe |
| Comportamento nominal compartilhado | Interface |
| Um valor de um conjunto fechado de casos | Enum ou união marcada |
| Organização de nomes em tempo de compilação | Namespace |

Não comece um projeto Pop perguntando “qual deve ser o formato desta tabela?”. Comece com “qual desses contratos de dados a descreve?”.

## Arrays Pop em comparação com tabelas usadas como arrays no Luau

Um array Pop tem um tipo de elemento e tamanho fixo:

```pop
local names: {String} = { "Ada", "Grace", "Linus" }
local count = Array.length(names)
```

A primeira posição é `1`. A indexação comum é opcional:

```pop
local possible: String? = names[1]
```

Use `Array.get` para uma leitura verificada e não opcional quando o programa tiver estabelecido a invariante do índice:

```pop
if Array.length(names) > 0 then
    local first: String = Array.get(names, 1)
    print(first)
end
```

A atribuição indexada substitui um elemento existente:

```pop
names[1] = "Augusta"
```

Ela não acrescenta nem aumenta o array. A rc.3 ainda não oferece uma API dinâmica `List<T>`.

### Atualmente, a iteração é numérica

Não há `for value in values` generalizado nem equivalente a `ipairs` na rc.3. Percorra as posições fixas do array com um intervalo numérico inclusivo:

```pop
for index = 1, Array.length(names) do
    print(Array.get(names, index))
end
```

## Tabelas Pop em comparação com tabelas Luau

Uma tabela Pop escolhe exatamente um tipo de chave compatível e um tipo de valor:

```pop
local scores: {[String]: Int} = {
    ada = 10,
    grace = 20,
}
```

Inserções e substituições usam colchetes:

```pop
scores["linus"] = 15
scores["ada"] = 25
```

A busca retorna o tipo de valor opcional:

```pop
local score: Int? = scores["ada"]
```

A tabela não pode ganhar posteriormente um campo de tipo diferente. Ela não pode misturar uma região de array, campos nomeados, métodos e metadados arbitrários.

As chaves de tabela na rc.3 são limitadas a:

- `Boolean`;
- inteiros fixos com e sem sinal;
- `String`.

Chaves de string comparam seu conteúdo textual. Valores de ponto flutuante e objetos agregados gerenciados não podem ser chaves de tabela.

### Ainda não há `pairs`, exclusão nem API de tamanho de tabela

A iteração geral de tabelas não está implementada. A exclusão de chaves e as operações de tamanho/capacidade no código-fonte também não.

Este padrão do Luau não é uma operação de exclusão no Pop:

```lua
scores["ada"] = nil
```

Na rc.3 do Pop, a atribuição à tabela significa inserir ou substituir. Consulte [Busca e alteração de tabelas](../../data/table-lookup-and-mutation/) para conhecer todo o comportamento no código-fonte e em tempo de execução.

## Use registros para formatos de dados fixos

Um programa Luau pode descrever um usuário com um tipo e um literal de tabela:

```lua
type Player = {
    name: string,
    score: number,
}

local player: Player = {
    name = "Ada",
    score = 10,
}
```

No Pop, uma forma fixa e transparente é um registro:

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

Os campos de registros são orientados a valores. Produza um valor alterado com `with`:

```pop
local promoted = player with {
    score = player.score + 5,
}
```

O `player` original permanece inalterado. A igualdade de registros compara os campos quando todos eles aceitam igualdade.

## Use classes para identidade e estado mutável

Luau costuma construir objetos anexando métodos por meio de uma metatabela. Pop usa declarações nominais de classe:

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

Construa e chame a classe explicitamente:

```pop
local counter = Counter {}
counter:increment()
print(counter:current())
```

Classes têm identidade de referência gerenciada. A atribuição compartilha um objeto em vez de copiar seus campos.

Pop não expõe metatabelas do Lua, `__index`, metamétodos nem cadeias de protótipos. O comportamento de operadores não pode ser alterado armazenando funções especiais sob chaves especiais. A herança geral de classes também está fora do conjunto aceito pela rc.3; use interfaces para comportamento nominal compartilhado.

## Interfaces são nominais, não formatos estruturais de tabelas

Luau costuma aceitar um valor porque a forma inferida de sua tabela contém os campos exigidos. As interfaces do Pop são contratos nominais explícitos.

Uma classe declara a interface que implementa. Apenas ter métodos com nomes semelhantes não é suficiente. Isso permite ao compilador resolver comportamentos sem buscas dinâmicas de campos ou conformidade estrutural acidental.

Ao portar um tipo estrutural do Luau:

- use um registro quando ele representar dados transparentes;
- use uma interface quando os chamadores dependerem de um comportamento declarado;
- use uma classe quando a identidade e a mutação encapsulada forem importantes.

## Funções têm aridade e pacotes de resultados exatos

As chamadas devem fornecer os argumentos declarados com tipos correspondentes. Pop não preenche silenciosamente parâmetros ausentes arbitrários com `nil` nem ignora argumentos extras.

Múltiplos retornos são representados como um pacote fixo exato:

```pop
function bounds(): (Int, Int)
    return 1, 10
end

local lower, upper = bounds()
```

A atribuição que recebe os resultados deve ter a aridade correta. A projeção de tuplas é estática e começa em um; não há remodelagem de pacotes em tempo de execução na rc.3.

APIs variádicas do Luau devem ser reprojetadas em torno de uma assinatura fixa, array, registro ou sobrecarga explícita na superfície atual do Pop.

## Genéricos são explícitos

A rc.3 do Pop aceita funções, registros e uniões marcadas genéricas, mas as chamadas não inferem argumentos de tipo:

```pop
private function identity<T>(value: T): T
    return value
end

local answer = identity<<Int>>(42)
```

O `<T>` da declaração deve parecer familiar. A chamada usa `<<Int>>` para que os argumentos de tipo continuem inequívocos ao lado dos operadores de comparação.

Cada uso concreto alcançável é especializado antes da execução no backend. Não há tabela de tipos em tempo de execução nem despacho genérico dinâmico.

## Módulos se tornam namespaces dentro de Bubbles

Um módulo Luau geralmente executa um arquivo e retorna uma tabela:

```lua
local Math = {}

function Math.double(value)
    return value * 2
end

return Math
```

O código-fonte Pop não retorna uma tabela de namespace. Um arquivo declara um namespace e declarações tipadas comuns:

```pop title="src/math.pop"
namespace App.Math

function double(value: Int): Int
    return value * 2
end
```

Outro arquivo na Bubble pode usar o namespace:

```pop title="src/main.pop"
namespace App

using App.Math

function main()
    print(double(21))
end
```

`using` afeta a resolução de nomes em tempo de compilação. Ele não executa o outro arquivo, realiza uma busca em tempo de execução nem recebe uma tabela retornada.

Um manifesto `bubble.toml` descreve a Bubble. As declarações são `internal` por padrão, podem ser `private` para um módulo ou `public` para outras Bubbles. Pop não tem o modificador de declaração `export`.

A resolução de dependências e um fluxo de trabalho com registro de pacotes não estão implementados na rc.3. Um manifesto pode organizar o projeto atual, mas não reproduz um carregador de pacotes do Luau.

## Não há um modelo de ambiente global mutável

Não espere que nomes apareçam porque um hospedeiro os inseriu em uma tabela global. Pop resolve funções, tipos, constantes, namespaces, variáveis locais e parâmetros estaticamente.

Também não há no Pop um equivalente a `require` dinâmico por string calculada, `loadstring` ou alteração em tempo de execução da tabela exportada de um módulo. A estrutura do programa deve ser visível ao compilador.

## As expectativas sobre o ambiente de execução e o hospedeiro mudam

O Luau independente e o Luau do Roblox são executados dentro de hospedeiros que fornecem uma VM e APIs específicas. A rc.3 do Pop produz executáveis nativos.

Consequentemente, Pop não fornece automaticamente:

- serviços, Instances, eventos, tarefas ou tipos de dados do Roblox;
- uma biblioteca global Lua ou Luau;
- reflexão da VM e carregamento dinâmico de código;
- ganchos de metatabelas;
- um cache de módulos fornecido pelo hospedeiro.

Use somente a base Standard do Pop documentada para esta edição. Nomes reservados ou identidades de bibliotecas futuras não comprovam que uma API possa ser usada.

## O tratamento de erros não usa `pcall`

Muitos erros são rejeitados durante a verificação:

- tipos incorretos de argumentos ou resultados;
- nomes desconhecidos;
- operadores não aceitos;
- campos inválidos de agregados;
- condições que não sejam booleanas;
- tipos de chave de tabela não aceitos.

Programas válidos ainda podem encontrar falhas verificadas em tempo de execução, como estouro, divisão por zero, conversão inválida ou falha em um acesso verificado a array.

A rc.3 não tem mecanismos de exceção, `pcall` ou `xpcall` no código-fonte para capturar essas falhas. Modele ausências recuperáveis com opcionais e valide as pré-condições antes de escolher operações verificadas.

## Exemplo de tradução: de uma tabela Luau para vários tipos Pop

Considere um objeto de jogador no Luau:

```lua
local Player = {}
Player.__index = Player

function Player.new(name)
    return setmetatable({
        name = name,
        score = 0,
        badges = {},
    }, Player)
end

function Player:award(points)
    self.score += points
end
```

Uma tradução direta da sintaxe deixaria de aproveitar as ferramentas de modelagem mais robustas do Pop. Primeiro, decida o que cada parte significa:

- a identidade do jogador e a pontuação mutável pertencem a uma classe;
- o estado fixo do construtor pertence a campos declarados;
- uma coleção fixa de posições de distintivos pode usar um array;
- associações de distintivos em tempo de execução podem usar uma tabela tipada;
- os métodos pertencem à classe nominal, não a uma metatabela.

Um possível modelo na rc.3 é:

```pop
public class Player
    private name: String
    private score: Int = 0
    private badges: {String}

    public function Player:award(points: Int)
        self.score += points
    end

    public function Player:currentScore(): Int
        return self.score
    end
end

local badges: {String} = { "Fundador", "Leitor" }
local player = Player {
    name = "Ada",
    badges = badges,
}

player:award(10)
print(player:currentScore())
```

O código-fonte é um pouco mais explícito porque agora o compilador conhece o layout dos campos, os tipos das mutações, o receptor do método e os tipos de resultado sem executar convenções de construtor.

## Lista de verificação para migração

Antes de traduzir um componente Luau, responda a estas perguntas:

1. Quais valores podem realmente estar ausentes? Dê tipos opcionais somente a esses valores.
2. Quais números são contagens ou índices e quais são medidas fracionárias?
3. Cada tabela atua como array, dicionário, registro, objeto, módulo ou tipo soma?
4. Quais funções das tabelas devem se tornar declarações Pop separadas?
5. Quais condições dependem de veracidade em vez de uma pergunta booleana?
6. Quais funções dependem de argumentos ausentes, argumentos extras ou pacotes variádicos?
7. Quais métodos dependem de metatabelas, busca estrutural ou monkey patching?
8. Quais módulos dependem da ordem de execução em tempo de execução ou de tabelas retornadas?
9. Quais falhas são ausências recuperáveis e quais indicam uma invariante violada?
10. Quais APIs vêm do Roblox ou de outro hospedeiro Luau, em vez da própria linguagem?

Responder a essas perguntas antes de editar a sintaxe evita os falsos começos mais comuns.

## Falsos cognatos comuns

| Forma familiar | Não presuma que |
| --- | --- |
| `local value = ...` | o tipo inferido pode mudar posteriormente |
| `if value then` | Pop tem a veracidade do Luau |
| `{ ... }` | todo agregado é uma única tabela universal |
| `values[index]` | o resultado está sempre presente |
| `table[key] = nil` | a atribuição exclui uma chave |
| `function f(...)` | argumentos ausentes e extras são remodelados livremente |
| `object:method()` | métodos vêm de buscas em metatabelas |
| `using Name` | outro arquivo de código-fonte é executado como `require` |
| `<T>` em uma declaração | as chamadas inferem o argumento de tipo |
| um nome Standard reservado | a API já existe no ambiente de execução |

## Leitura recomendada depois deste guia

Leia estes capítulos em seguida, nesta ordem:

1. [Olá, Mundo!](../hello-world/) para conhecer o fluxo de trabalho com código-fonte e comandos.
2. [Variáveis](../../language/variables/) e [funções](../../language/functions/) para conhecer os limites estáticos exatos.
3. [Booleanos, nil e opcionais](../../types/boolean-nil-and-optionals/) para representar ausência sem veracidade.
4. [Conversões numéricas](../../types/numeric-conversions/) para conhecer o modelo numérico fixo.
5. [Arrays](../../data/arrays/), [tabelas](../../data/tables/), [registros](../../data/records/) e [classes](../../data/classes/) para uma modelagem deliberada dos dados.
6. [Namespaces](../../organization/namespaces/), [`using`](../../organization/using-declarations/) e [visibilidade](../../organization/visibility/) para a organização em tempo de compilação.
7. [Matriz de suporte](../../reference/support-matrix/) antes de procurar recursos conhecidos das bibliotecas Luau.

Você já sabe ler boa parte da sintaxe de fluxo de controle do Pop. O novo trabalho é aprender a tornar cada tipo, caso de ausência, função de agregado e limite do programa explícito o suficiente para que o compilador e todos os leitores enxerguem o mesmo programa.
