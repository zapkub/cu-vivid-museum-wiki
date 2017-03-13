import React from 'react';
import { compose, lifecycle, withProps, withState } from 'recompose';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import PlantDetail from '../components/PlantDetail';

const PlantDetailPage = ({ loading, plant, url: { query: { category, id } } }) =>
(<div >{loading ? null : (
  <div>
    <PlantDetail plant={plant} category={category} />
  </div>)}
</div>);

export default compose(
    withState('plant', 'setPlant', null),
    withState('loading', 'setLoading', true),
    withApollo,
    withProps(({ setLoading, client, setPlant, url: { query: { category, id } } }) => {
      const fragment = PlantDetail.fragments[category];
      return {
        reloadPlantDetail: async () => {
          const query = gql`
            ${fragment}
            query ($id: MongoID!) {
                ${category}(_id: $id) {
                    ...PlantDetail
                }
            }
        `;
          const result = await client.query({
            query,
            variables: {
              id,
            },
          });
          setPlant(result.data[category]);
          setLoading(false);
        },
      };
    }),
    lifecycle({
      componentDidMount() {
        this.props.reloadPlantDetail();
      },
    }),
)(PlantDetailPage);
