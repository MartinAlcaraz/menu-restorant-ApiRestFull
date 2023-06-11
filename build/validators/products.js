"use strict";

var _expressValidator = require("express-validator");
var _validateHelper = _interopRequireDefault(require("../helpers/validate.helper.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var validateCreateProduct = [(0, _expressValidator.body)('categoryId').exists().isString().isLength({
  min: 24,
  max: 24
}), (0, _expressValidator.body)('name').exists().isString().isLength({
  min: 3,
  max: 30
}), (0, _expressValidator.body)('imgURL').exists().isString().isLength({
  min: 10,
  max: 100
}), (0, _expressValidator.body)('price').exists().isNumeric().custom(function (value, _ref) {
  var req = _ref.req;
  if (value < 0 || value > 1000) {
    throw new Error("Precio debe ser mayor a 0 y menor a 1000");
  }
  return true;
})
//   regex:     123.00      1.00    12.5   <= match //
.matches(/^[0-9]{1,3}$|^[0-9]{1,3}[.][0-9]{1,2}$/).withMessage('El precio debe cumplir con la expresion 123 o 123.0 o 123.00'), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];
var validateGetOneProduct = [(0, _expressValidator.param)('productId').exists().isString().isLength({
  min: 24,
  max: 24
}).withMessage('The param must be an ID'), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];
var validateUpdateProduct = [(0, _expressValidator.param)('productId').exists().isString().isLength({
  min: 24,
  max: 24
}).withMessage('The param must be an ID'), (0, _expressValidator.body)('name').exists().isString().isLength({
  min: 3,
  max: 50
}), (0, _expressValidator.body)('imgURL').exists().isString().isLength({
  min: 10,
  max: 100
}), (0, _expressValidator.body)('price').exists().isNumeric().custom(function (value, _ref2) {
  var req = _ref2.req;
  if (value < 0 || value > 1000) {
    throw new Error("Precio debe ser mayor a 0 y menor a 1.000");
  }
  return true;
}), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];
var validateDeleteProduct = [(0, _expressValidator.param)('productId').exists().isString().isLength({
  min: 24,
  max: 24
}).withMessage('The param must be an ID'), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];
var validateGetProducts = [(0, _expressValidator.query)('page').optional().isNumeric().withMessage('Page must be a number').isInt({
  gt: 0
}).withMessage('Page must be greater than 1'), (0, _expressValidator.query)('limit').optional().isNumeric().withMessage('Limit must be a number').isInt({
  gt: 0
}).withMessage('Limit must be greater than 1'), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];
var validateSearchProduct = [(0, _expressValidator.query)('name').exists().withMessage("Query 'name' must exists.").isString().isLength({
  min: 1,
  max: 20
}).withMessage("The name must be greater than 1 and less than 20 characters."), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];
var validateProductsOfCategory = [(0, _expressValidator.param)('categoryName').exists().isString().isLength({
  min: 3,
  max: 30
}).withMessage('The category name must have >=3 and <=30 characters'), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];
module.exports = {
  validateCreateProduct: validateCreateProduct,
  validateGetOneProduct: validateGetOneProduct,
  validateUpdateProduct: validateUpdateProduct,
  validateDeleteProduct: validateDeleteProduct,
  validateGetProducts: validateGetProducts,
  validateSearchProduct: validateSearchProduct,
  validateProductsOfCategory: validateProductsOfCategory
};