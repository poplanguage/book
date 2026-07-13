---
title: Visibilidade
description: Controle onde declarações e membros podem ser usados.
sidebar:
  order: 3
---

A visibilidade determina qual código pode nomear uma declaração ou um membro. Pop fornece três níveis implementados:

| Visibilidade | Acessível a partir de |
| --- | --- |
| `public` | outras Bubbles |
| `internal` | a mesma Bubble |
| `private` | o módulo que fez a declaração |

Em declarações comuns, omitir o modificador de visibilidade concede visibilidade interna:

```pop
function helper()
    -- disponível dentro desta Bubble
end

public function start()
    -- pode fazer parte da interface pública da Bubble
end
```

Use `public` de forma intencional para comportamentos ou tipos dos quais outra Bubble deva depender. Mantenha os auxiliares de implementação internos ou privados para que possam mudar sem afetar quem os chama.

Campos e métodos de classes usam as mesmas palavras de visibilidade:

```pop
public class Account
    private balance: Int = 0

    public function currentBalance(): Int
        return self.balance
    end
end
```

Aqui, quem chama pode consultar o saldo, mas não pode atribuir diretamente ao campo.

O ponto de entrada `main` é um caso especial: para um executável compilado diretamente, sua visibilidade omitida é aceita como a entrada privada do programa. Escrever uma `main` pública ou interna não é uma forma de expor uma entrada alternativa.

`export` é reconhecida como palavra reservada nesta versão, mas é rejeitada como modificador de declaração. Use `public` para visibilidade no nível do código-fonte.
