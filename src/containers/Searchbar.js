// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router'
import SearchDialog from '../components/SearchDialog';
import CategoryBar from '../components/CategoryBar';

import * as SearchActions from '../actions/searchbar';

const mapToState = (store) => {
	return {
		selectedCategory: store.searchbar.selectedCategory,
		searchInputValue: store.searchbar.searchInputValue,
	}
}
const mapToDispatch = (dispatch) => {
	return {
		...bindActionCreators(SearchActions, dispatch),
		confirmSearch: (text, categories) => {
			Router.push(`/result?text=${text}&categories=${categories.join(',')}`);
		}
	}
}

export const SearchInputText = connect(mapToState, mapToDispatch)(SearchDialog);
export const SearchCategory = connect(mapToState, mapToDispatch)(CategoryBar);
export default SearchInputText;