---
title: Classes e métodos
description: Combine identidade de objetos, campos mutáveis e comportamento de receptores.
sidebar:
  order: 6
---

Registros modelam valores transparentes. Já uma classe cria objetos com identidade e pode manter estado mutável por trás de métodos.

```pop
public class Counter
    private value: Int = 0

    public function Counter:increment()
        self.value += 1
    end

    public function Counter:current(): Int
        return self.value
    end
end
```

Dentro de um método de instância, o nome da classe antes de `:` declara o tipo do receptor, e `self` se refere ao objeto receptor. O campo privado pode ser lido e receber atribuições dos próprios métodos da classe.

A atribuição composta de campo avalia o receptor uma vez e preserva a mesma operação verificada que `self.value = self.value + 1`.

## Construindo um objeto

A construção de uma classe nomeia a classe e fornece seus campos. Campos com valores padrão de tempo de compilação podem ser omitidos:

```pop
local counter = Counter {}
```

Chame um método de instância usando dois-pontos:

```pop
counter:increment()
print(counter:current())
```

Os dois-pontos tornam explícito o receptor: `counter` é o objeto no qual o método opera. A sintaxe de ponto é usada para campos e funções associadas a um tipo, não a um objeto.

## Identidade

Valores de classes se referem a objetos gerenciados. Atribuir um deles a outra variável local não copia seus campos:

```pop
local first = Counter {}
local second = first
second:increment()
print(first:current()) -- 1
```

`first` e `second` se referem ao mesmo objeto. A igualdade de classes compara essa identidade, não um retrato campo a campo.

## Encapsulamento

Campos e métodos podem ser `public`, `internal` ou `private`. O estado privado permite que uma classe mantenha regras que quem a chama não pode contornar. Um método pode validar uma operação antes de alterar um campo, enquanto quem o chama trabalha por meio de uma interface pública estável.

As classes nesta versão são nominais: sua identidade declarada importa mesmo quando outra classe por acaso contém os mesmos campos. A herança geral no nível do código-fonte não faz parte do conjunto de recursos aceitos pela 0.1.0-rc.3. Use interfaces para descrever comportamento compartilhado.
