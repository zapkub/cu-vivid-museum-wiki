const keystone = require('keystone');
const composeWithMongoose = require('graphql-compose-mongoose').default;

const Types = keystone.Field.Types;
const PlantCategory = new keystone.List('Category', {
  autokey: { from: 'name', path: 'key', unique: true },
});

PlantCategory.add({
  name: { type: String, required: true, unique: true },
  thumbnailImage: { type: Types.CloudinaryImage },
  heroImage: { type: Types.CloudinaryImage },
});

PlantCategory.relationship({ ref: 'Plant', path: 'category' });
PlantCategory.register();

const CategoryTC = composeWithMongoose(PlantCategory.model, {

});
CategoryTC.addFields({
  heroImageURL: {
    type: 'String',
    resolve: (source) => {
      if (!source.heroImage) {
        return null;
      }
      return source.heroImage.url;
    },
  },
});
CategoryTC.get('$findMany').removeArg('filter');
CategoryTC.get('$findMany').removeArg('limit');
CategoryTC.get('$findMany').removeArg('skip');
CategoryTC.get('$findMany').removeArg('sort');


exports.CategoryTC = CategoryTC;
