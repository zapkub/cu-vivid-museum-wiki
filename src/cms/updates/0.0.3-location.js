import XLSX from 'node-xlsx';
import path from 'path';
import { extractLocation } from '../common';

import Location from '../../models/Location';

const refSheet = XLSX.parse(path.join(__dirname, '../../../seed/Garden.xls'));


function createItem(locations, done) {
	Location.model.create(locations.map((item) => {
		return {
			name: item.trim(),
            label: item.trim(),
            description: '',
		};
	}), (err) => {
		if (err) {
			console.log(err);
		}
		done();
	});
}

exports = module.exports = (done) => {
	const locationList = extractLocation(refSheet, 0);
	createItem(locationList, done);
};


// exports.create = {
//     Location: [
//         {
//             name: 'หน้าตึก',
//         },
//         {
//             name: 'ข้างห้องสมุด',
//         },
//         {
//             name: 'สวน',
//         },
//         {
//             name: 'น้ำพุ',
//         },
//         {
//             name: 'หน้าตึกธุรการ',
//         },
//         {
//             name: 'ศูนย์คอม-ตึก 80 ปี',
//         },
//         {
//             name: 'ข้างสนามบาส',
//         },
//         {
//             name: 'ถ.พญาไท',
//         },
//         {
//             name: 'บ่อหน้าตึก',
//         },
//         {
//             name: 'ลานจอดรถ',
//         },
//         {
//             name: 'สนามบาส',
//         }
//     ]
// };
