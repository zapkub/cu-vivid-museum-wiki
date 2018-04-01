// const XLSX = require('node-xlsx').default;
// const path = require('path');
// const keystone = require('keystone');

// const Reference = keystone.list('Reference');

// const refSheet = XLSX.parse(path.join(__dirname, '../../seed/garden.xls'));

// function createItem(references, done) {
//   Reference.model.create(references.map(item => ({
//     name: item,
//   })), (err) => {
//     if (err) {
//       console.log(err);
//     }
//     done();
//   });
// }

module.exports = (done) => {
  done()
  // const references = refSheet[2].data.filter((item, i) => i > 0).map((columns) => {
  //   const subString = columns[0].split('.').filter((str, i) => i > 0);
  //   return subString;
  // });
  // createItem(references, done);
}
