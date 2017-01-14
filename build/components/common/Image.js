"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (props) {
    return React.createElement(
        "div",
        { className: "wrap " + (props.className || '') },
        props.source ? React.createElement("img", { alt: "", src: props.source }) : React.createElement(
            "div",
            { className: "placeholder" },
            'ไม่มีรูปภาพ'
        ),
        React.createElement(
            "style",
            { jsx: true },
            "\n                    .wrap {\n                        display: flex;\n                        flex-direction: row;\n                        flex: 1 0 auto;\n                        align-items: stretch;\n                    }\n                    .placeholder {\n                        flex:1 0 100%;\n                        background: #ccc;\n                        color: #979797;\n                        display: flex;\n                        justify-content: center;\n                        align-items: center;\n                    }\n                "
        )
    );
};
//# sourceMappingURL=Image.js.map