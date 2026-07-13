---
title: Instalação
description: Baixe e verifique Pop 0.1.0-rc.3 no Linux.
sidebar:
  order: 5
---

A maneira mais fácil de instalar Pop é baixar o arquivo pronto para uso na [página de lançamentos de Pop](https://github.com/poplanguage/pop/releases/tag/v0.1.0-rc.3). Você não precisa de Rust, Cargo, LLVM nem do repositório de código-fonte de Pop para acompanhar este livro.

Pop 0.1.0-rc.3 oferece arquivos para Linux em duas arquiteturas de processador:

| Seu sistema | Download |
| --- | --- |
| A maioria dos computadores Intel e AMD | `pop-x86_64-unknown-linux-gnu.zip` |
| Computadores ARM de 64 bits | `pop-aarch64-unknown-linux-gnu.zip` |

Se não souber qual deles precisa, execute:

```sh
uname -m
```

Escolha o arquivo x86-64 quando o resultado for `x86_64`. Escolha o arquivo AArch64 quando o resultado for `aarch64`.

## Baixando e extraindo Pop

Baixe o arquivo para seu computador na página de lançamentos. Em um terminal, vá para o diretório que contém o download e extraia-o. Em um computador x86-64, os comandos são:

```sh
unzip pop-x86_64-unknown-linux-gnu.zip
chmod +x pop-x86_64-unknown-linux-gnu
```

Em um computador ARM, substitua `x86_64` por `aarch64` nos dois comandos.

O arquivo também contém as bibliotecas Standard e de tempo de execução necessárias quando Pop gera um executável nativo. Mantenha estes arquivos juntos:

```text
pop-x86_64-unknown-linux-gnu
libpop_standard.a
libpop_runtime_native.a
```

O executável inclui a arquitetura no nome do arquivo. Você pode renomeá-lo para o nome mais curto usado ao longo deste livro:

```sh
mv pop-x86_64-unknown-linux-gnu pop
```

Em ARM, renomeie `pop-aarch64-unknown-linux-gnu` em vez disso.

## Colocando Pop no PATH

Você pode executar Pop a partir do diretório extraído como `./pop`. Para usar o comando mais curto `pop` em qualquer diretório, coloque o executável e suas duas bibliotecas em um diretório de seu `PATH`.

Para uma instalação pessoal:

```sh
mkdir -p ~/.local/lib/pop
mv pop libpop_standard.a libpop_runtime_native.a ~/.local/lib/pop/
mkdir -p ~/.local/bin
ln -s ~/.local/lib/pop/pop ~/.local/bin/pop
```

Muitas distribuições Linux já incluem `~/.local/bin` no `PATH`. Verifique se o shell consegue encontrar Pop:

```sh
pop --help
```

Se o shell informar que `pop` não foi encontrado, adicione esta linha ao final de `~/.bashrc` ou do arquivo de configuração usado por seu shell:

```sh
export PATH="$HOME/.local/bin:$PATH"
```

Abra um novo terminal e tente `pop --help` novamente. A saída deve listar os comandos `check`, `build`, `transpile` e `run`.

## Opcional: verificando o download

Cada arquivo de lançamento tem um arquivo `.sha256` correspondente. Baixe-o ao lado do arquivo compactado e execute:

```sh
sha256sum --check pop-x86_64-unknown-linux-gnu.zip.sha256
```

Uma verificação bem-sucedida imprime `OK`. Use o nome de arquivo AArch64 se esse foi o arquivo que você baixou.

Com Pop instalado, você está pronto para escrever seu primeiro programa.
