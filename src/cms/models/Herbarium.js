let keystone = require('keystone');
let Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

let Gallery = new keystone.List('Herbarium', {
	autokey: { from: 'name', path: 'key' },
	defaultSort: '-cuid',
});

Gallery.add({
	cuid: { type: String },
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	images: { type: Types.CloudinaryImages },

	blockNo: { type: Number },
	slotNo: { type: String },
	scientificName: { type: String },
	otherName: { type: String },
	duplicateAmount: { type: Number, default: 0 },
	family: { type: String },
	collector_en: { type: String },
	collector_th: { type: String },
	locationName: { type: String },
	habit: { type: String },
	altitude: { type: String },
	date: { type: Date },
	note: { type: String },
});

Gallery.register();
