"use strict";

var _express = _interopRequireDefault(require("express"));
var _productsController = _interopRequireDefault(require("../controllers/products.controller.js"));
var _search = _interopRequireDefault(require("../validators/search.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/', _search["default"], _productsController["default"].searchProducts);
module.exports = router;