import nodemailer from 'nodemailer';

// // create a transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_GOOGLE,
        pass: process.env.PASS_GOOGLE
    },
    tls: { rejectUnauthorized: false }
});

transporter.verify().then(() => {
    console.log("Nodemailer connected.")
}).catch(err=> console.log("*** Nodemailer not connected. ***"));

module.exports = transporter;