// @flow
import Link from 'next/link'
import React from 'react'
import gql from 'graphql-tag'
import { Statistic } from 'semantic-ui-react'

import Categories from '../category'

const CategoryThumbnailList = ({ counts }) => (
  <div className='container'>
    <h1 style={{ textAlign: 'center' }}> {'หมวดหมู่'} </h1>
    <div className='category-container' >
      {
          Categories ? Object.keys(Categories).map(key =>
          (<Link
            key={key}
            href={{ pathname: Categories[key].value }}
          >
            <a style={{ color: 'black' }} className='item-wrap' >
              <div className='category-item' >
                <div
                  style={{
                    border: '1px #eeeeee solid',
                    backgroundColor: '#f9f9f9',
                    backgroundImage: `url(${Categories[key].thumbnailImage})`,
                    width: 200,
                    height: 150 }}
                />
                <div className='category-name'>
                  <p>
                    {Categories[key].name} <br />
                    <span>{`${counts[`${Categories[key].value}Count`]} items`}</span>
                  </p>
                </div>
              </div>
            </a>
          </Link>)) : null
      }
    </div>

    <style jsx>{`
        .container {
            padding-top: 30px;
        }

        .category-container {
            display:flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
        }
        @media screen and (max-width: 670px) {
            .category-container {
                flex-direction: column;
            }
        }
        .category-item {
            margin: 5px;
            cursor: pointer;
            transition: 0.111s linear all;
            transform: scale(.95);
        }
        .category-item:hover {
            transform-origin: center center;
            transform: scale(1);
        }
        .category-name {
            margin: 10px 0;
            text-align:center;
            position:relative;
            font-size: 18px;
            color: #252627;
        }
        .category-name p {
            font-weight: bold;
        }
        .category-name span {
            margin:0;
            font-weight: normal;
            font-size: 14px;
        }
        .category-name:after{
            position:absolute;
            content: " ";
            border-bottom: #848586 4px solid;
            width: 50px;
            bottom:0;
            left: 50%;
            transform: translate(-50%, 15px);
        }
        .item-wrap{
            text-align:center;
        }
    `}</style>
  </div>
  )

CategoryThumbnailList.fragments = {
  counts: gql`
        fragment CategoryThumbnailList on Query {
            plantCount
            herbariumCount
            gardenCount
            museumCount
        }
    `
}
export default CategoryThumbnailList
