import { merge } from 'lodash';
import HerbariumResolver from './herbarium';
import SearchResolver from './search';

export default merge(HerbariumResolver, SearchResolver);
