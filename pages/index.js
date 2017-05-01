// @flow

import React from 'react'
import withApp from '../lib/withApp'
import LandingPage from '../containers/LandingPage'

const Index = props => (<LandingPage {...props} />)

export default withApp()(Index)
