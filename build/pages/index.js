'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n    query{\n        getHerbariums(page: 2) {\n            total\n            currentPage\n            totalPages,\n            results {\n                cuid\n                name\n                blockNo\n                slotNo\n                scientificName\n                collector_en\n                collector_th\n                altitude\n                date\n                family\n                locationName\n                otherName\n                duplicateAmount\n                habit\n                note\n            }\n        }\n    }\n'], ['\n    query{\n        getHerbariums(page: 2) {\n            total\n            currentPage\n            totalPages,\n            results {\n                cuid\n                name\n                blockNo\n                slotNo\n                scientificName\n                collector_en\n                collector_th\n                altitude\n                date\n                family\n                locationName\n                otherName\n                duplicateAmount\n                habit\n                note\n            }\n        }\n    }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _reactRedux = require('react-redux');

var _reactApollo = require('react-apollo');

var _Layout = require('./../components/HOC/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _Landing = require('./../components/Landing');

var _Landing2 = _interopRequireDefault(_Landing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var query = (0, _graphqlTag2.default)(_templateObject);

var IndexPage = (0, _reactApollo.compose)((0, _reactApollo.graphql)(query, {
    name: 'Results'
}), (0, _reactRedux.connect)(function (store) {
    return store.searchbar;
}))(_Landing2.default);

exports.default = (0, _Layout2.default)(IndexPage);
//# sourceMappingURL=index.js.map