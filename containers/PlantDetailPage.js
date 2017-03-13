import React from 'react';
import { compose, lifecycle, withProps, withState } from 'recompose';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import PlantDetail from '../components/PlantDetail';
import RelatePlantList from '../components/RelatePlantList';
import HeroImage from '../components/HeroImage';
import SearchInputBar from '../components/SearchInputBar';
import withLoading from '../lib/withLoading';

const PlantDetailPage = ({ loading, plant, url: { query: { category, id } } }) =>
loading ? null :
(<div>
  <HeroImage small>
    <SearchInputBar small />
  </HeroImage>
  {(

    <div className="container">
      <PlantDetail plant={plant} category={category} />
      <RelatePlantList category={category} Related={plant.Related} />
      <style jsx>{`
        .container {
            max-width: 1024px;
            margin:auto;
        }
    `}</style>
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
            ${RelatePlantList.fragments.relateList}
            query ($id: MongoID!) {
                ${category}(_id: $id) {
                    ...PlantDetail
                    Related {
                      _id
                      plant {
                        ...RelateList
                      }
                    }
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
    withLoading(({ loading }) => loading),
)(PlantDetailPage);
