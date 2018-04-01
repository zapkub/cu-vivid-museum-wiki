package graphql

import (
	"cu-vivid-museum-wiki/adapter"
	"fmt"

	"github.com/graphql-go/graphql"
)

type searchPlantResult struct {
	PageInfo PaginationInfo `json:"pageInfo"`
	Data     []Plant        `json:"data"`
}

var searchFilterArg = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "SearchFilterInput",
	Fields: graphql.InputObjectConfigFieldMap{
		"categories": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.String),
		},
	},
})

var searchInputArg = graphql.FieldConfigArgument{
	"value": &graphql.ArgumentConfig{
		Type: graphql.String,
	},
	"filter": &graphql.ArgumentConfig{
		Type: searchFilterArg,
	},
	"size": &graphql.ArgumentConfig{
		Type:         graphql.Int,
		DefaultValue: 0,
	},
	"from": &graphql.ArgumentConfig{
		Type:         graphql.Int,
		DefaultValue: 0,
	},
}

type plantDocument struct {
	adapter.ElasticResponseDocument
	Source Plant `json:"_source"`
}

func createSearchPlantField() graphql.Field {

	return graphql.Field{
		Type: createPaginationFromType(plantType),
		Args: searchInputArg,
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			ctx := getContextFromParams(p)

			// Prepare search query object
			s := &Plant{
				Name: "ตะเคียน",
			}
			q := adapter.ElasticSearchQuery{}
			q.Match = s
			result, err := ctx.client.Search(ctx.config.IndexName, adapter.ElasticSeachPayload{Query: q})
			if err != nil {
				return nil, err
			}

			// Bind hits with Result type
			var hits []plantDocument
			err = result.Hits.BindHits(&hits)
			if err != nil {
				fmt.Println(err)
			}

			data := []Plant{}
			for _, hit := range hits {
				data = append(data, hit.Source)
			}

			return searchPlantResult{
				Data: data,
			}, nil
		},
	}
}
