sh ./.bin/clean.sh
sh .bin/build.sh
docker-compose -f docker-compose.yml -f docker-compose.prod.yml stop
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d