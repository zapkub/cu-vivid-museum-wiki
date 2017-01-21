// @flow
import Plant from '../models/Plant';
import PlantCategory from './../models/PlantCategory';

export default {
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
