package graphql

import (
	"encoding/json"
	"strings"

	"github.com/graphql-go/graphql"
)

var plantCreateInputArgs = graphql.FieldConfigArgument{
	"record": &graphql.ArgumentConfig{
		Type: plantInputType,
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
			// if isOK {
			ctx := getContextFromParams(p)
			ctx.client.Insert(ctx.config.IndexName, strings.Replace(plant.ScientificName, " ", "-", -1), plant)
			return nil, nil
			// }
			// return nil, fmt.Errorf("Error")

		},
	}
}
