#!/bin/sh
npm run migration:run

if [ "$NODE_ENV" = "development" ]; then
  npm run start:dev
else
  npm run start:prod
fi

