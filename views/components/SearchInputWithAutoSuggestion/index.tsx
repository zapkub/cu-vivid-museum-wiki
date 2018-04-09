import * as React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { compose, withProps, withState } from 'recompose'
import Router from 'next/router'
import { Query, QueryResult } from 'react-apollo'
import gql from 'graphql-tag'

type AutoSuggestionQueryResult = {
  search: {
    data: any[]
  }
}
const AUTO_SUGGESTION_QUERY = gql`
  query($value: String!) {
    search(value: $value) {
      data {
        scientificName
        name
        id
      }
    }
  }
`

const SearchInputContainer = styled.div.attrs({})`
  .search-result-container {
    position: relative;
  }
  .search-result-wrapper {
    position: absolute;
    background-color: white;
    transform: translate(0, 10px);
    opacity: 0;
    pointer-events: none;
    transition: 0.222s linear transform, 0.333s linear opacity;
    &.visible {
      transform: translate(0, 0px);
      opacity: 1;
    }
  }
`
interface SearchInputWithAutoSuggestionPropTypes {
  onChange?: (e: any) => void
  value?: string
  initialValue: string
}
export class SearchInputWithAutoSuggestion extends React.Component<
  SearchInputWithAutoSuggestionPropTypes,
  {
    isInputFocus: boolean
  }
> {
  constructor(props) {
    super(props)
    this.state = {
      isInputFocus: false
    }
  }

  setInputFocus = () => {
    this.setState({
      isInputFocus: true
    })
  }

  setInputBlur = () => {
    this.setState({
      isInputFocus: false
    })
  }

  render() {
    return (
      <SearchInputContainer>
        <input
          value={this.props.value}
          onChange={this.props.onChange}
          onFocus={this.setInputFocus}
          onBlur={this.setInputBlur}
          type={'text'}
          className="search-input"
        />
        <Query
          query={AUTO_SUGGESTION_QUERY}
          variables={{ value: this.props.value }}
          skip={!this.props.value}
        >
          {({ data, loading }: QueryResult<AutoSuggestionQueryResult>) => (
            <div className="search-result-container">
              {data.search ? (
                <div
                  className={`search-result-wrapper ${
                    this.state.isInputFocus && this.props.value.length > 0
                      ? 'visible'
                      : ''
                  }`}
                >
                  {data.search.data.length > 0 ? (
                    data.search.data.map(item => (
                      <div key={item.id}>{item.scientificName}</div>
                    ))
                  ) : (
                    <div>{'No Result'}</div>
                  )}
                </div>
              ) : null}
            </div>
          )}
        </Query>
      </SearchInputContainer>
    )
  }
}

export const SearchInputWithAutoSuggestionWithData: React.SFC<
  SearchInputWithAutoSuggestionPropTypes
> = compose(
  withState<{}, any, any, any>(
    'value',
    'setValue',
    props => props.initialValue || ''
  ),
  withProps<any, any>(props => {
    return {
      // use input state from query on client side
      onChange: (e: any) => {
        if (typeof window !== 'undefined') {
          props.setValue(e.target.value)
          // Router.push({
          //   pathname: Router.pathname,
          //   query: {
          //     ...Router.query,
          //     value: e.target.value
          //   }
          // })
        }
      }
    }
  })
)(SearchInputWithAutoSuggestion) as any
