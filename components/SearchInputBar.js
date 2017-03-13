// @flow
import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import { compose, withReducer, withState, withProps } from 'recompose';
import Router from 'next/router';
import queryString from 'query-string';

import Categories from '../category';

const CHECKED = 'input/CHECKED';
const CHECKED_ALL = 'input/CHECKED_ALL';

const Component = ({ small, dispatch, state, onTextChange, texts, confirmSearch }) => (
  <Form className={small ? 'search-input-small-wrap' : 'search-input-wrap'} onSubmit={(e) => { e.preventDefault(); confirmSearch(); }} >
    <Form.Input
      className="search-input"
      name="text"
      action={{ icon: 'search', color: 'blue' }}
      value={texts} onChange={e => onTextChange(e.target.value)} placeholder="Search..."
    />
    <Form.Group className="checkbox-input-wrap" inline id="size">
      { Categories ? Object.keys(Categories).map(
                key => (
                  <Form.Checkbox
                    className="checkbox-input"
                    key={Categories[key].value}
                    label={Categories[key].value}
                    checked={state[key]}
                    onChange={(e, { checked }) => dispatch({ type: CHECKED, payload: { key, value: checked } })}
                  />
                ),
            ) : null }
      <Label style={{ cursor: 'pointer' }} onClick={() => dispatch({ type: CHECKED_ALL })} >{'Select all'}</Label>
    </Form.Group>
    <style jsx global>{`
        .search-input-wrap {
            max-width: 400px !important;
            margin: auto;
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
    <style jsx>{` .select-all {
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
                    }`}
    </style>
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
        withReducer('state', 'dispatch', categoriesSelectorReducer, () => {
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
          return initState;
        }),
        withProps(({ state, texts }) => ({
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
            Router.push(`/results?${queryString.stringify(queryParam)}`);
          },
        })),
)(Component);


export default SearchInputBar;
