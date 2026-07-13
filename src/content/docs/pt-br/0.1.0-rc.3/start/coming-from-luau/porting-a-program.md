---
title: Portabilidade de um programa Luau
description: Reformule um componente Luau para Pop, um contrato de cada vez, em vez de traduzir a pontuação.
sidebar:
  order: 5
---

Uma portabilidade bem-sucedida preserva o comportamento pretendido, não todos os mecanismos originais. Traduzir linha por linha normalmente leva suposições de Luau para lugares nos quais Pop adota deliberadamente outro modelo.

## Etapa 1: descreva o comportamento em linguagem simples

Antes de editar a sintaxe, declare:

- o que entra no componente;
- o que ele retorna ou altera;
- quais resultados são ausências comuns;
- quais estados são inválidos;
- de quais APIs externas do hospedeiro ele precisa.

Se o comportamento não puder ser descrito sem “esta tabela por acaso contém…”, identifique primeiro as verdadeiras funções da tabela.

## Etapa 2: faça um inventário das suposições dinâmicas

Procure no componente Luau por:

- `any` e valores externos sem anotação;
- condições baseadas em truthiness;
- argumentos de chamada ausentes ou adicionais;
- pacotes variádicos;
- tabelas com várias funções;
- metatabelas e metamétodos;
- `pairs` e `ipairs`;
- atribuição de `nil` para excluir chaves;
- `require` calculado;
- globais do hospedeiro e serviços do Roblox;
- `pcall` ou recuperação no estilo de exceções.

Cada item exige uma decisão de projeto, não a substituição de sua grafia.

## Etapa 3: escolha valores e ausências exatos

Converta cada entrada e resultado em um tipo Pop. Substitua um único `number` universal pelo inteiro ou float apropriado. Marque como opcionais apenas os resultados que realmente possam estar ausentes.

```pop
function findScore(
    scores: {[String]: Int},
    name: String,
): Int?
    return scores[name]
end
```

Não substitua uma ausência por `0`, a menos que zero realmente tenha o mesmo significado no domínio.

## Etapa 4: separe as funções das tabelas

Use arrays para posições homogêneas fixas, tabelas para associações tipadas em tempo de execução, registros para dados fixos e classes para identidade e invariantes mutáveis.

Para estados fechados, prefira um enum ou uma união discriminada em vez de tags de string espalhadas por uma tabela.

## Etapa 5: torne as dependências explícitas

Substitua a descoberta de módulos em tempo de execução e as globais por namespaces, `using` e parâmetros de funções. Crie o estado a partir de `main` ou de outra função de composição explícita.

```pop
namespace App

using App.Scores

function main()
    local board = ScoreBoard {}
    run(board)
end
```

Os campos exatos da classe dependem do componente, mas agora a propriedade e a ordem de inicialização estão visíveis.

## Etapa 6: traduza o fluxo de controle

Mantenha `if`, `elseif`, `while`, `repeat`, `for` numérico, `break` e `continue` nos lugares em que seus contratos coincidirem.

Reescreva truthiness como perguntas Boolean. Substitua `pairs` e `ipairs` por operações compatíveis; arrays fixos usam posições numéricas, enquanto as tabelas tipadas da rc.3 não expõem enumeração.

## Etapa 7: declare os limites das funções

Escreva o tipo de cada parâmetro e resultado. Substitua funções variádicas e com aridade flexível por assinaturas fixas, arrays ou registros.

Mantenha retornos múltiplos somente quando formarem um pacote exato e fixo:

```pop
function bounds(): (Int, Int)
    return 1, 10
end
```

## Etapa 8: separe dados recuperáveis de traps

Use resultados opcionais ou de união para resultados que os chamadores devam tratar. Evite operações verificadas inválidas com testes de precondições.

Não porte um bloco `pcall` supondo que Pop possa capturar um trap em tempo de execução. As exceções não estão implementadas na rc.3.

## Reformulação completa: um pequeno serviço de pontuações

A versão Luau usa uma única tabela para exportações do módulo, estado mutável e um dicionário:

```lua
local Scores = {}
local values = {}

function Scores.set(name, score)
    values[name] = score
end

function Scores.get(name)
    return values[name]
end

return Scores
```

Primeiro, identifique as funções:

- `Scores` é um namespace de módulo retornado;
- `values` é o estado mutável de um dicionário;
- `set` altera o estado compartilhado;
- `get` pode não encontrar uma chave.

Em Pop, a organização por namespaces e o estado são separados:

```pop
namespace App.Scores

public class ScoreBoard
    private values: {[String]: Int}

    public function ScoreBoard:set(name: String, score: Int)
        self.values[name] = score
    end

    public function ScoreBoard:get(name: String): Int?
        return self.values[name]
    end
end
```

Crie o estado intencionalmente:

```pop
namespace App

using App.Scores

function main()
    local values: {[String]: Int} = {}
    local board = ScoreBoard {
        values = values,
    }

    board:set("Ada", 10)
    local score: Int? = board:get("Ada")

    print("Pontuação armazenada; a consulta continua opcional.")
end
```

O novo modelo declara fatos que o runtime de Luau descobria anteriormente:

- uma `ScoreBoard` possui identidade;
- seu armazenamento mapeia `String` para `Int`;
- a alteração aceita tipos exatos;
- a consulta pode não encontrar o valor;
- o namespace não é o objeto de estado;
- a inicialização cria o estado explicitamente.

## Quando uma portabilidade direta é impossível

Alguns componentes dependem de recursos que a rc.3 não oferece: listas dinâmicas, iteração de tabelas, corrotinas, exceções, download de dependências, carregamento dinâmico de código ou APIs do hospedeiro Roblox.

Não falsifique esses recursos usando funcionalidades da linguagem sem relação com eles. Escolha um resultado honesto:

- reduza o componente ao subconjunto compatível;
- reformule-o em torno de dados fixos e fluxo de controle explícito;
- forneça uma integração nativa ou Standard real fora da interface atual deste livro;
- adie a portabilidade até que a base necessária exista.

Um limite explícito é mais útil que um código que parece traduzido, mas não consegue preservar o comportamento.

## Revisão final da portabilidade

Antes de considerar o componente concluído, verifique conceitualmente:

- cada variável local mantém um único tipo inferido ou declarado;
- cada condição é `Boolean`;
- cada função possui parâmetros e resultados exatos;
- cada opcional representa uma ausência real;
- cada agregado possui uma função intencional;
- cada dependência de módulo é visível em tempo de compilação;
- cada alteração possui um proprietário;
- cada trap em tempo de execução representa a violação de uma invariante;
- cada API usada existe na rc.3, e não apenas em Luau ou em um hospedeiro.

Em seguida, use `pop check` com frequência enquanto implementa um limite de cada vez. O compilador é mais útil quando cada edição introduz uma nova decisão.
