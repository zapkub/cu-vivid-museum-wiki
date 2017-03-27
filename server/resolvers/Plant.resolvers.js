const _ = require('lodash');
const { Resolver } = require('graphql-compose');

const { scientificSplit } = require('../common');
const { GraphQLEnumType, GraphQLList, GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = (modelsTC) => {
  const { PlantTC, GardenTC, MuseumTC, HerbariumTC, PlantSearchResultItemType } = modelsTC;
  const CategoryEnum = new GraphQLEnumType({
    name: 'CategoryEnum',
    values: require('../../category'),
  });

  PlantTC.setResolver('autoCompletion', new Resolver({
    name: 'autoCompletion',
    args: {
      text: { type: 'String', defaultValue: '' },
    },
    resolve: async ({ args, context }) => {
      const { Plant } = context;
      const result = await Plant.find({ scientificName: new RegExp(args.text.split('.*').join('|'), 'ig') })
        .limit(40);
      return result;
    },
    type: new GraphQLList(new GraphQLObjectType({
      name: 'ScientificNameItem',
      fields: {
        scientificName: { type: GraphQLString },
        _id: { type: GraphQLString },
      },
    })),
  }));

  PlantTC.setResolver('search', new Resolver({
    name: 'search',
    type: new GraphQLObjectType({
      name: 'PlantSearchResult',
      fields: {
        result: { type: new GraphQLList(PlantSearchResultItemType) },
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
      console.time('Find plant by category and scientific name');
      const test = new RegExp(text.join('|'), 'i');
      let result = [];


      const q = categories.map(async (category) => {
        let model;
        switch (category) {
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
            throw new Error('Error unknown type');
        }


      // const result = await Plant.find({ $text: { $search: args.text } });
        const categorySeachResult = await model.aggregate([
        { $lookup: { from: 'plants', localField: 'plantId', foreignField: '_id', as: 'plant' } },
        { $unwind: '$plant' },
        { $match: { $or: [{ 'plant.scientificName': test }, { 'plant.familyName': test }, { 'plant.name': test }] } },
        ]);
        result = [].concat.apply([], [categorySeachResult, result]);
      });
      await Promise.all(q);
      console.timeEnd('Find plant by category and scientific name');
      return {
        result: _(result)
        .sortBy(item => item.plant.scientificName)
        .slice(skip, skip + limit),
        count: result.length,
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
