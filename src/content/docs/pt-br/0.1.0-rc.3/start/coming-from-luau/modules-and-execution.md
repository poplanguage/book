---
title: Módulos, Bubbles e execução nativa
description: Substitua require, tabelas exportadas, globais mutáveis e expectativas de uma VM hospedeira pela organização compilada de Pop.
sidebar:
  order: 4
---

Os módulos Luau participam da execução em tempo de execução: `require` executa ou recupera um módulo e recebe seu valor retornado. Pop organiza as declarações antes da execução e compila uma Bubble em um programa executável.

## Um namespace não é uma tabela retornada

```pop title="src/math.pop"
namespace App.Math

function double(value: Int): Int
    return value * 2
end
```

O namespace dá a `double` um local qualificado. Ele não é construído em tempo de execução e não pode ser armazenado em uma variável local.

Outro arquivo pode usá-lo:

```pop title="src/main.pop"
namespace App

using App.Math

function main()
    print(double(21))
end
```

`using` altera a resolução de nomes. Ele não executa `math.pop`, não retorna um valor e não realiza uma consulta dinâmica.

## Arquivos pertencem a Módulos e Bubbles

A organização de Pop avança por limites explícitos do compilador:

```text
Item -> Module -> Bubble -> Package -> Workspace
```

Funções, registros, classes e constantes são Itens. A propriedade do código-fonte fornece a esses Itens o limite de um Módulo. Uma Bubble é a unidade de compilação e visibilidade descrita por `bubble.toml`.

Essa hierarquia não é uma tabela aninhada de exportações em tempo de execução. Ela informa ao compilador a qual lugar uma declaração pertence e quem pode nomeá-la.

## A visibilidade substitui convenções de tabelas de exportação

Por padrão, as declarações são `internal`:

```pop
function helper()
end
```

Use `private` para o Módulo que fez a declaração e `public` para outras Bubbles:

```pop
private function implementationDetail()
end

public function supportedApi()
end
```

Não existe um modificador `export` no nível do código-fonte. Retornar uma tabela não é a forma de tornar declarações visíveis.

## Sem `require` calculado

Pop precisa resolver o código alcançável durante a compilação. Ela não carrega um módulo-fonte a partir de uma string calculada em tempo de execução:

```lua
local feature = require(path .. featureName)
```

Escolha a dependência por meio de declarações e fluxo de controle tipado. Se várias implementações compartilharem um comportamento, uma interface poderá descrever seu contrato nominal comum.

## Sem ambiente global mutável

Não espere que um hospedeiro preencha nomes globais arbitrários. Pop resolve estaticamente variáveis locais, parâmetros, declarações, namespaces, tipos e constantes.

O estado compartilhado em tempo de execução pertence a um objeto gerenciado passado intencionalmente ou a outro valor tipado. Constantes são declarações em tempo de compilação, não entradas mutáveis em `_G`.

Isso deixa visível a direção das dependências: uma função recebe o que usa em vez de descobri-lo por meio de alterações em uma tabela ambiente.

## Um manifesto de Bubble

A estrutura de projeto convencional é:

```text
app/
├── bubble.toml
└── src/
    ├── main.pop
    └── math.pop
```

```toml title="bubble.toml"
[package]
name = "App"
version = "0.1.0"
edition = "2026"
```

Execute-o a partir do diretório do projeto:

```sh
pop run --manifestPath bubble.toml
```

A rc.3 reconhece metadados de dependências, mas ainda não resolve nem baixa pacotes externos. O manifesto é um limite real de projeto, não um fluxo completo de registro de pacotes.

## Execução antecipada

`pop build` produz um executável nativo pelo caminho do LLVM:

```sh
pop build src/main.pop --output app
./app
```

O executável não exige que a VM Luau interprete o código-fonte. Tipos e especializações genéricas alcançáveis são resolvidos antes da execução do backend.

Esse modelo de execução exclui várias suposições de Luau:

- carregamento dinâmico de código-fonte;
- substituição de funções em uma tabela de exportação depois do carregamento;
- descoberta de campos por um nome arbitrário em tempo de execução;
- dependência da execução de módulos para registro implícito;
- inspeção de uma representação universal de valores da VM.

## APIs do Roblox são APIs do hospedeiro, não sintaxe da linguagem

Programas em Roblox Luau recebem serviços, Instances, eventos, tarefas e tipos de dados do Roblox por meio de seu hospedeiro. Pop não fornece equivalentes automaticamente apenas porque parte da sintaxe é familiar.

Separe uma portabilidade em duas perguntas:

1. Qual lógica é uma computação tipada comum?
2. Qual comportamento depende do Roblox ou de outro hospedeiro Luau?

A primeira parte pode ser traduzida em funções e modelos de dados Pop. A segunda precisa de uma biblioteca ou integração Pop real; renomear a API não cria uma.

## Diagnósticos e traps substituem suposições de recuperação dinâmica

Nomes, tipos, chamadas, campos agregados e operadores incorretos normalmente geram diagnósticos em tempo de compilação.

As falhas verificadas em tempo de execução incluem estouro, divisão por zero, conversão explícita inválida e violação de precondições verificadas de coleções. A rc.3 não oferece `pcall`, `xpcall` nem exceções capturáveis no código-fonte.

Represente a ausência recuperável como dados — muitas vezes `T?` ou uma união discriminada. Trate um trap como a falha de uma invariante do programa, pois nesta versão o código-fonte não pode capturá-lo e reinterpretá-lo.

## Os limites dos backends permanecem honestos

O caminho LLVM/nativo é compatível com a linguagem rc.3 documentada. O interpretador MIR é um mecanismo interno de conformidade. O backend C é experimental e aceita apenas um subconjunto que não depende do runtime.

Construções incompatíveis com o backend C falham de forma segura. Pop não executa silenciosamente um significado diferente apenas para emitir C.

## Portabilidade de um módulo no estilo de serviço

Um módulo de serviço Luau costuma combinar:

- estado mutável singleton;
- métodos exportados;
- inicialização durante `require`;
- consultas ao hospedeiro;
- callbacks registrados para produzir efeitos colaterais.

Separe esse projeto em Pop:

- represente o estado com uma instância de classe;
- exponha funções tipadas ou o comportamento de uma interface;
- crie explicitamente a instância a partir de `main`;
- passe dependências por parâmetros;
- faça a inicialização em uma chamada de função explícita;
- mantenha declarações de namespace livres de inicialização oculta em tempo de execução.

O resultado pode ter mais conexões visíveis, mas sua ordem e suas dependências podem ser verificadas sem executar arquivos de módulo para descobri-las.

A seguir, [Portabilidade de um programa Luau](./porting-a-program/) combina as decisões sobre tipos, fluxo de controle, dados e módulos em um único fluxo de trabalho.
