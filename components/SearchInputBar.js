// @flow
import React from 'react';
import { Form, Label, Search } from 'semantic-ui-react';
import { compose, withReducer, withState, withProps } from 'recompose';
import Router from 'next/router';
import queryString from 'query-string';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import objectPath from 'object-path';

import SearchInputResultItem from './AutocompleteResultItem';
import Categories from '../category';

const CHECKED = 'input/CHECKED';
const CHECKED_ALL = 'input/CHECKED_ALL';

const Component = ({ small, dispatch, state, onTextChange, texts, confirmSearch, data }) => (
  <Form className={small ? 'search-input-small-wrap' : 'search-input-wrap'} onSubmit={(e) => { e.preventDefault(); confirmSearch(); }} >
    <Form.Field className="search-input">
      <Search
        resultRenderer={props => <SearchInputResultItem
          searchText={[texts || '']}
          {...props}
        />}
        loading={data.get('loading', false)}
        onSearchChange={(e, value) => onTextChange(value)}
        onResultSelect={(e, result) => onTextChange(`${result.name} ${result.description} ${result.title}`)}
        value={texts}
        icon={false}
        showNoResults={false}
        results={data.get('autoCompletion', []).map(item => ({
          name: item.name,
          title: item.scientificName,
          description: item.familyName,
        }))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            confirmSearch();
          }
        }}
        className="search"
      />
      <Form.Button color="blue" icon={'search'} />
    </Form.Field>
    <Form.Group className="checkbox-input-wrap" inline id="size">
      { Categories ? Object.keys(Categories).map(
                key => (
                  <Form.Checkbox
                    className="checkbox-input"
                    key={Categories[key].value}
                    label={Categories[key].value}
                    checked={state[key]}
                    onChange={(e, { checked }) => dispatch({
                      type: CHECKED,
                      payload: { key, value: checked } })
                    }
                  />
                ),
            ) : null }
      <Label style={{ cursor: 'pointer' }} onClick={() => dispatch({ type: CHECKED_ALL })} >{'Select all'}</Label>
    </Form.Group>
    <style jsx global>{`
        .search {
          border-radius: 0;
          flex: 1 0 auto; 
        }
        .search-input-wrap .ui.blue.button {
          margin:0;
        }
        .search-input-wrap {
            max-width: 400px !important;
            margin: auto;
        }
        .ui.search>.results {
          max-height: 220px;
          overflow-y: scroll;
        }
        .search-input-wrap .ui.input {
          width: 100%;
        }
        .search-input-wrap .ui.input input{
          border-radius: 0 !important;
          border:none;
        }
        .search-input-small-wrap {
          display: flex;
          align-items: center;
          z-index:2;
          position:relative;
        }
        .search-input {
          width: 400px;
          border: 3px rgba(0,0,0,0.4) solid;
          margin-bottom:20px;
          display: flex;
        }

        .search-input button {
          border-radius: 0 !important;
        }
        .search-input.field .ui.input input  {
          border-radius: 0 !important;
          flex: 1 0 auto;
        }
        .checkbox-input-wrap {
          background: rgba(0,0,0,0.4);
          justify-content: center;
          max-width: 400px;
          padding: 5px 10px;
          border-radius: 10px;
          color: white;
          margin-left: 5px !important;
        }
        .checkbox-input label {
          color: white !important;
        }
        .search-input-small-wrap .ui.input {
          width: 100%;
        }

        @media screen and (max-width: 800px) {
          .search-input {
            width: 100%;
          }
          .checkbox-input-wrap {
            margin: auto;
          }
          .search-input-small-wrap{
            flex-direction: column;
          }
        }
      `}</style>
    <style jsx>{` 
       .select-all {
            font-size: 14px;
            cursor: pointer;
        }
        .category-wrap {
            padding: 5px 15px;
            border-radius: 5px;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            font-size: 20px;
            color: white;
            align-items: center;
        }
        .fa {
            margin-right: 4px;
        }
        .category-item {
            margin-right: 15px;
            cursor: pointer;
        }
        .category-item:nth-last-child(1) {
            margin:0;
        }
    `}</style>
  </Form>
);


function categoriesSelectorReducer(state, { type, payload }) {
  const nextState = Object.assign(state, {});
  switch (type) {
    case CHECKED:
      nextState[payload.key] = payload.value;
      break;
    case CHECKED_ALL:
      Object.keys(nextState).forEach((id) => {
        nextState[id] = true;
      });
      break;
    default:
      break;
  }
  return nextState;
}

const SearchInputBar = compose(
       withState('texts', 'onTextChange', () => {
         if (!Router.router) return '';
         const { query } = Router.router;
         if (!query.searchTexts) {
           return '';
         }
         return query.searchTexts;
       }),
       graphql(gql`
          query ($text: String) {
            autoCompletion(text: $text) {
              scientificName
              familyName
              name
              _id
            }
          }
       `, {
         options: ({ texts }) => ({
           variables: {
             text: texts,
           },
         }),
       }),
       withReducer('state', 'dispatch', categoriesSelectorReducer, ({ initCategories }) => {
         const initState = {};
         Object.keys(Categories).forEach((key) => {
           if (!Router.router) return;
           const { query } = Router.router;
           if (query.categories) {
             const selectedCategories = query.categories.split(',');
             if (selectedCategories.indexOf(key) > -1) {
               initState[key] = true;
             } else {
               initState[key] = false;
             }
           } else {
             initState[key] = false;
           }
         });

         if (initCategories) {
           initCategories.forEach((key) => {
             initState[key] = true;
           });
         }

         return initState;
       }),
       withProps(({ state, texts, data }) => ({
         data: objectPath(data),
         confirmSearch: () => {
           const categories = [];
           Object.keys(state).forEach((key) => {
             if (state[key]) {
               categories.push(key);
             }
           });

           const queryParam = {
             searchTexts: texts,
             categories: categories.join(','),
           };
           if (categories.length < 1) {
             queryParam.categories = Object.keys(Categories).join(',');
           }
           Router.push(`/results?${queryString.stringify(queryParam)}`);
         },
       })),
)(Component);

export default SearchInputBar;
