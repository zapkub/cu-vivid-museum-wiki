import React from 'react'
import withApp from '../lib/withApp'
import StaticPage from '../containers/StaticPage'

export default withApp('change log')(() => <StaticPage source='/changelog-md' />)
