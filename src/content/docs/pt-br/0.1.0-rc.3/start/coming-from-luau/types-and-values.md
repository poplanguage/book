---
title: Tipos, veracidade e valores
description: Substitua as suposições graduais e coercitivas de Luau pelo modelo estático fechado de valores de Pop.
sidebar:
  order: 1
---

Luau permite que um projeto adicione informações estáticas gradualmente. Pop começa com outro contrato: todo valor e toda operação alcançáveis devem ter um significado estático resolvido antes da execução.

Isso não é apenas “Luau com mais anotações”. Muda quais programas podem ser expressos e onde a incerteza deve aparecer.

## Inferência não é tipagem dinâmica

Ambas as linguagens podem inferir uma variável local:

```pop
local score = 10
```

Em Pop, essa inferência escolhe permanentemente um tipo para a variável local. A declaração se comporta como se o tipo tivesse sido escrito:

```pop
local score: Int = 10
```

Atribuições posteriores podem mudar o `Int` armazenado, mas não o tipo:

```pop
score = 25

-- Rejeitado:
-- score = "vinte e cinco"
```

Não há uma saída de emergência `any` que adie essa operação para o tempo de execução. Se vários valores realmente representarem casos diferentes, modele esses casos com um enum ou uma união etiquetada em vez de apagar seus tipos.

## Nomes de tipos são tipos Pop

Algumas ideias comuns usam nomes diferentes:

| Tipo Luau | Abordagem habitual em Pop |
| --- | --- |
| `boolean` | `Boolean` |
| `string` | `String` |
| `number` | escolha um primitivo inteiro ou de ponto flutuante |
| `nil` | `nil`, normalmente como parte de `T?` |
| tabela com formato de array `{T}` | `{T}` ou `Array<T>`, com tamanho fixo |
| `{[K]: V}` | `{[K]: V}` ou `Table<K, V>`, com chaves e operações mais estritas |
| objeto de tabela estrutural | registro, classe ou interface |
| `any` / `unknown` | sem equivalente direto em Pop |

Uma pontuação parecida não implica um comportamento idêntico em tempo de execução. Em particular, `{String}` de Pop é um tipo de array dedicado, não uma abreviação para uma convenção geral de tabelas.

## Condições respondem a uma pergunta booleana

As condicionais de Luau aceitam valores de qualquer tipo e interpretam apenas `false` e `nil` como falsos. As condições de Pop aceitam somente `Boolean`.

Em vez de:

```lua
if count then
    print(count)
end
```

declare a pergunta pretendida:

```pop
if count > 0 then
    print(count)
end
```

Essa distinção importa porque a forma Luau esconde vários significados possíveis:

- “a contagem é positiva?”
- “a contagem é diferente de zero?”
- “uma contagem foi fornecida?”
- “uma operação foi bem-sucedida?”

Essas perguntas podem exigir tipos e comparações diferentes. Pop faz o programa escolher.

### Operadores lógicos continuam booleanos

Em Luau, `and` e `or` são usados com frequência para selecionar e propagar valores arbitrários dos operandos. Em Pop, eles são operadores booleanos:

```pop
local shouldStart = enabled and ready
local shouldStop = failed or cancelled
```

Use uma expressão `if` para escolher um valor não booleano:

```pop
local label = if ready then "pronto" else "aguardando"
```

Os dois ramos devem ter um único tipo estático exato.

## A ausência tem um tipo visível

Um tipo opcional de Pop declara que um valor pode estar ausente:

```pop
function lookup(
    scores: {[String]: Int},
    name: String,
): Int?
    return scores[name]
end
```

O resultado `Int?` é uma abreviação de `Int | nil`. Quem chama não pode passá-lo diretamente onde um `Int` é exigido.

Isso difere de permitir que `nil` apareça por qualquer caminho de valores. A assinatura da função identifica a incerteza em sua origem.

### Limites dos opcionais na rc.3

A base é intencionalmente limitada nesta versão:

- o refinamento completo de fluxo não está implementado;
- não há operador geral de propagação ou desempacotamento `?`;
- um literal `nil` isolado não é ampliado implicitamente para todo opcional anotado;
- a atribuição a uma tabela com valores opcionais não é uma exclusão.

Prefira uma API cujo resultado continue opcional de forma honesta ou use uma operação verificada depois de estabelecer sua pré-condição. Não invente um valor padrão falso apenas para fazer o ponto de interrogação desaparecer.

## Escolha o significado numérico

