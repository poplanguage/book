---
title: Editor and formatting status
description: Know which development integrations are available in this release.
sidebar:
  order: 4
---

Pop source is plain UTF-8 text, so any text editor can be used. Configure `.pop` files as Pop when an extension provides the language grammar, or use a simple plain-text mode otherwise.

The 0.1.0-rc.3 workspace contains early libraries for a formatter, language server, documentation generator, and test runner. Those crates do not yet provide complete public commands or editor integrations. In particular:

- there is no released `pop format` command;
- there is no usable language-server executable to configure in an editor;
- there is no released `pop doc` generator;
- there is no public `pop test` command.

Do not install unrelated tools merely because their names appear in the implementation workspace. The command list printed by `pop --help` is the source of truth for this version.

Until formatting is automated, follow the style used in this book: four spaces inside blocks, one declaration component per line when it improves readability, no semicolons, and an `end` aligned with the construct it closes. These choices are conventions for readable examples, not extra grammar rules.

For quick feedback, connect an editor task to `pop check` on the current file. The compiler’s source spans and diagnostic codes remain useful even without a dedicated language server.
