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
    <PlantGridList plantList={Related.map(item => ({ ...item.plant, category, _id: item._id }))} />
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
