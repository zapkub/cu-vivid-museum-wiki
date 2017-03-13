docker-compose stop
docker-compose up -d --no-recreate
sudo npm run build
sudo npm run down
sudo NODE_ENV=production npm run up