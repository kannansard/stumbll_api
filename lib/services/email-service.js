'use strict';

const Schmervice = require('schmervice');
const Boom = require('@hapi/boom');
var nodemailer = require('nodemailer');

module.exports = class EmailService extends Schmervice.Service {

    async sendEmail(to, subject, body) {

        try {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'stumbll20@gmail.com',
                    pass: 'Stumbll-2020'
                }
            });

            var mailOptions = {
                from: 'stumbll20@gmail.com',
                to: to,
                subject: subject,
                text: body
            };

            var res = await transporter.sendMail(mailOptions);
            console.log(res);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
