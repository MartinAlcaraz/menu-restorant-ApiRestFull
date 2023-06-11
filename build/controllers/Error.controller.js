"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _CustomError = _interopRequireDefault(require("../Utils/CustomError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// recive los errores que manda express, por medio del metodo next(error) (errores programados en controladores por ej.) ó 
// por otro metodo (por ej. los errores que manda mongoose))

var devError = function devError(res, error) {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTrace: error.stack,
    error: error
  });
};
var productionError = function productionError(res, error) {
  if (error.isOperational) {
    // if the error is an instance of CustomError class
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message
    });
  } else {
    // error sent by mongoose for example
    res.status(500).json({
      status: 'ERROR',
      message: "Something went wrong. Try again later."
    });
  }
};
var castErrorHandler = function castErrorHandler(error) {
  return new _CustomError["default"]("Invalid value for ".concat(error.path, " : ").concat(error.value), 400);
};
var duplicateKeyErrorHandler = function duplicateKeyErrorHandler(error) {
  return new _CustomError["default"]("The name ".concat(error.keyValue.name, " already exists. Use another name."), 400);
};
var validatorErrorHandler = function validatorErrorHandler(error) {
  var msg = Object.values(error.errors).map(function (val) {
    return val.message;
  });
  var errorMsg = msg.join('. ');
  return new _CustomError["default"]("Validation errors. " + errorMsg, 400);
};
var _default = function _default(error, req, res, next) {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  if (process.env.NODE_ENV == "development") {
    devError(res, error);
  } else {
    // process.env.NODE_ENV == "production"

    // for invalid Objectid sent in /:param request
    if (error.name != undefined && error.name == "CastError") {
      error = castErrorHandler(error);
    }

    // for duplicate keys in data base. This error is handled in controllers.
    if (error.code != undefined && error.code == 11000) {
      error = duplicateKeyErrorHandler(error);
    }

    // error thrown by  mongoose validator. Express validator thrown the error before in the route.
    if (error.name != undefined && error.name == "ValidationError") {
      error = validatorErrorHandler(error);
    }
    productionError(res, error);
  }
};
exports["default"] = _default;