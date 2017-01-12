// @flow
import Herbarium from '../models/Herbarium';

export default {
    Query: {
        async getHerbariums(_: any, args: { page: number; limit: number }) {
            const query = await Herbarium.getLatestByPage(args);
            return query;
        },
    },
};
