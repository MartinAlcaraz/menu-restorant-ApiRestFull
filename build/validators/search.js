"use strict";

var _expressValidator = require("express-validator");
var _validateHelper = _interopRequireDefault(require("../helpers/validate.helper.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var validateSearchProduct = [(0, _expressValidator.query)('name').exists().withMessage('Query name must exists.').isString().isLength({
  min: 1,
  max: 20
}), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];
module.exports = validateSearchProduct;