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
            const verifypayload ={email:request.payload.email,verification_code:request.payload.verification_code}
            const whereCondition ={email:request.payload.email}
            const setValue ={password:request.payload.password}

            const output = await userService.verification(verifypayload);
            if (output.statusCode === 200) {
                const savedOutput = await userService.userUpdate(setValue, whereCondition);
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