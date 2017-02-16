// @flow
import _ from 'lodash';
import Plant from '../models/Plant';
import PlantCategory from './../models/PlantCategory';

export default {
    Query: {
        async queryLatestPlant(_, args, context) {
            return await Plant.getLatestByPage(args);
        },
        async getPlantById(_: any, args: any, context: any) {
            const result = await Plant.model.findById(args.id)
            .populate('displayLocation')
            .exec();

            if (!result) {
                throw new Error('Plant information not found');
            } else {
                return result;
            }
        },
        async getPlantFieldsList() {
            return _.values(Plant.fields);
        },
    },
    Plant: {
        async category(root, args) {
            return await PlantCategory.model.find({
                _id: {
                    $in: root.category,
                },
            }).exec();
        },
    },
};
