
import XLSX from 'node-xlsx';
import backup from 'mongodb-backup';
import path from 'path';
import mongoose from 'mongoose';
import Logdown from 'logdown';
import moment from 'moment';
import _ from 'lodash';

const logger = new Logdown({ prefix: 'Seed' });
const herbariumSheet = XLSX.parse(path.join(__dirname, './Herbarium.xlsx'));
const gardenSheet = XLSX.parse(path.join(__dirname, './Garden.xls'));

require('dotenv').config({ path: path.join(__dirname, '../.env') });
logger.info(`connect to db ${process.env.MONGO_URI}`);
mongoose.connect(`mongodb://${process.env.MONGO_URI}/cms`);
const plantSchema = new mongoose.Schema({}, { strict: false });
const plantCategorySchema = new mongoose.Schema({ name: String });
const PlantCategory = mongoose.model('PlantCategory', plantCategorySchema);
const Plant = mongoose.model('Plant', plantSchema);

const category = PlantCategory.find({}, function (err, result) {

    const herbariumCategoryId = _.find(result, { name: 'Herbarium' })
    const gardenCategoryId = _.find(result, { name: 'Garden' })
    const museumCategoryId = _.find(result, { name: 'Museum' })

    const gardens = gardenSheet[0]
        .data
        .filter((item, i) => i > 0)
        .map((columns, i) => {
            return {
                category: [gardenCategoryId._id],
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
    const herbs = herbariumSheet[0]
        .data
        .filter((item, i) => i > 0)
        .map((columns, index) => {
            return {
                category: [herbariumCategoryId._id],
                cuid: columns[letterToColumns('A')],
                name: columns[letterToColumns('B')],
                localName: columns[letterToColumns('F')],
                otherName: columns[letterToColumns('G')] ? columns[letterToColumns('G')].split(';') : [],
                duplicateAmount: columns[letterToColumns('H')],
                scientificName: columns[letterToColumns('E')],
                family: columns[letterToColumns('I')],
                locationName: columns[letterToColumns('M')],
                display: columns[letterToColumns('K')],
                habit: columns[letterToColumns('N')],
                altitude: columns[letterToColumns('O')],
                collector_en: columns[letterToColumns('J')],
                collector_th: columns[letterToColumns('K')],
                collector_no: columns[letterToColumns('L')],
                note: columns[letterToColumns('Q')],
                blockNo: columns[letterToColumns('B')],
                slotNo: columns[letterToColumns('C')],
                collection: 'Herbarium'
            }
        });

    Plant.collection.insert([...gardens, ...herbs], (err, docs) => {
        if (err) logger.error(err);
        logger.info('done');
    });
});


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







