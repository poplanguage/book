---
title: Escolha seu caminho de aprendizado
description: Siga uma rota para iniciantes, programadores experientes ou focada em Luau pelo Livro de Pop.
sidebar:
  order: 2
---

Você não precisa da mesma introdução que todos os outros leitores. Quem está escrevendo o primeiro programa precisa de explicações diferentes de alguém que já conhece Luau, Rust, C ou outra linguagem.

Todos os caminhos acabam se encontrando nos capítulos sobre a linguagem. Escolha o começo que corresponde ao seu momento atual; você pode retornar aos capítulos pulados sempre que um termo parecer desconhecido.

## Se esta é sua primeira linguagem de programação

Leia os capítulos iniciais na ordem:

1. [Vocabulário de programação](./programming-vocabulary/) apresenta arquivos-fonte, valores, tipos, funções, expressões, instruções e erros do compilador.
2. [Instalação](../installation/) coloca o compilador da rc.3 em seu computador.
3. [Olá, Mundo!](../hello-world/) cria, verifica, executa e gera um programa completo.
4. [Lendo argumentos da linha de comando](../command-line-arguments/) permite que informações de fora do código-fonte afetem o programa.
5. [Um projeto Pop](../a-pop-project/) transforma um arquivo-fonte isolado em uma Bubble com estrutura convencional.

Depois de Primeiros Passos, continue com estes fundamentos:

1. [Variáveis e vínculos locais](../../language/variables/)
2. [Funções](../../language/functions/)
3. [Expressões e operadores](../../language/expressions-and-operators/)
4. [Decisões com `if`](../../language/conditions/)
5. [Repetição com laços](../../language/loops/)
6. [Tipos primitivos](../../types/primitives/)
7. [Arrays](../../data/arrays/), [registros](../../data/records/) e [tabelas tipadas](../../data/tables/)

Ainda não tente memorizar a seção de referência. Escreva os exemplos, altere uma coisa, execute-os novamente e deixe o compilador mostrar quais regras importam.

## Se você já programa em outra linguagem

Leia [Olá, Mundo!](../hello-world/) e [Um projeto Pop](../a-pop-project/) para conhecer as convenções de arquivos e comandos. Depois, examine estes capítulos em busca de regras específicas de Pop:

- [Variáveis](../../language/variables/): variáveis locais são inferidas uma vez; parâmetros são imutáveis.
- [Funções](../../language/functions/): parâmetros e valores retornados atravessam limites tipados exatos.
- [Condições](../../language/conditions/): somente `Boolean` é uma condição.
- [Tipos numéricos](../../types/integers/): Pop usa tipos numéricos fixos e conversões explícitas verificadas.
- [Boolean, nil e opcionais](../../types/boolean-nil-and-optionals/): a ausência é representada no tipo.
- [Arrays](../../data/arrays/), [tabelas](../../data/tables/) e [registros](../../data/records/): são modelos de dados distintos.
- [Namespaces](../../organization/namespaces/) e [Bubbles](../../organization/bubbles-and-layout/): a organização do código-fonte é resolvida em tempo de compilação.
- [Matriz de suporte](../../reference/support-matrix/): os limites da versão preliminar são declarados explicitamente.

Leitores vindos de uma linguagem dinamicamente tipada devem dedicar mais tempo aos opcionais, números de largura fixa e tipos agregados. Leitores vindos de uma linguagem de sistemas provavelmente acharão o modelo estático conhecido, mas ainda devem aprender sobre os arrays, tabelas e classes gerenciados de Pop, além de seus recursos de tempo de compilação conhecidos pelo compilador.

## Se você vem de Luau

Leia [Vindo de Luau](../coming-from-luau/) antes de transferir um modelo mental existente para Pop.

Pop usa deliberadamente várias formas inspiradas em Luau: `local`, `function`, `if ... then`, `while ... do`, blocos fechados por `end`, `~=` para desigualdade, `..` para concatenação de strings e chamadas de método com dois-pontos. Essa familiaridade ajuda você a ler código de imediato.

Isso não transforma Pop em um ambiente de execução Luau nem em um dialeto de Lua com tipagem gradual. As diferenças importantes vão além da pontuação:

- Pop não tem um tipo de escape dinâmico.
- Tabelas são um agregado tipado entre vários, não o modelo universal de objetos.
- Arrays são tipados e têm comprimento fixo.
- Condições exigem `Boolean`; não há valor-verdade implícito geral.
- Funções, módulos, visibilidade, erros e execução têm contratos diferentes.
- Pop compila uma Bubble antecipadamente, em vez de executar um script de módulo por meio de `require`.

