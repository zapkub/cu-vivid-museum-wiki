// @flow
import Garden from '../models/Plant';

export default {
    Query: {
        async queryGardens(_: any, args: { page: number; limit: number }) {
            const query = await Garden.getLatestByPage(args);
            return query;
        },
    },
};
