#!/usr/bin/env bash

if [ "$NODE_ENV_HEROKU" = "staging" ]; then
  echo "building STAGING server & broswer..."
  npm run build-staging
else
  echo "building PRODUCTION server & broswer..."
  npm run build-production
fi

npm run upload-source-maps