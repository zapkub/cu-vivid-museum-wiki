const XLSX = require('node-xlsx').default;
const path = require('path');
const { extractLocation } = require('../common');
const keystone = require('keystone');

const Location = keystone.list('Location');
const refSheet = XLSX.parse(path.join(__dirname, '../../seed/Garden.xls'));


function createItem(locations, done) {
  Location.model.create(locations.map(item => ({
    name: item.trim(),
    label: item.trim(),
    description: '',
  })), (err) => {
    if (err) {
      console.log(err);
    }
    done();
  });
}

module.exports = (done) => {
  const locationList = extractLocation(refSheet, 0);
  createItem(locationList, done);
};
