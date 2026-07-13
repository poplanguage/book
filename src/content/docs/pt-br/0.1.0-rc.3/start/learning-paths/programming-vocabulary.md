---
title: Vocabulário de programação
description: Aprenda o pequeno conjunto de palavras usado ao longo dos capítulos para iniciantes.
sidebar:
  order: 1
---

A programação apresenta muitos nomes para ideias simples. Este capítulo dá a esses nomes um lugar concreto em um programa Pop. Você não precisa memorizar as definições antes de continuar; volte aqui quando uma explicação posterior usar uma palavra desconhecida.

```pop title="welcome.pop"
namespace Welcome

function greeting(name: String): String
    return `Olá, {name}!`
end

function main()
    local visitor = "Ada"
    local message = greeting(visitor)
    print(message)
end
```

## Código-fonte e arquivos-fonte

**Código-fonte** é o texto que você escreve para o compilador. Arquivos-fonte de Pop terminam em `.pop`, portanto o exemplo poderia ser armazenado como `welcome.pop`.

O código-fonte não é o executável nativo final. Ele é uma descrição precisa que o compilador Pop verifica e traduz.

## Um namespace

Todo arquivo-fonte de Pop começa com uma declaração de namespace:

```pop
namespace Welcome
```

Um **namespace** oferece um local estável às declarações de um arquivo. Aplicações maiores podem usar nomes como `Shop.Payments` e `Shop.Products` sem colocar todas as declarações em uma única coleção global.

Um namespace não é um objeto de tempo de execução. Você não pode armazenar `Welcome` em uma variável local nem construí-lo. Ele organiza nomes enquanto Pop compila o programa.

## Declarações

Uma **declaração** introduz algo que o restante do programa pode nomear. O exemplo declara duas funções:

```pop
function greeting(name: String): String
    return `Olá, {name}!`
end
```

```pop
function main()
    -- instruções
end
```

Registros, classes, interfaces, constantes, enums e aliases de tipo são outros tipos de declaração apresentados mais adiante no livro.

## Funções e chamadas

Uma **função** é um comportamento nomeado. Seu corpo contém as instruções realizadas quando o código a chama.

```pop
function greeting(name: String): String
    return `Olá, {name}!`
end
```

Essa função se chama `greeting`. A expressão abaixo é uma **chamada**:

```pop
greeting("Ada")
```

Uma declaração descreve a função; uma chamada pede que ela seja executada.

### O ponto de entrada

`main` é o **ponto de entrada** de um programa Pop executável:

```pop
function main()
    print("O programa iniciou")
end
```

Quando você executa o programa, Pop começa chamando `main`. Funções auxiliares são executadas somente quando `main` ou outra função alcançável as chama.

## Valores e tipos

Um **valor** é um dado específico:

```pop
"Ada"
42
true
```

Um **tipo** descreve quais valores pertencem a uma categoria e quais operações são válidas para eles:

| Valor | Tipo |
| --- | --- |
| `"Ada"` | `String` |
| `42` no contexto inteiro comum | `Int` |
| `true` | `Boolean` |

Tipos não são comentários em Pop. O compilador os usa para rejeitar operações que não têm significado definido.

```pop
local score: Int = 10

-- Rejeitado: uma String não é um Int.
-- score = "dez"
```

Pop frequentemente infere o tipo de uma variável local a partir de seu valor inicial. Em `local visitor = "Ada"`, o compilador determina que `visitor` é uma `String`. O tipo continua sendo `String` depois da inferência.

## Variáveis locais e atribuição

Uma **variável local** é um local de armazenamento nomeado disponível dentro de seu bloco:

```pop
local visitor = "Ada"
```

O inicializador fornece à variável local seu primeiro valor. Pop exige variáveis locais inicializadas, portanto `local visitor` sozinho não é uma declaração completa.

Uma **atribuição** substitui o valor armazenado em uma variável local mutável:

```pop
local score = 10
score = 15
```

A atribuição pode alterar o valor, mas não pode mudar o tipo da variável local.

## Parâmetros e argumentos

Um **parâmetro** é um nome em uma declaração de função:

```pop
function greeting(name: String): String
```

Aqui, `name` é um parâmetro `String`. Um **argumento** é o valor fornecido por uma chamada específica:

```pop
greeting("Ada")
```

Aqui, `"Ada"` é o argumento. Pop verifica se cada argumento corresponde a seu parâmetro.

Parâmetros são vínculos imutáveis na rc.3. Uma função que precisa de um valor de trabalho mutável pode inicializar uma variável local a partir do parâmetro.

## Resultados e return

O tipo depois da lista de parâmetros de uma função é seu tipo de resultado:

```pop
function greeting(name: String): String
```

Essa declaração promete que chamar `greeting` produz uma `String`. `return` fornece esse resultado:

```pop
return `Olá, {name}!`
```

Pop não infere tipos de resultado de funções. Uma função sem anotação de resultado realiza um trabalho, mas não retorna um valor a quem a chamou.

## Expressões e instruções

