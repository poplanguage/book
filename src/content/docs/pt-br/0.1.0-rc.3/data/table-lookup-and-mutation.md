---
title: Consulta e mutação de tabelas
description: Construa tabelas tipadas, recupere valores opcionais, insira e substitua entradas e acompanhe uma operação de tabela pelo compilador e pelo ambiente de execução da rc.3.
---

Uma tabela armazena associações entre chaves e valores. Você escolhe um tipo de chave e um tipo de valor, e o compilador verifica cada consulta e mutação em relação a essa escolha.

```pop
local scores: {[String]: Int} = {
    ada = 10,
    grace = 20,
}

scores["linus"] = 15
scores["ada"] = 11

local ada: Int? = scores["ada"]
local missing: Int? = scores["unknown"]
```

A primeira atribuição insere uma nova entrada. A segunda substitui o valor associado a uma chave existente. Ambas as consultas retornam `Int?`, inclusive a consulta por `"ada"`: o verificador de tipos não prova que uma chave está presente em tempo de execução apenas porque o código-fonte contém um campo de tabela correspondente.

Este capítulo desenvolve esse exemplo desde a sintaxe do código-fonte até a representação atual no ambiente de execução da rc.3.

## O modelo mental de uma tabela

Pense em uma tabela como uma coleção de pares chave-valor:

```text
"ada"   -> 11
"grace" -> 20
"linus" -> 15
```

Cada chave identifica no máximo um valor. Atribuir um valor a uma chave que não está presente insere um par. Atribuir a uma chave que já está presente altera o valor desse par.

Uma tabela é diferente de um array:

- um array é indexado por uma posição de `0` a `length - 1`;
- uma tabela é indexada por um valor de chave compatível;
- uma consulta de array tem limites a verificar;
- uma chave de tabela ausente produz `nil` por meio de um resultado opcional.

Tabelas também são diferentes de registros. Um registro tem um conjunto fixo de campos conhecido a partir de sua declaração. Uma tabela pode adquirir novas chaves enquanto o programa é executado.

## Lendo um tipo de tabela

A sintaxe do tipo de tabela é:

```pop
{[K]: V}
```

`K` é o tipo da chave e `V` é o tipo do valor. Por exemplo:

```pop
local namesById: {[Int]: String} = {}
local enabledByName: {[String]: Boolean} = {}
local bytesByFlag: {[Boolean]: UInt8} = {}
```

A forma nomeada expressa o mesmo tipo:

```pop
local namesById: Table<Int, String> = {}
```

A forma com chaves costuma ser mais fácil de reconhecer ao lado de um literal de tabela. A forma nomeada pode ser útil dentro de um tipo mais longo.

Os tipos de tabela são invariantes. Os tipos de chave e valor devem corresponder exatamente; o compilador não reinterpreta um tipo de tabela como outro.

```pop
local narrow: {[String]: Int32} = {}

-- Isto não é uma conversão de ampliação implícita.
-- local wide: {[String]: Int64} = narrow
```

Essa regra protege a mutação. Se `wide` pudesse se referir à mesma tabela que `narrow`, o código que usa `wide` poderia armazenar um `Int64` que não pode ser lido com segurança pela visão `Int32`.

## Construindo uma tabela

Um agregado vazio precisa de um tipo de tabela esperado:

```pop
local scores: {[String]: Int} = {}
```

Sem a anotação, `{}` não indica se é um registro, uma tabela ou outro formato de agregado. Pop não tenta adivinhar a partir de instruções posteriores.

Para uma tabela com chaves `String`, campos nomeados são uma sintaxe literal conveniente:

```pop
local ports: {[String]: UInt16} = {
    http = 80,
    https = 443,
}
```

Em um contexto de tabela, `http = 80` cria a mesma associação que operações posteriores entre colchetes acessam como `ports["http"]`.

Para outros tipos de chave, comece com uma tabela tipada vazia e insira entradas explicitamente:

```pop
local names: {[Int]: String} = {}

names[1] = "Ada"
names[2] = "Grace"
```

Isso torna visíveis a expressão da chave e seu tipo exato.

## Tipos de chave compatíveis

A rc.3 aceita um conjunto deliberadamente fechado de tipos de chave de tabela:

