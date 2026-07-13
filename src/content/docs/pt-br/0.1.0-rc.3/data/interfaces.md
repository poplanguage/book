---
title: Interfaces
description: Defina comportamentos nominais que classes podem implementar.
sidebar:
  order: 7
---

Uma interface nomeia um comportamento sem escolher os campos ou a implementação do objeto:

```pop
public interface Named
    function name(): String
end
```

Uma classe adere usando `implements` e fornece um método de instância público correspondente:

```pop
public class User implements Named
    private value: String

    public function User:name(): String
        return self.value
    end
end
```

O nome da classe antes de `:` marca a implementação como método de instância. Seus tipos explícitos de parâmetros e resultado devem corresponder exatamente à declaração da interface; o receptor em si não é escrito na assinatura da interface. Métodos de interface são assinaturas públicas de instância: eles não contêm corpos, campos nem modificadores de visibilidade independentes.

## Programando para o comportamento

Uma função pode receber a interface no lugar de uma classe concreta:

```pop
function greet(value: Named)
    print("Olá")
    print(value:name())
end
```

Qualquer classe que implemente `Named` explicitamente pode ser usada nesse limite. O compilador verifica a implementação e despacha a chamada do receptor pelo slot de método da interface.

As interfaces de Pop são nominais, não usam tipagem pato. Apenas definir um método chamado `name` não basta; a declaração da classe deve dizer `implements Named`. Essa relação explícita impede que uma correspondência acidental de nomes de métodos passe a fazer parte de um contrato público.

Métodos padrão de interface, campos e conformidade estrutural não são implementados na 0.1.0-rc.3.
