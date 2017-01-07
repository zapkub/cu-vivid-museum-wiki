var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Museum', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Gallery.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	images: { type: Types.CloudinaryImages },
	cuid: { type: String },
	blockNo: { type: Number },
	slotNo: { type: String },
	scientificName: { type: String },
	localName: { type: String },
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
