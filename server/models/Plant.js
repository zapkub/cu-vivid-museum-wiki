// eslint "no-param-reassign": "off"
const _ = require('lodash');
const keystone = require('keystone');
const composeWithMongoose = require('graphql-compose-mongoose').default;
const { Resolver, TypeComposer } = require('graphql-compose');
const { GraphQLEnumType, GraphQLInputObjectType, GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');
const { createStringMatchFilter } = require('../common');
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

Plant.relationship({ ref: 'Herbarium', path: 'plantId' });
Plant.defaultColumns = 'localName, scientificName, family';
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
});
PlantTC.setResolver('search', new Resolver({
  name: 'search',
  type: new GraphQLList(PlantTC.getType()),
  args: {
    text: { type: '[String]', defaultValue: [] },
    categories: { type: new GraphQLList(CategoryEnum), defaultValue: ['garden', 'herbarium', 'museum'] },
  },
  resolve: async ({ source, args: { categories, text }, context: { Garden, Museum, Herbarium } }) => {
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
    const categoriesPromise = new Promise((rs, rj) => {
      categories.forEach(async (category) => {
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
        console.log(category);
        const query = [];
        Object.keys(model.schema.paths).forEach(
        (path) => {
          if (model.schema.paths[path].instance === 'String') {
            query.push({
              [path]: test,
            });
          }
        });
        const categoriesResults = await model.find({ plantId: { $in: plantIds } })
        .limit(20)
        .populate('plantId');
        categoriesResults.forEach((item) => {
          const plant = Object.assign({}, item.plantId.toObject());
          plant._id = item._id;
          plant.category = category;
          result.push(plant);
        });
        rs();
      });
    });
    await categoriesPromise;

    return _.sortBy(result, item => item.scientificName);
  },
}));


// MuseumTC.getResolver('findMany').addArgs({
//   isSelected: { type: 'Boolean', defaultValue: true },
// });
// GardenTC.getResolver('findMany').addArgs({
//   isSelected: { type: 'Boolean', defaultValue: true },
// });
// HerbariumTC.getResolver('findMany').addArgs({
//   isSelected: { type: 'Boolean', defaultValue: true },
// });
// const PlantIdRelationArg = {
//   filter: (source, args) => {
//     if (args.isSelected) {
//       return { plantId: source._id.toString() };
//     }
//     // disable search
//     return { images: 'invalid' };
//   },
// };

// PlantTC.addRelation('Museum', () => ({
//   resolver: MuseumTC.getResolver('findMany'),
//   args: PlantIdRelationArg,
//   projection: { _id: 1, plantId: 1 },
// }));
// PlantTC.addRelation('Garden', () => ({
//   resolver: GardenTC.getResolver('findMany'),
//   args: PlantIdRelationArg,
//   projection: { _id: 1, plantId: 1 },
// }));
// PlantTC.addRelation('Herbarium', () => ({
//   resolver: HerbariumTC.getResolver('findMany'),
//   args: PlantIdRelationArg,
//   projection: { _id: 1, plantId: 1 },
// }));

// PlantTC.setResolver('findMany', PlantTC.getResolver('findMany')
// .addFilterArg(createStringMatchFilter(PlantTC))
// .addFilterArg({
//   name: 'categories',
//   type: '[String]',
// })
// .addSortArg({
//   name: 'PUBLISH_DATE_DESC',
//   description: 'Sort by publish date.',
//   value: { publishedDate: -1 },
// }));

exports.PlantTC = PlantTC;

