var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var PlantCategory = new keystone.List('PlantCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

PlantCategory.add({
	name: { type: String, required: true },
});

PlantCategory.relationship({ ref: 'Plant', path: 'category' });

PlantCategory.register();
