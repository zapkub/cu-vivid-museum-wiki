const { GQC, TypeComposer } = require('graphql-compose');
const { GraphQLList } = require('graphql');

const { PlantTC } = require('./models/Plant');
const { GardenTC } = require('./models/Garden');
const { HerbariumTC } = require('./models/Herbarium');
const { MuseumTC } = require('./models/Museum');

const { addRelationWith } = require('./common');

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
const FileType = TypeComposer.create('File');
FileType.addFields({
  // filename: { type: 'String' },
  url: { type: 'String' },
  // path: { type: 'String' },
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

addRelationWith(GardenTC, 'plant', 'plantId', require('./models/Plant').PlantTC);
addRelationWith(HerbariumTC, 'plant', 'plantId', require('./models/Plant').PlantTC);
addRelationWith(MuseumTC, 'plant', 'plantId', require('./models/Plant').PlantTC);

AddTypeToImageField(GardenTC);
AddTypeToImageField(MuseumTC);
AddTypeToImageField(HerbariumTC);

GQC.rootQuery().addFields(Object.assign({
  findByCategory: PlantTC.getResolver('search'),
  findPlants: PlantTC.getResolver('findMany'),
  plant: PlantTC.getResolver('findById'),
  herbariums: HerbariumTC.getResolver('findMany'),
  herbarium: HerbariumTC.getResolver('findById'),
  gardens: GardenTC.getResolver('findMany'),
  garden: GardenTC.getResolver('findById'),
  museums: MuseumTC.getResolver('findMany'),
  museum: MuseumTC.getResolver('findById'),
}, checkPermission({

})));

module.exports = GQC.buildSchema();
