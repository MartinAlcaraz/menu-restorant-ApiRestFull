"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var productSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [3, "El nombre debe tener al menos 4 caracteres."],
    maxlength: [50, "El nombre debe tener 50 caracteres o menos."]
  },
  category: {
    ref: "Category",
    // referencia al modelo Category
    type: _mongoose.Schema.Types.ObjectId,
    required: true
  },
  imgURL: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 1000
  },
  description: {
    type: String,
    trim: true
  },
  createdBy: {
    type: String,
    "default": "A. Martin Alcaraz"
  }
}, {
  timestamps: true,
  versionKey: false // en cada creacion de objeto no se guarda la version __v
});

// Document Middleware:
// function executed before .save() or .create() methods in product.controller, executed before the document is saved in DDBB
productSchema.pre('save', function (next) {
  this.description = "Delicious ".concat(this.name);
  console.log('document middleware in save or create method');
  next();
});

// execute after the document has been created with save or create methods.
productSchema.post('save', function (doc, next) {
  var text = "The document " + doc.name + " has been created";
  console.log(text);
  next();
});
var _default = (0, _mongoose.model)("Product", productSchema);
exports["default"] = _default;