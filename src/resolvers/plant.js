// @flow
import Plant from '../models/Plant';
import PlantCategory from './../models/PlantCategory';

export default {
    Plant: {
        category(root, args) {
            console.log(root);
            return [
                {
                    key: root.category[0],
                }
            ];
        },
    },
};
