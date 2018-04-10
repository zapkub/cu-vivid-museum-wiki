import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import { compose, withProps } from 'recompose'

const withLoading = isLoadingMapper => Component =>
 compose(
     withProps(ownProps => ({
       isLoading: isLoadingMapper(ownProps) || false
     }))
 )(props => (
   <div>
     <Dimmer active={props.isLoading} >
       <Loader>Loading</Loader>
     </Dimmer>
     <Component {...props} />
   </div>
))
export default withLoading
