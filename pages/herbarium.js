// @flow

import React from 'react'
import withApp from '../lib/withApp'
import CategoryPage from '../containers/CategoryPage'

const HerbariumPage = props => (<CategoryPage category='HERBARIUM' {...props} />)

export default withApp()(HerbariumPage)
