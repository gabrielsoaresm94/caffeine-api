# Caffeine Lojistas API

## Descrição

API do projeto para gerenciamento de lojas parceiras.

## Setar .env
Necessário antes de tudo criar um arquivo .env na raiz do projeto e adicionar um valor para suas variáveis. São elas que vão servir para acessar o banco e poder rodar suas queries internamente.
```
DB_USER=usertest
DB_PASSWORD=passwordtest
```

## Subir o banco com Docker
É necessário acessar o diretório `db` e rodar o seguinte comando para poder subir uma imagem do banco com [Docker]():
```
docker-compose up
```
### Rodar as queries
Identificando o `id` do container, é necessário abrir o banco e rodar as queries, que estão presentes dentro do arquivo `queries.sql`:
```
docker ps
docker exec -ti {docker_id} psql -d {database_name} -U {DB_USER}
```

## Como instalar

```bash
$ npm install
```

## Como rodar

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Como testar

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
