const keystone = require('keystone')

module.exports = (done) => {
  const Plant = keystone.list('Plant')
  const plants = require('../../seed/json/plant.json')
  Plant.model.create(plants, (err) => {
    if (err) done(err)
    done()
  })
}
