"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Category = _interopRequireDefault(require("../models/Category"));
var _Product = _interopRequireDefault(require("../models/Product"));
var _ApiFeatures = _interopRequireDefault(require("../Utils/ApiFeatures"));
var _CustomError = _interopRequireDefault(require("../Utils/CustomError"));
var _asyncErrorHandler = _interopRequireDefault(require("../Utils/asyncErrorHandler"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var productsCtrl = {};
productsCtrl.queryBestProducts = (0, _asyncErrorHandler["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // setea la query en la url .get('products/popularProducts') sin necesidad de 
          // pasar la query desde el frontend.
          req.query.limit = '5';
          req.query.price = {
            gt: '2'
          };
          req.query.fields = "name,price,description,category";
          next();
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

// retorna los productos de la categoria pasada por id
productsCtrl.getProductsOfCategory = (0, _asyncErrorHandler["default"])( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var category, err, products, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _Category["default"].findOne({
            name: {
              $regex: "^".concat(req.params.categoryName, "$"),
              $options: 'i'
            }
          });
        case 2:
          category = _context2.sent;
          if (category) {
            _context2.next = 6;
            break;
          }
          err = new _CustomError["default"]("The category name '" + req.params.categoryName + "' does not exists.", 400);
          return _context2.abrupt("return", next(err));
        case 6:
          _context2.next = 8;
          return _Product["default"].find({
            category: category._id
          });
        case 8:
          products = _context2.sent;
          _context2.next = 11;
          return _Category["default"].populate(products, {
            path: "category",
            select: "name"
          });
        case 11:
          result = _context2.sent;
          res.status(200).json({
            status: 'OK',
            length: products.length,
            data: {
              products: result
            }
          });
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
productsCtrl.searchProducts = (0, _asyncErrorHandler["default"])( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    var products, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _Product["default"].find({
            name: {
              $regex: req.query.name,
              $options: 'i'
            }
          });
        case 2:
          products = _context3.sent;
          result = {};
          if (!(products.length > 0)) {
            _context3.next = 8;
            break;
          }
          _context3.next = 7;
          return _Category["default"].populate(products, {
            path: "category",
            select: "name"
          });
        case 7:
          result = _context3.sent;
        case 8:
          res.status(200).json({
            status: 'OK',
            length: products.length,
            data: {
              products: result
            }
          });
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
productsCtrl.getProducts = (0, _asyncErrorHandler["default"])( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var result, features;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          result = {};
          if (!(Object.keys(req.query).length > 0)) {
            _context4.next = 10;
            break;
          }
          _context4.next = 4;
          return new _ApiFeatures["default"](_Product["default"].find(), req.query).filter().sort().limitFields().pagination();
        case 4:
          features = _context4.sent;
          _context4.next = 7;
          return features.query;
        case 7:
          result = _context4.sent;
          _context4.next = 13;
          break;
        case 10:
          _context4.next = 12;
          return _Product["default"].find();
        case 12:
          result = _context4.sent;
        case 13:
          res.status(200).json({
            status: 'OK',
            count: result.length,
            data: {
              products: result
            }
          });
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
productsCtrl.getOneProduct = (0, _asyncErrorHandler["default"])( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var product, err, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _Product["default"].findById(req.params.productId);
        case 2:
          product = _context5.sent;
          if (product) {
            _context5.next = 6;
            break;
          }
          err = new _CustomError["default"]("The product id does not exists.", 400);
          return _context5.abrupt("return", next(err));
        case 6:
          _context5.next = 8;
          return product.populate({
            path: "category",
            select: "name -_id"
          });
        case 8:
          result = _context5.sent;
          res.status(200).json({
            status: 'OK',
            data: result
          });
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
productsCtrl.getStats = (0, _asyncErrorHandler["default"])( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
    var stats, result;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _Product["default"].aggregate([{
            $match: {
              price: {
                $gte: 0
              }
            }
          }, {
            $group: {
              _id: '$category',
              // agrupa por categoria
              avgPrice: {
                $avg: '$price'
              },
              minPrice: {
                $min: '$price'
              },
              maxPrice: {
                $max: '$price'
              },
              totalPrice: {
                $sum: '$price'
              },
              totalProducts: {
                $sum: 1
              }
            }
          }, {
            $sort: {
              totalProducts: 1
            } // ordena el resultado de mayor a menor
          }]);
        case 2:
          stats = _context6.sent;
          _context6.next = 5;
          return _Category["default"].populate(stats, {
            path: "_id",
            select: "name"
          });
        case 5:
          result = _context6.sent;
          res.status(200).json({
            status: "OK",
            count: result.length,
            data: {
              stats: result
            }
          });
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}());
productsCtrl.postProduct = (0, _asyncErrorHandler["default"])( /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
    var _req$body, name, categoryId, price, imgURL, nameExists, err, categoryExists, _err, productSaved, _err2;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, categoryId = _req$body.categoryId, price = _req$body.price, imgURL = _req$body.imgURL;
          _context7.next = 3;
          return _Product["default"].findOne({
            name: name
          });
        case 3:
          nameExists = _context7.sent;
          if (!nameExists) {
            _context7.next = 7;
            break;
          }
          err = new _CustomError["default"]("A product with the name '".concat(name, "' already exists."), 400);
          return _context7.abrupt("return", next(err));
        case 7:
          _context7.next = 9;
          return _Category["default"].findById(categoryId);
        case 9:
          categoryExists = _context7.sent;
          if (categoryExists) {
            _context7.next = 13;
            break;
          }
          _err = new _CustomError["default"]("The category does not exists.", 400);
          return _context7.abrupt("return", next(_err));
        case 13:
          _context7.next = 15;
          return _Product["default"].create({
            name: name,
            price: price,
            imgURL: imgURL,
            category: categoryId
          });
        case 15:
          productSaved = _context7.sent;
          if (productSaved) {
            _context7.next = 19;
            break;
          }
          _err2 = new _CustomError["default"]("Could not save the product", 400);
          return _context7.abrupt("return", next(_err2));
        case 19:
          res.status(201).json({
            status: 'OK',
            data: 'Product created '
          });
        case 20:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}());
productsCtrl.updateProduct = (0, _asyncErrorHandler["default"])( /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res, next) {
    var product, err, updatedProduct, _err3;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _Product["default"].findById(req.params.productId);
        case 2:
          product = _context8.sent;
          if (product) {
            _context8.next = 6;
            break;
          }
          err = new _CustomError["default"]("The product does not exists", 404);
          return _context8.abrupt("return", next(err));
        case 6:
          _context8.next = 8;
          return _Product["default"].findByIdAndUpdate(req.params.productId, {
            name: req.body.name,
            imgURL: req.body.imgURL,
            price: req.body.price
          }, {
            runValidators: true,
            // => para que se ejecuten los validadores del esquema de mongoose
            "new": true // =>  para que devuelva el registro nuevo, no el que fue actualizado
          });
        case 8:
          updatedProduct = _context8.sent;
          if (updatedProduct) {
            _context8.next = 12;
            break;
          }
          _err3 = new _CustomError["default"]("The product could not be updated.", 404);
          return _context8.abrupt("return", next(_err3));
        case 12:
          res.status(200).json({
            status: 'OK',
            data: "The product " + updatedProduct.name + " was updated."
          });
        case 13:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}());
productsCtrl.deleteProduct = (0, _asyncErrorHandler["default"])( /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res, next) {
    var product, err, productDeleted, _err4;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _Product["default"].findById(req.params.productId);
        case 2:
          product = _context9.sent;
          if (product) {
            _context9.next = 6;
            break;
          }
          err = new _CustomError["default"]("The product does not exists.", 404);
          return _context9.abrupt("return", next(err));
        case 6:
          _context9.next = 8;
          return _Product["default"].findByIdAndDelete(req.params.productId);
        case 8:
          productDeleted = _context9.sent;
          if (productDeleted) {
            _context9.next = 12;
            break;
          }
          _err4 = new _CustomError["default"]("Could not delete the product.", 400);
          return _context9.abrupt("return", next(_err4));
        case 12:
          res.status(200).json({
            status: 'OK',
            message: "The product " + productDeleted.name + " was successfully deleted"
          });
        case 13:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function (_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}());
var _default = productsCtrl;
exports["default"] = _default;