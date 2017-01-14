'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('next/link');

var _link2 = _interopRequireDefault(_link);

var _ResultList = require('./ResultList');

var _ResultList2 = _interopRequireDefault(_ResultList);

var _SearchDialog = require('./SearchDialog');

var _SearchDialog2 = _interopRequireDefault(_SearchDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {

    return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
            'div',
            { className: 'background-wrap' },
            _react2.default.createElement(
                'div',
                { className: 'search-wrap' },
                _react2.default.createElement(_SearchDialog2.default, { currentCategoryIndexes: [] })
            )
        ),
        _react2.default.createElement(
            'h2',
            null,
            'ข้อมูลล่าสุด'
        ),
        _react2.default.createElement(
            'div',
            null,
            props.Results.loading ? 'Loading...' : _react2.default.createElement(_ResultList2.default, { results: props.Results.getHerbariums ? props.Results.getHerbariums.results : [] })
        ),
        _react2.default.createElement(
            _link2.default,
            { href: '/result' },
            ' Result '
        ),
        _react2.default.createElement(
            'style',
            { jsx: true },
            '\n                .container {\n                    \n                }\n                h2 {\n                    text-align: center;\n                } \n                .background-wrap {\n                    margin-top: -80px;\n                    padding-top: 80px;\n                    background: url(\'./../static/images/landing-image.jpg\') center center / cover\n                }\n                .search-wrap {\n                    height: 350px;\n                    display: flex;\n                    flex-direction: column;\n                    align-items: center;\n                    justify-content: center;\n                }\n           '
        )
    );
};
//# sourceMappingURL=Landing.js.map