
import React from 'react'
import withApp from '../lib/withApp'
import StaticPage from '../containers/StaticPage'

export default withApp('Terms of Services')(() => <StaticPage source='/terms-md' />)
