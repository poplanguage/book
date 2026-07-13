---
title: Referência da linha de comando
description: Use todos os comandos expostos pelo driver da versão 0.1.0-rc.3.
sidebar:
  order: 1
---

O driver de Pop expõe quatro comandos nesta versão.

## `pop check`

Verifique um arquivo-fonte de entrada sem vincular um executável:

```sh
pop check source.pop
```

Use-o para obter rapidamente retornos sobre sintaxe, resolução, tipos, tempo de compilação e verificação da MIR.

## `pop build`

Compile um executável nativo e escolha seu caminho:

```sh
pop build source.pop --output application
```

A opção de saída é obrigatória. A vinculação nativa usa os arquivos da Standard e do runtime distribuídos junto ao executável Pop.

## `pop run`

Compile e execute imediatamente um arquivo-fonte de entrada direto:

```sh
pop run source.pop
```

Passe argumentos ao programa depois de `--`:

```sh
pop run source.pop -- first "two words"
```

Execute o único binário descoberto por um manifesto de projeto:

```sh
pop run --manifestPath path/to/bubble.toml
```

Nesta versão, a opção usa a grafia `--manifestPath`.

## `pop transpile`

Traduza para C o subconjunto compatível que não depende do runtime:

```sh
pop transpile source.pop --to c
```

Somente `c` está disponível como destino de transpilação, e nem todo programa Pop válido pertence a esse subconjunto.

## Comandos ainda indisponíveis

O driver não expõe `new`, `test`, `format`, `doc`, `add`, `install` ou `publish`. Existem alguns crates de suporte e convenções de projeto para ferramentas futuras, mas eles não são comandos que o leitor possa usar na versão 0.1.0-rc.3.
