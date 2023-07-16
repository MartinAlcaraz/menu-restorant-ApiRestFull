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
    var msg = err.errors.map(function (val) {
      return val.msg;
    });
    var errorMsg = msg.join('. ');
    res.status(400).json({
      status: "FAILED",
      message: errorMsg,
      details: err.errors
    });
  }
};
var _default = validateResult;
exports["default"] = _default;