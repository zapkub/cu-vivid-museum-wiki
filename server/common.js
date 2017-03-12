const _ = require('lodash');
const mongoose = require('mongoose');

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

exports.addRelationWith = (TC, fieldName, targetName, relateTC) => {
  TC.addRelation(fieldName, () => ({
    resolver: relateTC.getResolver('findById'),
    args: {
      _id: source => source[targetName],
    },
    projection: { [targetName]: 1 },
  }));
  return TC;
};

exports.createStringMatchFilter = TC => ({
  name: 'search',
  type: '[String]',
  query: (query, arg) => {
    const fields = TC.getFieldNames();
    query.$or = [];
    const test = new RegExp(arg.join('|'), 'i');
    fields.forEach((field) => {
      const type = TC.getFieldType(field).toString();
      if (type === 'String') {
        query.$or.push({ [field]: test });
      }
      arg.forEach((text) => {
        if (type === 'MongoID' && mongoose.Types.ObjectId.isValid(text)) {
          query.$or.push({ [field]: text });
        }
      });
    });
  },
})
;
