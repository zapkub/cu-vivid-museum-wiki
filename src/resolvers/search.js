// @flow
import Plant from '../models/Plant';
import PlantCategory from './../models/PlantCategory';

export default {
    Query: {
        async searchItem(_: any, args: { text: string; categories: string[]; page: number; }) {
            const results = await Plant.searchByText(args);
            return results;
        },
        queryCategory(_: any, args: {key: string}) {
            const results = PlantCategory.model.find().exec();
            return results;
        },
    },
};
