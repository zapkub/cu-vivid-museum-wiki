
import XLSX from 'node-xlsx';
import path from 'path';
import moment from 'moment';
import _ from 'lodash';
import Plant from '../../models/Plant';
import PlantCategory from '../../models/PlantCategory';

const herbariumSheet = XLSX.parse(path.join(__dirname, '../../../seed/Herbarium.xlsx'));
const gardenSheet = XLSX.parse(path.join(__dirname, '../../../seed/Garden.xls'));



function parseDate(str) {
    try {
        return moment(str, "DD-MMM-YYYY").toDate();
    } catch (e) {
        return undefined;
    }
}

function letterToColumns(input) { return input.charCodeAt(0) - 65; }

const gardens = gardenSheet[0]
.data
.filter((item, i) => i > 0)
.map((columns, i) => {
    return {
        name: columns[letterToColumns('B')] || 'ไม่ระบุ',
        localName: columns[letterToColumns('C')],
        otherName: columns[letterToColumns('D')] ? columns[letterToColumns('D')].split(';') : [],
        scientificName: columns[letterToColumns('E')],
        synonym: columns[letterToColumns('F')],
        family: columns[letterToColumns('G')],
        new_family: columns[letterToColumns('H')],
        type: columns[letterToColumns('I')],
        // locationName: columns[letterToColumns('J')],
        display: columns[letterToColumns('K')],
        recipe: columns[letterToColumns('L')],
        property: columns[letterToColumns('M')],
        localProperty: columns[letterToColumns('N')],
        // minorBenefit: columns[2],
        anatomy: [columns[letterToColumns('Q')], columns[letterToColumns('R')]],
        // toxicDetail: columns[2],
        // adr: columns[2],
        category: 'garden',
        // caution: columns[2],
        // warning: columns[2],

        // characteristic: columns[2],

        // chem_structure: columns[2],
        // prod_dev: columns[2],
        slotNo: columns[letterToColumns('Z') + 1],
        // reference: columns[],
        // herbarium_location: columns[2],
        // donor: columns[2],
    }
});
const herbs = herbariumSheet[0]
.data
.filter((item, i) => i > 0)
.map((columns, index) => {
    return {
        cuid: columns[letterToColumns('A')],
        name: columns[letterToColumns('F')] || 'ไม่ระบุ',
        localName: columns[letterToColumns('F')],
        otherName: columns[letterToColumns('G')] ? columns[letterToColumns('G')].split(';') : [],
        duplicateAmount: columns[letterToColumns('H')],
        scientificName: columns[letterToColumns('E')],
        family: columns[letterToColumns('I')],
        // locationName: columns[letterToColumns('M')],
        // display: columns[letterToColumns('K')],
        habit: columns[letterToColumns('N')],
        altitude: columns[letterToColumns('O')],
        collector_en: columns[letterToColumns('J')],
        collector_th: columns[letterToColumns('K')],
        collector_no: columns[letterToColumns('L')],
        note: columns[letterToColumns('Q')],
        blockNo: columns[letterToColumns('B')],
        slotNo: columns[letterToColumns('C')],
        category: 'herbarium',
    }
});

const items = [...herbs, gardens];

function createItem(plants, done) {
    const locations = extractLocation(gardenSheet, 0);

    PlantCategory.model.find({}).exec(function(err, result) {
        const herbariumCategoryId = _.find(result, { name: 'Herbarium' });
        const gardenCategoryId = _.find(result, { name: 'Garden' });
        const museumCategoryId = _.find(result, { name: 'Museum' });

        Plant.model.create(plants.map(plant => {
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
        }), function(err, result){
            if(err) {
                console.log(err);
            }
            done(err);
        });
    });


}


exports = module.exports = function(done) {
    createItem(items, done);
}