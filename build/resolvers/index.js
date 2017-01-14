'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _herbarium = require('./herbarium');

var _herbarium2 = _interopRequireDefault(_herbarium);

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _lodash.merge)(_herbarium2.default, _search2.default);
//# sourceMappingURL=index.js.map