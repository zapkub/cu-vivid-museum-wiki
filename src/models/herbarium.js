// @flow
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const HerbariumSchema = new mongoose.Schema({
    cuid: String,
    name: String,
    blockNo: Number,
    slotNo: String,
    images: [{ url: String, width: Number, height: Number }],
});

HerbariumSchema.plugin(mongoosePaginate);
export default mongoose.model('gallery', HerbariumSchema);
