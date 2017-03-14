// eslint "no-param-reassign": "off"
const _ = require('lodash');
const keystone = require('keystone');
const composeWithMongoose = require('graphql-compose-mongoose').default;
const { Resolver } = require('graphql-compose');
const { GraphQLEnumType, GraphQLList, GraphQLObjectType } = require('graphql');

const { scientificSplit } = require('../common');
const HerbariumTC = require('./Herbarium').HerbariumTC;
const GardenTC = require('./Garden').GardenTC;
const MuseumTC = require('./Museum').MuseumTC;

const Plant = new keystone.List('Plant', {
  defaultSort: 'scientificName',
  map: { name: 'scientificName' },
});

Plant.add({
  scientificName: { type: String, label: 'ชื่อวิทยาศาสตร์', unique: true },
  familyName: { type: String, label: 'ชื่อวงศ์' },
  name: { type: String, label: 'ชื่อ' },
});

Plant.relationship({ ref: 'Herbarium', path: 'herbarium', refPath: 'plantId' });
Plant.relationship({ ref: 'Museum', path: 'museum', refPath: 'plantId' });
Plant.relationship({ ref: 'Garden', path: 'garden', refPath: 'plantId' });
Plant.defaultColumns = 'name, scientificName, familyName';
Plant.register();


const PlantTC = composeWithMongoose(Plant.model, {
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


const CategoryEnum = new GraphQLEnumType({
  name: 'CategoryEnum',
  values: require('../../category'),
});

PlantTC.addFields({
  category: 'String',
  thumbnailImage: 'String',
});


PlantTC.setResolver('search', new Resolver({
  name: 'search',
  type: new GraphQLObjectType({
    name: 'PlantSearchResult',
    fields: {
      result: { type: new GraphQLList(PlantTC.getType()) },
      count: { type: 'Int' },
    },
  }),
  args: {
    text: { type: '[String]', defaultValue: [] },
    categories: { type: new GraphQLList(CategoryEnum), defaultValue: ['garden', 'herbarium', 'museum'] },
    skip: { type: 'Int', defaultValue: 0 },
    limit: { type: 'Int', defaultValue: 20 },
  },
  resolve: async ({
      args: { categories, text, skip, limit },
      context: { Garden, Museum, Herbarium },
    }) => {
    const test = new RegExp(text.join('|'), 'i');
    const plants = await Plant.model.find({
      $or: [
        { scientificName: test },
        { familyName: test },
        { name: test },
      ],
    });
    const plantIds = plants.map(plant => plant.id);
    const result = [];
    const categoriesPromise = () => new Promise(async (rs) => {
      const Q = categories.map(async (category) => {
        let model;
        switch (category.toLowerCase()) {
          case 'garden':
            model = Garden;
            break;
          case 'herbarium':
            model = Herbarium;
            break;
          case 'museum':
            model = Museum;
            break;
          default:
            model = Herbarium;
            break;
        }
        const query = [];
        Object.keys(model.schema.paths).forEach(
        (path) => {
          if (model.schema.paths[path].instance === 'String') {
            query.push({
              [path]: test,
            });
          }
        });
        if (result.length < limit) {
          const categoriesResults = await model.find({ plantId: { $in: plantIds } })
            .populate('plantId');

          categoriesResults.forEach((item) => {
            const plant = Object.assign({}, item.plantId.toObject());
            plant._id = item._id;
            plant.category = category;
            if (item.images[0]) {
              plant.thumbnailImage = item.images[0].url;
            } else {
              plant.thumbnailImage = '/static/images/placeholder150x150.png';
            }
            result.push(plant);
          });
        }
      });

      Promise.all(Q).then(() => {
        rs(result);
      });
    });
    const searchResult = await categoriesPromise();
    const skipResult = _(searchResult)
        .sortBy(item => item.scientificName)
        .slice(skip, skip + limit)
        .value();
    return {
      result: skipResult.map(item => (Object.assign(item, {
        scientificName: scientificSplit(item.scientificName),
      }))),
      count: searchResult.length,
    };
  },
}));


const PlantIdRelationArg = {
  filter: source => ({ plantId: source._id.toString() }),
};

PlantTC.addRelation('Museum', () => ({
  resolver: MuseumTC.getResolver('findMany'),
  args: PlantIdRelationArg,
  projection: { _id: 1, plantId: 1 },
}));
PlantTC.addRelation('Garden', () => ({
  resolver: GardenTC.getResolver('findMany'),
  args: PlantIdRelationArg,
  projection: { _id: 1, plantId: 1 },
}));
PlantTC.addRelation('Herbarium', () => ({
  resolver: HerbariumTC.getResolver('findMany'),
  args: PlantIdRelationArg,
  projection: { _id: 1, plantId: 1 },
}));

exports.PlantTC = PlantTC;

