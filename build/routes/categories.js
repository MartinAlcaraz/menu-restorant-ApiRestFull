"use strict";

var _express = _interopRequireDefault(require("express"));
var _categoryController = _interopRequireDefault(require("../controllers/category.controller.js"));
var _categories = require("../validators/categories.js");
var _auth = require("../middlewares/auth.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/', _auth.verifyToken, _categoryController["default"].getCategories).get('/:categoryId', [_auth.verifyToken, _categories.validateGetOneCategory], _categoryController["default"].getOneCategory).post('/', [_auth.verifyToken, _categories.validateCreateCategory], _categoryController["default"].postCategory).put('/:categoryId', [_auth.verifyToken, _categories.validateUpdateCategory], _categoryController["default"].updateCategory)["delete"]('/:categoryId', [_auth.verifyToken, _categories.validateDeleteCategory], _categoryController["default"].deleteCategory);

// solo el admin puede crear, actualizar y eliminar las categorias

module.exports = router;