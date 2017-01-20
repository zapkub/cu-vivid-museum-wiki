// @flow
import PlantCategory from './../models/PlantCategory';

export default {
    Query: {
        queryCategory(_: any, args: {key: string}) {
            const results = PlantCategory.model.find().exec();
            return results;
        },
    },
};
