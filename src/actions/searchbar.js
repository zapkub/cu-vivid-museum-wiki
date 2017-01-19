// @flow
import { createAction } from 'redux-actions';

export const SELECTED_CATEGORY_AT_INDEX = 'SELECTED_CATEGORY_AT_INDEX';
export const UDPATE_SEARCH_VALUE = 'UPDATE_SEARCH_VALUE';
export const SET_CATEGORIES = 'SET_CATEGORIES';

export const setCategories = 'SET_CATEGORIES';
export const selectedCategoryAtIndex = createAction(SELECTED_CATEGORY_AT_INDEX);
export const onSearchValueChange = createAction(UDPATE_SEARCH_VALUE);
