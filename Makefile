



dev-server:
	nodemon -e go --ignore server --exec "go run main.go"

db:
	docker-compose -f docker-compose.dev.yaml up

dev:
	@stmux -M -- [ [ "make dev-server" .. "cd views&&npm run watch" .. "cd views&&npm run dev" ] : "" ]