const nodemailer = require('nodemailer');
const {MAIL_USER,MAIL_PASSWORD} = process.env;
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
    }
});
async function sendMail(email, subject, text) {
    const mailOptions = {
        from: MAIL_USER,
        to: email,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('E-posta gönderildi: ' + info.response);
        }
    });
}

module.exports = {sendMail}