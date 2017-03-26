module.exports = (context) => {
  const { addRelationWith, addScientificNameSearch, createStringMatchFilter, AddTypeToImageField } = require('../common');
  const { PlantTC, HerbariumTC, PlantSearchResultItemType } = context;
  const { GraphQLList } = require('graphql');
  const findMany = HerbariumTC.getResolver('findMany')
    .addFilterArg(createStringMatchFilter(HerbariumTC));

  HerbariumTC.setResolver('findMany', findMany);

  // const relatedResolver = HerbariumTC.getResolver('findMany')
  //   .clone()
  //   .setType(new GraphQLList(PlantSearchResultItemType));

  HerbariumTC.addRelation('Related', () => ({
    resolver: HerbariumTC.getResolver('findMany'),
    args: {
      filter: source => ({
        displayLocation: source.displayLocation,
      }),
    },
    projection: { displayLocation: 1 },
  }));

  addScientificNameSearch(HerbariumTC);
  addRelationWith(HerbariumTC, 'plant', 'plantId', PlantTC);
  AddTypeToImageField(HerbariumTC);
  return HerbariumTC;
};
