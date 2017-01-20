// @flow
import Plant from '../models/Plant';
import PlantCategory from './../models/PlantCategory';

export default {
    Query: {
        async queryLatestPlant(_, args, context) {
            return await Plant.getLatestByPage();
        },
        async searchItem(_: any, args: { text: string; categories: string[]; page: number; }) {
            const results = await Plant.searchByText(args);
            return results;
        },
    },
    Plant: {
        category(root, args) {
            console.log(root);
            return [

            ]
        }
    }
};
