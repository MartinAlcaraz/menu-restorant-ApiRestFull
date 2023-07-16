"use strict";

var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// // create a transporter
var transporter = _nodemailer["default"].createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_GOOGLE,
    pass: process.env.PASS_GOOGLE
  },
  tls: {
    rejectUnauthorized: false
  }
});
transporter.verify().then(function () {
  console.log("Nodemailer connected.");
})["catch"](function (err) {
  return console.log("*** Nodemailer not connected. ***");
});
module.exports = transporter;