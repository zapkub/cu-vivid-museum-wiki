import React from 'react';
import { compose, lifecycle, withProps, withState } from 'recompose';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import PlantDetail from '../components/PlantDetail';
import RelatePlantList from '../components/RelatePlantList';
import HeroImage from '../components/HeroImage';
import SearchInputBar from '../components/SearchInputBar';
import withLoading from '../lib/withLoading';
import categories from '../category';

const PlantDetailPage = ({ loading, plant, url: { query: { category, id } } }) =>
loading ? null :
(<div>
  <HeroImage small heroImageURL={categories[category.toUpperCase()].heroImage}>
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
        reloadPlantDetail: async (plantId = id) => {
          const query = gql`
            ${fragment}
            ${RelatePlantList.fragments.relateList}
            query ($id: MongoID!) {
                ${category}(_id: $id) {
                    ...PlantDetail
                    Related (limit: 6) {
                      _id
                      thumbnailImage
                      plant {
                        ...RelateList
                      }
                    }
                }
            }
        `;
          setLoading(true);
          const result = await client.query({
            query,
            variables: {
              id: plantId,
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
      componentWillReceiveProps(nextProps) {
        const nextQuery = nextProps.url.query;
        const query = this.props.url.query;
        if (nextQuery.id !== query.id) {
          this.props.reloadPlantDetail(nextQuery.id);
        }
      },
    }),
    withLoading(({ loading }) => loading),
)(PlantDetailPage);
