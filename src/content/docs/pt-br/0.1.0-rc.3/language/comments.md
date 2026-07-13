---
title: Comentários e documentação
description: Deixe observações para os leitores e associe documentação às declarações.
sidebar:
  order: 4
---

Comentários explicam o código para as pessoas e são ignorados durante a execução do programa. Um comentário comum de Pop começa com dois hifens e segue até o fim da linha:

```pop
-- Aumenta a pontuação após uma resposta correta.
score = score + 1
```

Um comentário também pode aparecer depois do código:

```pop
local attempts = 3 -- o jogador começa com três tentativas
```

Prefira comentários que expliquem _por que_ uma decisão existe. Um comentário como `-- soma um` acima de `count = count + 1` apenas repete o código, sem ajudar quem o lê.

## Comentários de documentação

Três hifens iniciam um comentário de documentação. Coloque linhas consecutivas de documentação imediatamente antes de uma declaração:

```pop
--- Soma dois inteiros.
--- A operação causa um trap se o resultado exceder o intervalo de Int.
public function add(left: Int, right: Int): Int
    return left + right
end
```

Comentários de documentação contêm fragmentos XML, o que permite que ferramentas preservem informações estruturadas. Eles são associados à próxima declaração mesmo quando há atributos entre o comentário e a declaração. Uma linha em branco ou um comentário `--` comum interrompe essa associação.

XML malformado gera um aviso do compilador. Declarações de tipo de documento, declarações de entidade e instruções de processamento também geram avisos, pois a documentação deve ser segura para o processamento por ferramentas.

A geração de documentação ainda não está disponível como um comando finalizado na 0.1.0-rc.3, mas a sintaxe e a validação pelo compilador já estão implementadas. Escrever documentação útil agora deixa as declarações públicas preparadas para ferramentas futuras.