| Família da chave | Exemplos |
| --- | --- |
| Booleano | `Boolean` |
| Inteiros com sinal | `Int8`, `Int16`, `Int32`, `Int64`, `Int` |
| Inteiros sem sinal | `UInt8`, `UInt16`, `UInt32`, `UInt64`, `Byte` |
| Texto | `String` |

Os aliases de inteiros são aceitos porque se resolvem em primitivos inteiros fixos. A expressão da chave ainda deve ter o tipo exato da chave da tabela.

Números de ponto flutuante não são chaves de tabela na rc.3. Arrays, registros, classes, tabelas, funções e uniões também não são. Rejeitar chaves incompatíveis em tempo de compilação mantém determinística a igualdade de chaves e impede que uma tabela dependa de uma comparação estrutural não especificada.

### Chaves String comparam texto

Dois valores `String` distintos que contêm o mesmo texto acessam a mesma entrada. A consulta da tabela não depende de as duas strings ocuparem a mesma alocação gerenciada.

```pop
local labels: {[String]: Int} = {}
local key = String(42)

labels[key] = 1
local found: Int? = labels["42"]
```

O ambiente de execução compara o conteúdo das strings usadas como chaves de tabela. Isso difere da relação de identidade dos objetos gerenciados em geral.

## Consultando um valor

Use colchetes para recuperar o valor associado a uma chave:

```pop
local scores: {[String]: Int} = {
    ada = 10,
}

local score = scores["ada"]
```

O tipo de `score` é `Int?`, não `Int`.

Para uma tabela `{[K]: V}`, a consulta tem o tipo conceitual:

```text
table-get({[K]: V}, K) -> V?
```

O resultado opcional representa os dois resultados possíveis:

- a chave existe, portanto o resultado contém seu valor `V`;
- a chave está ausente, portanto o resultado é `nil`.

Chaves ausentes são, portanto, dados comuns, não falhas. Uma consulta de tabela não tem falha por acesso fora dos limites como um array.

### Por que toda consulta é opcional

Em geral, o compilador não pode provar quais mutações ocorreram em tempo de execução antes de uma consulta. Considere uma função auxiliar que recebe uma tabela e um nome:

```pop
private function findScore(
    scores: {[String]: Int},
    name: String,
): Int?
    return scores[name]
end
```

A função funciona com qualquer `String`. Sua assinatura deve descrever o caso de chave ausente mesmo que algumas chamadas normalmente passem um nome conhecido.

A rc.3 ainda não fornece refinamento de fluxo completo para opcionais nem uma operação verificada de consulta de tabela. Em APIs práticas, preserve o resultado `V?` até que o código possa tratar deliberadamente a ausência.

### Valores opcionais não significam exclusão

Uma tabela pode ter, ela própria, um tipo de valor opcional:

```pop
local labels: {[String]: String?} = {}
local inherited: String? = labels["base"]

labels["copy"] = inherited
```

É permitido armazenar um valor `String?` existente. Isso cria ou substitui uma entrada; não remove a chave.

Atualmente, um `nil` isolado direto não é ampliado para um valor opcional durante uma atribuição à tabela:

```pop
-- Rejeitado na rc.3:
-- labels["draft"] = nil
```

Não há sintaxe de exclusão na rc.3. Não use armazenamento opcional como se fosse uma operação de exclusão oculta.

## Inserindo e substituindo valores

A mutação de tabelas usa a mesma sintaxe de colchetes no lado esquerdo da atribuição:

```pop
local scores: {[String]: Int} = {}

scores["ada"] = 10 -- inserir
scores["ada"] = 12 -- substituir
scores["grace"] = 15 -- inserir
```

O compilador verifica dois fatos independentes:

1. a expressão entre colchetes tem o tipo `K`;
2. a expressão à direita tem o tipo `V`.

Para `{[String]: Int}`, ambos os casos a seguir são rejeitados:

```pop
local scores: {[String]: Int} = {}

-- Tipo de chave incorreto.
-- scores[1] = 10

-- Tipo de valor incorreto.
-- scores["ada"] = "dez"
```

Uma mutação nunca altera o tipo declarado da tabela. Uma tabela vazia não é um recipiente não tipado que aprende um novo formato a cada inserção.

