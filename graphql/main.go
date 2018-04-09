package graphql

import (
	"context"
	"cu-vivid-museum-wiki/adapter"
	"cu-vivid-museum-wiki/config"
	"fmt"
	"log"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
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
	user   *UserSession
}

// ContextKey for context in GraphQL
type ContextKey string

const (
	// ResolverContextKey key for elastic client in graphql context
	ResolverContextKey = ContextKey("GRAPHQL_CONTEXT_KEY")
)

func getContextFromParams(p graphql.ResolveParams) resolverContext {
	ctx := p.Context.Value(ResolverContextKey).(resolverContext)
	return ctx
}

func createGraphQLPublicSchema() graphql.Schema {
	SearchPlantField := createSearchPlantField()
	rootQueryFields := graphql.Fields{
		"search": &SearchPlantField,
	}
	rootQuery := graphql.ObjectConfig{
		Name:   "Query",
		Fields: rootQueryFields,
	}

	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query: graphql.NewObject(rootQuery),
	})
	if err != nil {
		log.Fatalf("[graphql] Failed to create schema, error %v", err)
	}
	return schema
}

func createGraphQLAdminSchema() graphql.Schema {

	SearchPlantField := createSearchPlantField()
	rootQueryFields := graphql.Fields{
		"search": &SearchPlantField,
	}
	rootQuery := graphql.ObjectConfig{
		Name:   "Query",
		Fields: rootQueryFields,
	}

	InsertPlantField := createInsertPlantField()
	wrapFieldWithAuthorization(InsertPlantField, adminAccess)
	UpdatePlantField := createUpdatePlantField()
	rootMutationFields := graphql.Fields{
		"insertPlant":     &InsertPlantField,
		"updatePlantById": &UpdatePlantField,
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

var adminSchema = createGraphQLAdminSchema()
var publicSchema = createGraphQLPublicSchema()

// CreateGraphQLHandler create new grpahql http handler
func CreateGraphQLHandler(elasticClient adapter.Client, c *config.Config) func(gctx *gin.Context) {

	// create new Handler from GraphQL server
	// and create default context
	adminHandler := handler.New(&handler.Config{
		Schema: &adminSchema,
		Pretty: true,
	})
	publicHandler := handler.New(&handler.Config{
		Schema: &publicSchema,
		Pretty: true,
	})

	jwtAuthenticator := createJWTAuthentication(c)

	return func(gctx *gin.Context) {

		w := gctx.Writer
		r := gctx.Request
		resolverCtx := resolverContext{
			client: elasticClient,
			config: *c,
		}
		ctx := context.WithValue(r.Context(), ResolverContextKey, resolverCtx)

		token := r.Header.Get("Authorization")
		if len(token) <= 0 {
			publicHandler.ContextHandler(ctx, w, r)
			return
		}

		// decode JWT Session token
		err := jwtAuthenticator.CheckJWT(w, r)
		if err != nil {
			gctx.JSON(401, gin.H{
				"message": err.Error(),
				"code":    401,
			})
			return
		}
		userToken := r.Context().Value("user").(*jwt.Token)
		user := userToken.Claims.(jwt.MapClaims)
		resolverCtx.user = &UserSession{
			id: user["id"].(string),
		}
		adminHandler.ContextHandler(ctx, w, r)
	}
}
