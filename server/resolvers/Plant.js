const _ = require('lodash');
const { Resolver } = require('graphql-compose');

const { scientificSplit } = require('../common');
const { GraphQLEnumType, GraphQLList, GraphQLUnionType, GraphQLObjectType } = require('graphql');

module.exports = ({ PlantTC, GardenTC, MuseumTC, HerbariumTC }) => {
  const CategoryEnum = new GraphQLEnumType({
    name: 'CategoryEnum',
    values: require('../../category'),
  });

  const PlantSearchResultItemType = new GraphQLList(new GraphQLUnionType({
    name: 'PlantSearchResultItem',
    types: [HerbariumTC.getType(), GardenTC.getType(), MuseumTC.getType()],
    resolveType(value) {
      switch (value.category) {
        case 'garden':
          return GardenTC.getType();
        case 'herbarium':
          return HerbariumTC.getType();
        case 'museum':
          return MuseumTC.getType();
        default:
          return HerbariumTC.getType();
      }
    },
  }));

  PlantTC.setResolver('search', new Resolver({
    name: 'search',
    type: new GraphQLObjectType({
      name: 'PlantSearchResult',
      fields: {
        result: { type: PlantSearchResultItemType },
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
      context: { Garden, Museum, Herbarium, Plant },
    }) => {
      console.time('Find plant by category and scientific name');
      const test = new RegExp(text.join('|'), 'i');
      const plants = await Plant.find({
        $or: [
        { scientificName: test },
        { familyName: test },
        { name: test },
        ],
      });
    //   .limit(limit);
      const plantIds = plants.map(plant => plant.id);
      const result = [];
      let count = 0;
      const searchPromises = categories.map(async (category) => {
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
        const searchQuery = { plantId: { $in: plantIds } };
        const categoriesResults = await model
            .find(searchQuery)
            .skip(skip)
            .limit(limit);

            // .populate('plantId');
        const amount = await model
          .find(searchQuery)
          .count();
        count += amount;
        categoriesResults.forEach((item) => {
          const plant = Object.assign({}, item.toObject());
          plant._id = item._id;
          plant.category = category;
          if (item.images[0]) {
            plant.thumbnailImage = item.images[0].url;
          } else {
            plant.thumbnailImage = '/static/images/placeholder150x150.png';
          }
          result.push(plant);
        });
      });
      await Promise.all(searchPromises);
      const skipResult = _(result)
        .sortBy(item => item.scientificName)
        .sortBy(item => item.category)
        .sortBy(item => item._id)
        // .slice(skip, skip + limit)
        .filter((item, i) => i < limit)
        .value();
      console.timeEnd('Find plant by category and scientific name');
      return {
        result: skipResult,
        count,
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


  PlantTC.extendField('scientificName', {
    description: '',
    resolve: source => (scientificSplit(source.scientificName)),
  });
};
