import React from 'react';
import { compose } from 'recompose';
import { Header, Divider } from 'semantic-ui-react';
import gql from 'graphql-tag';
import PlantGridList from './PlantGridList';

const RelatePlantList = compose(

)(({ displayLocation, Related, category }) => !Related ? <div /> : (
  <div className="container">
    <Header>{'ในพื้นที่จัดแสดงเดียวกัน'}</Header>
    <Divider />
    <PlantGridList
      plantList={Related}
      displayLocation={displayLocation}
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
            familyName
            name
            key
        }
    `,
};
export default RelatePlantList;
