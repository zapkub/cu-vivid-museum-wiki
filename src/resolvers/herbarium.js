import Herbarium from '../models/herbarium';

export default {
    Query: {
        async getHerbariums(_, args, context) {
            const result = await Herbarium.paginate({}, {
                page: args.page || 0,
                limit: args.limit || 10,
            });
            return result.docs.map(
                item => item.toObject(),
            );
        },
    },
};
