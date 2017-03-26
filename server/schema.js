const { GQC } = require('graphql-compose');
const composeWithMongoose = require('graphql-compose-mongoose').default;
const keystone = require('keystone');

const initPlantResolver = require('./resolvers/Plant');
const initHerbariumResolver = require('./resolvers/Herbarium.resolvers');

const { GardenTC } = require('./models/Garden');
const { MuseumTC } = require('./models/Museum');

const { addRelationWith, addScientificNameSearch, AddTypeToImageField } = require('./common');

const checkPermission = (resolvers) => {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve(next => (rp) => { // eslint-disable-line
      // rp = resolveParams = { source, args, context, info }
      if (!rp.context.isAuth) {
        throw new Error('You should be admin, to have access to this action.');
      }
      return next(rp);
    });
  });
  return resolvers;
};

const defaultTypeArgs = {
  resolvers: {
    findMany: {
      sort: true,
      skip: true,
      limit: {
        defaultValue: 100,
      },
    },
  },
};


const ReportTC = composeWithMongoose(keystone.list('Report').model);
const PlantTC = composeWithMongoose(keystone.list('Plant').model, defaultTypeArgs);
const HerbariumTC = composeWithMongoose(keystone.list('Herbarium').model, defaultTypeArgs);
const modelsTC = { PlantTC, GardenTC, MuseumTC, HerbariumTC };
modelsTC.PlantSearchResultItemType = require('./types/PlantSearchResultItem.type')(modelsTC);

initPlantResolver(modelsTC);
initHerbariumResolver(modelsTC);

addRelationWith(GardenTC, 'plant', 'plantId', PlantTC);
addRelationWith(MuseumTC, 'plant', 'plantId', PlantTC);
addScientificNameSearch(GardenTC);
addScientificNameSearch(MuseumTC);

AddTypeToImageField(GardenTC);
AddTypeToImageField(MuseumTC);

GQC.rootQuery().addFields(Object.assign({
  findByCategory: PlantTC.getResolver('search'),
  findPlants: PlantTC.getResolver('findMany'),
  plant: PlantTC.getResolver('findById'),
  plantCount: PlantTC.getResolver('count'),
  herbariums: HerbariumTC.getResolver('findMany'),
  herbariumById: HerbariumTC.getResolver('findById'),
  herbarium: HerbariumTC.getResolver('findOne'),
  herbariumCount: HerbariumTC.getResolver('count'),
  gardens: GardenTC.getResolver('findMany'),
  garden: GardenTC.getResolver('findOne'),
  gardenCount: GardenTC.getResolver('count'),
  museums: MuseumTC.getResolver('findMany'),
  museum: MuseumTC.getResolver('findOne'),
  museumCount: MuseumTC.getResolver('count'),

}, checkPermission({

})));

GQC.rootMutation().addFields({
  createReport: ReportTC.getResolver('createOne'),
});

module.exports = GQC.buildSchema();
