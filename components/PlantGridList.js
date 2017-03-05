// @flow

import gql from 'graphql-tag';
import { compose } from 'recompose';
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Image } from 'semantic-ui-react';
import HighlightText from 'react-highlight-words';

const PlantGridList = compose()(
    ({ plantList, highlightTexts }) => (
      <div>
        { plantList.map(plant => (
          <div key={plant._id} className="container">
            <div className="wrap">
              <Image style={{ marginRight: 10 }} width={150} height={150} src={plant.thumbnailImage.secure_url} />
              <div className="detail">
                <div className="detail-wrap">
                  <Link
                    href={'/detail'}
                    style={{ cursor: 'pointer' }}
                  >
                    <h2>
                      <HighlightText searchWords={highlightTexts || []} textToHighlight={`${plant.localName} ${plant.name ? plant.name : ''}`} />
                    </h2>
                  </Link>
                  <div className="field">
                    <span className="name">{'ชื่อวิทยาศาสตร์'}</span>:<span className="value">
                      <HighlightText searchWords={highlightTexts || []} textToHighlight={plant.scientificName || 'ไม่ระบุ'} />

                    </span>
                  </div>
                  <div className="field">
                    <span className="name">{'ชื่อวงศ์'}</span>:
                        <span className="value">
                          <HighlightText searchWords={highlightTexts || []} textToHighlight={plant.family || 'ไม่ระบุ'} />
                        </span>
                  </div>
                </div>
                <div className="footer">
                  <div>
                    {'พื้นที่จัดแสดง : '}<span style={{ color: '#e896ab', fontWeight: 'bold' }}>{plant.displayLocation ? plant.displayLocation.name : '-'}</span>
                  </div>
                </div>
              </div>
            </div></div>))}
        <style jsx>{`
            .link {
                text-decoration: none;
            }
            .container {
                padding: 3px;
                box-sizing: border-box;
                flex: 0 0 50%;
            }
            .wrap {
                display: flex;
                background: #F9F9F9;
                border: 1px solid #EEEEEE;
                box-sizing: border-box;
                height: 100%;
                padding: 10px;
            }
            .thumbnail {
                height: 130px;
                padding-right: 10px;
                display:flex;
                flex: 0 0 150px;
                align-self: center;
            }
            .detail {
                flex:1 1 auto;
                display: flex;
                flex-direction: column;
            }
            .detail-wrap {
                padding-bottom: 20px;
                border-bottom: 1px #eaeaea solid;
                flex: 1 0 auto;
            }
            h2 {
                color: #4d876d;
                font-weight: normal;
                font-size: 28px;
                margin: 10px 0;
                font-family: supermarketregular, Helvetica Neue,Helvetica,Arial,sans-serif;
            }
            h2:hover {
                
            }
            .field {
                display: flex;
                font-size:12px;
            }
            .field .value{
                font-style: italic;
                font-size:12px;
                margin-left: 5px;
            }
            .field .name {
                font-size:12px;
                display: inline-block;
                flex: 0 0 120px;
            }
            .footer {
                font-size: 12px;
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
            }
        `}</style>
      </div>
    ));


PlantGridList.fragments = {
  plantList: gql`
        fragment PlantGridList on Plant {
            name
            _id
            localName
            family
            otherName
            scientificName
            thumbnailImage {
                secure_url
            }
            displayLocation {
                _id
                name
                label
                description
            }
        }
    `,
};

export default PlantGridList;
