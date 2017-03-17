// eslint "no-param-reassign": "off"

const keystone = require('keystone');
const composeWithMongoose = require('graphql-compose-mongoose').default;
const { createStringMatchFilter, createScienticNameFilter } = require('../common');

const Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

const Herbarium = new keystone.List('Herbarium', {
  defaultSort: '-cuid',
  map: { name: 'cuid' },
});

Herbarium.add({
  plantId: { type: Types.Relationship, ref: 'Plant', many: false },
  cuid: { type: String },
  displayLocation: { type: String, label: 'พื้นที่จัดเก็บ' },
  collector: { type: String },
  discoverLocation: { type: String, label: 'สถานที่ค้นพบ' },
  collectedDate: { type: Date, default: Date.now },
  images: { type: Types.CloudinaryImages },
});

Herbarium.defaultColumns = 'cuid, displayLocation';
Herbarium.register();

const HerbariumTC = composeWithMongoose(Herbarium.model, {
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

HerbariumTC.getResolver('findOne')
.addArgs({
  scientificName: { type: 'String' },
});

HerbariumTC.setResolver('findMany', HerbariumTC.getResolver('findMany')
.addFilterArg(createStringMatchFilter(HerbariumTC)));

HerbariumTC.setResolver('findOne', HerbariumTC.getResolver('findOne')
.wrapResolve(next => async (rp) => {
  const result = await rp.context.Plant.findOne({ scientificName: rp.args.scientificName });
  if (result) {
    rp.args.filter = Object.assign({ plantId: result._id.toString() }, rp.args.filter) // eslint-disable-line
  }
  return next(rp);
}));

HerbariumTC.addRelation('Related', () => ({
  resolver: HerbariumTC.getResolver('findMany'),
  args: {
    filter: source => ({
      displayLocation: source.displayLocation,
    }),
  },
  projection: { displayLocation: 1 },
}));

exports.HerbariumTC = HerbariumTC;

