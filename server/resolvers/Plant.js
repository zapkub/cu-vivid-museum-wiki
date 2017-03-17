const _ = require('lodash');
const { Resolver } = require('graphql-compose');

const { scientificSplit } = require('../common');
const { GraphQLEnumType, GraphQLList, GraphQLUnionType, GraphQLObjectType } = require('graphql');

module.exports = ({ PlantTC, GardenTC, MuseumTC, HerbariumTC }) => {
  const CategoryEnum = new GraphQLEnumType({
    name: 'CategoryEnum',
    values: require('../../category'),
  });

  PlantTC.addFields({
    category: 'String',
    thumbnailImage: 'String',
  });

  const PlantSearchResultItemType = new GraphQLList(new GraphQLUnionType({
    name: 'PlantSearchResultItem',
    types: [HerbariumTC.getType(), GardenTC.getType()],
    resolveType(value) {
      console.log(value);
      switch (value.category) {
        case 'garden':
          return GardenTC.getType();
        case 'herbarium':
          return HerbariumTC.getType();
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
      const test = new RegExp(text.join('|'), 'i');
      const plants = await Plant.find({
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
              const plant = Object.assign({}, item.plantId.toObject(), item.toObject());
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
};
