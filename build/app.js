"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _CustomError = _interopRequireDefault(require("./Utils/CustomError.js"));
var _ErrorController = _interopRequireDefault(require("./controllers/Error.controller.js"));
var _morgan = _interopRequireDefault(require("morgan"));
require("./database.js");
var _initialSetup = _interopRequireDefault(require("./libs/initialSetup.js"));
var _index = _interopRequireDefault(require("./routes/index.js"));
var _cors = _interopRequireDefault(require("cors"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
(0, _initialSetup["default"])();

// app.use(cors({
//     origin: "http://localhost:5000"  // location of the react app were connecting to
//     // credentials: true  // cuando usar??
// }));
app.use((0, _cors["default"])());
app.use((0, _cookieParser["default"])());
app.use((0, _morgan["default"])("dev")); // imprime las solicitudes http en consola
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use("/api/", _index["default"]);
app.all('/*', function (req, res, next) {
  // res.status(404).json({status: "FAILED", message: `Route ${req.originalUrl} not found.`})

  var err = new _CustomError["default"]("Route ".concat(req.originalUrl, " with method - ").concat(req.method, " - not found."), 404);
  next(err);
});

// ErrorController => global error handler middleware 
// con next(err) arroja un error que es atrapado por ErroController
app.use(_ErrorController["default"]);
var _default = app;
exports["default"] = _default;