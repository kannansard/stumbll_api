'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');
const Uuid = require('uuid');
const Xss = require('xss');
const Boom = require('@hapi/boom');
var nodemailer = require('nodemailer');

const { v1: Uuidv1 } = Uuid;

module.exports = Helpers.withDefaults({
    method: 'get',
    path: '/api/identifyYourself',
    options: {
        description: 'IdentifyYourself',
        tags: ['api', 'v1', 'identifyYourself'],
        auth: false,
        // auth: {
        //     strategy: 'jwt',
        //     access: [{
        //         scope: ['profile']
        //     }]
        // },
        handler: async (request, h) => {

            const { userService } = request.services();

            const output = await userService.identifyYourselfGet();
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