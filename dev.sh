#!/usr/bin/env bash

set -e
function cleanup {
    docker-compose stop
}
trap cleanup EXIT

docker-compose stop
docker-compose -f docker-compose-dev.yml up -d --no-recreate
MONGO_URI=localhost yarn run start-dev-server 