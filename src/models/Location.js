const keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

const Location = new keystone.List('Location', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Location.add({
	name: { type: String, required: true, unique: true },
	label: { type: String },
	description: { type: String, required: false },
});

Location.relationship({ ref: 'Plant', path: 'locationName' });

Location.register();

export default Location;
