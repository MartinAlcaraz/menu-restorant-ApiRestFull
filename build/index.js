"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
var _app = _interopRequireDefault(require("./app.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
if (process.env.NODE_ENV == "development") {
  _dotenv["default"].config();
  console.log("NODE_ENV == development");
}
process.on('uncaughtException', function (err) {
  console.log("err.name ", err.name);
  console.log("err.message ", err.message);
  console.log("UncaughtException has ocurred. Shutting down.");
  process.exit(1);
});
var PORT = process.env.PORT || 3000;
var server = _app["default"].listen(PORT);
console.log("Server on port ", server.address().port);
process.on('unhandledRejection', function (err) {
  console.log("err.name ", err.name);
  console.log("err.message ", err.message);
  console.log("UnhandledRejection has ocurred. Shutting down.");
  server.close(function () {
    process.exit(1);
  });
});