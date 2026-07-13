---
title: Matriz de compatibilidade da 0.1.0-rc.3
description: Distinga recursos implementados da linguagem daqueles parciais e indisponíveis.
sidebar:
  order: 1
---

Esta matriz resume o estado de Pop 0.1.0-rc.3 voltado ao usuário. “Implementado” significa que o recurso é verificado e executável em seu caminho documentado. “Limitado” significa que existe uma base real, mas sua interface pública está incompleta.

## Linguagem

| Recurso | Estado | Limite |
| --- | --- | --- |
| Funções e parâmetros/resultados tipados | Implementado | anotações de resultado não são inferidas |
| Inferência de variáveis locais inicializadas e atribuição | Implementado | a atribuição nunca altera o tipo inferido |
| `if`, `elseif`, valores condicionais | Implementado | condições exatamente Boolean e tipo comum aos ramos |
| `while`, `repeat`, `for` numérico | Implementado | intervalos inclusivos de inteiros; `break` e `continue` |
| `for value in iterable` generalizado | Não implementado | aguarda os protocolos nominais `Iterable<T>` / `Iterator<T>` |
| Funções locais e closures | Implementado | o estado mutável capturado é compartilhado |
| Inteiros e floats de largura fixa | Implementado | floats decimais, ordenação completa, conversões explícitas verificadas |
| Strings | Implementado | escapes, `..`, interpolação com crases, formatação de primitivos |
| Pacotes fixos, tuplas, atribuição múltipla | Implementado | aridade exata; projeção estática de tupla com base um |
| Valores de função | Implementado | sem igualdade de funções |
| Arrays | Implementado | comprimento fixo, base um, operações limitadas |
| Tabelas tipadas | Implementado | consulta opcional e inserção/substituição; sem API de exclusão ou iteração |
| Registros e `with` | Implementado | literais agregados exigem um contexto esperado |
| Uniões discriminadas e `match` exaustivo | Implementado | sem curingas, guardas ou resultado de expressão |
| Classes | Implementado | identidade nominal; sem herança geral compatível |
| Interfaces | Implementado | implementação nominal explícita; sem corpos padrão |
| Constantes e funções em tempo de compilação | Implementado | grafo fechado de chamadas em tempo de compilação, com efeitos limitados |
| Atributos tipados | Implementado | sem um sistema geral de macros que geram código |
| Enums e aliases de tipo | Implementado | enums nominais sem payload; aliases apagados não genéricos |
| Genéricos explícitos | Implementado | funções, registros e uniões; sem inferência de argumentos de tipo |
| Exceções | Não implementado | traps do runtime não podem ser capturados em código Pop |

## Standard e ferramentas

| Recurso | Estado | Limite |
| --- | --- | --- |
| `print(String)` e `print(Int)` | Implementado | apenas saída com quebra de linha |
| APIs gerais de String/List/Set/Range | Não implementado | alguns nomes existem somente como identidades iniciais |
| Compilação e execução nativas com LLVM | Implementado | arquivos de versão para Linux |
| Transpilador C11 | Limitado | apenas o subconjunto sem runtime |
| Interpretador MIR | Interno | mecanismo de conformidade, sem comando público de CLI |
| Execução de projeto `bubble.toml` | Limitado | um binário, sem resolução de dependências |
| Formatador, LSP, documentação, CLI de testes | Não pronto para usuários | apenas crates de biblioteca iniciais |
| Registro/publicação de pacotes | Não implementado | sem comando `add` ou `publish` |

Palavras reservadas e identidades internas de tipos não são promessas de funcionalidade no nível do código-fonte. Use os capítulos desta versão do livro e `pop --help`, e não nomes voltados ao futuro, como contrato de compatibilidade.
