// @flow
import Plant from '../models/Plant';

export default {
    Query: {
        async queryLatestPlant(_, args, context) {
            return await Plant.getLatestByPage(args);
        },
        async searchItem(_: any, args: { text: string; categories: string[]; page: number; }) {
            const results = await Plant.searchByText(args);
            return results;
        },
    },
};
