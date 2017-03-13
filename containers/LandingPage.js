// @flow
import React from 'react';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import HeroImage from '../components/HeroImage';
import withLoading from '../lib/withLoading';
import CategoryThumbnailList from '../components/CategoryThumbnailList';
import SearchInputBar from '../components/SearchInputBar';

const LandingPage = ({ data, randomCategory }) => data.loading ? <div /> : (
  <div>
    <HeroImage heroImageURL={randomCategory.heroImageURL}>
      <SearchInputBar categories={data.categories} />
    </HeroImage>
    <CategoryThumbnailList categories={data.categories} />
  </div>);

const query = gql`
    ${SearchInputBar.fragments.categories}
    ${CategoryThumbnailList.fragments.categories}
    query LandingPageQuery {
        categoriesCount
        categories {
            ...SearchInputBar
            ...CategoryThumbnailList
            heroImageURL
        }
    }
`;


export default compose(
    graphql(query, {}),
    withLoading(({ data }) => data.loading),
    withProps(({ data }) => {
      if (data.loading) {
        return undefined;
      }
      return {
        randomCategory: data.categories[Math.round(Math.random() * (data.categoriesCount - 1))],
      };
    }),
)(LandingPage);
