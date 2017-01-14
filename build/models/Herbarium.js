'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var keystone = require('keystone');

var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Herbarium', {
	autokey: { from: 'name', path: 'key' },
	defaultSort: '-cuid'
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
	note: { type: String }
});

Gallery.getLatestByPage = function (args) {
	return new Promise(function (resolve, reject) {
		Gallery.paginate({
			page: args.page || 0,
			perPage: args.limit || 10
		}).exec(function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

Gallery.register();
exports.default = Gallery;
//# sourceMappingURL=Herbarium.js.map