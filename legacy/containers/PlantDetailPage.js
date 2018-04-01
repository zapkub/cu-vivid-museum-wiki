import React from 'react'
import { compose, lifecycle, withProps, withState } from 'recompose'
import gql from 'graphql-tag'
import Router from 'next/router'
import { withApollo } from 'react-apollo'

import PlantDetail from '../components/PlantDetail'
import RelatePlantList from '../components/RelatePlantList'
import HeroImage from '../components/HeroImage'
import SearchInputBar from '../containers/SearchInputBar'
import withLoading from '../lib/withLoading'
import categories from '../category'

const PlantDetailPage = ({ loading, plant, url: { query: { category } } }) => {
  if (loading) {
    return <div />
  } return (<div>
    <HeroImage small heroImageURL={categories[category.toUpperCase()].heroImage}>
      <SearchInputBar small />
    </HeroImage>
    <div className='container'>
      <PlantDetail plant={plant} category={category} />
      {plant.Related ? <RelatePlantList
        category={category}
        Related={plant.Related}
        displayLocation={plant.zone || plant.displayLocation || plant.museumLocation}
      /> : null}
      <style jsx>{`
        .container {
            max-width: 1024px;
            margin:auto;
        }
    `}</style>
    </div>
  </div>)
}

export default compose(
    withState('plant', 'setPlant', null),
    withState('loading', 'setLoading', true),
    withApollo,
    withProps((props) => {
      const { setLoading, client, setPlant } = props
      const { url: { query: { museumLocation, zone, category, cuid, s } } } = props
      const fragment = PlantDetail.fragments[category]
      return {
        reloadPlantDetail: async () => {
          // Create query by category
          let queryArgs = ''
          switch (category) {
            case 'garden':
              queryArgs = `(filter: {zone: "${zone}"}, key: "${s}" )`
              break
            case 'herbarium':
              queryArgs = `(filter: {cuid: "${cuid}"}, key: "${s}" )`
              break
            case 'museum':
              queryArgs = `(filter: {museumLocation: "${museumLocation}"}, key: "${s}" )`
              break
            default:
              break
          }
          const query = gql`
            ${fragment}
            ${RelatePlantList.fragments.relateList[category]}
            query {
                ${category} ${queryArgs} {
                    ...PlantDetail
                    _id
                    Related (limit: 6) {
                      ...RelatedItem
                    }
                }
            }
          `
          setLoading(true)
          const result = await client.query({
            query
            // variables,
          })
          if (result.data[category]) {
            setPlant(result.data[category])
          } else {
            Router.push('/404')
          }
          setLoading(false)
        }
      }
    }),
    lifecycle({
      componentDidMount () {
        this.props.reloadPlantDetail()
      },
      componentDidUpdate (prevProps) {
        const nextQuery = this.props.url.query
        const query = prevProps.url.query
        if (nextQuery.s !== query.s || nextQuery.cuid !== query.cuid || nextQuery.zone !== query.zone) {
          console.log('reload')
          this.props.reloadPlantDetail()
        }
      }
    }),
    withLoading(({ loading }) => loading)
)(PlantDetailPage)
