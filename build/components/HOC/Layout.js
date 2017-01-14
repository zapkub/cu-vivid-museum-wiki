'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = connectLayout;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _head = require('next/head');

var _head2 = _interopRequireDefault(_head);

var _reactRedux = require('react-redux');

var _apolloClient = require('apollo-client');

var _apolloClient2 = _interopRequireDefault(_apolloClient);

var _reactApollo = require('react-apollo');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Header = require('../common/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('../common/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _configStore = require('../../store/configStore');

var _configStore2 = _interopRequireDefault(_configStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _apolloClient2.default({
    // networkInterface: createNetworkInterface(),
});

// export default ({ req, children, title = 'This is the default title' }) =>

function connectLayout(Component) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'พิพิธภัณฑ์ เภสัชศาสตร์';

    var Layout = function (_React$Component) {
        (0, _inherits3.default)(Layout, _React$Component);
        (0, _createClass3.default)(Layout, null, [{
            key: 'getInitialProps',
            value: function getInitialProps(_ref) {
                var req = _ref.req;

                var isServer = !!req;
                return {
                    isServer: isServer
                };
            }
        }]);

        function Layout(props) {
            (0, _classCallCheck3.default)(this, Layout);

            var _this = (0, _possibleConstructorReturn3.default)(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));

            _this.store = (0, _configStore2.default)(props.initialState, client, props.isServer);
            return _this;
        }

        (0, _createClass3.default)(Layout, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    { id: 'Vivid-app' },
                    _react2.default.createElement(
                        _head2.default,
                        null,
                        _react2.default.createElement(
                            'title',
                            null,
                            title
                        ),
                        _react2.default.createElement('meta', { charSet: 'utf-8' }),
                        _react2.default.createElement('meta', { name: 'viewport', content: 'initial-scale=1.0, width=device-width' }),
                        _react2.default.createElement('link', { href: '/static/fonts/circular/stylesheet.css', rel: 'stylesheet' }),
                        _react2.default.createElement('link', { href: '/static/fonts/chula-narak/stylesheet.css', rel: 'stylesheet' }),
                        _react2.default.createElement('link', { href: '/static/fonts/supermarket/stylesheet.css', rel: 'stylesheet' }),
                        _react2.default.createElement('link', { href: '/static/fonts/superspace/stylesheet.css', rel: 'stylesheet' }),
                        _react2.default.createElement('link', { href: '/static/fonts/fontawesome/css/font-awesome.min.css', rel: 'stylesheet' }),
                        _react2.default.createElement(
                            'style',
                            { global: true },
                            '\n                        * {\n                            -webkit-font-smoothing: antialiased;\n                        }\n                        body {\n                            margin: 0;\n                            padding: 0;\n                            font-family: Thonburi, Tahoma, Helvetica Neue,Helvetica,Arial,sans-serif;\n                        }\n                        '
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'container' },
                        _react2.default.createElement(_Header2.default, null),
                        _react2.default.createElement(
                            'div',
                            { className: 'content' },
                            _react2.default.createElement(
                                _reactApollo.ApolloProvider,
                                { store: this.store, client: client },
                                _react2.default.createElement(Component, this.props)
                            )
                        ),
                        _react2.default.createElement(_Footer2.default, null),
                        _react2.default.createElement(
                            'style',
                            { jsx: true },
                            '\n                        .container {\n                            display: flex;\n                            min-height: 100vh;\n                            flex-direction: column;\n                        }\n                        .content {\n                            flex: 2 0 auto;\n                        }\n                        '
                        )
                    )
                );
            }
        }]);
        return Layout;
    }(_react2.default.Component);

    return Layout;
}
//# sourceMappingURL=Layout.js.map