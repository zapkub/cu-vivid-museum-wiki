const { createStringMatchFilter } = require('../common')

module.exports = ({ MuseumTC }) => {
  MuseumTC.setResolver('findMany', MuseumTC.getResolver('findMany')
.addFilterArg(createStringMatchFilter(MuseumTC)))

  MuseumTC.addRelation('Related', () => ({
    resolver: MuseumTC.getResolver('findMany'),
    args: {
      filter: source => ({
        museumLocation: source.museumLocation
      })
    },
    projection: { zone: 1 }
  }))
}
