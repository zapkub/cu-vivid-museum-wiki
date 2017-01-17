// @flow
import Garden from '../models/Garden';

export default {
    Query: {
        async queryGardens(_: any, args: { page: number; limit: number }) {
            const query = await Garden.getLatestByPage(args);
            return query;
        },
    },
};
