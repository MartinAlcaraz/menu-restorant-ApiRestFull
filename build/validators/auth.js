"use strict";

var _expressValidator = require("express-validator");
var _validate = _interopRequireDefault(require("../helpers/validate.helper"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// email, password
var validateSingIn = [(0, _expressValidator.body)("email").exists().isEmail().withMessage("el campo email debe tener el formato alguien@email.com").isLength({
  max: 50
}).withMessage("el email no puede tener mas de 50 caracteres."), (0, _expressValidator.body)('password').exists().withMessage('Ingrese el campo password').isString().withMessage('password debe ser un tipo de dato string').isLength({
  min: 4,
  max: 10
}).withMessage('password debe tener de 4 a 10 caracteres.'), function (req, res, next) {
  (0, _validate["default"])(req, res, next);
}];
var validateForgotPassword = [(0, _expressValidator.body)("email").exists().isEmail().withMessage("el campo email debe tener el formato alguien@email.com").isLength({
  max: 50
}).withMessage("el email no puede tener mas de 50 caracteres."), function (req, res, next) {
  (0, _validate["default"])(req, res, next);
}];
var validateResetPassword = [(0, _expressValidator.param)("resetToken").exists(), function (req, res, next) {
  (0, _validate["default"])(req, res, next);
}];
module.exports = {
  validateSingIn: validateSingIn,
  validateForgotPassword: validateForgotPassword,
  validateResetPassword: validateResetPassword
};