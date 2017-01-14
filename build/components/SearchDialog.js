"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constant = require("./../constant");

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var categoryList = _constant2.default.SEARCH.CATEGORY_LIST;

exports.default = function (props) {
    return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
            "div",
            { className: "input-wrap" },
            React.createElement("input", { placeholder: _constant2.default.SEARCH.PLACEHOLDER, onFocus: props.onFocus, className: "search-input", type: "text", value: props.value, onChange: props.onChange }),
            React.createElement(
                "button",
                { className: "search-submit" },
                React.createElement("i", { className: "fa fa-search" })
            )
        ),
        React.createElement(
            "div",
            { className: "category-wrap" },
            categoryList.map(function (item, i) {
                return React.createElement(
                    "div",
                    {
                        onClick: function onClick() {
                            props.onCategorySelected({
                                value: i,
                                selected: !props.currentCategoryIndexes.indexOf(i)
                            });
                        },
                        className: "category-item",
                        key: i
                    },
                    React.createElement("i", { className: "fa " + (!props.currentCategoryIndexes.indexOf(i) ? 'fa-check-square-o' : 'fa-square-o') }),
                    item.name
                );
            })
        ),
        React.createElement(
            "style",
            { jsx: true },
            "\n                    .container{\n                        display:flex;\n                        flex-direction: column;\n                        align-items: center;\n                    }\n                    .input-wrap {\n                        display:flex;\n                        align-items: stretch;\n                        padding: 3px;\n                        border-radius: 3px;\n                        background: rgba(0, 0, 0, 0.3);\n                    }\n                    .search-submit {\n                        display:flex;\n                        justify-content: center;\n                        align-items: center;\n                        color: white;\n                        background: #006ba5;\n                        border:none;\n                        padding: 8px 15px 8px 17px;\n                        font-size: 28px;\n                    }\n                    .search-input {\n                        font-size: 24px;\n                        min-width: 250px;\n                        width: 450px;\n                        padding: 7px 25px 6px 25px;\n                    }\n                    .search-input:focus {\n                        outline: none;\n                    }\n                    @media screen and (max-width: 640px) {\n                        .search-input {\n                            width: 320px;\n                        }\n                    } \n                    .category-wrap {\n                        margin-top: 15px;\n                        padding: 5px 15px;\n                        border-radius: 10px;\n                        background: rgba(0, 0, 0, 0.3);\n                        display: flex;\n                        font-size: 20px;\n                        color: white;\n                    }\n                    .fa {\n                        margin-right: 4px;\n                    }\n                    .category-item {\n                        margin-right: 15px;\n                    }\n                    .category-item:nth-last-child(1) {\n                        margin:0;\n                    }\n                "
        )
    );
};
//# sourceMappingURL=SearchDialog.js.map