O modelo comum de `number` de Luau não informa a quem lê se um valor é um índice, uma contagem de bytes, um saldo com sinal ou uma medida fracionária. Pop fornece primitivos numéricos fixos.

```pop
local retryCount: UInt8 = 3
local balance: Int64 = -250
local completion: Float64 = 0.75
```

Inteiros com sinal:

```text
Int8  Int16  Int32  Int64
```

Inteiros sem sinal:

```text
UInt8  UInt16  UInt32  UInt64
```

Ponto flutuante:

```text
Float32  Float64
```

`Int` e `Byte` são aliases convenientes documentados na seção de primitivos.

### As conversões são explícitas

Larguras diferentes não são combinadas silenciosamente:

```pop
local small: Int16 = 120
local wide: Int64 = Int64(small)
local decimal: Float64 = Float64(wide)
```

As chamadas do tipo de destino tornam a conversão visível e verificada. Um valor fora do intervalo do destino causa uma falha em vez de voltar ao início do intervalo ou depender de uma coerção implícita.

Ao portar um número, pergunte:

1. Ele pode ser negativo?
2. Ele pode conter uma fração?
3. Qual intervalo é válido para o domínio?
4. Ele atravessa o limite público de uma função ou de dados?

As respostas selecionam um tipo com mais confiabilidade do que copiar a anotação original.

## Operações de string são explícitas

Continue usando `..` para duas strings:

```pop
local fullName = first .. " " .. last
```

Use interpolação com crases quando valores aparecerem dentro de uma mensagem maior:

```pop
local message = `{name} tem {score} pontos`
```

Use `String(value)` para uma conversão de primitivo compatível:

```pop
local message = "pontuação=" .. String(score)
```

Não use `+` para strings. Ele continua sendo um operador numérico, e Pop não chama um metamétodo nem um mecanismo alternativo universal de `tostring`.

## A igualdade é direcionada pelos tipos

`==` e `~=` continuam reconhecíveis, mas o suporte à igualdade pertence aos tipos resolvidos dos operandos.

Valores primitivos usam sua igualdade de valores definida. Registros são comparados estruturalmente quando todos os campos aceitam igualdade. Classes comparam a identidade gerenciada. Arrays, tabelas e funções não recebem uma igualdade estrutural inventada na rc.3.

Isso significa que uma comparação de Luau deve ter sua intenção revisada:

- compare dados de registros quando a igualdade de valores for significativa;
- compare uma classe quando a identidade do objeto for significativa;
- escreva uma comparação deliberada de elementos quando o conteúdo de uma coleção importar.

## Constantes não são globais mutáveis

Constantes Pop são declarações cujos valores são avaliados pelo sistema de tempo de compilação. Uma constante utilizável em tempo de execução ainda tem identidade e tipo declarados fixos.

Elas não criam um ambiente global mutável no qual qualquer arquivo-fonte pode adicionar ou substituir nomes. O estado de tempo de execução pertence a variáveis locais, objetos gerenciados e valores passados por funções tipadas.

## Um exercício de conversão

Comece com este trecho de Luau:

```lua
local value = getValue()

if value then
    print("valor=" .. value)
end
```

Ainda não o traduza. Primeiro, responda:

1. Quais valores exatos `getValue` pode retornar?
2. A ausência é possível ou a condição está testando uma propriedade numérica/de string?
3. De qual tipo `print` precisa?
4. A conversão para texto faz parte do contrato da função ou apenas da apresentação?

Possíveis designs em Pop incluem:

- `getValue(): Int` mais `if value > 0 then`;
- `hasValue(): Boolean` e uma operação de valor verificada separada;
- `getValue(): Int?` preservado como opcional por toda a API que chama;
- `getLabel(): String` se o verdadeiro propósito da operação for a apresentação.

A tradução correta depende de um significado que Luau permitia ao código-fonte deixar implícito.

## O que manter e o que substituir

Mantenha:

- inferência local para inicializadores óbvios;
- operações booleanas, numéricas e textuais depois que seus tipos forem conhecidos;
- `==`, `~=`, `and`, `or` e `not` quando os operandos forem compatíveis;
- `..` e interpolação com crases para composição de texto.

Substitua:

- a mudança de uma variável local de um tipo para outro;
- `any` como atalho de integração;
- veracidade como substituto para uma pergunta do domínio;
- a suposição de um único `number` universal;
- coerção implícita de strings;
- caminhos de `nil` não rastreados.

Em seguida, [Funções e fluxo de controle](./functions-and-control-flow/) mostra quais blocos com formato de Luau são transferíveis e onde Pop exige aridade, resultados e comportamento de iteração exatos.
