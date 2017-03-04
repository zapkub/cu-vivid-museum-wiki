const keystone = require('keystone');

const Types = keystone.Field.Types;

const HeroImage = new keystone.List('HeroImage');

HeroImage.add({
  image: { type: Types.CloudinaryImage },
  name: { type: String },
});

HeroImage.register();
