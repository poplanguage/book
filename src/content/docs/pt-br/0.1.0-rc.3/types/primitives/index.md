---
title: Tipos primitivos
description: Os tipos escalares embutidos do Pop 0.1.0-rc.3.
sidebar:
  order: 1
---

Todo valor Pop tem um tipo. Um tipo descreve o que um valor representa e quais operações são válidas para ele. Os tipos primitivos são os menores valores incorporados à linguagem. Esta página explica o que “primitivo” significa no Pop e é a página inicial das páginas específicas de primitivas aninhadas abaixo dela.

## O que torna um tipo primitivo?

Um tipo primitivo é definido diretamente pela linguagem, em vez de ser montado a partir de campos, casos ou métodos declarados pelo usuário. O compilador já sabe:

- quais valores pertencem ao tipo;
- como os literais recebem o tipo;
- quais operadores o aceitam;
- como a igualdade e a ordenação se comportam;
- quais conversões explícitas são válidas;
- como o valor atravessa os limites de funções, HIR, MIR e ambiente de execução.

Por exemplo, não é necessário declarar os campos de `Int32` nem escrever a implementação da adição de inteiros antes de usá-la:

```pop
local left: Int32 = 20
local right: Int32 = 22
local answer: Int32 = left + right
```

O compilador reconhece ambos os operandos como `Int32`, seleciona a adição verificada de `Int32` e atribui à expressão o mesmo tipo `Int32`.

Um registro não é primitivo porque seu código-fonte declara os campos dele:

```pop
private record Point
    x: Int
    y: Int
end
```

Um array não é primitivo porque é um agregado que contém uma sequência de valores de elementos. Uma classe não é primitiva porque é um objeto gerenciado nominal com campos e métodos declarados.

### Primitivo não significa “não gerenciado”

“Primitivo” descreve o contrato da linguagem, não uma única estratégia universal de armazenamento. Valores inteiros e booleanos têm representações escalares diretas. `String` continua sendo um tipo primitivo no código-fonte, embora seu armazenamento de texto seja gerenciado pelo ambiente de execução. `nil` representa ausência, enquanto `Never` não tem qualquer valor possível em tempo de execução.

Não use “primitivo” para presumir o tamanho em bytes, a posição na pilha, o comportamento de alocação ou a instrução de máquina de um valor. Esses são detalhes de backend, a menos que um capítulo os torne explicitamente parte do contrato da linguagem.

### Primitivo não significa “implicitamente conversível”

As famílias de primitivas não se reduzem a uma única categoria escalar flexível. `Int32`, `Int64` e `Float64` são tipos distintos. Pop não os amplia silenciosamente apenas porque os três são embutidos.

```pop
local count: Int32 = 42
local wide: Int64 = Int64(count)
local measurement: Float64 = Float64(wide)
```

Conversões explícitas preservam o modelo numérico escolhido e tornam as verificações de intervalo visíveis no código-fonte.

## As famílias de primitivas

| Categoria | Páginas de primitivas |
| --- | --- |
| Ausência | [`nil`](./nil/) |
| Lógica | [`Boolean`](./boolean/) |
| Inteiros com sinal | [`Int8`](./int8/), [`Int16`](./int16/), [`Int32`](./int32/), [`Int64`](./int64/) |
| Inteiros sem sinal | [`UInt8`](./uint8/), [`UInt16`](./uint16/), [`UInt32`](./uint32/), [`UInt64`](./uint64/) |
| Ponto flutuante | [`Float32`](./float32/), [`Float64`](./float64/) |
| Texto | [`String`](./string/) |
| Nenhum valor possível | [`Never`](./never/) |

Cada página específica explica o domínio, os literais, as operações, as conversões, as falhas, os usos apropriados e os limites atuais do tipo na rc.3.

### Ausência: `nil`

`nil` é um tipo primitivo com um único valor literal, também escrito `nil`. Normalmente, ele aparece como um dos membros de um tipo opcional:

```pop
function findName(names: {[Int]: String}, id: Int): String?
    return names[id]
end
```

`String?` é uma abreviação de `String | nil`. O opcional é uma união que contém uma primitiva, não um modo especial de veracidade.

### Lógica: `Boolean`

`Boolean` tem exatamente `true` e `false`. As condições o exigem:

```pop
local ready: Boolean = true

if ready then
    print("Iniciando")
end
```

