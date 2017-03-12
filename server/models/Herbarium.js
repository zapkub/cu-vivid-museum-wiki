// eslint "no-param-reassign": "off"

const keystone = require('keystone');
const composeWithMongoose = require('graphql-compose-mongoose').default;
const { createStringMatchFilter } = require('../common');

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
HerbariumTC.setResolver('findMany', HerbariumTC.getResolver('findMany')
.addFilterArg(createStringMatchFilter(HerbariumTC)));

exports.HerbariumTC = HerbariumTC;

