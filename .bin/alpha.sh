docker-compose stop
docker-compose up -d --no-recreate
npm run build
npm run down
NODE_ENV=production npm run up