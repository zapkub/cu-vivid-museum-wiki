const keystone = require('keystone');

const Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

const Gallery = new keystone.List('Herbarium', {
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

Gallery.getLatestByPage = (args) => {
	return new Promise((resolve, reject) => {
		Gallery
			.paginate({
				page: args.page || 0,
				perPage: args.limit || 10,
			})
			.exec((err, data) => {
				if (err) {
					reject(err);
				}
				resolve(data);
			});
	});
};

Gallery.register();
export default Gallery;
