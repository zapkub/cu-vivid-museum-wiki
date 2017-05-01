// eslint "no-param-reassign": "off"
const keystone = require('keystone')

const Plant = new keystone.List('Plant', {
  defaultSort: 'scientificName',
  map: { name: 'scientificName' },
  autokey: { from: 'scientificName', path: 'key', unique: true }
})

Plant.add({
  scientificName: { type: String, label: 'ชื่อวิทยาศาสตร์', unique: true, index: true },
  familyName: { type: String, label: 'ชื่อวงศ์' },
  name: { type: String, label: 'ชื่อ', index: true }
})

Plant.schema.index({ scientificName: 'text', familyName: 'text' })

Plant.relationship({ ref: 'Herbarium', path: 'herbarium', refPath: 'plantId' })
Plant.relationship({ ref: 'Museum', path: 'museum', refPath: 'plantId' })
Plant.relationship({ ref: 'Garden', path: 'garden', refPath: 'plantId' })
Plant.defaultColumns = 'name, scientificName, familyName'
Plant.register()
