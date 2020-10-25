'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');
const Uuid = require('uuid');
const Xss = require('xss');
const Boom = require('@hapi/boom');
var nodemailer = require('nodemailer');
const UserService = require('../../services/user-service');

const { v1: Uuidv1 } = Uuid;

module.exports = Helpers.withDefaults({
    method: 'post',
    path: '/api/loginWithInfo',
    options: {
        validate: {
            payload: Joi.object({
                loginWithId: Joi.number().required(),
                accessToken: Joi.string().required(),
                loginWithUserId: Joi.string().required(),
                email: Joi.string().required(),
                name: Joi.string().required(),
                photoUrl: Joi.string().optional().allow(null),
                expirationTime: Joi.number().optional().allow(null),
                lastRefreshTime: Joi.number().optional().allow(null),
                dataAccessExpirationTime: Joi.number().optional().allow(null),
                userId:Joi.number().integer().optional()
            })
        },
        description: 'LoginWithInfo',
        tags: ['api', 'v1', 'loginWithInfo'],
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

                    const loginWithUserId ={loginWithUserId:request.payload.loginWithUserId}
                    const output = await userService.userInfoInsertUpdate(request.payload,loginWithUserId);
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