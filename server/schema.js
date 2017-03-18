const { GQC, TypeComposer } = require('graphql-compose');
const { GraphQLList } = require('graphql');
const composeWithMongoose = require('graphql-compose-mongoose').default;
const keystone = require('keystone');

const PlantResolver = require('./resolvers/Plant');
const { GardenTC } = require('./models/Garden');
const { HerbariumTC } = require('./models/Herbarium');
const { MuseumTC } = require('./models/Museum');

const { addRelationWith, addScientificNameSearch } = require('./common');

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
const FileType = TypeComposer.create('File');
FileType.addFields({
  url: { type: 'String' },
});

const AddTypeToImageField = (TC) => {
  TC.removeField('images');
  TC.addFields({
    images: {
      type: new GraphQLList(FileType.getType()),
      resolve: source => source.images,
    },
    thumbnailImage: {
      projection: { images: 1 },
      type: 'String',
      resolve: (source) => {
        if (source.images.length === 0) {
          return '/static/images/placeholder150x150.png';
        }
        return source.images[0].url;
      },
    },
  });
};


const PlantTC = composeWithMongoose(keystone.list('Plant').model, {
  resolvers: {
    findMany: {
      sort: true,
      skip: true,
      limit: {
        defaultValue: 100,
      },
    },
  },
});

PlantResolver({ PlantTC, GardenTC, MuseumTC, HerbariumTC });
addRelationWith(GardenTC, 'plant', 'plantId', PlantTC);
addRelationWith(HerbariumTC, 'plant', 'plantId', PlantTC);
addRelationWith(MuseumTC, 'plant', 'plantId', PlantTC);
addScientificNameSearch(GardenTC);
addScientificNameSearch(HerbariumTC);
addScientificNameSearch(MuseumTC);

AddTypeToImageField(GardenTC);
AddTypeToImageField(MuseumTC);
AddTypeToImageField(HerbariumTC);
GQC.rootQuery().addFields(Object.assign({
  findByCategory: PlantTC.getResolver('search'),
  findPlants: PlantTC.getResolver('findMany'),
  plant: PlantTC.getResolver('findById'),
  herbariums: HerbariumTC.getResolver('findMany'),
  herbariumById: HerbariumTC.getResolver('findById'),
  herbarium: HerbariumTC.getResolver('findOne'),
  gardens: GardenTC.getResolver('findMany'),
  garden: GardenTC.getResolver('findOne'),
  museums: MuseumTC.getResolver('findMany'),
  museum: MuseumTC.getResolver('findOne'),
}, checkPermission({

})));

module.exports = GQC.buildSchema();
