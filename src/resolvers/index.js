import { merge } from 'lodash';
// import HerbariumResolver from './herbarium';
// import GardenResolver from './garden';
import SearchResolver from './search';
import CategoryResolver from './category';
import PlantResolver from './plant';

export default merge(SearchResolver, CategoryResolver, PlantResolver);
