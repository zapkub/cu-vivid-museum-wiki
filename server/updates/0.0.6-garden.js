const XLSX = require('node-xlsx').default;
const path = require('path');
const keystone = require('keystone');
const _ = require('lodash');

const Plant = keystone.list('Plant');
const PlantCategory = keystone.list('Category');
const Location = keystone.list('Location');

const gardenSheet = XLSX.parse(path.join(__dirname, '../../seed/Garden.xls'));


function letterToColumns(input) {
  return input.charCodeAt(0) - 65;
}

const gardens = gardenSheet[0]
	.data
	.filter((item, i) => i > 0 && item[letterToColumns('E')])
	.map((columns) => {
  const anatomy = [];
  if (columns[letterToColumns('Q')]) {
    anatomy.push(columns[letterToColumns('Q')]);
  }
  if (columns[letterToColumns('P')]) {
    anatomy.push(columns[letterToColumns('P')]);
  }
  if (columns[letterToColumns('R')]) {
    anatomy.push(columns[letterToColumns('R')]);
  }

  return {
    name: columns[letterToColumns('C')],
    localName: columns[letterToColumns('B')],
    otherName: columns[letterToColumns('D')] ? columns[letterToColumns('D')].split(';') : [],
    scientificName: columns[letterToColumns('E')],
    synonym: columns[letterToColumns('F')],
    family: columns[letterToColumns('G')],
    new_family: columns[letterToColumns('H')],
    type: columns[letterToColumns('I')],
    locationName: columns[letterToColumns('J')],
    display: columns[letterToColumns('K')] ? _.capitalize(columns[letterToColumns('K')]) : null,
    recipe: columns[letterToColumns('L')],
    property: columns[letterToColumns('M')],
    localProperty: columns[letterToColumns('N')],
			// minorBenefit: columns[2],
    locationString: columns[9],
    anatomy,
			// toxicDetail: columns[2],
			// adr: columns[2],
    category: columns[letterToColumns('Z') + 1] ? 'garden' : 'museum',
			// caution: columns[2],
			// warning: columns[2],
			// characteristic: columns[2],
			// chem_structure: columns[2],
			// prod_dev: columns[2],
    slotNo: columns[letterToColumns('Z') + 1],
			// reference: columns[],
			// herbarium_location: columns[2],
			// donor: columns[2],
  };
});

const items = [...gardens];

function createItem(plants, done) {
  PlantCategory.model.find({}).exec((plantQueryError, result) => {
    const gardenCategoryId = _.find(result, {
      name: 'Garden',
    });
    const museumCategoryId = _.find(result, {
      name: 'Museum',
    });

    Location.model.find({}).exec((locationQueryError, locationResult) => {
      Plant.model.create(plants.map((data) => {
        const plant = Object.assign({}, data);
        switch (plant.category) {
          case 'garden':
            plant.category = [gardenCategoryId];
            break;
          case 'museum':
            plant.category = [museumCategoryId];
            break;
          default:
            break;
        }

        if (plant.locationString) {
          const locationObject = _.findLast(locationResult, (location => location.name === plant.locationString.trim()));
          if (locationObject) {
            plant.displayLocation = locationObject.id;
          }
        }


        return plant;
      }), (err) => {
        if (err) {
          console.log(err);
        }
        done(err);
      });
    });
  });
}


exports = module.exports = function (done) {
  createItem(items, done);
};
