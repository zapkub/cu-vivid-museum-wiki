"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _ResultItem = require("./ResultItem");

var _ResultItem2 = _interopRequireDefault(_ResultItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var results = _ref.results;
    return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
            "div",
            { className: "listWrap" },
            results.map(function (item, i) {
                return React.createElement(_ResultItem2.default, (0, _extends3.default)({}, item, { key: i }));
            })
        ),
        React.createElement(
            "style",
            { jsx: true },
            "\n                    .container {\n                        width: 100%;\n                        display: flex;\n                        flex-direction: column;\n                        align-items: center;\n                    }\n                    .listWrap {\n                        max-width: 1024px;\n                        display: flex;\n                        flex-wrap: wrap;\n                    }\n                "
        )
    );
};
//# sourceMappingURL=ResultList.js.map