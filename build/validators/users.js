"use strict";

var _expressValidator = require("express-validator");
var _validateHelper = _interopRequireDefault(require("../helpers/validate.helper.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// newUsername , password, newPassword
var validateUpdateUser = [(0, _expressValidator.body)('newUsername').exists().withMessage('Ingrese el campo newUsername').not().isEmpty().withMessage('el campo newUsername no puede esta vacio').isString().withMessage('newUsername debe ser un tipo de dato string.').isLength({
  min: 3,
  max: 15
}).withMessage('newUsername debe tener de 3 a 15 caracteres.').trim(), (0, _expressValidator.body)('password').exists().withMessage('Ingrese el campo password').isString().withMessage('password debe ser un tipo de dato string').isLength({
  min: 3,
  max: 10
}).withMessage('password debe tener de 3 a 10 caracteres.'), (0, _expressValidator.body)('newPassword').exists().withMessage('Ingrese el campo newPassword').isString().withMessage('newPassword debe ser un tipo de dato string').isLength({
  min: 3,
  max: 10
}).withMessage('newPassword debe tener de 3 a 10 caracteres.'), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];
var validateDeleteUser = [(0, _expressValidator.body)("userId").exists().withMessage("userId property must exists.").isString().isLength({
  min: 24,
  max: 24
}).withMessage("The userId debe tener 24 caracteres"), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];

// username, email, password, roles 
var validateCreateUser = [(0, _expressValidator.body)('username').exists().withMessage('Ingrese el campo username').not().isEmpty().withMessage('el campo username no puede esta vacio').isString().withMessage('username debe ser un tipo de dato string.').isLength({
  min: 3,
  max: 15
}).withMessage('username debe tener de 3 a 15 caracteres.').trim(), (0, _expressValidator.body)('email').exists().withMessage('el campo email no existe').notEmpty().withMessage('el campo email no puede estar vacio').isString().isEmail().withMessage('ingrese un email valido').trim(), (0, _expressValidator.body)('password').exists().withMessage('Ingrese el campo password').isString().withMessage('password debe ser un tipo de dato string').isLength({
  min: 3,
  max: 10
}).withMessage('password debe tener de 3 a 10 caracteres.'), (0, _expressValidator.body)("roles").isArray({
  min: 0,
  max: 3
}).withMessage('el campo roles debe ser un array[] y debe tener como maximo 3 items.'), (0, _expressValidator.body)("roles.*").isString().withMessage("los elementos del array roles deben ser de tipo string.").isLength({
  min: 0,
  max: 7
}).withMessage("los elementos strings del array roles deben ser de 7 o menos caracteres."), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];
var validateParamUsername = [(0, _expressValidator.param)('username').exists().withMessage('Ingrese el parametro username').not().isEmpty().withMessage('el parametro username no puede estar vacio').isString().withMessage('username debe ser un tipo de dato string.').isLength({
  min: 3,
  max: 15
}).withMessage('username debe tener de 3 a 15 caracteres.').trim(), function (req, res, next) {
  (0, _validateHelper["default"])(req, res, next);
}];
module.exports = {
  validateUpdateUser: validateUpdateUser,
  validateDeleteUser: validateDeleteUser,
  validateCreateUser: validateCreateUser,
  validateParamUsername: validateParamUsername
};