"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transporter = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// create a transporter
var transporter = _nodemailer["default"].createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_GOOGLE,
    pass: process.env.PASS_GOOGLE
  }
});

// const emailOptions = {
//     from: "RestoMartinMenuOnline support<alcarazangelmartin@gmail.com>",
//     to: option.email,
//     subject: option.subject,
//     text: option.message
// }
exports.transporter = transporter;
transporter.verify().then(function () {
  console.log("Nodemailer connnected.");
});

// await transport.sendMail(emailOptions);