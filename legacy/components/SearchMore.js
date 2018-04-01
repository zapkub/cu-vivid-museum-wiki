import React from 'react'
import { Header } from 'semantic-ui-react'
import Link from 'next/link'

import categories from '../category'

export default ({ category = '', text }) => (
  <div className='container'>
    <Header>{'ค้นหาเพิ่มเติม'}</Header>
    <div className='wrap'>
      { Object.keys(categories)
            .filter(key => key !== category.toUpperCase())
            .map(key => (
              <Link key={key} href={`/results?categories=${key}&searchTexts=${text}`} >
                <a className='search-button'>
                  <div className='category-name'>{key}</div>
                </a>
              </Link>
            )) }
    </div>
    <style jsx>{`
        .container{
            padding: 10px 20px;
            text-align: center;
        }
        .title {
            text-align: center;
        }
        .wrap {
            display: flex;
            flex-direction: row;
        }
        .search-button {
            padding: 40px 30px;
            cursor: pointer;
            margin: 5px;
            flex: 1 0 auto;
            text-align: center;
            border: 2px solid #99cee1;
            color: #7f7e81;
        }
        .category-name {
            position: relative;
        }
        .search-button:hover {
            background: #99cee1;
            color: white;
        }
        .search-button .category-name:after{
            content: " ";
            width: 100px;
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translate(-50% ,0);
            border-bottom: 2px solid #7f7e81;
        }
        .search-button:hover .category-name:after {
            border-bottom: 2px solid white;
        }
    `}</style>
  </div>
)
