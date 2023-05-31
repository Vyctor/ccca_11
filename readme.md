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
