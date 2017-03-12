// eslint "no-param-reassign": "off"

const keystone = require('keystone');
const composeWithMongoose = require('graphql-compose-mongoose').default;
const { createStringMatchFilter } = require('../common');

const Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

const Garden = new keystone.List('Garden', {
  defaultSort: '-zone',
  map: { name: 'zone' },
});

Garden.add({
  plantId: { type: Types.Relationship, ref: 'Plant', many: false },
  zone: { type: String, label: 'Zone' },
  images: { type: Types.CloudinaryImages },
});

Garden.defaultColumns = 'zone';
Garden.register();

const GardenTC = composeWithMongoose(Garden.model, {
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


GardenTC.setResolver('findMany', GardenTC.getResolver('findMany')
.addFilterArg(createStringMatchFilter(GardenTC)));

exports.GardenTC = GardenTC;

