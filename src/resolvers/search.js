// @flow
import __ from 'lodash';
import Herbarium from '../models/Herbarium';
import Garden from '../models/Garden';
import Constants from './../constant';

export default {
    Query: {
        async searchItem(_: any, args: { text: string; categories: string[] }) {
            const herbariumQuery = await Herbarium.getLatestByPage(args);
            const gardenQuery = await Garden.getLatestByPage(args);

            return __.merge(herbariumQuery, gardenQuery);
        },
        categoryList() {
            return Constants.SEARCH.CATEGORY_LIST;
        },
    },
};
