import React from 'react';
import { compose, withProps, withState } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import HeroImage from '../components/HeroImage';
import withLoading from '../components/withLoading';
import PlantGridList from '../components/PlantGridList';
import SearchInputBar from '../components/SearchInputBar';

const SearchResultPage = ({ data, setTexts, texts }) => (
  <div>
    { !data.loading ?
      (<div>
        <HeroImage heroImage={data.category.heroImage.secure_url}>
          <SearchInputBar categories={data.categories} />
        </HeroImage>
        <PlantGridList highlightTexts={texts} plantList={data.plants} />
      </div>) : null }
  </div>
);

export default compose(
    withState('texts', 'setTexts', ({ url }) => {
      if (url.query.searchTexts) {
        return url.query.searchTexts.split(',');
      }
      return [];
    }),
    graphql(gql`
        ${SearchInputBar.fragments.categories}
        ${HeroImage.fragments.heroImage}
        ${PlantGridList.fragments.plantList}
        query ($texts: [String]!, $categoryId: String) {
            categories {
              ...SearchInputBar
            }
            category (filter:{_id: $categoryId}) {
              heroImage {
                ...HeroImage
              }
            }
            plants (filter: {
                searchFieldsWithTexts: {
                    fields: ["name", "family", "localName"],
                    texts: $texts,
                }}) {
                ...PlantGridList
            }
      }`,
      {
        skip: ({ texts }) => !texts,
        options: ({ texts }) => ({
          variables: ({
            texts,
          }),
        }),
      }),
    withLoading(({ data }) => data.loading),
    withProps(({ data }) => {
      if (!data.loading && data.category) { data.category.heroImage = { }; }
      return {
        data,
      };
    }),
)(SearchResultPage);

