import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import { Header } from 'semantic-ui-react';
import Router from 'next/router';

import HeroImage from '../components/HeroImage';
import withLoading from '../lib/withLoading';
import SearchInputBar from '../components/SearchInputBar';
import PlantGridList from '../components/PlantGridList';
import categories from '../category';
import Paginate from '../components/Pagination';


const CategoryPage = ({ data, category, url: { query: { page } } }) => (
  <div>
    { !data.loading ?
    (<div>
      <HeroImage category={category} heroImageURL={categories[category.toUpperCase()].heroImage}>
        <SearchInputBar small initCategories={[category]} />
      </HeroImage>
      <div className="wrap">
        <Header>ตัวอย่างล่าสุดในหมวด {category} </Header>
        <PlantGridList plantList={data.findByCategory.result} />
        <Paginate
          onPageChange={({ selected }) => Router.push(`/${categories[category].value}?page=${selected + 1}`)}
          totalPages={data.findByCategory.count / 20}
          currentPage={parseInt(page - 1, 10)}
        />
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
        query ($categories: [CategoryEnum], $skip: Int) {
            findByCategory(categories: $categories, skip: $skip) {
              result {
                ...PlantGridList
              }
              count
            }
        }
    `, {
      options: ({ category, url: { query: { page } } }) => ({
        variables: {
          categories: [category],
          skip: page ? parseInt(page - 1, 10) * 20 : 0,
        },
      }),
    }),
    withLoading(({ data }) => data.loading),
)(CategoryPage);
