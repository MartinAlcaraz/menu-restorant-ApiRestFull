"use strict";

var _express = _interopRequireDefault(require("express"));
var _authController = _interopRequireDefault(require("../controllers/auth.controller.js"));
var _auth = require("../validators/auth.js");
var _auth2 = require("../middlewares/auth.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post('/login', _auth.validateSingIn, _authController["default"].logIn).get('/isLogged', _auth2.verifyToken, _authController["default"].isLogged).post('/logout', _auth2.verifyToken, _authController["default"].logOut).post('/forgotPassword', _auth.validateForgotPassword, _authController["default"].forgotPassword).patch('/resetPassword/:resetToken', _auth.validateResetPassword, _authController["default"].resetPassword);
// solo el admin puede crear un nuevo usuario

module.exports = router;