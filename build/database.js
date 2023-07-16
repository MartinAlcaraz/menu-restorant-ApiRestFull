"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var mongodb_uri;
if (process.env.NODE_ENV == "development") {
  _dotenv["default"].config();
  mongodb_uri = "mongodb://localhost/TiendaDB";
} else {
  // dotenv.config(); // borrar 
  mongodb_uri = process.env.MONGO_DB_URI;
}
_mongoose["default"].connect(mongodb_uri).then(function (db) {
  console.log("Database is connected to \n", mongodb_uri);
});
// .catch( (error) => console.log("Error, database is not connected :(  \n", error));