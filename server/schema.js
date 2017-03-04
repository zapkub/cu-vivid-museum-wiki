const { GQC } = require('graphql-compose');
const { PlantTC } = require('./models/Plant');
const { CategoryTC } = require('./models/Category');

GQC.rootQuery().addFields({
  plant: PlantTC.getResolver('findById'),
  plants: PlantTC.getResolver('findMany'),
  categories: CategoryTC.getResolver('findMany'),
  categoriesCount: CategoryTC.getResolver('count'),
});
module.exports = GQC.buildSchema();
