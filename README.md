# Projeto BackEnd - Agenda Eletrônica (Versão Simplificada)

Esta versão atende à recuperação solicitada: apenas classes com CRUD, conexão de banco, logger, um arquivo principal (`index.js`) e um arquivo de teste (`test.js`). Sem MVC, sem rotas e sem pastas aninhadas.

## Estrutura

- `index.js` — ponto de entrada simples que conecta/desconecta o banco
- `db.js` — conexão com MongoDB usando Mongoose
- `logger.js` — logger mínimo
- `User.js`, `Task.js`, `Tag.js`, `Schedule.js` — classes com métodos CRUD estáticos
- `test.js` — executa um fluxo CRUD mínimo para validar
- `.env` — (opcional) variável `MONGO_DB_URI` para apontar para seu MongoDB

## Pré-requisitos
- Node.js 18+ (recomendado)
- MongoDB (local ou Atlas)

## Configuração
Crie um arquivo `.env` (não é commitado):

```
MONGO_DB_URI=mongodb://127.0.0.1:27017/test
```

Se usar Atlas, substitua pela string de conexão do cluster.

## Instalação

```
npm install
```

## Executar
- Rodar o principal (conecta e fecha):
```
npm run start
```

- Rodar o teste de CRUD:
```
npm run test
```
