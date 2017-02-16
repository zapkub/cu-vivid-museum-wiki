// @flow
import Plant from '../models/Plant';

export default {
    Query: {
        async searchItem(_: any, args: { text: string; categories: string[]; page: number; }) {
            const results = await Plant.searchByText(args);
            return results;
        },
        async suggestItemByCategory(_: any, args: any ) {
          const count = await Plant.model.where('category').in(args.category_id).count().exec();
          const random = Math.floor(Math.random() * count);
          const result = Plant.model.find({}).skip(random).limit(2).exec();
          return result;
        },
    },
};
