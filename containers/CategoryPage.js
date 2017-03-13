import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';

import HeroImage from '../components/HeroImage';
import withLoading from '../lib/withLoading';
import SearchInputBar from '../components/SearchInputBar';
import PlantGridList from '../components/PlantGridList';

const CategoryPage = ({ data }) => (
  <div>

    { !data.loading ?
    (<div>
      <HeroImage>
        <SearchInputBar />
      </HeroImage><PlantGridList plantList={data.findByCategory} />
    </div>) : null }

  </div>
);


export default compose(
    graphql(gql`
        ${PlantGridList.fragments.plantList}
        query ($categories: [CategoryEnum]) {
            findByCategory(categories: $categories) {
                ...PlantGridList
            }
        }
    `, {
      options: ({ category }) => ({
        variables: {
          categories: [category],
        },
      }),
    }),
    withLoading(({ data }) => data.loading),
)(CategoryPage);