Pop não transforma inteiros, strings, objetos gerenciados ou valores opcionais em condições booleanas.

### Inteiros com sinal

Os tipos inteiros com sinal representam números inteiros negativos, zero e positivos dentro de um intervalo fixo:

```pop
local temperature: Int8 = -5
local balance: Int64 = -2500
```

Escolha um tipo com sinal quando o domínio realmente incluir valores abaixo de zero. A aritmética é verificada em relação à largura selecionada.

### Inteiros sem sinal

Os tipos inteiros sem sinal representam zero e números inteiros positivos:

```pop
local channel: UInt8 = 3
local fileSize: UInt64 = 4096
```

Um tipo sem sinal comunica que valores negativos não pertencem ao domínio. Isso não elimina as verificações de estouro no limite superior.

### Ponto flutuante

`Float32` e `Float64` representam valores de ponto flutuante e aceitam literais decimais:

```pop
local opacity: Float32 = 0.75
local distance: Float64 = 1250.5
```

Valores de ponto flutuante são representações binárias aproximadas. Eles não substituem todos os domínios de números inteiros e não são chaves de tabela válidas na rc.3.

### Texto: `String`

`String` armazena texto:

```pop
local name: String = "Ada"
local message = `Olá, {name}!`
```

Use `..` para concatenar duas strings e `String(value)` para formatar deliberadamente uma primitiva aceita. Pop não tem uma primitiva `Character` separada na rc.3.

### Nenhum valor: `Never`

`Never` é um tipo desabitado: nenhuma expressão pode terminar normalmente produzindo um valor `Never`. O compilador o utiliza ao raciocinar sobre fluxos de controle que não podem continuar.

A maioria dos programas de iniciantes nunca escreve `Never`, mas entendê-lo evita um equívoco comum: ele não é outra grafia para `nil` nem um marcador dinâmico semelhante a um tipo inferior. `nil` é um valor real de ausência; `Never` não tem valor algum.

## Primitivas e aliases

Pop também oferece aliases convenientes:

- `Int` é `Int64`.
- `Float` é `Float64`.
- `Byte` é `UInt8`.

Esses são aliases verdadeiros, não tipos separados. Um valor declarado como `Int` pode ser usado onde quer que se espere `Int64`. Consulte [Aliases de primitivas](./aliases/) para ver exemplos.

Um alias não cria um novo intervalo, representação, conjunto de sobrecargas ou identidade nominal:

```pop
local ordinary: Int = 42
local exact: Int64 = ordinary
```

Use aliases para os casos gerais convencionais. Use nomes exatos quando uma largura fizer parte de um protocolo, formato de armazenamento, contrato público ou limite de domínio.

## Valores literais

Literais escrevem valores simples diretamente no código-fonte:

```pop
local answer = 42
local ready = true
local name = "Ada"
local missing = nil
```

O contexto ao redor pode escolher um tipo numérico mais específico:

```pop
local small: Int8 = 42
local octet: Byte = 255
local measurement: Float64 = 42
```

Sem um tipo numérico esperado, um literal inteiro decimal usa `Int`. Um literal que contém um ponto decimal ou um expoente de base dez usa `Float64`, a menos que o contexto selecione `Float32`.

O literal é uma sintaxe do código-fonte, enquanto seu tipo vem do contexto e dos padrões da linguagem. Portanto, o mesmo token pode inicializar diferentes tipos numéricos exatos quando o valor for representável em cada um:

```pop
local tiny: Int8 = 10
local ordinary: Int = 10
local unsigned: UInt32 = 10
local floating: Float32 = 10
```

Literais de string, booleanos e `nil` têm diretamente seus tipos primitivos correspondentes.

## As operações permanecem nos tipos resolvidos

Em operações binárias numéricas comuns, ambos os operandos usam um único tipo correspondente:

```pop
local left: Int16 = 20
local right: Int16 = 22
local answer = left + right
```

O código a seguir é rejeitado, em vez de ser ampliado silenciosamente:

```pop
local narrow: Int16 = 20
local wide: Int64 = 22

-- local answer = narrow + wide
```

Escolha o domínio do resultado e converta explicitamente:

```pop
local answer = Int64(narrow) + wide
```

O mesmo princípio se aplica à ordenação. A igualdade só está disponível quando os tipos resolvidos dos operandos a definem.

## Valores primitivos dentro de tipos maiores

