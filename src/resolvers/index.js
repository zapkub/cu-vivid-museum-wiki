import keystone from 'keystone';
import { merge } from 'lodash';
import SearchResolver from './search';
import CategoryResolver from './category';
import PlantResolver from './plant';


const HeroImage = keystone.list('HeroImage');

const CommonResolver = {
    Query: {
        async queryHeroImages(_: any, args: any) {
            const count = await HeroImage.model.find().count().exec();
            const random = Math.floor(Math.random() * count);
            return HeroImage.model.find({}).skip(random).limit(args.amount || 10).exec();
        },
    },
};


export default merge(SearchResolver, CategoryResolver, PlantResolver, CommonResolver);
