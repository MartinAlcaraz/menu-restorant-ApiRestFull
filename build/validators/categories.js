"use strict";

var _expressValidator = require("express-validator");
var _validateHelper = _interopRequireDefault(require("../helpers/validate.helper.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var validateCreateCategory = [(0, _expressValidator.body)('categoryName').exists().isString().isLength({
  min: 3,
  max: 30
}).withMessage('categoryName debe tener de 3 a 30 caracteres.'), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];
var validateDeleteCategory = [(0, _expressValidator.param)('categoryId').exists().isString().isLength({
  min: 24,
  max: 24
}).withMessage('The param must be an ID'), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];
var validateUpdateCategory = [(0, _expressValidator.param)('categoryId').exists().isString().isLength({
  min: 24,
  max: 24
}).withMessage('The param must be an ID'), (0, _expressValidator.body)('newCategoryName').exists().isString().isLength({
  min: 3,
  max: 30
}).withMessage('newCategoryName debe tener de 3 a 30 caracteres.'), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];
var validateGetOneCategory = [(0, _expressValidator.param)('categoryId').exists().isString().isLength({
  min: 24,
  max: 24
}).withMessage('The param must be an ID'), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];
module.exports = {
  validateCreateCategory: validateCreateCategory,
  validateGetOneCategory: validateGetOneCategory,
  validateUpdateCategory: validateUpdateCategory,
  validateDeleteCategory: validateDeleteCategory
};