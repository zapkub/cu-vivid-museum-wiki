const _ = require('lodash');
const mongoose = require('mongoose');

exports.getReference = function getReference() {
  return {
  };
};
exports.scientificSplit = function scientificSplit(input) {
  const name = input.match(/^[a-zA-Z]+(\s|\ )[a-zA-Z]+/, 'g');
  if (!name) return input;
  if (name.length === 0) return input;
  return name[0];
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
exports.addScientificNameSearch = (TC) => {
  TC.getResolver('findOne')
    .addArgs({
      key: { type: 'String' },
    });
  TC.setResolver('findOne', TC.getResolver('findOne')
    .wrapResolve(next => async (rp) => {
      const result = await rp.context.Plant.findOne({ $or: [{ key: rp.args.key }] });
      if (result) {
        rp.args.filter = Object.assign({ plantId: result._id.toString() }, rp.args.filter) // eslint-disable-line
      }
      return next(rp);
    }));
};
exports.createStringMatchFilter = TC => ({
  name: 'search',
  type: '[String]',
  query: (query, arg) => {
    const fields = TC.getFieldNames();
    query.$or = []; // eslint-disable-line
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
