// @flow
import Herbarium from '../models/Herbarium';
import Constants from './../constant';

export default {
    Query: {
        async searchItem(_: any, args: { text: string; categories: string[] }) {
            const query = await Herbarium.getLatestByPage(args);
            return query;
        },
        categoryList() {
            return Constants.SEARCH.CATEGORY_LIST;
        },
    },
};
