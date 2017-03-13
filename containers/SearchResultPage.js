import React from 'react';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Header } from 'semantic-ui-react';

import HeroImage from '../components/HeroImage';
import withLoading from '../lib/withLoading';
import PlantGridList from '../components/PlantGridList';
import SearchInputBar from '../components/SearchInputBar';

const SearchResultPage = ({ data, texts, categories }) => !data.loading ?
      (<div className="container">
        <HeroImage heroImageURL={'/static/images/1_home-18.jpg'} >
          <SearchInputBar categories={data.categories} />
        </HeroImage>
        <div className="wrap">
          <Header> ผลลัพธ์การค้นหาในหมวด {categories.join(', ')} </Header>
          { data.findByCategory.length === 0 ? 'ไม่พบผลลัพธ์' : ''}
          <PlantGridList highlightTexts={texts} plantList={data.findByCategory} />
        </div>
        <style jsx>{` 
          .wrap {  
            padding: 10px;
            max-width: 1024px;
            margin: auto; 
            margin-top: 30px;
          }
        `}</style>
      </div>) : null;


export default compose(
      withProps(({ url }) => {
        let texts = [];
        if (url.query.searchTexts) {
          texts = url.query.searchTexts.split(' ');
        }
        let categories = [];
        if (url.query.categories) {
          categories = url.query.categories.split(',').map(cate => cate.toUpperCase());
        } else {
          categories = ['GARDEN', 'HERBARIUM', 'MUSEUM'];
        }

        return {
          texts,
          categories,
        };
      }),
    graphql(gql`
        ${PlantGridList.fragments.plantList}
        query ($texts: [String]!, $categories: [CategoryEnum]) {
            findByCategory (text: $texts, categories: $categories) {
                ...PlantGridList
            }
      }`,
      {
        skip: ({ texts }) => !texts,
        options: ({ texts, url, categories }) => ({
          variables: ({
            texts,
            categories,
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

