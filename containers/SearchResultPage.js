import React from 'react';
import { compose, withProps, withState } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import HeroImage from '../components/HeroImage';
import withLoading from '../lib/withLoading';
import PlantGridList from '../components/PlantGridList';
import SearchInputBar from '../components/SearchInputBar';

const SearchResultPage = ({ data, setTexts, texts }) => (
  <div>
    { !data.loading ?
      (<div>
        <HeroImage heroImageURL={data.category.heroImageURL}>
          <SearchInputBar categories={data.categories} />
        </HeroImage>
        <PlantGridList highlightTexts={texts} plantList={data.findPlants} />
      </div>) : null }
  </div>
);

export default compose(
      withProps(({ url }) => {
        let texts = [];
        if (url.query.searchTexts) {
          texts = url.query.searchTexts.split(' ');
        }
        return {
          texts,
        };
      }),
    graphql(gql`
        ${SearchInputBar.fragments.categories}
        ${PlantGridList.fragments.plantList}
        query ($texts: [String]!, $herbSelected: Boolean!, $museumSelected: Boolean!, $gardenSelected: Boolean!) {
            categories {
              ...SearchInputBar
            }
            category (filter:{key: "garden"}) {
              heroImageURL
            }
            findPlants (filter:{search: $texts}) {
                ...PlantGridList
            }
      }`,
      {
        skip: ({ texts }) => !texts,
        options: ({ texts, url }) => ({
          variables: ({
            texts,
            herbSelected: url.query.categories ? url.query.categories.indexOf('herbarium') > -1 : false,
            museumSelected: url.query.categories ? url.query.categories.indexOf('museum') > -1 : false,
            gardenSelected: url.query.categories ? url.query.categories.indexOf('garden') > -1 : false,
          }),
        }),
      }),
    withLoading(({ data }) => data.loading),
    withProps(({ data }) => {
      if (!data.loading && data.category) { data.category = { }; }
      return {
        data,
      };
    }),
)(SearchResultPage);

