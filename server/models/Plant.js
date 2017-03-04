const keystone = require('keystone');
const mongoose = require('mongoose');
const composeWithMongoose = require('graphql-compose-mongoose').default;

const Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

const Plant = new keystone.List('Plant', {
  defaultSort: '-cuid',
  map: { name: 'scientificName' },
});

Plant.add({
  cuid: { type: String },
  name: { type: String, required: true, label: 'ชื่อไทย', default: 'ไม่ระบุ' },
  localName: { type: String, label: 'ชื่อท้องถิ่น' },
  otherName: { type: Types.TextArray },
  scientificName: { type: String, label: 'ชื่อวิทยาศาสตร์' },
  synonym: { type: String },
  family: { type: String, label: 'ชื่อวงศ์' },
  new_family: { type: String, label: 'Family (ใหม่)' },
  type: { type: String, label: 'ประเภท' },
  display: { type: Types.Select, label: 'ส่วน', options: 'Other, Fungi, Seed, Mineral, Fruit, Miscellaneous, Bark, Animal, Flower, Leaf' },

  category: { type: Types.Relationship, ref: 'Category', many: true, label: 'ชนิด' },
  displayLocation: { type: Types.Relationship, ref: 'Location', label: 'สถานที่จัดแสดง', many: false },

  recipe: { type: String, label: 'วิธีการได้มา' },
  property: { type: String },
  localProperty: { type: String, label: 'สรรพคุณพื้นบ้าน' },
  minorBenefit: { type: String, label: 'สรรพคุณประโยชน์อื่นๆ' },
  anatomy: { type: Types.TextArray, label: 'ลักษณะทางวิทยาศาสตร์' },
  toxicDetail: { type: String, label: 'ความเป็นพิษ' },
  adr: { type: String },
  publishedDate: { type: Date, default: Date.now },
  duplicateAmount: { type: Number, default: 0 },
  caution: { type: String, label: 'ข้อห้ามใช้' },
  warning: { type: String, label: 'ข้อควรระวังอื่น' },
  images: { type: Types.CloudinaryImages },

  characteristic: { type: String, label: 'ความแตกต่างของพืชสมุนไพร' },

  habit: { type: String },
  altitude: { type: String },
  collector_en: { type: String },
  collector_th: { type: String },
  chem_structure: { type: String, label: 'ส่วนประกอบทางเคมี' },
  prod_dev: { type: String, label: 'Product Development' },
  slotNo: { type: String, label: 'Museum location' },
  blockNo: { type: Number },
  donor: { type: String, label: 'Donor' },
  note: { type: String },
  discoverLocation: { type: String, label: 'สถานที่ค้นพบ' },
  reference: { type: Types.Relationship, ref: 'Reference', label: 'อ้างอิง', many: true },

});
Plant.searchByText = async (args) => {
  const searchWord = new RegExp(args.text, 'i');
  return new Promise((resolve, reject) => {
    Plant.paginate({
      page: args.page || 1,
      perPage: 20,
    })
            .find({
              $or: [
                    { family: searchWord },
                    { localName: searchWord },
                    { otherName: searchWord },
                    { scientificName: searchWord },
                    { synonym: searchWord },
                    { name: searchWord },
                    { new_family: searchWord },
              ],
            })
            .sort('-_id')
            .where('category')

            .populate('displayLocation')
            .in(args.categories.map(_id => mongoose.Types.ObjectId(_id)))
            .exec((err, data) => {
              if (err) {
                reject(err);
              }
              resolve(data);
            });
  });
};

Plant.getLatestByPage = args => new Promise((resolve, reject) => {
  Plant
        .paginate({
          page: args.page || 0,
          perPage: args.limit || 10,
        })
        .sort('-_id')
        .exec((err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
});


Plant.defaultColumns = 'name, cuid, scientificName';
Plant.register();

const PlantTC = composeWithMongoose(Plant.model, {
  resolvers: {
    findMany: {
      sort: true,
      skip: true,
      limit: {
        defaultValue: 100,
      },
    },
  },
});

PlantTC.setResolver('findMany', PlantTC.getResolver('findMany').addSortArg({
  name: 'PUBLISH_DATE_DESC',
  description: 'Sort by publish date.',
  value: { publishedDate: -1 },
}));

exports.PlantTC = PlantTC;

