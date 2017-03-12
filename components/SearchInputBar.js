// @flow
import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import { compose, withReducer, withState, onlyUpdateForKeys, withProps } from 'recompose';
import Router from 'next/router';
import gql from 'graphql-tag';
import queryString from 'query-string';

const CHECKED = 'input/CHECKED';
const CHECKED_ALL = 'input/CHECKED_ALL';

const Component = ({ categories, dispatch, state, onTextChange, texts, confirmSearch }) => (
  <Form onSubmit={(e) => { e.preventDefault(); confirmSearch(); }} >
    <Form.Input name="text" action={{ icon: 'search' }} value={texts} onChange={e => onTextChange(e.target.value)} placeholder="Search..." />
    <Form.Group inline id="size">
      { categories ? categories.map(
                category => (
                  <Form.Checkbox
                    key={category.key}
                    label={category.name}
                    checked={state[category.key]}
                    onChange={(e, { checked }) => dispatch({ type: CHECKED, payload: { key: category.key, value: checked } })}
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
  console.log(nextState);
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
        withReducer('state', 'dispatch', categoriesSelectorReducer, ({ categories }) => {
          const initState = {};
          [{ key: 'garden' }, { key: 'herbarium' }, { key: 'museum' }].forEach((category) => {
            const { query } = Router.router;
            if (query.categories) {
              const selectedCategories = query.categories.split(',');
              if (selectedCategories.indexOf(category.key) > -1) {
                initState[category.key] = true;
              } else {
                initState[category.key] = false;
              }
            } else {
              initState[category.key] = false;
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

SearchInputBar.fragments = {
  categories: gql`
        fragment SearchInputBar on Category {
            _id
            name
            key
            thumbnailImage {
                secure_url
            }
        }
    `,
};

export default SearchInputBar;
