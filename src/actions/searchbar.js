// @flow
import { createAction } from 'redux-actions';

export const UDPATE_SEARCH_VALUE = 'UPDATE_SEARCH_VALUE';
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY';
export const CLEAR_SELECTED_CATEGORY = 'CLEAR_SELECTED_CATEGORY';

export const onToggleCategory = createAction(TOGGLE_CATEGORY);
export const updateSearchValue = createAction(UDPATE_SEARCH_VALUE);
export const clearSelectedCategory = createAction(CLEAR_SELECTED_CATEGORY);

export const onSearchValueChange = (input: string) => dispatch => {
    dispatch(updateSearchValue(input));
};
