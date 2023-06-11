"use strict";

var _express = _interopRequireDefault(require("express"));
var _productsController = _interopRequireDefault(require("../controllers/products.controller.js"));
var _auth = require("../middlewares/auth.js");
var _products = require("../validators/products.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/', _products.validateGetProducts, _productsController["default"].getProducts)
// query predefinida en productsCtrl.getBestProducts
.get('/popularProducts', _productsController["default"].queryBestProducts, _productsController["default"].getProducts)
// search => query ?name=algo 
.get('/search', [_products.validateSearchProduct], _productsController["default"].searchProducts).get('/category/:categoryName', _products.validateProductsOfCategory, _productsController["default"].getProductsOfCategory).get('/getStats', _productsController["default"].getStats) // retorna las estadisticas.
.get('/:productId', _products.validateGetOneProduct, _productsController["default"].getOneProduct).post('/', [_auth.verifyToken, _products.validateCreateProduct], _productsController["default"].postProduct).put('/:productId', [_auth.verifyToken, _auth.isAdmin, _products.validateUpdateProduct], _productsController["default"].updateProduct)["delete"]('/:productId', [_auth.verifyToken, _auth.isAdmin, _products.validateDeleteProduct], _productsController["default"].deleteProduct);
module.exports = router;