O guia de Luau indica o que você pode manter, o que precisa reaprender e o que deve deixar de esperar.

## Um ciclo produtivo de aprendizado

Para cada novo recurso, use o mesmo ciclo curto:

1. Copie o exemplo completo para um arquivo `.pop`.
2. Execute `pop check file.pop`.
3. Execute-o com `pop run file.pop`.
4. Altere um valor, tipo, condição ou chamada.
5. Preveja se a alteração deve compilar.
6. Verifique sua previsão e leia o primeiro diagnóstico.

Alterar um fato de cada vez torna útil o retorno do compilador. Se você reescrever o exemplo inteiro antes de verificá-lo, um erro pode ocultar várias lições posteriores.

### Leia primeiro o primeiro diagnóstico

Um `end` ou delimitador de fechamento ausente pode fazer o código-fonte posterior parecer inválido. Comece pelo diagnóstico mais antigo, corrija-o e verifique novamente. Não suponha que todo local informado represente um problema separado.

### Mantenha os exemplos pequenos

Use um único arquivo-fonte até que uma lição trate especificamente de Bubbles ou namespaces. Programas pequenos tornam fácil perceber a relação entre uma linha de código-fonte e seu resultado.

### Declare tipos quando eles ensinarem algo

Pop pode inferir variáveis locais inicializadas:

```pop
local score = 10
```

Durante o aprendizado, uma anotação explícita pode expor a regra que está sendo praticada:

```pop
local score: Int = 10
local possibleScore: Int? = scores["Ada"]
```

Você não precisa anotar todas as variáveis locais para sempre. Use anotações onde elas esclarecem um limite, especialmente em opcionais, agregados e larguras numéricas.

## Uma escada de prática

Construa estes programas na ordem. Cada um adiciona uma nova ideia sem exigir uma grande biblioteca Standard.

### 1. Saudação personalizada

Leia um nome da linha de comando e formate-o em uma string entre crases.

Você pratica `main`, arrays, indexação verificada e interpolação.

### 2. Classificador de números

Dado um inteiro, imprima se ele é negativo, zero ou positivo.

Você pratica tipos explícitos, comparações, `if` e `elseif`.

### 3. Contagem regressiva

Conte a partir de um inteiro inicial até `1`.

Você pratica variáveis locais mutáveis, `for` numérico ou `while`.

### 4. Registro de pontuação

Declare um registro contendo o nome e a pontuação de um jogador e produza uma cópia atualizada com `with`.

Você pratica tipos agregados esperados e atualizações orientadas a valores.

### 5. Tabela de pontuações

Armazene pontuações sob chaves `String`, substitua uma entrada e retorne uma busca `Int?` a partir de uma função auxiliar.

Você pratica mutação tipada e representação honesta da ausência.

### 6. Pequena classe com estado

Construa um contador com um campo privado e métodos públicos.

Você pratica identidade gerenciada, encapsulamento e chamadas de método com dois-pontos.

### 7. Bubble com vários arquivos

Mova um tipo de dado e uma função auxiliar para outro namespace na mesma Bubble.

Você pratica estrutura de projeto, visibilidade e declarações `using`.

## O que adiar

Você pode escrever programas introdutórios úteis sem entender:

- HIR e MIR;
- mapas de objetos do coletor de lixo;
- restrições de funções em tempo de compilação;
- especialização de genéricos;
- o backend C experimental;
- todas as larguras de primitivas;
- todas as opções de dump da linha de comando.

Esses capítulos existem para leitores que querem entender como Pop funciona, mas não são pré-requisitos para variáveis, decisões, laços ou funções.

Não adie indefinidamente a matriz de suporte. Pop é uma candidata a lançamento com uma biblioteca Standard deliberadamente pequena; portanto, saber o que não está implementado evita que você procure uma API inexistente nesta edição.

## Como é o sucesso

Você está pronto para deixar Primeiros Passos quando conseguir:

- identificar o namespace e a função `main` em um arquivo-fonte;
- declarar e atualizar uma variável local tipada;
- explicar por que uma condição `if` deve ser `Boolean`;
- distinguir um valor `V` de um opcional `V?`;
- escolher deliberadamente um array, uma tabela, um registro ou uma classe;
- executar `check`, `run` e `build` para a finalidade correta;
- ler o primeiro diagnóstico do compilador sem tratá-lo como uma falha no aprendizado.

O objetivo não é memorizar toda a linguagem Pop. É construir um modelo mental correto que os capítulos posteriores possam ampliar.
