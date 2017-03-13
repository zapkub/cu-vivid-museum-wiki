// @flow

import React from 'react';
import withAppLayout from '../App';
import CategoryPage from '../containers/CategoryPage';

const Index = props => (<CategoryPage category="GARDEN" {...props} />);

export default withAppLayout(Index);
