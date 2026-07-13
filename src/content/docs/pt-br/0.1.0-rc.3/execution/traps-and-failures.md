---
title: Traps e falhas em tempo de execução
description: Reconheça as falhas verificadas que interrompem um programa.
sidebar:
  order: 3
---

A verificação estática impede muitas operações inválidas, mas alguns fatos só são conhecidos enquanto o programa está em execução. Pop usa traps quando verificações em tempo de execução são violadas.

O runtime nativo distingue estes motivos principais de trap:

- estouro de inteiro;
- divisão por zero;
- violação de limites;
- conversão numérica inválida;
- passo zero em um intervalo durante a execução;
- um estado interno impossível.

Por exemplo, o código a seguir passa pela verificação de tipos porque ambos os valores são `UInt8`, mas causa um trap quando a soma excede o valor máximo do tipo:

```pop
local value: UInt8 = 255
local next = value + 1
```

Da mesma forma, `Array.get(values, index)` e a atribuição indexada causam um trap quando `index` está fora dos limites do array, cuja indexação começa em um.

Conversões verificadas para um tipo de destino causam um trap com `NumericConversion` quando um valor não cabe nele ou quando NaN ou infinito são convertidos em um inteiro:

```pop
local large: Int = 1_000
local compact = UInt8(large) -- causa um trap
```

Um `for` numérico cujo passo em tempo de execução seja zero causa um trap com `InvalidRangeStep` antes de executar seu corpo.

A indexação comum de arrays é a alternativa sem trap para leituras: `values[index]` retorna `nil` quando não existe um elemento. A escolha entre as duas formas comunica se a ausência é um resultado esperado ou a violação de uma invariante.

## Traps não são resultados recuperáveis

Pop 0.1.0-rc.3 não expõe um mecanismo de exceções no nível do código-fonte para capturar esses traps. Um trap interrompe a execução normal do programa. Valide as entradas do usuário e as posições do array antes de usar operações cujas precondições possam não ser satisfeitas.

Invariantes do runtime e condições de falta de memória são falhas fatais separadas, não valores Pop comuns. Embora nomes como `Result<T, E>` existam no universo inicial de tipos do compilador, uma biblioteca geral de resultados voltada a Pop e uma estrutura de tratamento de exceções não estão implementadas nesta versão.
