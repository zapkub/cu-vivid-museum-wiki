// eslint "no-param-reassign": "off"

const keystone = require('keystone')

const Types = keystone.Field.Types
const Garden = new keystone.List('Garden', {
  defaultSort: '-zone',
  map: { name: 'zone' }
})

Garden.add({
  plantId: { type: Types.Relationship, ref: 'Plant', many: false, index: true },
  zone: { type: String, label: 'Zone' },
  images: { type: Types.CloudinaryImages }
})

Garden.defaultColumns = 'zone'
Garden.register()
