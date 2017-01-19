// @flow
import * as SearchbarActions from './../actions/searchbar';

type SearchbarState = {
    selectedCategoryIndexes: { isSelected: boolean }[];
    searchInputValue: string;
}
export default (state: SearchbarState, action: any) => {
    let nextState: SearchbarState;
    if (!state) {
        nextState = {
            selectedCategoryIndexes: [],
            searchInputValue: '',
        };
    } else {
        nextState = Object.assign({}, state);
    }

    switch (action.type) {
        case SearchbarActions.SET_CATEGORIES:
            nextState.selectedCategoryIndexes = action.payload;
            break;
        case SearchbarActions.SELECTED_CATEGORY_AT_INDEX:
            nextState.selectedCategoryIndexes = action.payload;
            break;
        default:
            break;
    }

    return nextState;
};
