const XLSX = require('node-xlsx').default;
const path = require('path');
const _ = require('lodash');

const gardenSheet = XLSX.parse(path.join(__dirname, './garden.xlsx'));
const herbariumnSheet = XLSX.parse(path.join(__dirname, './herbarium.xlsx'));

let amount = 999999999;
exports.setAmount = function setAmount (_amount) {
    amount = _amount;
}

function normailizeScientificName(name) {
    return name.replace(new RegExp(/\./, 'i'), '');
}

exports.getPlantFromDataSheet = () => {
    const scientificNamesFromHerbarium = herbariumnSheet[0].data
        .filter((item, i) => i > 0 && i < amount)
        .filter((item) => item[4])
        .map(item => ({
            scientificName: normailizeScientificName(item[4]),
            familyName: item[8],
            name: item[5] || item[6]
        }));
    const scientificNamesFromGarden = gardenSheet[0].data
        .filter((item, i) => i > 0 && i < amount)
        .filter(item => item[1])
        .map(item => ({
            scientificName: normailizeScientificName(item[1]),
            familyName: item[2],
            name: item[0],
        }))

    const scientificNames = _.union(scientificNamesFromGarden, scientificNamesFromHerbarium);
    return _.uniqBy(scientificNames, item => item.scientificName);
}

exports.getMuseumFromDataSheet = () => {
    const museums = gardenSheet[1].data
        .filter((item, i) => i > 0 && i < amount)
        .filter(item => item[2])
        .map(item => ({
            scientificName: normailizeScientificName(item[2]),
            museumLocation: item[3],
        }));
    return museums;
}

exports.getGardenFromDataSheet = () => {
    const gardens = gardenSheet[2].data
        .filter((item, i) => i > 0 && item[0] && i < amount)
        .map(item => ({
            zone: item[2],
            scientificName: normailizeScientificName(item[0]),
        }));
    return gardens;
}

exports.getHerbariumFromDataSheet = () => {
    const herbariums = herbariumnSheet[0].data
        .filter((item, i) => i > 0 && i < amount)
        .filter(item => item[4])
        .map(item => ({
            scientificName: normailizeScientificName(item[4]),
            discoverLocation: item[12],
            displayLocation: 'ตู้ ' +item[1] + ' ช่อง ' + item[2],
            cuid: item[0],
            collectedDate: new Date(item[15]),
            collector: item[10],
        }))
    return herbariums;
}