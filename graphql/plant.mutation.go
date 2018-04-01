package graphql

import "github.com/graphql-go/graphql"

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
			// ctx := getContextFromParams(p)

			return nil, nil
		},
	}
}
