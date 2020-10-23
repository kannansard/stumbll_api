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
    path: '/api/tellus',
    options: {
        validate: {
            payload: Joi.object({
                user_id:Joi.number().integer().required(),
                dob: Joi.date().required(),
                phone_number: Joi.string().required(),
                identify_yourself_id: Joi.number().integer().required(),
            })
        },
        description: 'Tellus',
        tags: ['api', 'v1', 'tellus'],
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

            const output = await userService.tellusPost(request.payload);
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