
const { addRelationWith, addScientificNameSearch, AddTypeToImageField } = require('../common')
const initPlantResolver = require('./Plant.resolvers')
const initHerbariumResolver = require('./Herbarium.resolvers')
const initGardenResolver = require('./Garden.resolvers')
const initMuseumResolver = require('./Museum.resolvers')

module.exports = (modelsTC) => {
  const { PlantTC, HerbariumTC, GardenTC, MuseumTC } = modelsTC

  initPlantResolver(modelsTC)
  initHerbariumResolver(modelsTC)
  initGardenResolver(modelsTC)
  initMuseumResolver(modelsTC)

  addRelationWith(GardenTC, 'plant', 'plantId', PlantTC)
  addRelationWith(MuseumTC, 'plant', 'plantId', PlantTC)
  addRelationWith(HerbariumTC, 'plant', 'plantId', PlantTC)

  addScientificNameSearch(GardenTC)
  addScientificNameSearch(HerbariumTC)
  addScientificNameSearch(MuseumTC)

  AddTypeToImageField(GardenTC)
  AddTypeToImageField(MuseumTC)
  AddTypeToImageField(HerbariumTC)
}
