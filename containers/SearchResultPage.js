import React from 'react';
import { compose, withProps, withState } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import withLoading from '../components/withLoading';
import PlantGridList from '../components/PlantGridList';

const SearchResultPage = ({ data, setTexts, texts }) => (
  <div>
    { !data.loading ?
      (<div>
        {'Result'}
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
        ${PlantGridList.fragments.plantList}
        query ($texts: [String]!) {
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
)(SearchResultPage);

