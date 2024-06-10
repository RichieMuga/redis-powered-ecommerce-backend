#!/bin/bash

cd /usr/src/app

# migrate database
npx prisma migrate dev --name init

# Run the server
npm run dev
