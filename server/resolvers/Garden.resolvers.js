
module.exports = ({ GardenTC }) => {
  const { createStringMatchFilter } = require('../common')
  GardenTC.setResolver('findMany', GardenTC.getResolver('findMany')
    .addFilterArg(createStringMatchFilter(GardenTC)))

  GardenTC.addRelation('Related', () => ({
    resolver: GardenTC.getResolver('findMany'),
    args: {
      filter: source => ({
        zone: source.zone
      })
    },
    projection: { zone: 1 }
  }))
}
