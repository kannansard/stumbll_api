'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');
const Uuid = require('uuid');
const Xss = require('xss');
const Boom = require('@hapi/boom');

const { v1: Uuidv1 } = Uuid;

module.exports = Helpers.withDefaults({
    method: 'post',
    path: '/api/login',
    options: {
        validate: {
            payload: Joi.object({
                user_name: Joi.string().max(240).required(),
                password: Joi.string().max(100).required()
            })
        },
        description: 'Login',
        tags: ['api', 'v1', 'login'],
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
            const output = await userService.login(request.payload);
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