// @flow

import React from 'react';
import { withAppLayout } from '../App';
import LandingPage from '../containers/LandingPage';

const Index = props => (<LandingPage {...props} />);

export default withAppLayout(Index);
