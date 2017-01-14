'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _searchbar = require('./../actions/searchbar');

var SearchbarActions = _interopRequireWildcard(_searchbar);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (state, action) {
    var nextState = void 0;
    if (!state) {
        nextState = {
            selectedCategoryIndexes: [],
            searchInputValue: ''
        };
    } else {
        nextState = Object.assign({}, state);
    }

    switch (action.type) {
        case SearchbarActions.SELECTED_CATEGORY_AT_INDEX:
            nextState.selectedCategoryIndexes = action.payload;
            break;
        default:
            break;
    }

    return nextState;
};
//# sourceMappingURL=searchbar.js.map