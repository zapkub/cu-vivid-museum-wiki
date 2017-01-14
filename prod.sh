#!/usr/bin/env bash
# docker build -t museum .
cp ./nginx/nginx.conf.example ./nginx/nginx.conf
docker-compose -f docker-compose.yml up -d --no-recreate
