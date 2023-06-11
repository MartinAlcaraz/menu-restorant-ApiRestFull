import nodemailer from 'nodemailer';

// create a transporter
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "alcarazangelmartin@gmail.com",
        pass: "pbobvhaggnuuthja"
    }
});

// const emailOptions = {
//     from: "RestoMartinMenuOnline support<alcarazangelmartin@gmail.com>",
//     to: option.email,
//     subject: option.subject,
//     text: option.message
// }

transporter.verify().then(() => {
    console.log("Nodemailer connnected.")
});

// await transport.sendMail(emailOptions);
