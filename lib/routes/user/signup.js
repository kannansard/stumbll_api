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
    path: '/api/signup',
    options: {
        validate: {
            payload: Joi.object({
                user_name: Joi.string().max(240).required(),
                email: Joi.string().email().max(240).allow('').required(),
                password: Joi.string().max(99).required(),
                login_with_id: Joi.number().max(3).integer().required(),
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
           
            const verifyUserpayload ={user_name:request.payload.user_name,login_with_id:1}
            const validUserInfo = await userService.UserEmailValidation(verifyUserpayload);
            
            if(validUserInfo.statusCode == 200)
            {
                const verifyEmailpayload ={email:request.payload.email,login_with_id:1}
                const validEmailInfo = await userService.UserEmailValidation(verifyEmailpayload);
                if(validEmailInfo.statusCode == 200)
                {
                    const output = await userService.signup(request.payload);
                    if (output.statusCode === 200) {
                        await emailService.sendEmail(request.payload.email, 'Stumbll Email Verification', "Welcome to Stumbll !!.. \n \n Please find your verification code: " + verification_code);
                        const response = h.response(output);
                        response.code(200);
                        return response;
                    } else {
                        return output;
                    }
                }
                else
                {
                    validEmailInfo.message = "Email already exists";
                    return validEmailInfo;
                }
                   
                
            }
            else{
                validUserInfo.message = "User Name already exists"
                return validUserInfo;
            }
               
        }
    }
});