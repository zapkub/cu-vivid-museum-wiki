#!/usr/bin/env bash

docker-compose stop
docker-compose rm -f

docker build -t museum --rm .
cp ./nginx/nginx.conf.example ./nginx/nginx.conf

docker-compose -f docker-compose.yml up -d --no-recreate
