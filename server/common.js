const _ = require('lodash');

exports.getReference = function getReference() {
  return {
  };
};
exports.extractLocation = function extractLocation(document, sheetIndex) {
// find ref columns index
  const sheet = document[sheetIndex];
  const columns = sheet.data.filter((r, i) => i === 0)[0];
  const indexOfColumns = columns.indexOf('สถานที่');

  if (indexOfColumns) {
    const result = sheet.data.filter((r, i) => i > 0).map((cols, i) => cols[indexOfColumns]);
    return _.uniq(result.filter(item => item));
  }
  return [];
};
