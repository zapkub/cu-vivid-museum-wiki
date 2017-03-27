// eslint "no-param-reassign": "off"

const keystone = require('keystone');
const composeWithMongoose = require('graphql-compose-mongoose').default;
const { createStringMatchFilter } = require('../common');

const Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

const Museum = new keystone.List('Museum', {
  defaultSort: '-cuid',
  map: { name: 'cuid' },
});

Museum.add({
  images: { type: Types.CloudinaryImages },
  plantId: { type: Types.Relationship, ref: 'Plant', index: true },
  museumLocation: { type: String, label: 'Museum location' },
});

Museum.defaultColumns = 'museumLocation, plantId';
Museum.register();