### A atribuição composta não é uma operação de tabela

A rc.3 aceita atribuição composta para variáveis locais, capturas, campos de classes e elementos de arrays. Ela não aceita entradas de tabela como alvos compostos.

```pop
local scores: {[String]: Int} = {
    ada = 10,
}

-- Não aceito na rc.3:
-- scores["ada"] += 1
```

Há uma questão semântica adicional: `scores["ada"]` é `Int?`, portanto incrementá-lo também exigiria uma política explícita para uma chave ausente. A rc.3 deixa essa política para futuras APIs de tabela em vez de inventar um valor alternativo.

## Tabelas têm identidade por referência

Uma tabela é um objeto gerenciado. Atribuí-la a outra variável local copia uma referência para a mesma tabela, não todas as suas entradas.

```pop
local scores: {[String]: Int} = {
    ada = 10,
}

local sameScores = scores
sameScores["ada"] = 25

local updated: Int? = scores["ada"]
```

`updated` observa a mutação feita por meio de `sameScores`. O mesmo comportamento se aplica quando uma tabela é passada para uma função:

```pop
private function recordScore(
    scores: {[String]: Int},
    name: String,
    score: Int,
)
    scores[name] = score
end
```

A função modifica o objeto de tabela de quem a chamou. Não há cópia implícita durante a chamada.

Isso é útil para índices mutáveis compartilhados, mas também significa que você deve deixar a mutação visível no nome e no propósito de uma API.

## Ordem de avaliação

Pop avalia as partes de uma operação de tabela uma vez e na ordem do código-fonte.

Para uma consulta:

```pop
local value = makeTable()[makeKey()]
```

a expressão da tabela é avaliada primeiro e, depois, a expressão da chave. Nenhuma das expressões é repetida internamente.

Para uma mutação:

```pop
makeTable()[makeKey()] = makeValue()
```

a ordem é:

1. avaliar a expressão da tabela;
2. avaliar a expressão da chave;
3. avaliar a expressão do valor;
4. realizar a inserção ou substituição.

Essa ordem importa quando alguma expressão chama uma função, aloca um valor ou altera o estado do programa. Um backend deve preservá-la.

## Um exemplo completo de API de tabela

O programa a seguir separa a mutação da consulta e explicita o resultado opcional:

```pop
namespace examples.scoreboard

private function recordScore(
    scores: {[String]: Int},
    name: String,
    score: Int,
)
    scores[name] = score
end

private function findScore(
    scores: {[String]: Int},
    name: String,
): Int?
    return scores[name]
end

function main()
    local scores: {[String]: Int} = {
        ada = 10,
        grace = 18,
    }

    recordScore(scores, "linus", 15)
    recordScore(scores, "ada", 25)

    local ada: Int? = findScore(scores, "ada")
    local unknown: Int? = findScore(scores, "unknown")

    print("Pontuações registradas; os resultados das consultas continuam opcionais.")
end
```

O limite importante está visível em `findScore`: uma tabela pode ser modificada com um `Int`, enquanto uma consulta retorna `Int?`. Nenhum valor alternativo dinâmico ou padrão fabricado transforma uma ausência em `0`.

## Como o compilador vê uma consulta

Para este código-fonte:

```pop
local score = scores[name]
```

o pipeline da rc.3 realiza estas etapas:

1. Resolve `scores` para um tipo de tabela como `{[String]: Int}`.
2. Verifica se `name` tem o tipo exato da chave, `String`.
3. Atribui à expressão de consulta o tipo de resultado `Int?`.
4. Preserva uma operação tipada table-get no HIR.
5. Rebaixa-a para a operação table-get do MIR, neutra em relação ao backend.
6. Permite que o backend de execução selecionado realize a consulta em tempo de execução.

A mutação segue um caminho paralelo:

```pop
scores[name] = score
```

O verificador valida `name: String` e `score: Int`, o HIR retém uma operação table-set e o MIR representa explicitamente a inserção ou substituição.

Manter explícitas as operações de tabela é importante. Um backend não precisa reconstruir a semântica de tabelas a partir de uma chamada genérica ou de uma operação de memória não tipada.

