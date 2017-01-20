// @flow
import * as SearchbarActions from './../actions/searchbar';

type SearchbarState = {
    selectedCategory: string[];
    searchInputValue: string;
};

export default (state: SearchbarState, action: any) => {
    let nextState: SearchbarState;
    if (!state) {
        nextState = {
            selectedCategory: [],
            searchInputValue: '',
        };
    } else {
        nextState = Object.assign({}, state);
    }

    switch (action.type) {
        case SearchbarActions.TOGGLE_CATEGORY:
            const isToggle = nextState.selectedCategory.indexOf(action.payload);
            if(isToggle > -1) {
                nextState.selectedCategory = nextState.selectedCategory.filter((key) => key !== action.payload);
            } else {
                nextState.selectedCategory = [...nextState.selectedCategory, action.payload]
            }
            break;
        case SearchbarActions.UDPATE_SEARCH_VALUE:
            nextState.searchInputValue = action.payload;
            break;
        default:
            break;
    }
    return nextState;
};
