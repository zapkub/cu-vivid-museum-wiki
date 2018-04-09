import * as React from 'react'
import { compose } from 'react-apollo'
import withData from '../utils/withData'
import { HeroImage } from '../components/HeroImage'
import { SearchInputWithAutoSuggestionWithData } from '../components/SearchInputWithAutoSuggestion';

export class IndexPage extends React.Component<{url: any}, {}> {
  render() {
    return (
      <div>
        <HeroImage heroImageURL={'/static/images/1_home-18.jpg'} >
          <SearchInputWithAutoSuggestionWithData initialValue={this.props.url.query.value} />
        </HeroImage>
      </div>
    )
  }
}

export default compose(withData({}))(IndexPage)
