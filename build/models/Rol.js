"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var rolSchema = new _mongoose.Schema({
  name: {
    type: String,
    unique: true,
    "default": "user"
  }
}, {
  versionKey: false
});
var _default = (0, _mongoose.model)("Rol", rolSchema);
exports["default"] = _default;