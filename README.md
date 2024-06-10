# node-api-template

## Initilize the node

```bash
npm init -y
```

## Add typescript

```bash
npm i -D typescript @types/express @types/node
```

## Install dotenv to load environment variables

```bash
npm i dotenv
```

### Usage

```ts
import dotenv from "dotenv";

dotenv.config();
```

## Install express

```bash
npm i express @types/express
```

## Build

This compiles the typescript files to javascript files and stores them in the `dist` directory.

```bash
npx tsc
```

## Run production server

```bash
node dist/index.js
```

or

```bash
npm start
```

## Install nodemon

```bash
npm i -D nodemon ts-node
```

## Run development server

```bash
npx nodemon src/index.ts
```

or

```bash
npm run dev
```

## Install prisma

```bash
 npm install prisma @prisma/client
```

## Initialize prisma

```bash
npx prisma init --datasource-provider mysql
```

## Run prisma migrate

```bash
npx prisma migrate dev --name init
```

## Generate prisma client

```bash
npx prisma generate
```

## Docker

### Build docker image

```bash
docker build -t node_template .
```

### Run docker compose

```bash
docker-compose up
```

### Build docker images & run docker compose

```bash
docker-compose up --build
```
