// @flow
import { createAction } from 'redux-actions';

export const UDPATE_SEARCH_VALUE = 'UPDATE_SEARCH_VALUE';
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY';

export const onToggleCategory = createAction(TOGGLE_CATEGORY);
export const onSearchValueChange = createAction(UDPATE_SEARCH_VALUE);
