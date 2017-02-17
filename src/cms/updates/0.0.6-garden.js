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

const gardens = gardenSheet[0]
	.data
	.filter((item, i) => i > 0 && item[letterToColumns('E')])
	.map((columns, i) => {
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
			name: columns[letterToColumns('B')] || 'ไม่ระบุ',
			localName: columns[letterToColumns('C')],
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
					case 'garden':
						plant.category = [gardenCategoryId];
						break;
					case 'museum':
						plant.category = [museumCategoryId];
						break;
					default:
						break;
				}
				plant.displayLocation = [];
				if(_.find(locationResult, plant.displayLocation)) {
					plant.displayLocation.push(_.find(locationResult, plant.displayLocation));
				}

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
