// @flow
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import SearchDialog from '../components/SearchDialog';
import CategoryBar from '../components/CategoryBar';

import * as SearchActions from '../actions/searchbar';

const mapToState = (store) => {
	return {
		selectedCategory: store.searchbar.selectedCategory,
		searchInputValue: store.searchbar.searchInputValue,
	};
};
const mapToDispatch = (dispatch) => {
	return {
		...bindActionCreators(SearchActions, dispatch),
		confirmSearch: (text, categories) => {
			if (categories.length === 0) {
				alert('กรุณาเลือกอย่างน้อย 1 หมวด');
			} else {
				Router.push(`/result?text=${text}&categories=${categories.join(',')}`);

			}
		},
	};
};

export const SearchInputText = connect(mapToState, mapToDispatch)(SearchDialog);
export const SearchbarComponent = ({height}) => (
	<div className="search-container" style={{height}}>
		<SearchInputText fontSize={16} />
		<SearchCategory
			style={{ marginLeft: 20 }} fontSize={16}
			/>
		<style jsx>
			{
				`
				.search-container {
					background: rgba(50,84,26,0.4);
					margin-top: -80px;
					padding-top: 80px;
					padding-left: 30px;
					display:flex;
					flexDirection: row;
					align-items: center;
					height: 200px;
				}
				`
			}
		</style>
	</div>
)

const query = gql`
	query Results {
		queryCategory {
            name
            key
            _id
        }
	}
`;

export const SearchCategory = compose(
	graphql(query, { name: 'Results' }),
	connect(mapToState, mapToDispatch),
)(CategoryBar);

export default SearchInputText;
