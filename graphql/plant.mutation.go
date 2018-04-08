package graphql

import (
	"encoding/json"
	"strings"

	"github.com/graphql-go/graphql"
)

var plantUpdateInputArgs = graphql.FieldConfigArgument{
	"id": &graphql.ArgumentConfig{
		Type: graphql.NewNonNull(graphql.String),
	},
	"record": &graphql.ArgumentConfig{
		Type: plantUpdateInputType,
	},
}

func createUpdatePlantField() graphql.Field {
	return graphql.Field{
		Args: plantUpdateInputArgs,
		Type: graphql.NewObject(graphql.ObjectConfig{
			Name: "UpdatePlantResult",
			Fields: graphql.Fields{
				"record": &graphql.Field{
					Type: plantType,
				},
			},
		}),
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			var plant Plant
			d, _ := json.Marshal(p.Args["record"])
			id := p.Args["id"].(string)
			err := json.Unmarshal(d, &plant)
			// if isOK {
			if err != nil {
				return nil, err
			}
			ctx := getContextFromParams(p)
			ctx.client.Update(
				ctx.config.IndexName,
				id,
				plant,
			)
			return nil, nil
		},
	}
}

var plantCreateInputArgs = graphql.FieldConfigArgument{
	"record": &graphql.ArgumentConfig{
		Type: plantCreateInputType,
	},
}

func createInsertPlantField() graphql.Field {
	return graphql.Field{
		Args: plantCreateInputArgs,
		Type: graphql.NewObject(graphql.ObjectConfig{
			Name: "InsertPlantResult",
			Fields: graphql.Fields{
				"record": &graphql.Field{
					Type: plantType,
				},
			},
		}),
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			var plant Plant
			d, _ := json.Marshal(p.Args["record"])
			json.Unmarshal(d, &plant)
			ctx := getContextFromParams(p)
			ctx.client.Insert(
				ctx.config.IndexName,
				strings.Replace(plant.ScientificName, " ", "-", -1),
				plant,
			)
			return nil, nil
		},
	}
}
