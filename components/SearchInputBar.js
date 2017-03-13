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
  <Form style={{ display: small ? 'flex' : 'block', alignItems: 'center' }}onSubmit={(e) => { e.preventDefault(); confirmSearch(); }} >
    <Form.Input name="text" action={{ icon: 'search' }} value={texts} onChange={e => onTextChange(e.target.value)} placeholder="Search..." />
    <Form.Group inline id="size" style={{ marginLeft: small ? '10px' : '0' }}>
      { Categories ? Object.keys(Categories).map(
                key => (
                  <Form.Checkbox
                    key={Categories[key].value}
                    label={Categories[key].value}
                    checked={state[key]}
                    onChange={(e, { checked }) => dispatch({ type: CHECKED, payload: { key, value: checked } })}
                  />
                ),
            ) : null }
      <Label style={{ cursor: 'pointer' }} onClick={() => dispatch({ type: CHECKED_ALL })} >{'Select all'}</Label>
    </Form.Group>
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
          const { query } = Router.router;
          if (!query.searchTexts) {
            return '';
          }
          return query.searchTexts;
        }),
        withReducer('state', 'dispatch', categoriesSelectorReducer, () => {
          const initState = {};
          Object.keys(Categories).forEach((key) => {
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
