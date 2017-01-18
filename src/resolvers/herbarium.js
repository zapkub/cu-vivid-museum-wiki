// @flow
import Herbarium from '../models/Plant';

export default {
    Query: {
        async queryHerbariums(_: any, args: { page: number; limit: number }) {
            const query = await Herbarium.getLatestByPage(args);
            return query;
        },
    },
};
