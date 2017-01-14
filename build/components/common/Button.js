"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (props) {
    return React.createElement(
        "button",
        null,
        props.title,
        React.createElement(
            "style",
            { jsx: true },
            "\n                        .button {\n                            background: #F9F9F9;\n                        }\n                    "
        )
    );
};
//# sourceMappingURL=Button.js.map