As primitivas se tornam as folhas de modelos mais ricos:

```pop
private record User
    id: UInt64
    name: String
    active: Boolean
end
```

```pop
local temperatures: {Float32} = { 18.5, 20.0, 19.25 }
local scores: {[String]: Int} = {}
```

O agregado fornece a estrutura; os tipos primitivos definem os domínios individuais dos campos, elementos, chaves e valores.

Opcionais e uniões também podem conter primitivas:

```pop
local possibleScore: Int? = scores["Ada"]
```

A primitiva não perde suas regras quando está aninhada. Se uma operação precisa de `Int`, um `Int?` não deve ser tratado como se sua presença estivesse garantida.

## Escolhendo uma primitiva de forma deliberada

Pergunte o que o valor significa antes de escolher seu tipo:

| Pergunta | Direção provável |
| --- | --- |
| É apenas verdadeiro ou falso? | `Boolean` |
| O número inteiro pode ser negativo? | inteiro com sinal |
| O número inteiro nunca é negativo? | inteiro sem sinal |
| O valor exige representação fracionária? | `Float32` ou `Float64` |
| É um texto legível por pessoas? | `String` |
| Um valor pode estar ausente? | um opcional, como `String?` |
| A execução não pode produzir valor algum? | o raciocínio do compilador pode envolver `Never` |

Use uma largura grande o suficiente para o domínio. Não escolha um inteiro menor apenas porque o valor do exemplo atual cabe nele e não use ponto flutuante somente para evitar a escolha de uma largura de inteiro.

## Como o compilador transporta primitivas

Quando Pop verifica uma expressão primitiva, ele resolve um único tipo e uma única operação exatos antes da execução no backend. A HIR preserva o significado tipado da linguagem. A MIR reduz esse significado a operações concretas de escalar, string, opcional, conversão ou falha. O interpretador e o backend nativo devem concordar quanto ao resultado.

Para uma adição verificada:

```pop
local answer: Int8 = left + right
```

o backend não pode usar silenciosamente um inteiro maior sem verificação e descartar o estouro. Para a concatenação de `String`, ele não pode reinterpretar `+` como comportamento de texto. O tipo do código-fonte determina a operação em todas as etapas.

Os layouts de armazenamento dos backends podem ser diferentes e, ainda assim, preservar as mesmas regras visíveis. Essa distinção é a razão pela qual as páginas individuais descrevem as garantias do código-fonte separadamente dos detalhes úteis de implementação.

## O que não é uma primitiva na rc.3?

Estes são tipos importantes, embutidos ou definidos pelo usuário, mas não são tipos escalares primitivos:

- arrays e tabelas;
- tuplas e tipos de função;
- registros e classes;
- interfaces;
- enums e uniões marcadas;
- os próprios aliases de tipo;
- namespaces, Modules, Bubbles, Packages e Workspaces.

Alguns são agregados, alguns são declarações nominais, alguns descrevem comportamento chamável e alguns organizam um programa em vez de representar valores em tempo de execução.

## Lendo as páginas de primitivas

Se você está começando na programação tipada, leia primeiro:

1. [`Boolean`](./boolean/)
2. [`Int64`](./int64/) e [aliases](./aliases/)
3. [`Float64`](./float64/)
4. [`String`](./string/)
5. [`nil`](./nil/)

Depois, leia as páginas de inteiros com largura exata quando um domínio ou uma API precisar deles. Leia `Never` depois de funções e fluxo de controle; ele faz mais sentido após você conhecer retornos e caminhos que não podem continuar.

Se já conhece tipos de largura fixa, use a tabela de famílias para ir diretamente ao tipo cujos literais, conversões e comportamentos de falha na rc.3 você precisa consultar.

## `Never`

`Never` é o tipo desabitado: nenhum valor pode tê-lo. Ele descreve um fluxo de controle que não pode continuar normalmente. A maioria dos programas não nomeia `Never` diretamente, mas o compilador o utiliza ao verificar caminhos que sempre param ou retornam.

Valores primitivos não se tornam outros tipos primitivos implicitamente. Pop exige que os dois lados de operações aritméticas e de ordenação tenham exatamente o mesmo tipo numérico. Use uma chamada explícita ao tipo de destino, como `Int32(value)` ou `Float64(value)`, para uma conversão numérica verificada, e `String(value)` para a formatação determinística de primitivas.
