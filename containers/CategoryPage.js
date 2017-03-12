import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import HeroImage from '../components/HeroImage';
import withLoading from '../lib/withLoading';
import PlantGridList from '../components/PlantGridList';

const CategoryPage = ({}) => (
    <div>
        <PlantGridList plantList={data.findPlants} />
    </div>
);



export default compose(
    graphql(gql`
        ${PlantGridList.fragments.plantList}
        query {
        
        }
    `, {})
    withLoading(({ data }) => data.loading),
)(CategoryPage);