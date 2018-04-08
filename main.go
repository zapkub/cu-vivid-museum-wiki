package main

import (
	"context"
	"cu-vivid-museum-wiki/adapter"
	"cu-vivid-museum-wiki/config"
	"cu-vivid-museum-wiki/graphql"
	"fmt"
	"io/ioutil"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// Get config
	appConfig := config.LoadConfig()

	// init web server
	fmt.Println("[server] start server...")
	r := gin.Default()

	jwt := createJWTAuthentication(appConfig)
	r.Use(func(c *gin.Context) {
		err := jwt.CheckJWT(c.Writer, c.Request)
		if err != nil {
			fmt.Println(err)
		}
		c.Next()

	})
	// Connect to Elastic server
	elasticClient := adapter.Dial(appConfig.ElasticURI)

	// Sync data to elastic
	fmt.Println("[server] dump data to elastic search server...")
	bulksFile, err := ioutil.ReadFile("./seed/json/bulks.json")
	if err != nil {
		log.Fatalln("[server] bulks.json read error")
	}

	bulkInstructions := string(bulksFile)
	err = elasticClient.Bulk(bulkInstructions)
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println("[server] done!!")

	// Initial GraphQL schema handler
	// with extra context
	// elasticClient
	gqlH := graphql.CreateGraphQLHandler()
	r.Any("/graphql", func(c *gin.Context) {
		w := c.Writer
		r := c.Request

		ctx := context.WithValue(r.Context(), graphql.ElasticClientContextKey, elasticClient)
		ctx = context.WithValue(ctx, graphql.ConfigContextKey, *appConfig)
		user, exits := c.Get("user")
		if exits {
			ctx = context.WithValue(ctx, graphql.UserContextKey, user)
		}
		gqlH.ContextHandler(ctx, w, r)
	})

	err = r.Run(fmt.Sprintf(":%s", appConfig.Port))
	if err != nil {
		log.Fatal(err)
	}
}
