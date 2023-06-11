"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _expressValidator = require("express-validator");
var validateResult = function validateResult(req, res, next) {
  try {
    (0, _expressValidator.validationResult)(req)["throw"]();
    next();
  } catch (err) {
    res.status(403).json({
      errors: err.array()
    });
  }
};
var _default = validateResult;
exports["default"] = _default;