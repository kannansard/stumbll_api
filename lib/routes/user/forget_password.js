'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');
const Xss = require('xss');
const Boom = require('@hapi/boom');


module.exports = Helpers.withDefaults({
    method: 'post',
    path: '/api/forget_password',
    options: {
        validate: {
            payload: Joi.object({
                email: Joi.string().required(),
            })
        },
        description: 'Reset through Forget passowrd',
        tags: ['api', 'v1', 'Forget password'],
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
            // var verification_code = Math.floor(Math.random() * (999999 - 100000) + 100000);
            // request.payload.verification_code = verification_code;

            const output = await userService.login(request.payload);
            
            if (output.statusCode === 200) {
                const response = h.response(output);
                response.code(200);
                console.log("Response:::", output.data["User"])
                await emailService.sendEmail(request.payload.email, 'Stumbll Forget Password', " Please find your verification code to reset your password: " + verification_code);
                return response;
            } else {
                return output;
            }
          

        }
    }
});