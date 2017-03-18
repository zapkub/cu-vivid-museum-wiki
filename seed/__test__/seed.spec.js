const { expect } = require('chai');
const SeedHelpers = require('../index');

describe('Seed resource test', () => {
  it('Should get plant object from sheet as expect', () => {
    const plants = SeedHelpers.getPlantFromDataSheet();
    expect(plants).to.be.instanceof(Array);
    expect(plants).to.have.length(3663);
  });
  it('Should get Herbarium from sheet correctly', () => {
    const Herbariums = SeedHelpers.getHerbariumFromDataSheet();
    expect(Herbariums).to.be.instanceof(Array);
    expect(Herbariums).to.have.length(6580);
  });
  it('Should get Mesuem items from sheet correctly', () => {
    const Museums = SeedHelpers.getMuseumFromDataSheet();
    expect(Museums).to.be.instanceof(Array);
  });
  it('Should get Gardens item from sheet correctly', () => {
    const Gardens = SeedHelpers.getGardenFromDataSheet();
    expect(Gardens).to.be.instanceof(Array);
  });
});

