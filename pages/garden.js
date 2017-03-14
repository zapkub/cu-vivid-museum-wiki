import React from 'react';
import withApp from '../lib/withApp';
import CategoryPage from '../containers/CategoryPage';

const GardenPage = props => (<CategoryPage category="GARDEN" {...props} />);
export default withApp(GardenPage);
