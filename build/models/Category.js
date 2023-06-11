"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var categorySchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [3, "El nombre de la categoria debe tener al menos 3 caracteres."],
    maxlength: [50, "El nombre de la categoria debe tener 50 caracteres o menos."]
  }
}, {
  timestamps: true,
  versionKey: false // en cada creacion de objeto no se guarda la version __v
});
var _default = (0, _mongoose.model)("Category", categorySchema);
exports["default"] = _default;