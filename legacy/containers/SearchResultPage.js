import React from 'react'
import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Header } from 'semantic-ui-react'
import Router from 'next/router'

import HeroImage from '../components/HeroImage'
import withLoading from '../lib/withLoading'
import PlantGridList from '../components/PlantGridList'
import Paginate from '../components/Pagination'
import SearchInputBar from '../containers/SearchInputBar'

const SearchResultPage = ({ data, texts, categories, goTo, url: { query: { page } } }) => !data.loading
      ? (<div className='container'>
        <HeroImage heroImageURL={'/static/images/1_home-18.jpg'} >
          <SearchInputBar categories={data.categories} />
        </HeroImage>
        {!data.findByCategory ? <div>{'เกิดความผิดพลาด'}</div>
        : <div className='wrap'>
          <Header><span style={{ fontSize: 38, marginRight: 10 }}>{data.findByCategory.count}</span>{`ผลลัพธ์การค้นหาในหมวด ${categories.join(', ')}`} </Header>
          { data.findByCategory.result.length === 0 ? 'ไม่พบผลลัพธ์' : ''}
          <PlantGridList highlightTexts={texts} plantList={data.findByCategory.result} />
          <Paginate
            onPageChange={({ selected }) => goTo(selected)}
            totalPages={data.findByCategory.count / 20}
            currentPage={parseInt(page - 1, 10)}
          />
        </div>
        }
        <style jsx>{` 
          .wrap {  
            padding: 10px;
            max-width: 1024px;
            margin: auto; 
            margin-top: 30px;
          }
        `}</style>
      </div>) : null

export default compose(
      withProps(({ url }) => {
        let texts = []
        if (url.query.searchTexts) {
          texts = url.query.searchTexts.split(' ')
        }
        let categories = []
        if (url.query.categories) {
          categories = url.query.categories.split(',').map(cate => cate.toUpperCase())
        } else {
          categories = ['GARDEN', 'HERBARIUM', 'MUSEUM']
        }

        return {
          texts,
          categories
        }
      }),
    graphql(gql`
        ${PlantGridList.fragments.plantList}
        query ($texts: [String]!, $categories: [CategoryEnum], $skip: Int) {
            findByCategory (text: $texts, categories: $categories, skip: $skip) {
                result {
                  ...PlantGridList
                }
                count
            }
      }`,
      {
        skip: ({ texts }) => !texts,
        options: ({ texts, categories, url: { query: { page } } }) => ({
          variables: ({
            texts,
            categories,
            skip: parseInt(page, 10) >= 0 ? parseInt(page - 1, 10) * 20 : 0
          })
        })
      }),
    withLoading(({ data }) => data.loading),
    withProps(({ data, url: { query: { searchTexts, categories } } }) => {
      if (!data.loading && data.category) { data.category = { }; } // eslint-disable-line
      return {
        data,
        goTo: (page) => {
          if (page >= 0) {
            const param = {
              pathname: 'results',
              query: {
                searchTexts,
                categories,
                page: `${page}`
              }
            }
            Router.push(`/results?categories=${categories}&searchTexts=${searchTexts}&page=${page + 1}`)
          }
        }
      }
    })
)(SearchResultPage)
