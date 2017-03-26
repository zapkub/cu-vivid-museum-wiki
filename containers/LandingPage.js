// @flow
import React from 'react';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import HeroImage from '../components/HeroImage';
import CategoryThumbnailList from '../components/CategoryThumbnailList';
import SearchInputBar from '../components/SearchInputBar';

const LandingPage = ({ data }) => {
  if (data.loading) return <div />;
  console.log(data);
  return (
    <div>
      <HeroImage heroImageURL={'/static/images/1_home-18.jpg'} >
        <SearchInputBar />
      </HeroImage>
      <CategoryThumbnailList counts={data} />
    </div>);
};


export default compose(
  graphql(gql`
    ${CategoryThumbnailList.fragments.counts}
    query { 
      plantCount
      ...CategoryThumbnailList
    }
  `, {
    options: ({}) => ({}),
  }),
)(LandingPage);
