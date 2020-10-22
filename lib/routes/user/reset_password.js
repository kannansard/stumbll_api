'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');
const Uuid = require('uuid');
const Xss = require('xss');
const Boom = require('@hapi/boom');

const { v1: Uuidv1 } = Uuid;

module.exports = Helpers.withDefaults({
    method: 'post',
    path: '/api/reset_password',
    options: {
        validate: {
            payload: Joi.object({
                email: Joi.string().required(),
                verification_code: Joi.number().integer().required(),
                password: Joi.string().required(),
            })
        },
        description: 'Reset Password',
        tags: ['api', 'v1', 'Reset Password'],
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
            const output = await userService.verification(request.payload);
            if (output.statusCode === 200) {
               // const savedOutput = await userService.signup(request.payload);

                if (savedOutput.statusCode === 200) {
                    const response = h.response(savedOutput);
                    response.code(200);
                    await emailService.sendEmail(request.payload.email, 'Stumbll Password Change Alert', "Your password changed Syuccessfully " );
                    return response;
                } 

                return savedOutput;
           
            } else {
                return output;
            }              
        
        }
    }
});