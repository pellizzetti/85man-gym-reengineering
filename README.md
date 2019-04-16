# 85man-gym-reengineering

API para projeto de 85MAN - Manutenção de Software

## Requisitos

- NodeJs 10.x.x >
- Yarn

## Iniciando

Clone o projeto:

```sh
git clone https://github.com/pellizzetti/85man-gym-reengineering.git && cd 85man-gym-reengineering
```

Instalando dependências:

```sh
yarn
```

Setando variáveis de ambiente:

- Copie o arquivo `.env.example`, renomeie para `.env` e sete as variáveis de acordo com seu ambiente.

Rode as _migrations_ (caso existam):

```sh
yarn knex migrate:latest
```

Rode as _seeds_ (dados dummy):

```sh
yarn knex seed:run
```

Iniciando o aplicação:

```sh
yarn start
```
