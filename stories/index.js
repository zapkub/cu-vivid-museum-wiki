import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Header from '../src/components/common/Header';
import Footer from '../src/components/common/Footer';

storiesOf('Layout', module)
    .add('Header', () => (
        <Header logoURL={require('./../src/static/images/logo.png')} />
    ))
    .add('Footer', () => (
        <Footer />
    ));
