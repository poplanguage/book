---
title: Funções e fluxo de controle
description: Mantenha os blocos no estilo de Luau enquanto aprende os contratos exatos de funções, resultados e loops de Pop.
sidebar:
  order: 2
---

O fluxo de controle é onde o conhecimento de Luau mais economiza tempo. A sintaxe de funções e blocos pode ser lida de imediato, mas Pop impõe limites estáticos mais rigorosos a chamadas, resultados, condições e loops.

## Declarações de funções parecem familiares

```pop
function greet(name: String)
    print(`Olá, {name}!`)
end
```

As palavras-chave e a estrutura do bloco são familiares. O tipo do parâmetro não é uma documentação opcional: cada chamada deve fornecer exatamente uma `String`.

```pop
greet("Ada")

-- Rejeitado: tipo de argumento incorreto.
-- greet(42)
```

Pop não preenche silenciosamente um argumento ausente com `nil`, não ignora um argumento adicional nem adia a incompatibilidade para o tempo de execução.

## Resultados devem ser declarados

Acrescente o tipo do resultado após a lista de parâmetros:

```pop
function double(value: Int): Int
    return value * 2
end
```

Todo caminho alcançável deve respeitar esse resultado. Uma função sem a anotação é uma função sem resultado, mesmo que o corpo portado de Luau contenha uma ideia que produza um valor.

Para uma decisão que escolhe um valor, uma expressão `if` é concisa:

```pop
function larger(left: Int, right: Int): Int
    return if left > right then left else right
end
```

Uma expressão `if` exige `else`, não possui um `end` final e tem o mesmo tipo nos dois ramos.

## Parâmetros e variáveis locais têm regras de mutação diferentes

Na rc.3, parâmetros são vínculos imutáveis:

```pop
function normalize(value: Int): Int
    local result = value

    if result < 0 then
        result = 0
    end

    return result
end
```

Isso mantém estável o argumento recebido ao longo da função. Use uma variável local para o estado que muda durante o algoritmo.

## Funções locais e closures ainda carregam estado

Pop oferece funções locais e capturas léxicas:

```pop
function makeCounter(): function(): Int
    local value = 0

    local function next(): Int
        value += 1
        return value
    end

    return next
end
```

A closure compartilha a variável local capturada. Pop preserva seu tipo estático `Int` e seu tempo de vida gerenciado.

Não deduza do suporte a closures que funções são objetos dinâmicos com campos arbitrários. Valores de função possuem tipos de função declarados, entradas e resultados exatos e nenhuma igualdade geral.

## Vários resultados formam um pacote exato

```pop
function bounds(): (Int, Int)
    return 1, 10
end

local lower, upper = bounds()
```

Pop não trunca, preenche nem remodela livremente listas de resultados. O produtor e o receptor concordam quanto à aridade e aos tipos exatos.

A atribuição múltipla avalia todos os valores do lado direito antes de armazená-los:

```pop
local left, right = 10, 20
left, right = right, left
```

Essa troca familiar continua segura porque as duas variáveis locais possuem tipos estáticos compatíveis.

## APIs variádicas precisam de um novo formato

A rc.3 não expõe assinaturas de função variádicas no estilo de Luau. Substitua uma API variádica por um destes projetos:

- uma quantidade fixa de parâmetros tipados;
- um array tipado de comprimento fixo quando a entrada real for uma coleção;
- um registro para configurações nomeadas;
- várias funções nomeadas intencionalmente para operações realmente diferentes.

Não esconda formatos de argumentos distintos em uma única tabela universal apenas para reproduzir `...`.

## `if` mantém o formato e muda seu contrato de condição

```pop
if score >= 90 then
    print("excelente")
elseif score >= 60 then
    print("aprovado")
else
    print("tente novamente")
end
```

Os ramos e o `end` compartilhado são familiares. Toda condição deve ser `Boolean`, e cada ramo cria seu próprio escopo local.

Use uma instrução para várias operações ou retornos antecipados. Use uma expressão `if` quando o único objetivo for escolher um valor tipado.

## `while` e `repeat` são transferidos diretamente

```pop
local remaining = 3

while remaining > 0 do
    print(remaining)
    remaining -= 1
end
```

```pop
local attempt = 0

repeat
    attempt += 1
    print(attempt)
until attempt >= 3
```

