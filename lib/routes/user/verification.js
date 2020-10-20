'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');
const Uuid = require('uuid');
const Xss = require('xss');
const Boom = require('@hapi/boom');

const { v1: Uuidv1 } = Uuid;

module.exports = Helpers.withDefaults({
    method: 'post',
    path: '/api/verification',
    options: {
        validate: {
            payload: Joi.object({
                verification_code: Joi.number().integer().required(),
                user_name: Joi.string().required(),
            })
        },
        description: 'Verification',
        tags: ['api', 'v1', 'verification'],
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

            const { userService } = request.services();
            const output = await userService.verification(request.payload);
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