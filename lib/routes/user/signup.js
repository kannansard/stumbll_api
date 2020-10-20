'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');
const Uuid = require('uuid');
const Xss = require('xss');
const Boom = require('@hapi/boom');
var nodemailer = require('nodemailer');

const { v1: Uuidv1 } = Uuid;

module.exports = Helpers.withDefaults({
    method: 'post',
    path: '/api/signup',
    options: {
        validate: {
            payload: Joi.object({
                user_name: Joi.string().required(),
                email: Joi.string().allow('').optional(),
                password: Joi.string().required(),
                login_with_id: Joi.number().integer().required(),
            })
        },
        description: 'Signup',
        tags: ['api', 'v1', 'signup'],
        auth: false,
        // auth: {
        //     strategy: 'jwt',
        //     access: [{
        //         scope: ['profile']
        //     }]
        // },
        handler: async (request, h) => {

            try {
                request.payload = JSON.parse(Xss(JSON.stringify(request.payload)));
            } catch (err) {
                const error = Boom.badRequest('Invalid Input');
                return error;
            }

            const { userService, emailService } = request.services();
            var verification_code = Math.floor(Math.random() * (999999 - 100000) + 100000);
            request.payload.verification_code = verification_code;

            await emailService.sendEmail(request.payload.email, 'Stumbll Email Verification', "Welcome to Stumbll !!.. \n \n Please find your verification code: " + verification_code);
            const output = await userService.signup(request.payload);
            if (output.statusCode === 200) {
                const response = h.response(output);
                response.code(200);

                return response;
            } else {
                return output;
            }
        }
    }
});