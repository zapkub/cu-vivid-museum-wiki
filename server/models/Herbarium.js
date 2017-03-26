// eslint "no-param-reassign": "off"

const keystone = require('keystone');

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
  plantId: { type: Types.Relationship, ref: 'Plant', many: false, index: true },
  cuid: { type: String },
  displayLocation: { type: String, label: 'พื้นที่จัดเก็บ' },
  collector: { type: String },
  discoverLocation: { type: String, label: 'สถานที่ค้นพบ' },
  collectedDate: { type: Date, default: Date.now },
  images: { type: Types.CloudinaryImages },
});

Herbarium.defaultColumns = 'cuid, displayLocation';
Herbarium.register();

