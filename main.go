package main

import (
	"cu-vivid-museum-wiki/adapter"
	"cu-vivid-museum-wiki/config"
	"cu-vivid-museum-wiki/graphql"
	"fmt"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"time"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func reverseProxy(target string) gin.HandlerFunc {

	return func(c *gin.Context) {
		url, _ := url.Parse(target)
		handler := httputil.NewSingleHostReverseProxy(url)

		handler.FlushInterval = 100 * time.Millisecond
		handler.Transport = &http.Transport{
			Proxy: http.ProxyFromEnvironment,
			Dial: (&net.Dialer{
				Timeout:   24 * time.Hour,
				KeepAlive: 24 * time.Hour,
			}).Dial,
			TLSHandshakeTimeout: 60 * time.Second,
		}
		handler.ServeHTTP(c.Writer, c.Request)
	}
}
func main() {
	// Get config
	appConfig := config.LoadConfig()

	// init web server
	fmt.Println("[server] start server...")
	r := gin.Default()

	// Add static server file path
	staticHandler := static.Serve("/static", static.LocalFile("./static", false))
	r.Use(staticHandler)

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
	graphql.CreateGraphQLHandler(elasticClient, appConfig)
	// r.Any("/graphql", gqlH)

	// Create reverse proxy fallback
	// to serve client application
	// or you can setup from NGINX
	target := fmt.Sprintf("http://localhost:%s", appConfig.ClientPort)
	r.NoRoute(reverseProxy(target))

	r.Run(fmt.Sprintf(":%s", appConfig.Port))

	// server := &http.Server{
	// 	Addr:    fmt.Sprintf(":%s", appConfig.Port),
	// 	Handler: r,
	// }

	// quit := make(chan os.Signal)
	// signal.Notify(quit, os.Interrupt)

	// go func() {
	// 	<-quit
	// 	log.Println("receive interrupt signal")
	// 	if err := server.Close(); err != nil {
	// 		log.Fatal("Server Close:", err)
	// 	}
	// }()

	// if err := server.ListenAndServe(); err != nil {
	// 	if err == http.ErrServerClosed {
	// 		log.Println("Server closed under request")
	// 	} else {
	// 		log.Fatalf("Server closed unexpect \n %s", err)
	// 	}
	// }

	log.Println("Server exiting")

}
