import gql from 'graphql-tag';
import { compose } from 'recompose';
import React from 'react';
import Link from 'next/link';
import { Image, Header,  Message, Icon } from 'semantic-ui-react';  // eslint-disable-line
import HighlightText from 'react-highlight-words';

const PlantGridList = compose(
    // Flatten plantlist
)(
    ({ plantList, highlightTexts }) => {
      try {
        return (
          <div className="list-wrap">
            { !plantList ? null : plantList.map((plant) => {
              const query = { s: plant.plant.key };
              const searchFields = ['cuid', 'zone', 'museumLocation'];
              query.category = plant.__typename.toLowerCase();
              searchFields.forEach((key) => {
                if (plant[key]) {
                  query[key] = plant[key];
                }
              });
              return (
                <div key={plant._id} className="container">
                  <div className="wrap">
                    <div className="thumbnail" style={{ backgroundImage: `url(${plant.thumbnailImage})`, backgroundPosition: 'center center', backgroundSize: 'cover' }} />
                    <div className="detail">
                      <div className="detail-wrap">
                        <Link
                          style={{ cursor: 'pointer' }}
                          href={{
                            pathname: 'detail',
                            query,
                          }}
                        >
                          <a className="plant-title" style={{ color: '#4d876d', cursor: 'pointer' }} as="a" >
                            <HighlightText searchWords={highlightTexts || []} textToHighlight={`${plant.plant.name ? plant.plant.name : 'ไม่ระบุ'}`} />
                          </a>
                        </Link>
                        <div className="field">
                          <span className="name">{'ชื่อวิทยาศาสตร์'}</span><span className="value">
                            <HighlightText searchWords={highlightTexts || []} textToHighlight={plant.plant.scientificName || 'ไม่ระบุ'} />
                          </span>
                        </div>
                        <div className="field">
                          <span className="name">{'ชื่อวงศ์'}</span>
                          <span className="value">
                            <HighlightText searchWords={highlightTexts || []} textToHighlight={plant.plant.familyName || 'ไม่ระบุ'} />
                          </span>
                        </div>
                      </div>
                      <div className="footer">
                        <div>
                          {'พื้นที่จัดแสดง : '}<span style={{ color: '#e896ab', fontWeight: 'bold' }}>{plant.displayLocation ? plant.displayLocation.name : '-'}</span>
                        </div>
                      </div>
                    </div>
                  </div></div>);
            })}
            <style jsx>{`
            .list-wrap {
                max-width: 1024px;
                margin: auto;
                display: flex;
                flex-wrap: wrap;
            }
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
                height: 150px;
                padding-right: 10px;
                display:flex;
                flex: 0 0 150px;
                margin-right: 10px;
                align-self: center;
                width: 150px;
            }
            .detail {
                flex:1 1 auto;
                display: flex;
                flex-direction: column;
            }
            .detail-wrap {
                padding-bottom: 20px;
                border-bottom: 1px #eaeaea solid;
                flex: 1 1 auto;
            }
            .plant-title {
                color: #4d876d;
                font-weight: bold;
                display:block;
                font-size: 20px;
                margin: 5px 0px 10px 0;
                /*font-family: supermarketregular, Helvetica Neue,Helvetica,Arial,sans-serif;*/
            }
            h2:hover {

            }
            .field {
                display: block;
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
                width: 120px;
                font-weight: bold;
            }
            .field {
                display: block;
            }
            .field .value {
                display: block;
            }
            .field .name {
                display: block;
            }
            @media screen and (max-width: 670px) {
                .container {
                    flex: 1 0 100%;
                }

            }
            .footer {
                font-size: 12px;
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
            }
        `}</style>
          </div>
        );
      } catch (e) {
        console.error(e);
        return (<Message negative icon>
          <Icon name="warning sign" />
          <Message.Content>
            <Message.Header>Problem occurs with results</Message.Header>
            <p>we are truely apologize for this</p>
          </Message.Content>
        </Message>);
      }
    });


PlantGridList.fragments = {
  plantList: gql`
        fragment PlantDetail on Plant {
            _id
            scientificName
            familyName
            name
            key
        }

        fragment PlantGridList on PlantSearchResultItem {
            __typename
        ... on Herbarium {
            _id
            cuid
            thumbnailImage
            displayLocation
            plant {
                ...PlantDetail
            }
        }
        ... on Garden {
            _id
            zone
            thumbnailImage
            plant {
                ...PlantDetail
            }
        }
        ... on Museum {
            _id
            museumLocation
            thumbnailImage
            plant {
                ...PlantDetail
            }
        }
     }
    `,
};

export default PlantGridList;
