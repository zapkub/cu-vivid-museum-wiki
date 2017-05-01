const keystone = require('keystone')
const composeWithMongoose = require('graphql-compose-mongoose').default

const Location = new keystone.List('Location', {
})

Location.add({
  name: { type: String, required: true },
  label: { type: String },
  description: { type: String, required: false }
})

Location.relationship({ ref: 'Plant', path: 'displayLocation' })
Location.register()

const LocationTC = composeWithMongoose(Location.model, {})

exports.LocationTC = LocationTC
