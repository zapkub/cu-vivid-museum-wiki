// @flow

import React from 'react';
import withApp from '../lib/withApp';
import CategoryPage from '../containers/CategoryPage';

const Index = props => (<CategoryPage category="MUSEUM" {...props} />);

export default withApp(Index);
