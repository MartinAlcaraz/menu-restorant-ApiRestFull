"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// atrapa los errores producidos en los controladores y los tira al Error.controller
var _default = function _default(func) {
  return function (req, res, next) {
    func(req, res, next)["catch"](function (error) {
      return next(error);
    });
  };
};
exports["default"] = _default;