Uma **expressão** produz um valor. Estes são exemplos de expressões:

```pop
10 + 5
greeting(visitor)
if ready then "ir" else "aguardar"
```

Uma **instrução** realiza uma ação no corpo de uma função. Estes são exemplos de instruções:

```pop
local message = greeting(visitor)
print(message)
score = score + 1
```

A distinção explica por que algumas sintaxes podem aparecer dentro de uma expressão maior, enquanto outras ocupam sua própria linha. Por exemplo, Pop tem tanto uma instrução `if` para blocos de trabalho quanto uma expressão `if` para escolher um valor.

## Blocos, `end` e indentação

Um **bloco** agrupa instruções. Os corpos de funções, `if`, `while` e `for` numérico são blocos fechados por `end`.

```pop
if ready then
    print("Iniciando")
end
```

A indentação mostra às pessoas quais instruções pertencem juntas. A palavra-chave `end` fornece ao compilador o limite estrutural. Use uma indentação consistente, embora espaços em branco por si só não fechem o bloco.

## Escopo

O **escopo** de um nome é a parte do código-fonte onde esse nome pode ser usado.

```pop
if ready then
    local message = "Iniciando"
    print(message)
end

-- message está fora do escopo aqui
```

Escopos pequenos reduzem dependências acidentais. Um valor temporário usado somente em um ramo deve normalmente permanecer dentro desse ramo.

## Condições e fluxo de controle

O **fluxo de controle** determina quais instruções são executadas e com que frequência.

Um `if` escolhe um caminho:

```pop
if score >= 10 then
    print("Aprovado")
else
    print("Tente novamente")
end
```

Um laço repete um bloco:

```pop
for number = 1, 3 do
    print(number)
end
```

Toda condição tem o tipo `Boolean`. Pop não trata valores arbitrários como verdadeiros ou falsos.

## Valores opcionais

Às vezes, uma operação pode não encontrar um valor. Pop expressa essa possibilidade no tipo:

```pop
local names: {String} = { "Ada", "Grace" }
local possibleName: String? = names[1]
```

`String?` significa “uma `String` pode estar presente ou o valor pode ser `nil`”. Ele é chamado de tipo **opcional**.

O ponto de interrogação não representa incerteza no compilador. Ele é uma informação precisa de que o programa não deve usar o resultado como uma `String` garantida.

## Arrays, tabelas, registros e classes

Todos esses tipos agrupam dados, mas respondem a perguntas diferentes:

| Tipo | Melhor pergunta |
| --- | --- |
| Array | “Qual valor está nesta posição com base um?” |
| Tabela | “Qual valor opcional está associado a esta chave tipada?” |
| Registro | “Quais são as partes fixas e nomeadas deste valor?” |
| Classe | “Qual objeto possui esta identidade e este estado mutável?” |

Escolher entre eles faz parte da modelagem de um programa. Pop não reduz todas as coleções e objetos a uma única representação universal de tabela.

## Compilador, verificador e executável

O **compilador** lê o código-fonte Pop e traduz programas válidos. O verificador é a parte que resolve nomes e verifica tipos e regras da linguagem.

Use:

```sh
pop check welcome.pop
```

para validar o programa sem executá-lo intencionalmente.

Use:

```sh
pop run welcome.pop
```

para verificá-lo, compilá-lo e executá-lo.

Use:

```sh
pop build welcome.pop --output welcome
```

para criar um executável nativo para uso posterior.

## Erros em tempo de compilação e traps em tempo de execução

Um **erro em tempo de compilação** significa que Pop não consegue produzir um programa válido a partir do código-fonte. Um tipo de argumento incorreto, um nome desconhecido ou um `end` ausente é informado antes da execução.

Um **trap em tempo de execução** ocorre depois que um código-fonte válido começa a ser executado e encontra uma falha verificada, como um acesso verificado inválido a um array ou um estouro numérico.

Pop rc.3 não oferece exceções no nível do código-fonte para capturar traps. Normalmente, a melhor resposta é impedir o estado inválido ou usar uma operação cujo resultado represente explicitamente a ausência.

## Bubble e projeto

Uma **Bubble** é o limite de compilação e visibilidade de Pop. Um manifesto `bubble.toml` descreve um projeto, e `src/main.pop` é seu código-fonte executável convencional.

Você pode ignorar Bubbles durante a execução dos primeiros exemplos de arquivo único. Elas se tornam importantes quando um programa tem vários arquivos-fonte ou uma superfície pública.

## Uma pequena lista de verificação de leitura

Quando um exemplo parecer denso, pergunte:

1. Quais nomes são declarações?
2. Qual função inicia o programa?
3. Qual é o tipo de cada variável local?
4. Quais linhas são expressões e quais são instruções?
5. Onde termina cada bloco?
6. Uma operação pode retornar um valor opcional?
7. Uma falha informada foi detectada durante a compilação ou a execução?

Essas perguntas são suficientes para destrinchar a maioria dos exemplos da primeira metade deste livro.
