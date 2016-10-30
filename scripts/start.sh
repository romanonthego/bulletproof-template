#!/usr/bin/env bash

echo "Starting..."

if [ "$NODE_ENV_HEROKU" = "staging" ]; then
  echo "staging STAGING server..."
  npm run start-staging
else
  echo "starting PRODUCTION server..."
  npm run start-production
fi