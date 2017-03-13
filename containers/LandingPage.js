// @flow
import React from 'react';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import HeroImage from '../components/HeroImage';
import withLoading from '../lib/withLoading';
import CategoryThumbnailList from '../components/CategoryThumbnailList';
import SearchInputBar from '../components/SearchInputBar';

const LandingPage = ({ }) => (
  <div>
    <HeroImage >
      <SearchInputBar />
    </HeroImage>
    <CategoryThumbnailList />
  </div>);


export default compose(

)(LandingPage);