## Como o ambiente de execução atual da rc.3 armazena uma tabela

O ambiente de execução nativo bootstrap usa um objeto de tabela gerenciado com metadados e slots de entrada intercalados:

```text
identificador da tabela
    |
    v
+--------------------------------+
| tamanho | capacidade | mapas de tipos |
+--------------------------------+
| chave 0 | valor 0              |
+--------------------------------+
| chave 1 | valor 1              |
+--------------------------------+
| ...                            |
+--------------------------------+
```

`length` é o número de pares ocupados. `capacity` é o número de pares para os quais há armazenamento reservado no momento. Os mapas de tipos descrevem se os slots de chaves e valores contêm referências gerenciadas que o coletor deve rastrear.

### Consulta no ambiente de execução bootstrap

A implementação nativa atual percorre as entradas desde o início até encontrar uma chave igual:

```text
para cada par ocupado:
    se a chave armazenada for igual à chave solicitada:
        retorne o valor armazenado

retorne nil
```

Tipos escalares de chave comparam sua representação canônica de valor. Chaves `String` comparam o conteúdo textual.

Essa busca linear é um detalhe de implementação do bootstrap da rc.3, não uma garantia de complexidade da linguagem-fonte. Os programas não devem depender de tabelas usarem sempre uma representação linear. As regras fechadas de chaves permitem que ambientes de execução futuros escolham outra representação sem alterar os resultados das consultas.

### Mutação no ambiente de execução bootstrap

A atribuição à tabela realiza uma busca semelhante:

- se a chave for encontrada, substitui seu valor no próprio local;
- se a chave estiver ausente, adiciona um novo par chave-valor ao final;
- se não houver capacidade sobrando, primeiro aumenta o armazenamento subjacente.

Substituir um valor não move a entrada. Novas entradas são adicionadas ao final na ordem de inserção. A rc.3 ainda não expõe iteração geral de tabelas, portanto a ordem de inserção faz parte principalmente do comportamento determinístico do ambiente de execução, não de uma API de percurso no nível do código-fonte.

O cálculo de crescimento atual é `max(current capacity, 2) * 2`. Consequentemente, a primeira inserção em uma tabela com capacidade zero reserva espaço para quatro entradas, e tabelas cheias posteriores crescem geometricamente. Essa é uma política interna e pode mudar independentemente da semântica do código-fonte Pop.

### O crescimento preserva a identidade

O crescimento de uma tabela pode mover seu armazenamento subjacente, mas não cria um novo valor de tabela no nível do código-fonte. Os aliases existentes continuam se referindo à mesma identidade de tabela gerenciada.

```text
scores -----+
            +--> identificador gerenciado estável --> armazenamento possivelmente ampliado
sameScores -+
```

É por causa desse identificador estável que as mutações continuam visíveis por meio de todos os aliases após o crescimento.

### Chaves e valores gerenciados

As tabelas podem armazenar dados escalares e valores gerenciados. O ambiente de execução registra as posições exatas de slots que contêm referências. Em uma tabela `{[String]: SomeClass}`, tanto o slot da chave quanto o slot do valor precisam ser rastreados; em `{[Int]: UInt8}`, nenhum dos slots é uma referência gerenciada.

Quando o armazenamento cresce, o coletor reconstrói esse layout preciso para a alocação maior e preserva as entradas vivas. As gravações do ambiente de execução usam o caminho de armazenamento ciente do coletor para que as referências gravadas nos slots da tabela continuem visíveis para a coleta de lixo.

Se uma alocação falhar durante a criação ou o crescimento da tabela, o ambiente de execução segue o caminho normal de panic por falta de memória. Em contraste, uma consulta ausente é representada por `nil` e não é um panic.

## Garantias semânticas e detalhes de implementação

É útil separar aquilo em que o código Pop pode confiar da forma como o ambiente de execução bootstrap faz isso atualmente.

