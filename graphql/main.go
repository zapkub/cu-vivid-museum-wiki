package graphql

import (
	"cu-vivid-museum-wiki/adapter"
	"cu-vivid-museum-wiki/config"
	"fmt"
	"log"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

// PaginationInfo is data type of
// page info in pagination data result
type PaginationInfo struct {
	CurrentPage int `json:"currentPage"`
	TotalPage   int `json:"totalPage"`
	LastPage    int `json:"lastPage"`
}

var paginationInfoType = graphql.NewObject(graphql.ObjectConfig{
	Name: "PaginationInfo",
	Fields: graphql.Fields{
		"currentPage": &graphql.Field{
			Type: graphql.Int,
		},
		"totalPage": &graphql.Field{
			Type: graphql.Int,
		},
		"lastPage": &graphql.Field{
			Type: graphql.Int,
		},
	},
})

func createPaginationFromType(gType *graphql.Object) *graphql.Object {
	p := graphql.ObjectConfig{
		Name: fmt.Sprintf("%sPaginationType", gType.Name()),
		Fields: graphql.Fields{
			"pageInfo": &graphql.Field{
				Type: paginationInfoType,
			},
			"data": &graphql.Field{
				Type: graphql.NewList(gType),
			},
		},
	}
	return graphql.NewObject(p)
}

type resolverContext struct {
	client adapter.Client
	config config.Config
}

func getContextFromParams(p graphql.ResolveParams) resolverContext {
	var cl adapter.Client
	var cf config.Config
	cl = p.Context.Value("elasticClient").(adapter.Client)
	cf = p.Context.Value("config").(config.Config)
	return resolverContext{
		client: cl,
		config: cf,
	}
}

func createGraphQLSchema() graphql.Schema {

	SearchPlantField := createSearchPlantField()
	rootQueryFields := graphql.Fields{
		"search": &SearchPlantField,
	}
	rootQuery := graphql.ObjectConfig{
		Name:   "Query",
		Fields: rootQueryFields,
	}

	InsertPlantField := createInsertPlantField()
	rootMutationFields := graphql.Fields{
		"insertPlant": &InsertPlantField,
	}
	rootMutation := graphql.ObjectConfig{
		Name:   "Mutation",
		Fields: rootMutationFields,
	}

	schemaConfig := graphql.SchemaConfig{
		Query:    graphql.NewObject(rootQuery),
		Mutation: graphql.NewObject(rootMutation),
	}
	schema, err := graphql.NewSchema(schemaConfig)

	if err != nil {
		log.Fatalf("[graphql] Failed to create schema, error %v", err)

	}

	return schema
}

var schema = createGraphQLSchema()

func CreateGraphQLHandler() *handler.Handler {

	h := handler.New(&handler.Config{
		Schema: &schema,
		Pretty: true,
	})
	return h
}
