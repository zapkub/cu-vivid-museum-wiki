const { GQC } = require('graphql-compose');

const { PlantTC } = require('./models/Plant');
const { CategoryTC } = require('./models/Category');
const { LocationTC } = require('./models/Location');


const checkPermission = (resolvers) => {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve(next => (rp) => {
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
  plant: PlantTC.getResolver('findById'),
  plants: PlantTC.getResolver('findMany'),
  categories: CategoryTC.getResolver('findMany'),
  categoriesCount: CategoryTC.getResolver('count'),
  location: LocationTC.getResolver('findById'),
  locations: LocationTC.getResolver('findMany'),
}, checkPermission({

})));

module.exports = GQC.buildSchema();
