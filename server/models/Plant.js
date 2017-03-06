// eslint "no-param-reassign": "off"

const keystone = require('keystone');
const composeWithMongoose = require('graphql-compose-mongoose').default;
const { TypeComposer, InputTypeComposer } = require('graphql-compose');
const { GraphQLEnumType, GraphQLList } = require('graphql');

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
  name: { type: String, label: 'ชื่อ อังกฤษ' },
  localName: { type: String, label: 'ชื่อไทย' },
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

Plant.defaultColumns = 'localName, scientificName, family';
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

// Nested displayLocation
PlantTC.removeField('displayLocation');
PlantTC.addRelation('displayLocation', () => ({
  resolver: require('./Location').LocationTC.getResolver('findById'),
  args: {
    _id: source => source.displayLocation,
  },
  projection: { displayLocation: 1 },
}));

// Resolve placeholder image
TypeComposer.create(`
  type PlantImages { secure_url: String, url: String, public_id: String }
`);

PlantTC.removeField('images');
PlantTC.addFields({
  thumbnailImage: {
    type: 'PlantImages',
    resolve: (source, args, { cl }) => {
      if (source.images.length === 0) {
        return { secure_url: 'http://placehold.it/150x150' };
      }
      // resize image for thumbnail
      return Object.assign(source.images[0],
        {
          secure_url: cl.url(source.images[0].public_id,
            {
              gravity: 'center',
              height: 150,
              width: 150,
              crop: 'fill',
            }),
        });
    },
    projection: { images: 1 },
  },
  images: {
    type: '[PlantImages]',
    resolve: (source, args, { cl }) => {
      if (source.images.length === 0) {
        return [{ secure_url: 'http://placehold.it/150x150' }];
      }
      return source.images.map((image) => {
        image.url = cl.url(image.public_id);
        return image;
      });
    },
  },
});


const searchFieldsInputType = InputTypeComposer.create(`
    input SearchFieldsWithTexts {
      texts: [String]!
    }
  `);

searchFieldsInputType.addFields({
  fields: {
    type: new GraphQLList(new GraphQLEnumType({
      name: 'AvaiableSearchFields',
      values: {
        localName: { value: 'localName' },
        name: { value: 'name' },
        scientificName: { value: 'scientificName' },
      },
    })),
  },
});

PlantTC.setResolver('findMany', PlantTC.getResolver('findMany')
.addSortArg({
  name: 'PUBLISH_DATE_DESC',
  description: 'Sort by publish date.',
  value: { publishedDate: -1 },
})
.addFilterArg({
  name: 'searchFieldsWithTexts',
  type: searchFieldsInputType,
  description: 'Search with text match in array',
  query: (rawQuery, { texts, fields }) => {
    const test = new RegExp(texts.join('|'), 'i');
    rawQuery.$or = [];
    fields.forEach((field) => {
      switch (Plant.model.schema.paths[field].instance) {
        case 'String':
          rawQuery.$or.push({ [field]: test });
          break;
        case 'Array':
          rawQuery.$or.push({ [field]: { $in: [test] } });
          break;
        default:
          break;
      }
    });
  },
}));

exports.PlantTC = PlantTC;

