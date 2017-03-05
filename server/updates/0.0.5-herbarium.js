const XLSX = require('node-xlsx').default;
const path = require('path');
const keystone = require('keystone');
const _ = require('lodash');

const Plant = keystone.list('Plant');
const PlantCategory = keystone.list('Category');
const Location = keystone.list('Location');
const herbariumSheet = XLSX.parse(path.join(__dirname, '../../seed/Herbarium.xlsx'));


function letterToColumns(input) {
  return input.charCodeAt(0) - 65;
}

const herbs = herbariumSheet[0]
.data
.filter((item, i) => i > 0 && item[letterToColumns('E')])
.filter(item => item[letterToColumns('F')])
.map(columns => ({
  cuid: columns[letterToColumns('A')],
  localName: columns[letterToColumns('F')],
  otherName: columns[letterToColumns('G')] ? columns[letterToColumns('G')].split(';') : [],
  duplicateAmount: columns[letterToColumns('H')],
  scientificName: columns[letterToColumns('E')],
  family: columns[letterToColumns('I')],
  habit: columns[letterToColumns('N')],
  altitude: columns[letterToColumns('O')],
  collector_en: columns[letterToColumns('J')],
  collector_th: columns[letterToColumns('K')],
  collector_no: columns[letterToColumns('L')],
  note: columns[letterToColumns('Q')],
  blockNo: columns[letterToColumns('B')],
  slotNo: columns[letterToColumns('C')],
  category: 'herbarium',
}));

const items = [...herbs];

function createItem(plants, done) {
  PlantCategory.model.find({}).exec((findError, result) => {
    const herbariumCategoryId = _.find(result, {
      name: 'Herbarium',
    });
    const gardenCategoryId = _.find(result, {
      name: 'Garden',
    });

    Location.model.find({}).exec(() => {
      Plant.model.create(plants.map((data) => {
        const plant = Object.assign(data, {});
        switch (plant.category) {
          case 'herbarium':
            plant.category = [herbariumCategoryId];
            break;
          case 'garden':
            plant.category = [gardenCategoryId];
            break;
          default:
            break;
        }
        return plant;
      }), (createError) => {
        if (createError) {
          console.log(createError);
        }
        done(createError);
      });
    });
  });
}


module.exports = function (done) {
  createItem(items, done);
};
