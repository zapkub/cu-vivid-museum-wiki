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
      category={category}
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

const plantFragment = gql`
        fragment RelateList on Plant {
            scientificName
            familyName
            name
            _id
            key
        }
    `;

RelatePlantList.fragments = {
  relateList: {
    garden: gql`
    ${plantFragment}
    fragment RelatedItem on Garden {
      _id
      zone
      thumbnailImage
      plant {
        ...RelateList
      }
    }
  `,
    herbarium: gql`
    ${plantFragment}
    fragment RelatedItem on Herbarium {
      cuid
      _id
      thumbnailImage
      plant {
        ...RelateList
      }
   }
  `,
    museum: gql`
    ${plantFragment}
    fragment RelatedItem on Museum {
      _id
      museumLocation
      thumbnailImage
      plant {
        ...RelateList
      }
    }
  `,

  },
};
export default RelatePlantList;
