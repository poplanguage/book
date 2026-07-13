---
title: Bubbles e estrutura do projeto
description: Entenda a unidade de compilação de Pop e a árvore de fontes convencional.
sidebar:
  order: 4
---

Uma **Bubble** é a unidade de compilação e visibilidade de Pop. Um manifesto de projeto descreve um pacote, e caminhos convencionais identificam sua biblioteca, seu executável, seus testes, seus exemplos e seus benchmarks.

```text
project/
├── bubble.toml
└── src/
    ├── lib.pop
    ├── main.pop
    └── bin/
        ├── admin.pop
        └── worker/
            └── main.pop
```

As funções de código-fonte descobertas são:

- `src/lib.pop` — a Bubble de biblioteca do pacote;
- `src/main.pop` — a Bubble do binário padrão;
- `src/bin/*.pop` — binários simples adicionais;
- `src/bin/<name>/main.pop` — binários adicionais organizados em diretórios;
- arquivos simples em `tests/`, `examples/` e `benchmarks/` — Bubbles auxiliares convencionais.

Na versão 0.1.0-rc.3, a execução por manifesto compila as Bubbles de biblioteca e de binário e exige exatamente um binário para executar. A descoberta das outras funções existe, mas o driver ainda não oferece um fluxo completo de comandos para testes e benchmarks.

## O manifesto

O manifesto implementado exige:

```toml
[package]
name = "Example.App"
version = "0.1.0"
edition = "2026"
```

Nomes de pacote contêm componentes em PascalCase separados por pontos. Os valores de versão usam componentes decimais separados por pontos, e a edição contém algarismos decimais. No analisador implementado, os valores são strings entre aspas.

O analisador reconhece uma seção simples `[dependencies]`, mas a execução do pacote rejeita dependências não vazias, pois a resolução e o download ainda não foram implementados. Portanto, hoje uma Bubble é útil como limite local de compilação, mas ainda não como unidade de um registro de pacotes.

## Arquivos diretos e projetos

`pop check file.pop`, `pop run file.pop` e `pop build file.pop --output app` compilam diretamente um arquivo-fonte de entrada. `pop run --manifestPath bubble.toml` usa a descoberta de projeto. Comece com um arquivo direto para fazer experimentos; use um manifesto quando a estrutura convencional ajudar a organizar o programa.
