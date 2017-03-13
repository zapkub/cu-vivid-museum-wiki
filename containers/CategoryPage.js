import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import { Header } from 'semantic-ui-react';

import HeroImage from '../components/HeroImage';
import withLoading from '../lib/withLoading';
import SearchInputBar from '../components/SearchInputBar';
import PlantGridList from '../components/PlantGridList';
import categories from '../category';

const CategoryPage = ({ data, category }) => (
  <div>
    { !data.loading ?
    (<div>
      <HeroImage category={category} heroImageURL={categories[category.toUpperCase()].heroImage}>
        <SearchInputBar small />
      </HeroImage>
      <div className="wrap">
        <Header>ตัวอย่างล่าสุดในหมวด {category} </Header>
        <PlantGridList plantList={data.findByCategory} />
      </div>
    </div>) : null }
    <style jsx>{` 
          .wrap { 
            padding: 10px;
            max-width: 1024px;
            margin: auto; 
            margin-top: 30px;
          }
    `}</style>
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
