const keystone = require('keystone');
const SeedHelpers = require('../../seed/index');


module.exports = (done) => {
  const Plant = keystone.list('Plant');
  const plants = SeedHelpers.getPlantFromDataSheet();
  Plant.model.create(plants, (err) => {
    if (err) done(err);
    done();
  });
};