A condição de `while` é verificada antes do corpo. A condição de `repeat` é verificada depois, portanto seu corpo é executado ao menos uma vez.

A condição continua sendo exatamente `Boolean`; um valor opcional, um número ou um objeto não podem substituí-la.

## O `for` numérico é inclusivo

```pop
for index = 1, 5 do
    print(index)
end
```

O limite superior está incluído. Forneça uma terceira expressão para o passo:

```pop
for even = 2, 10, 2 do
    print(even)
end

for countdown = 5, 1, -1 do
    print(countdown)
end
```

O início, o limite e o passo:

- são avaliados uma vez, da esquerda para a direita;
- usam um único tipo inteiro fixo idêntico;
- rejeitam um passo zero;
- avançam com aritmética verificada.

O vínculo do loop é imutável e existe somente dentro do corpo.

## A iteração generalizada não é transferida

Estas formas de Luau não possuem um equivalente direto na rc.3:

```lua
for key, value in pairs(values) do
end

for index, value in ipairs(values) do
end
```

O `for value in collection` generalizado não está implementado. Tabelas não expõem enumeração. Arrays fixos podem usar suas posições com base um:

```pop
for index = 1, Array.length(values) do
    local value = Array.get(values, index)
    use(value)
end
```

Isso não é uma inconveniência sintática que esconde um protocolo de iterador existente. A interface nominal de `Iterable<T>` e `Iterator<T>` é um trabalho futuro, portanto o livro não ensina adaptadores imaginários.

## `break` e `continue`

Ambos atuam no loop ativo mais interno:

```pop
for number = 1, 10 do
    if number == 3 then
        continue
    elseif number > 6 then
        break
    end

    print(number)
end
```

Eles não podem atravessar o limite de uma função aninhada. Um `break` dentro de uma função local não tem como destino um loop ao redor da declaração dessa função.

## Expectativas sobre operadores

Os operadores familiares possuem tipos mais restritos:

| Operador | Operandos em Pop |
| --- | --- |
| `and`, `or`, `not` | `Boolean` |
| `+`, `-`, `*`, `/` | tipos numéricos correspondentes |
| `%` | tipos inteiros correspondentes |
| `<`, `<=`, `>`, `>=` | tipos numéricos correspondentes |
| `..` | dois valores `String` |
| `==`, `~=` | tipos com igualdade definida |

A atribuição composta deriva dessas operações:

```pop
count += 1
message ..= "!"
```

O destino mantém seu tipo original. Entradas de tabela não são destinos de atribuição composta na rc.3 porque a consulta é opcional e a política para chaves ausentes não é implícita.

## Métodos com dois-pontos são nominais

No local da chamada:

```pop
counter:increment()
```

Na declaração:

```pop
public function Counter:increment()
    self.value += 1
end
```

O nome da classe antes dos dois-pontos declara o tipo do receptor. `self` é resolvido estaticamente. Não há uma consulta oculta à metatabela que escolha em tempo de execução uma função de uma tabela mutável.

## Um padrão de portabilidade para código com callbacks

Quando uma função Luau aceitar um callback, escreva o tipo completo da função em Pop:

```pop
function applyTwice(
    value: Int,
    transform: function(Int): Int,
): Int
    return transform(transform(value))
end

function increment(value: Int): Int
    return value + 1
end

local result = applyTwice(10, increment)
```

O callback não pode aceitar inesperadamente outro formato ou retornar outro tipo. Se vários contratos de callback forem necessários, declare-os de forma intencional.

## Lista de verificação

Ao traduzir uma função Luau, verifique:

1. Os tipos de todos os parâmetros e resultados estão escritos?
2. O original depende de argumentos ausentes ou adicionais?
3. Algum parâmetro é reatribuído?
4. Alguma condição depende de truthiness?
5. O retorno múltiplo depende de truncamento ou preenchimento?
6. Algum loop depende de `pairs`, `ipairs` ou de um iterador personalizado?
7. Algum método depende de consulta à metatabela?
8. Algum operador depende de coerção ou de um metamétodo?

A sintaxe do bloco já pode parecer correta enquanto um desses contratos ainda estiver errado.

A seguir, [De tabelas universais a dados intencionais](./data-modeling/) desenvolve a maior mudança de projeto: substituir um único mecanismo de tabela por vários agregados Pop criados para finalidades específicas.
