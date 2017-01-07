import XLSX from 'node-xlsx';
import backup from 'mongodb-backup';
import path from 'path';
import mongoose from 'mongoose';
import Logdown from 'logdown';

import Herbarium from '../src/models/herbarium';
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
// const herbs = herbariumSheet[0].data.filter((item, i) => i > 0).map(
//     (columns, index) => {
//         return {
//             cuid: columns[0],
//             name: columns[5],
//             blockNo: columns[1],
//             slotNo: columns[2],
//             labelNo: columns[3],
//             scientificName: columns[4],
//             collector_th: columns[10],
//             collector_en: columns[9],

//             duplicateAmount: columns[7],
//             family: columns[8],
//             locationName: columns[12],
//             habit: columns[13],
//             altitue: columns[14],
//             date: parseDate(columns[15]),
//             note: columns[16],
//         }
//     }
// );

// Herbarium.collection.insert(herbs, (err, docs) => {
//     if (err) logger.error(err);
//     logger.info('done');
// });