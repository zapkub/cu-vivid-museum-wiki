
const { GraphQLUnionType, GraphQLObjectType } = require('graphql')

module.exports = ({ PlantTC, GardenTC, MuseumTC, HerbariumTC }) => {
  const GenericPlantType = new GraphQLObjectType({
    name: 'GenericPlant',
    fields: {
      plant: { type: PlantTC.getType() }
    }
  })

  const PlantSearchResultItemType = new GraphQLUnionType({
    name: 'PlantSearchResultItem',
    types: [GenericPlantType, HerbariumTC.getType(), GardenTC.getType(), MuseumTC.getType()],
    resolveType (value) {
      if (value.museumLocation) {
        return MuseumTC.getType()
      } else if (value.zone) {
        return GardenTC.getType()
      } else if (value.cuid || value.displayLocation) {
        return HerbariumTC.getType()
      }
      return GenericPlantType
    }
  })

  return PlantSearchResultItemType
}
