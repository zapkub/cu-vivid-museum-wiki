"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Image = require("./common/Image");

var _Image2 = _interopRequireDefault(_Image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
            "div",
            { className: "wrap" },
            React.createElement(
                "div",
                { className: "thumbnail" },
                React.createElement(_Image2.default, { source: props.imageURL })
            ),
            React.createElement(
                "div",
                { className: "detail" },
                React.createElement(
                    "div",
                    { className: "detail-wrap" },
                    React.createElement(
                        "h2",
                        null,
                        props.name || 'ไม่ระบุ'
                    ),
                    React.createElement(
                        "div",
                        { className: "field" },
                        React.createElement(
                            "span",
                            { className: "name" },
                            "\u0E0A\u0E37\u0E48\u0E2D\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C"
                        ),
                        ":",
                        React.createElement(
                            "span",
                            { className: "value" },
                            props.scientificName || 'ไม่ระบุ'
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "field" },
                        React.createElement(
                            "span",
                            { className: "name" },
                            "\u0E0A\u0E37\u0E48\u0E2D\u0E27\u0E07\u0E28\u0E4C"
                        ),
                        ":",
                        React.createElement(
                            "span",
                            { className: "value" },
                            props.scientificName || 'ไม่ระบุ'
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "footer" },
                    React.createElement(
                        "div",
                        null,
                        "\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A : ",
                        React.createElement(
                            "span",
                            { style: { color: '#e896ab', fontWeight: 'bold' } },
                            props.slotNo
                        )
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "span",
                            null,
                            "\u0E40\u0E25\u0E02\u0E23\u0E2B\u0E31\u0E2A : "
                        ),
                        props.cuid
                    )
                )
            )
        ),
        React.createElement(
            "style",
            { jsx: true },
            "\n                .container {\n                    padding: 3px;\n                    box-sizing: border-box;\n                    flex: 0 0 50%;\n                }\n                .wrap {\n                    display: flex;\n                    background: #f9f9f9;\n                    box-sizing: border-box;\n                    padding: 10px;\n                }\n                .thumbnail {\n                    width: 150px;\n                    height: 130px;\n                    padding-right: 10px;\n                    display:flex;\n                    align-self: center;\n                }\n                .detail {\n                    flex:1 0 auto;\n                }\n                .detail-wrap {\n                    padding-bottom: 20px;\n                    border-bottom: 1px #eaeaea solid;\n                }\n                h2 {\n                    color: #4d876d;\n                    font-weight: normal;\n                    font-size: 28px;\n                    margin: 10px 0;\n                    font-family: supermarketregular, Helvetica Neue,Helvetica,Arial,sans-serif;\n                }\n                .field {\n                    display: flex;\n                    font-size: 16px;\n                }\n                .field .value{\n                    font-style: italic;\n                    margin-left: 5px;\n                }\n                .field .name {\n                    display: inline-block;\n                    width: 120px;\n                }\n                .footer {\n                    font-size: 12px;\n                    margin-top: 10px;\n                    display: flex;\n                    justify-content: space-between;\n                }\n                "
        )
    );
};
//# sourceMappingURL=ResultItem.js.map