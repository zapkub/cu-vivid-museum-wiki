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

var COLOR = _constant2.default.COLOR,
    STYLE = _constant2.default.STYLE;

var Footer = function (_React$Component) {
    (0, _inherits3.default)(Footer, _React$Component);

    function Footer() {
        (0, _classCallCheck3.default)(this, Footer);
        return (0, _possibleConstructorReturn3.default)(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
    }

    (0, _createClass3.default)(Footer, [{
        key: 'renderExternalLink',
        value: function renderExternalLink() {
            return _react2.default.createElement(
                'div',
                { className: 'external-link-wrap' },
                _react2.default.createElement(
                    'h2',
                    null,
                    'เว็บไซต์ด้านเภสัชกรรม'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'link-list' },
                    _react2.default.createElement(
                        'a',
                        { href: '#' },
                        'กระทรวงสาธารณสุข'
                    ),
                    _react2.default.createElement(
                        'a',
                        { href: '#' },
                        'สำนักงานคณะกรรมการอาหารและยา'
                    ),
                    _react2.default.createElement(
                        'a',
                        { href: '#' },
                        'องค์การเภสัชกรรม'
                    ),
                    _react2.default.createElement(
                        'a',
                        { href: '#' },
                        'เภสัชกรรมสมาคมแห่งประเทศไทย'
                    ),
                    _react2.default.createElement(
                        'a',
                        { href: '#' },
                        'สภาเภสัชกรรม'
                    )
                ),
                _react2.default.createElement(
                    'style',
                    { jsx: true },
                    '\n                        a {\n                            color: #848586;\n                        }\n                        h2 {\n                            font-weight: normal;\n                            font-family: supermarketregular, Helvetica Neue,Helvetica,Arial,sans-serif; \n                        }\n                        .link-list {\n                            display: flex;\n                            flex-direction: column;\n                        }\n                        '
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(
                    'div',
                    { className: 'wrap' },
                    _react2.default.createElement(
                        'div',
                        { className: 'info-wrap' },
                        _react2.default.createElement('img', { alt: '', className: 'logo', src: '/static/images/logo.png', width: '40' }),
                        _react2.default.createElement('br', null),
                        'คณะเภสัชศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย',
                        _react2.default.createElement('br', null),
                        '254 ถนนพญาไทย เขตปทุมวัน',
                        _react2.default.createElement('br', null),
                        '10330',
                        _react2.default.createElement(
                            'div',
                            { className: 'social-wrap' },
                            _react2.default.createElement(
                                'div',
                                { className: 'social-item' },
                                _react2.default.createElement('img', { alt: '', src: '/static/icon/feed.svg' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'social-item' },
                                _react2.default.createElement('img', { alt: '', src: '/static/icon/facebook.svg' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'social-item' },
                                _react2.default.createElement('img', { alt: '', src: '/static/icon/twiiter.svg' })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'contact-info-wrap' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement('img', { alt: '', src: '/static/icon/phone.svg', width: '10' }),
                            '02-218-8283'
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement('img', { alt: '', src: '/static/icon/fax.svg', width: '10' }),
                            '02-251-5086'
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement('img', { alt: '', src: '/static/icon/email.svg', width: '10' }),
                            'pharm_ce@yahoo.com'
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement('img', { alt: '', src: '/static/icon/website.svg', width: '10' }),
                            'www.pharm-ce-chula.com'
                        )
                    ),
                    this.renderExternalLink()
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'bottom-row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'bottom-wrap' },
                        'Copyright © 2010-2011 Continuing Education Unit. All rights reserved'
                    )
                ),
                _react2.default.createElement(
                    'style',
                    { jsx: true },
                    '\n                        .container {\n                            background-color: #252627;\n                            color: #848586;\n                            margin-top: 30px;\n                            padding:30px 0 0 0;\n                        }\n                        .wrap {\n                            max-width: 1024px;\n                            margin:0 auto;\n                            display:flex;\n                            flex-direction: row;\n                            justify-content: space-between;\n                            padding:20px 10px;\n                        }\n                        @media screen and (max-width: 1024px) {\n                            .wrap {\n                                justify-content: space-around;\n                            }\n                        }\n                        @media screen and (max-width: 600px) {\n                            .wrap {\n                                flex-direction: column;\n                                align-items: stretch;\n                            }\n                        }\n                        .contact-info-wrap {\n                            display:flex;\n                            justify-content: center;\n                            align-items: flex-start;\n                            flex-direction: column;\n                        }\n                        @media screen and (max-width: 600px) {\n                            .contact-info-wrap {\n                                align-items: center;\n                            }\n                        }\n                        .logo {\n                            padding-bottom:10px;\n                        }\n                        .contact-info-wrap img {\n                            margin-right:5px;\n                        }\n                        .social-wrap{ \n                            display: flex;\n                            flex-direction: row;\n                            margin:10px 0;\n                        }\n                        .social-item {\n                            height:40px;\n                            margin: 0px 4px;\n                            width: 40px;\n                            padding: 10px;\n                            border: #848586 solid 1px;\n                            box-sizing: border-box;\n                            border-radius: 50%;\n                            display: flex;\n                            justify-content: center;\n                            align-items: center;\n                        }\n                        .social-item img {\n                            height:15px;\n                        }\n                        .bottom-row {\n                            background:black;\n                            padding:15px;\n                        }\n                        .bottom-row .bottom-wrap {\n                            margin:0 auto;\n                            display:flex;\n                            flex-direction: row;\n                            max-width: 1024px;\n                            justify-content: space-between;\n                        }\n                        @media screen and (max-width: 1024px) {\n                            .bottom-row .bottom-wrap {\n                                justify-content: space-around;\n                            }\n                        }\n                        @media screen and (max-width: 600px) {\n                            .bottom-row .bottom-wrap {\n                                flex-direction: column;\n                                align-items: stretch;\n                            }\n                        }\n                        '
                )
            );
        }
    }]);
    return Footer;
}(_react2.default.Component);

exports.default = Footer;
//# sourceMappingURL=Footer.js.map