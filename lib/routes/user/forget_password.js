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
            var verify_code = Math.floor(Math.random() * (999999 - 100000) + 100000);
            const verification_code = {verification_code:verify_code}
            
            const output = await userService.login(request.payload);
            if (output.statusCode === 200) {
                await emailService.sendEmail(request.payload.email, 'Stumbll Reset Password', " \n Please find your verification code: " + verify_code);
                const updateOutput = await userService.userUpdate(verification_code,request.payload);
                const response = h.response(updateOutput);
                response.code(200);
                return response;
            } else {
                return output;
            }
          

        }
    }
});