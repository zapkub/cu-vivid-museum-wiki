import React from 'react';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { Header, Divider } from 'semantic-ui-react';
import gql from 'graphql-tag';
import PlantGridList from './PlantGridList';

const RelatePlantList = compose(

)(({ displayLocation, Related, category }) => !Related ? <div /> : (
  <div className="container">
    <Header>{'ในพื้นที่จัดแสดงเดียวกัน'}</Header>
    <Divider />
    <PlantGridList
      plantList={Related.map(item => ({ ...item.plant, category, _id: item._id, thumbnailImage: item.thumbnailImage }))}
    />
    <style jsx>{`
      .container{ 
        padding: 10px;
      } 
      `}</style>
  </div>
));


RelatePlantList.fragments = {
  relateList: gql`
        fragment RelateList on Plant {
            scientificName
            thumbnailImage
            familyName
            name
        }
    `,
};
export default RelatePlantList;
