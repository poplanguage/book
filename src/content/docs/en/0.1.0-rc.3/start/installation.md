---
title: Installation
description: Download and verify Pop 0.1.0-rc.3 on Linux.
sidebar:
  order: 5
---

The easiest way to install Pop is to download the ready-to-use archive from the [Pop releases page](https://github.com/poplanguage/pop/releases/tag/v0.1.0-rc.3). You do not need Rust, Cargo, LLVM, or the Pop source repository to follow this book.

Pop 0.1.0-rc.3 provides Linux archives for two processor architectures:

| Your system | Download |
| --- | --- |
| Most Intel and AMD computers | `pop-x86_64-unknown-linux-gnu.zip` |
| 64-bit ARM computers | `pop-aarch64-unknown-linux-gnu.zip` |

If you are unsure which one you need, run:

```sh
uname -m
```

Choose the x86-64 archive when the result is `x86_64`. Choose the AArch64 archive when the result is `aarch64`.

## Download and extract Pop

Download the archive for your computer from the releases page. In a terminal, move to the directory containing the download and extract it. For an x86-64 computer, the commands are:

```sh
unzip pop-x86_64-unknown-linux-gnu.zip
chmod +x pop-x86_64-unknown-linux-gnu
```

For an ARM computer, replace `x86_64` with `aarch64` in both commands.

The archive also contains the Standard and runtime libraries required when Pop builds a native executable. Keep these files together:

```text
pop-x86_64-unknown-linux-gnu
libpop_standard.a
libpop_runtime_native.a
```

The executable has the architecture in its filename. You can rename it to the shorter name used throughout this book:

```sh
mv pop-x86_64-unknown-linux-gnu pop
```

On ARM, rename `pop-aarch64-unknown-linux-gnu` instead.

## Put Pop on your PATH

You can run Pop from the extracted directory as `./pop`. To use the shorter `pop` command from any directory, place the executable and its two libraries in a directory on your `PATH`.

For a personal installation:

```sh
mkdir -p ~/.local/lib/pop
mv pop libpop_standard.a libpop_runtime_native.a ~/.local/lib/pop/
mkdir -p ~/.local/bin
ln -s ~/.local/lib/pop/pop ~/.local/bin/pop
```

Many Linux distributions already include `~/.local/bin` on `PATH`. Check that the shell can find Pop:

```sh
pop --help
```

If the shell says that `pop` was not found, add this line to the end of `~/.bashrc` or the configuration file used by your shell:

```sh
export PATH="$HOME/.local/bin:$PATH"
```

Open a new terminal and try `pop --help` again. The output should list the `check`, `build`, `transpile`, and `run` commands.

## Optional: verify the download

Each release archive has a matching `.sha256` file. Download it beside the archive, then run:

```sh
sha256sum --check pop-x86_64-unknown-linux-gnu.zip.sha256
```

A successful check prints `OK`. Use the AArch64 filename if that is the archive you downloaded.

With Pop installed, you are ready to write your first program.
