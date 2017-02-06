import _ from 'lodash';
export function extractLocation (document, sheetIndex) {

	// find ref columns index
	const sheet = document[sheetIndex];
	const indexOfColumns = _.flatten(sheet.data
														.filter((r, i) => {
															return i === 0;
														}))
														.indexOf('สถานที่')

		if(indexOfColumns) {
			const result = sheet.data.filter((r,i) => i > 0).map( (cols, i) => {
				return cols[indexOfColumns];
			});

			// unique word by sum char code
			return _.uniqBy(result, function(str){
				return _.sumBy(str.split(''), function(item) {

				})
			});
		} else {
			return [];
		}

		 

	// return references
	// 				.map((item, i) => {
	// 					return {

	// 					}
	// 				});
}