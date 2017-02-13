import XLSX from 'node-xlsx';
import path from 'path';
import moment from 'moment';
import _ from 'lodash';
import Plant from '../../models/Plant';
import PlantCategory from '../../models/PlantCategory';
import Location from '../../models/Location';

const herbariumSheet = XLSX.parse(path.join(__dirname, '../../../seed/Herbarium.xlsx'));
const gardenSheet = XLSX.parse(path.join(__dirname, '../../../seed/Garden.xls'));


function parseDate(str) {
	try {
		return moment(str, 'DD-MMM-YYYY').toDate();
	} catch (e) {
		return undefined;
	}
}

function letterToColumns(input) {
	return input.charCodeAt(0) - 65;
}

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
			displayLocation: columns[letterToColumns('J')],
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
		};
	});

const items = [...herbs ];

function createItem(plants, done) {
	PlantCategory.model.find({}).exec((err, result) => {
		const herbariumCategoryId = _.find(result, {
			name: 'Herbarium',
		});
		const gardenCategoryId = _.find(result, {
			name: 'Garden',
		});
		const museumCategoryId = _.find(result, {
			name: 'Museum',
		});

		Location.model.find({}).exec((err, locationResult) => {
			Plant.model.create(plants.map((plant) => {
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
				plant.displayLocation = [_.find(locationResult, plant.displayLocation)];
				return plant;
			}), (err, result) => {
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
