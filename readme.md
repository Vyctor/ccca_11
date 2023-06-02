# Clean Code e Clean Architecture Turma 11

Arquivos do curso de Clean Code e Clean Architecture - Turma 11, ministrado pelo professor Rodrigo Branas.

## Entidades

São responsáveis por modelas as regras de negócio independetes, aplicadas em qualquer contexto e que podem ser desde um objeto com métodos até mesmo um conjunto de funções.

## Entidades no DDD

Possuem regras de negócio independentes, com identidade e estado que muda ao longo do tempo.

## Value Object

Contém regras de negócios independente, no entando são identificados pelo seu valor, sendo imutáveis, ou seja, seu valor não muda ao longo do tempo.
Por exemplo, CPF, CEP, ID, Coordenadas geográficas, etc...

## Domain Service

Realiza tarefas específicas do domínio, não tendo estado. É indicado quando a operação que você quer executar não pertence a uma entity ou a um value-object.

## Repositories

São uma extensão do domínio responsável por realizar a persistência dos aggregates, separando o domínio da infraestrutura.

## Qual a diferença de um Repository e um DAO?

Um repository faz operações em cima de um aggregate inteiro, um DAO não tem granularidade definida.
A persistência é sempre realizada sobre um aggregate inteiro, no entanto a implementação do repository pode decidir quais registros no banco de dados devem ser atualizados.

## Application Service

É a API do Bounded Context, expondo operações de negócio relevantes para os clientes da aplicação, muito sinular ao Use Case do Clean Architecture. Não deve haver regras de negócio dentro dessa camada, apenas orquestração.

## Infrastructure Service

Ficam restritos aos serviços de infra, que ficam em uma camada independente da aplicação.

## Módulos

Fornecem uma separação física para um conjunto de objetos de domínio, geralmente separado por bounded context, facilitando a organização.

## Quando evitar  Domain-Driven Design no nível tático?

- Exportação de dados
- ETLs
- CRUDs
- Relatórios
- Integrações

## Aggregate

### Como definir o **relacionamento** entre diferentes entities e value objects?

O Aggregate é um relacionamento de objetos de domínio como entities e value objects, estabelecendo o relacionamento entre eles, tratado como uma unidade.

**Se estiver difícil de implementar o repositório, talvez o aggregate seja muito grande e possa ser separado.**

<hr/>

## Materiais Sugeridos

### Livros

- Clean Code, Robert C. Martin
- Clean Architecture, Robert C. Martin
- Refactoring, Martin Fowler
- Working Effectively with Legacy Code, Michael Feathers
- Patterns of Enterprise Application Architecture, Martin Fowler
- Implementing Domain-Driven Design, Vernon Vaughn
- Design Patterns: Elements of Reusable Object-Oriented Software, Erich Gamma
- Patterns, Principles, and Practices of Domain-Driven Design, Scott Millett
- Extreme Programming Explained: Embrace Change, Kent Beck
- Microservices Patterns: With Examples in Java, Chris Richardson
- Xunit Test Patterns: Refactoring Test Code, Gerard Meszaros

### Aula 01 - Clean Code e Clean Architecture

[Slides](./resources/aula01/slide.pdf)

### Aula 02 - Test-Driven Development

[Slides](./resources/aula02/slide.pdf)

[The Dynamic Factory Pattern](./resources/aula02/TheDynamicFactoryPattern.pdf)
[Integration Test](https://martinfowler.com/bliki/IntegrationTest.html)
[Unit Test](https://martinfowler.com/bliki/UnitTest.html)

### Aula 03 - Ports and Adapters and Test Patterns (Stub, Spy, Mock e Fake)

[Slides - Ports and Adapters](./resources/aula03/slide.pdf)
[Slides - Test Patterns](./resources/aula03/test-patterns.pdf)

[Live com Alistair Cockburn](https://www.youtube.com/watch?v=AOIWUPjal60&ab_channel=RodrigoBranas)

[Ports and Adapters Pattern - Alistair Cockburn](https://web.archive.org/web/20060625193207/http://alistair.cockburn.us/crystal/articles/hpaaa/hexagonalportsandadaptersarchitecture.htm)

[Ports and Adapters Pattern - Juan Garrido](https://jmgarridopaz.github.io/content/hexagonalarchitecture.html)

[The Little Mocker](https://blog.cleancoder.com/uncle-bob/2014/05/14/TheLittleMocker.html)

[Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html)

[Endo-Testing: Unit Testing with Mock Objects](./resources/aula03/MockObjectsFinal.PDF)

### Aula 04 - Clean Architecture Parte 1

[Slides - Clean Architecture](./resources/aula04/slide.pdf)

[Clean Architecture - Robert Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

### Aula 05 - Clean Architecture Parte 2

[Slides - Clean Architecture](./resources/aula05/slide.pdf)

### Aula 06 - Domain-Driven Design

[Slide - DDD1](./resources/aula06/slide-ddd-1.pdf)

[Slide - DDD2](./resources/aula06/slide-ddd-2.pdf)

[Context Map Cheat Sheet](./resources/aula06/context_map_cheat_sheet.png)

[Specification Pattern - Erick Eveans](./resources/aula06/specification-pattern.pdf)
[Specification Pattern - Fabrício Rissetto](http://www.fabriciorissetto.com/blog/specification-pattern/)

### Aula 07

[Slide - SOLID](./resources/aula07/slide.pdf)

### Aula 08
