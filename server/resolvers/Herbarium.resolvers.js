
module.exports = (modelsTC) => {
  const { createStringMatchFilter } = require('../common');
  const { HerbariumTC } = modelsTC;

  const findMany = HerbariumTC.getResolver('findMany')
    .addFilterArg(createStringMatchFilter(HerbariumTC));

  HerbariumTC.setResolver('findMany', findMany);
  HerbariumTC.addRelation('Related', () => ({
    resolver: HerbariumTC.getResolver('findMany'),
    args: {
      filter: source => ({
        displayLocation: source.displayLocation,
      }),
    },
    projection: { displayLocation: 1 },
  }));

  return HerbariumTC;
};