| Regra no nível do código-fonte | Implementação atual da rc.3 |
| --- | --- |
| Uma chave identifica no máximo um valor. | A atribuição procura uma chave igual antes de adicionar ao final. |
| Uma consulta ausente retorna `nil` por meio de `V?`. | A consulta nativa retorna a representação nil opcional após uma busca malsucedida. |
| Chaves de string são comparadas pelo texto. | O ambiente de execução realiza uma comparação de conteúdo. |
| A atribuição cria um alias para a mesma tabela. | Os aliases compartilham um identificador gerenciado estável. |
| O crescimento deve preservar as entradas e a identidade. | O coletor aumenta o armazenamento intercalado por trás desse identificador. |
| A avaliação acontece uma vez, na ordem do código-fonte. | HIR e MIR mantêm as operações table-get/set ordenadas. |

A coluna da direita é valiosa ao ler o código do compilador ou depurar um backend. Ela não dá permissão ao código da aplicação para depender de tamanhos de alocação, ordem de busca ou layout bruto dos slots.

## Escolhendo entre tabelas e outros agregados

Use uma tabela quando as chaves forem descobertas enquanto o programa é executado:

```pop
local usersById: {[Int]: String} = {}
usersById[userId] = userName
```

Use um array quando a chave for uma posição densa iniciada em zero:

```pop
local names: [String] = ["Ada", "Grace"]
local first = names[0]
```

Use um registro quando os campos forem fixos e tiverem nomes significativos:

```pop
record User
    name: String
    score: Int
end
```

Use uma classe quando precisar de identidade nominal, métodos e campos declarados mutáveis. Uma tabela não deve substituir um registro ou uma classe apenas para evitar a declaração do modelo de dados.

## Limites atuais da rc.3

A base de tabelas da rc.3 permanece intencionalmente pequena. Ela tem:

- construção tipada;
- consulta opcional;
- inserção;
- substituição;
- identidade por referência;
- suporte à execução no interpretador e em LLVM/nativo.

Ela ainda não tem:

- exclusão;
- enumeração de chaves ou valores;
- iteração geral de tabelas;
- uma operação de tamanho ou capacidade no nível do código-fonte;
- consulta verificada que produza `V` diretamente;
- um valor padrão fornecido por quem chama para chaves ausentes;
- atribuição composta de entradas de tabela;
- igualdade estrutural de tabelas;
- construção ou mutação de tabelas em tempo de compilação;
- suporte à execução no backend C.

O backend C experimental falha de modo fechado quando encontra operações de tabela incompatíveis. Ele não substitui silenciosamente seu comportamento por outro.

## Erros comuns

### Omitir o tipo esperado

```pop
-- Informação insuficiente:
-- local values = {}

local values: {[String]: Int} = {}
```

### Esperar uma consulta não opcional

```pop
local values: {[String]: Int} = {}

-- A consulta pode não encontrar a chave.
-- local value: Int = values["answer"]

local value: Int? = values["answer"]
```

### Misturar tipos de chave

```pop
local values: {[Int]: String} = {}

values[1] = "um"
-- values["2"] = "dois"
```

### Tratar a atribuição como exclusão

A atribuição a uma tabela sempre significa inserir ou substituir. A rc.3 não tem operação de exclusão, inclusive para tabelas com valores opcionais.

### Presumir um contrato de desempenho de tabela hash

O tipo Pop é chamado de tabela porque modela associações tipadas entre chaves e valores. A rc.3 não promete uma estratégia específica de hashing nem uma complexidade assintótica de consulta.

## Exercícios

1. Crie uma tabela `{[UInt16]: String}`, insira dois nomes de portas, substitua um deles e anote os resultados das duas consultas.
2. Passe uma tabela a uma função auxiliar que insira uma entrada e, depois, consulte essa chave pela variável local original para observar a identidade compartilhada.
3. Reescreva como registro uma pequena tabela com formato de registro. Observe quais chaves se tornam campos declarados e quais consultas opcionais desaparecem.
4. Experimente uma chave `Float64` e leia o diagnóstico do compilador. Depois, substitua-a por uma representação inteira ou `String` escolhida deliberadamente para o domínio.
5. Projete uma função que retorne `V?` em vez de inventar um valor padrão para uma chave de tabela ausente.

A regra central é simples: uma mutação de tabela aceita exatamente `K` e `V`, enquanto uma consulta retorna `V?`. O compilador preserva essa regra ao longo do HIR e do MIR, e o ambiente de execução a implementa com armazenamento gerenciado determinístico.
