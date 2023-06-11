"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// jwt.sign({dato que se desea guardar}, secret, {tiempo de expiracion en seg });
var createToken = function createToken(id, expiration) {
  return _jsonwebtoken["default"].sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: expiration
  });
};
var _default = createToken;
exports["default"] = _default;