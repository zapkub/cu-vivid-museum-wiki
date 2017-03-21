import React from 'react';
import { compose } from 'recompose';
import { Header, Divider } from 'semantic-ui-react';
import gql from 'graphql-tag';
import PlantGridList from './PlantGridList';

const RelatePlantList = compose(

)(({ displayLocation, Related, category }) => !Related ? <div /> : (
  <div className="container">
    { console.log(Related) }
    <Header>{'ในพื้นที่จัดแสดงเดียวกัน'}</Header>
    <Divider />
    <PlantGridList
      plantList={Related}
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
        }
    `,
};
export default RelatePlantList;
