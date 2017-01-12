
import XLSX from 'node-xlsx';
import backup from 'mongodb-backup';
import path from 'path';
import mongoose from 'mongoose';
import Logdown from 'logdown';
import moment from 'moment';

const logger = new Logdown({ prefix: 'Seed' });
const herbariumSheet = XLSX.parse(path.join(__dirname, './Herbarium.xlsx'));
const gardenSheet = XLSX.parse(path.join(__dirname, './Garden.xls'));

require('dotenv').config({ path: path.join(__dirname, '../.env') });
logger.info(`connect to db ${process.env.MONGO_URL}`);
mongoose.connect(process.env.MONGO_URL);

/**
 * Backup DB before re-seeding
 * data from excel
 */

// backup({
//   uri: process.env.MONGO_URL, // mongodb uri
//   root: path.join(__dirname, `/__backup__/${}`),
// });


/**
 * Herbarium parse
 * columns list
 * 1. cuid
 * 2. blockNo
 * 3. slotNo
 * 4. labelNo
 * 5. scientificName
 * 6. name
 * 7. otherName
 * 8. duplicateAmount
 * 9. family
 * 10. collector_en
 * 11. collector_th
 * 12. collector_no
 * 13. locationName
 * 14. habit
 * 15. altitude
 * 16. date
 * 17. note 
 */
function parseDate(str) {
    try {
        return moment(str, "DD-MMM-YYYY").toDate();
    } catch (e) {
        return undefined;
    }
}

function letterToColumns(input) { return input.charCodeAt(0) - 65; }

const gardens = gardenSheet[0].data
    .filter((item, i) => i > 0)
    .map(
    (columns, i) => {
        return {
            name: columns[letterToColumns('B')],
            localName: columns[letterToColumns('C')],
            otherName: columns[letterToColumns('D')] ? columns[letterToColumns('D')].split(';') : [],
            scientificName: columns[letterToColumns('E')],
            synonym: columns[letterToColumns('F')],
            family: columns[letterToColumns('G')],
            new_family: columns[letterToColumns('H')],
            type: columns[letterToColumns('I')],
            locationName: columns[letterToColumns('J')],
            display: columns[letterToColumns('K')],
            recipe: columns[letterToColumns('L')],
            property: columns[letterToColumns('M')],
            localProperty: columns[letterToColumns('N')],
            // minorBenefit: columns[2],
            anatomy: [columns[letterToColumns('Q')], columns[letterToColumns('R')]],
            // toxicDetail: columns[2],
            // adr: columns[2],

            // caution: columns[2],
            // warning: columns[2],

            // characteristic: columns[2],

            // chem_structure: columns[2],
            // prod_dev: columns[2],
            slotNo: columns[letterToColumns('Z') + 1],
            // herbarium_location: columns[2],
            // donor: columns[2],
        }
    });

const gardenSchema = new mongoose.Schema({}, { strict: false});
const Garden = mongoose.model('Garden', gardenSchema);

Garden.collection.insert(gardens, (err, docs) => {
    if (err) logger.error(err);
    logger.info('done');
});

const herbs = herbariumSheet[0].data.filter((item, i) => i > 0).map(
    (columns, index) => {
        return {
            cuid: columns[0],
            name: columns[5],
            blockNo: columns[1],
            slotNo: columns[2],
            labelNo: columns[3],
            scientificName: columns[4],
            collector_th: columns[10],
            collector_en: columns[9],

            duplicateAmount: columns[7],
            family: columns[8],
            locationName: columns[12],
            habit: columns[13],
            altitue: columns[14],
            date: parseDate(columns[15]),
            note: columns[16],
        }
    }
);

const herbSchema = new mongoose.Schema({}, { strict: false});
const Herbarium = mongoose.model('Herbarium', herbSchema);
Herbarium.collection.insert(herbs, (err, docs) => {
    if (err) logger.error(err);
    logger.info('done');
});