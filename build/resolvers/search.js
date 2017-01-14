'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Herbarium = require('../models/Herbarium');

var _Herbarium2 = _interopRequireDefault(_Herbarium);

var _constant = require('./../constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    Query: {
        searchItem: function searchItem(_, args) {
            var _this = this;

            return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var query;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _Herbarium2.default.getLatestByPage(args);

                            case 2:
                                query = _context.sent;
                                return _context.abrupt('return', query);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }))();
        },
        categoryList: function categoryList() {
            return _constant2.default.SEARCH.CATEGORY_LIST;
        }
    }
};
//# sourceMappingURL=search.js.map