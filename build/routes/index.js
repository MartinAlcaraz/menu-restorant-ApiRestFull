"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var pathRouter = "".concat(__dirname);
var removeExtension = function removeExtension(file) {
  return file.split('.').shift();
};

// metodo para que cada nombre de un archivo de la carpeta 'routes' sea una ruta de la api 
_fs["default"].readdirSync(pathRouter).filter(function (file) {
  var fileWithOutExt = removeExtension(file);
  var skip = ['index'].includes(fileWithOutExt);
  if (!skip) {
    console.log(fileWithOutExt);
    router.use("/".concat(fileWithOutExt), require("./".concat(fileWithOutExt, ".js")));
  }
});

// router.use('/*', (req, res)=>{
//     res.status(404).json({status: "FAILED", message: "Route not found."})
// });
var _default = router;
exports["default"] = _default;