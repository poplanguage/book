---
title: Hello, World!
description: Write and run your first Pop program.
sidebar:
  order: 6
---

Now that Pop is installed, it is time to write your first program. We will keep the traditional greeting, but let rc.3 show a little personality.

This book uses terminal commands in its examples, but Pop does not require a particular editor. Use the editor or IDE you are most comfortable with.

## Create a project directory

First, make a directory for the programs you will write while reading this book. Then create a directory for the Hello World program:

```sh
mkdir -p ~/pop-projects/hello
cd ~/pop-projects/hello
```

Pop source files use the `.pop` extension. Create a file named `hello.pop`, open it in your editor, and enter the program from Listing 1-1.

```pop title="hello.pop"
namespace Hello

function main()
    local release = "0.1.0-rc.3"
    print(`🫧 Hello from Pop {release}!`)
    print("Strong types. Native code. Small syntax.")
end
```

_Listing 1-1: A small rc.3 welcome program_

Save the file and return to your terminal. Make sure you are still inside the `hello` directory, then run:

```sh
pop run hello.pop
```

You should see:

```text
🫧 Hello from Pop 0.1.0-rc.3!
Strong types. Native code. Small syntax.
```

If you see that line, congratulations! You have written and run your first Pop program.

## Anatomy of a Pop program

Let us look at the program one piece at a time. The first line is:

```pop
namespace Hello
```

A namespace gives the code in a file a name. Every Pop source file begins with one namespace declaration. We called this one `Hello`, but a larger program could use names such as `Game`, `Store.Payments`, or `MyApp.Users`.

Next comes:

```pop
function main()

end
```

These lines define a function named `main`. A function is a named group of instructions. `main` is special because Pop starts an executable program by running this function.

The parentheses after `main` are where a function receives values from its caller. This program does not need any values, so the parentheses are empty. The `end` keyword marks the end of the function.

Inside `main`, we first store the release name in a local value:

```pop
local release = "0.1.0-rc.3"
```

Pop infers that `release` has type `String`. The next line uses backtick interpolation to place that value inside a larger string:

```pop
print(`🫧 Hello from Pop {release}!`)
```

`print` displays the resulting text in the terminal. Interpolation is one of rc.3's new string features; a later chapter covers its exact rules. The second `print` shows that ordinary double-quoted strings remain the simplest choice for fixed text.

Notice that Pop does not use semicolons at the ends of these lines. Indentation makes the program easier to read, while `end` tells Pop where the function finishes.

Do not worry about memorizing every term yet. We will return to functions, arguments, strings, and namespaces as we build larger programs.

## Checking a program

The `run` command checks the source, builds it, and starts the resulting program. Sometimes you only want to check whether the source is valid. Use `pop check` for that:

```sh
pop check hello.pop
```

When the program is valid, this command finishes without printing anything. Try removing the closing `end` and running the command again. Pop will report where it expected the function to finish. Restore `end` before continuing.

## Building an executable

You can also compile the program without running it:

```sh
pop build hello.pop --output hello
```

This creates an executable named `hello`. Run it directly:

```sh
./hello
```

It prints the same result:

```text
🫧 Hello from Pop 0.1.0-rc.3!
Strong types. Native code. Small syntax.
```

Pop is an ahead-of-time compiled language. The `build` command turns your source file into a native executable that can be run later. During the first chapters, we will normally use `pop run` because it keeps the edit-and-run cycle short.

Next, we will change this program so it can receive information from the command line.
