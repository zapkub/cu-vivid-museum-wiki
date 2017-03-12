const keystone = require('keystone');
const SeedHelpers = require('../../seed/index');
const _ = require('lodash');

module.exports = (done) => {
  const Herbarium = keystone.list('Herbarium');
  const Garden = keystone.list('Garden');
  const Museum = keystone.list('Museum');

  const gardens = SeedHelpers.getGargenFromDataSheet();
  const herbariums = SeedHelpers.getHerbariumFromDataSheet();
  const museums = SeedHelpers.getMuseumFromDataSheet();

  const Plant = keystone.list('Plant');


  const insertToDB = new Promise(async (resolve, reject) => {
    const plants = await Plant.model.find({});

    await Herbarium.model.create(herbariums.filter((herb) => {
      const plant = _.findLast(plants, { scientificName: herb.scientificName });
      if (plant) {
        herb.plantId = plant._id;
      }
      if (herb.collectedDate.toString() === 'Invalid Date') {
        herb.collectedDate = undefined;
      }
      return plant;
    }));

    await Museum.model.create(museums.filter((museum) => {
      const plant = _.findLast(plants, { scientificName: museum.scientificName });
      if (plant) {
        museum.plantId = plant._id;
      }
      return plant;
    }));

    await Garden.model.create(gardens.filter((garden) => {
      const plant = _.findLast(plants, { scientificName: garden.scientificName });
      if (plant) {
        garden.plantId = plant._id;
      }
      return plant;
    }));
    resolve();
  });


  insertToDB.then(() => done());
};

