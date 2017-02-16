var keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var PlantCategory = new keystone.List('PlantCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

PlantCategory.add({
	name: { type: String, required: true, unique: true },
	image: { type: Types.CloudinaryImage },
});

PlantCategory.relationship({ ref: 'Plant', path: 'category' });

PlantCategory.register();

export default PlantCategory;
