---
title: Compilação nativa
description: Acompanhe um programa Pop desde o código-fonte até um executável nativo.
sidebar:
  order: 1
---

`pop build` produz antecipadamente um executável nativo:

```sh
pop build app.pop --output app
```

Primeiro, o compilador analisa o código-fonte e resolve nomes, visibilidade, constantes, argumentos genéricos e tipos em uma representação intermediária de alto nível (HIR). Em seguida, ele especializa os genéricos alcançáveis, transforma o código válido em uma MIR canônica, verifica essa representação e a envia ao backend LLVM. O LLVM emite um arquivo-objeto, e o driver o vincula aos arquivos da Standard e do runtime nativo de Pop.

Composição de strings, conversão numérica, acesso a tabelas, casos de enum, pacotes fixos e controle de loops chegam ao LLVM por meio de contratos HIR/MIR tipados e independentes do backend. O backend não analisa novamente os nomes do código-fonte nem inventa operações dinâmicas.

A consequência importante para o usuário é que erros de sintaxe, nomes e tipos são informados antes da produção de um executável. Um executável produzido com sucesso não precisa mais que o compilador Pop analise seu código-fonte ao iniciar.

## Verificação sem compilação

Use `pop check` quando precisar de diagnósticos, mas não de um executável:

```sh
pop check app.pop
```

Isso executa o front-end e as etapas de verificação sem concluir a vinculação nativa. É útil para tarefas de editor e retornos rápidos.

## Execução direta

`pop run app.pop` segue o caminho de compilação e depois inicia o programa. Os argumentos após `--` são passados a `main`:

```sh
pop run app.pop -- first second
```

Os arquivos da versão incluem as duas bibliotecas nativas necessárias ao vinculador. Ao mover uma instalação, mantenha `libpop_standard.a` e `libpop_runtime_native.a` junto ao verdadeiro executável Pop.

Em sua distribuição, Pop 0.1.0-rc.3 tem como alvo executáveis nativos Linux. Não se trata de um interpretador de bytecode nem de um pacote de máquina virtual multiplataforma.
