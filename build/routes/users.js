"use strict";

var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controllers/user.controller.js"));
var _users = require("../validators/users.js");
var _auth = require("../middlewares/auth.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/', [_auth.verifyToken, _auth.isAdmin], _userController["default"].getUsers) // retorna la lista de usuarios sólo al admin
.get('/:username', [_auth.verifyToken, _users.validateParamUsername], _userController["default"].getOneUser) // retorna 1 usario
.put('/', [_auth.verifyToken, _users.validateUpdateUser], _userController["default"].updateUser) // comprueba el password actual y actualiza el username y password. La actualizacion la hace el usuario logueado.
.post('/', [_auth.verifyToken, _auth.isAdmin, _users.validateCreateUser], _userController["default"].createUser)["delete"]('/', [_auth.verifyToken, _auth.isAdmin, _users.validateDeleteUser], _userController["default"].deleteUser); // elimina 1 usuario

module.exports = router;