const nodemailer = require('nodemailer');

exports.sendMail = async (options) => {
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_TRAP_HOST,
        port: process.env.MAIL_TRAP_PORT,
        auth: {
            user: process.env.MAIL_TRAP_USERNAME,
            pass: process.env.MAIL_TRAP_PASSWORD
        }
    });

    const mailOption = {
        from: 'Shanas Tabong <hello@example.io>',
        to: options.email,
        subject: 'Welcome To Note Tracker',
        text: "Your cridencials where all correct, enjoy your staying\nIf you need some help to get started check our 'Get Started Guide\n\nYour informations are save with us.'"
    }

    await transport.sendMail(mailOption);
}