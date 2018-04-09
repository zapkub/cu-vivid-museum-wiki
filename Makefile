
db:
	docker-compose -f docker-compose.dev.yaml up

client:
	@stmux -M -- [ "cd views&&npm run watch" : "cd views&&npm run dev" ]

server:
	go run main.go