// @flow

import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import ResultItem from '../components/ResultItem';
import Loading from '../components/Loading';

const query = gql`
  query ($category_id: [String]!) {
    suggestItemByCategory(category_id: $category_id){
      _id
      name
      scientificName
      family
    }
  }
`;


const SuggestItemsComponent = ({ Results, plant_id }) => (
  <div className="container">
    {
      Results.loading ? <Loading /> :
        Results.suggestItemByCategory ? Results.suggestItemByCategory.map((item, i) => {
          return <ResultItem {...item} key={i} />;
        }) : null
    }
    <style jsx>
    {
      `
        .container {
          display: flex;
          flex-direction: row;
          align-items: strech;
        } 
      `
    }
    </style>
  </div>
);

export default compose(
  graphql(query, {
    name: 'Results',
    options: (props) => {
      return {
        variables: {
          category_id: props.category_id,
        },
      };
    },
  }),
)(SuggestItemsComponent);
