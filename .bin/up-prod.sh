export $(cat .env | xargs)
docker-compose -f docker-compose.yml  -f docker-compose.nginx.yml -f docker-compose.prod.yml up -d