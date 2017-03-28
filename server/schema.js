const { GQC } = require('graphql-compose');
const composeWithMongoose = require('graphql-compose-mongoose').default;


module.exports = (context) => {
  const { Plant, Garden, Herbarium, Museum, Report } = context;

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

  const ReportTC = composeWithMongoose(Report);
  const PlantTC = composeWithMongoose(Plant, defaultTypeArgs);
  const HerbariumTC = composeWithMongoose(Herbarium, defaultTypeArgs);
  const GardenTC = composeWithMongoose(Garden, defaultTypeArgs);
  const MuseumTC = composeWithMongoose(Museum, defaultTypeArgs);

  const modelsTC = { PlantTC, GardenTC, MuseumTC, HerbariumTC };
  modelsTC.PlantSearchResultItemType = require('./types/PlantSearchResultItem.type')(modelsTC);

  // setup resolver
  require('./resolvers')(modelsTC);


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

  GQC.rootQuery().addFields(Object.assign({
    findByCategory: PlantTC.getResolver('search'),
    autoCompletion: PlantTC.getResolver('autoCompletion'),
    findPlants: PlantTC.getResolver('findMany'),
    plant: PlantTC.getResolver('findById'),
    plants: PlantTC.getResolver('findMany'),
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

  return GQC.buildSchema();
};
