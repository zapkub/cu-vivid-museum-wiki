package graphql

import "github.com/graphql-go/graphql"

type image struct {
	URL string `json:"url"`
}

var imageType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Image",
	Fields: graphql.Fields{
		"url": &graphql.Field{
			Type: graphql.String,
		},
	},
})

// PlantMeta sub info of plant
type PlantMeta struct {
	Collector        string  `json:"collector"`
	CUID             string  `json:"cuid"`
	DiscoverLocation string  `json:"discoverLocation"`
	DisplayLocation  string  `json:"displayLocation"`
	MuseumLocation   string  `json:"museumLocation"`
	Zone             int     `json:"zone"`
	Images           []image `json:"images,omitempty"`
}

var plantMetaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Herbarium",
	Fields: graphql.Fields{
		"images": &graphql.Field{
			Type: graphql.NewList(imageType),
		},
		"collector": &graphql.Field{
			Type: graphql.String,
		},
		"cuid": &graphql.Field{
			Type: graphql.String,
		},
		"discoverLocation": &graphql.Field{
			Type: graphql.String,
		},
		"displayLocation": &graphql.Field{
			Type: graphql.String,
		},
		"museumLocation": &graphql.Field{
			Type: graphql.String,
		},
		"zone": &graphql.Field{
			Type: graphql.String,
		},
	},
})

// Plant main data structure
// this should reflect to PlantType
// as GraphQL return type
type Plant struct {
	Name           string `json:"name,omitempty"`
	ScientificName string `json:"scientificName,omitempty"`
	ID             string `json:"id,omitempty"`
	FamilyName     string `json:"familyName,omitempty"`

	Herbariums []PlantMeta `json:"herbariums,omitempty"`
	Gardens    []PlantMeta `json:"gardens,omitempty"`
	Museums    []PlantMeta `json:"museums,omitempty"`
}

var plantType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Plant",
	Fields: graphql.Fields{

		// default plant field
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"scientificName": &graphql.Field{
			Type: graphql.String,
		},
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"familyName": &graphql.Field{
			Type: graphql.String,
		},

		// Sub meta info by category
		"herbariums": &graphql.Field{
			Type: graphql.NewList(plantMetaType),
		},
		"gardens": &graphql.Field{
			Type: graphql.NewList(plantMetaType),
		},
		"museums": &graphql.Field{
			Type: graphql.NewList(plantMetaType),
		},
	},
})

var stringRequiredInputType = graphql.InputObjectFieldConfig{
	Type: graphql.NewNonNull(graphql.String),
}
var plantInputType = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "PlantInputType",
	Fields: graphql.InputObjectConfigFieldMap{
		"name":           &stringRequiredInputType,
		"scientificName": &stringRequiredInputType,
		"familyName":     &stringRequiredInputType,
	},
})
