'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constant = require('./../../constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function (_React$Component) {
    (0, _inherits3.default)(Header, _React$Component);

    function Header() {
        (0, _classCallCheck3.default)(this, Header);
        return (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    (0, _createClass3.default)(Header, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'header',
                { className: 'container' },
                _react2.default.createElement('img', { className: 'logo', alt: '', src: this.props.logoURL || '/../../static/images/logo.png' }),
                _react2.default.createElement(
                    'div',
                    { className: 'title' },
                    '' + _constant2.default.HEADER.TITLE
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'subtitle' },
                    '- ' + _constant2.default.HEADER.SUBTITLE
                ),
                _react2.default.createElement(
                    'style',
                    { jsx: true },
                    '\n                        .container {\n                            height: 60px;\n                            padding: 10px 25px;\n                            display: flex;\n                            flex-direction: row;\n                            align-items: center;\n                            font-family: supermarketregular, Helvetica Neue,Helvetica,Arial,sans-serif;\n                            background: rgba(0,0,0,0.5);\n                            color: white;\n                            flex:0 0 auto;\n                            z-index: 2;\n                        }\n                        .logo {\n                            width: 50px;\n                        }\n                        .title {\n                            font-size: 30px;\n                            margin-left: 20px;\n                        }\n                        .subtitle {\n                            margin-top: 3px;\n                            font-size: 15px;\n                            margin-left: 5px;\n                        }\n                    '
                )
            );
        }
    }]);
    return Header;
}(_react2.default.Component);

exports.default = Header;
//# sourceMappingURL=Header.js.map