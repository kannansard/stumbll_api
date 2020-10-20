'use strict';

const Schmervice = require('schmervice');
const Boom = require('@hapi/boom');
const Moment = require('moment');

module.exports = class UserService extends Schmervice.Service {

    async signup(payload) {

        let response = {
            'statusCode': 200,
            'message': 'Success',
            'data': undefined
        };

        const { User } = this.server.models();
        try {
            var result = await User.query().insert(payload);
            response.message = result ? "Success" : "Failed"
            response.data = result;
            return response;
        } catch (error) {
            console.log(error);
            if (error.nativeError) {
                if (error.nativeError.name == 'error') {
                    response.errorMessage = { "user_key_error": error.nativeError.detail };
                    return response;
                }
            }
        }
    }

    async verification(payload) {

        let response = {
            'statusCode': 200,
            'message': 'success',
            'data': undefined
        };

        const { User } = this.server.models();
        try {
            var result = await User.query().first().where(payload);
            response.message = result ? "success" : "Invalid verification code";
            response.data = result;
            return response;
        } catch (error) {
            console.log(error);
            if (error.nativeError) {
                if (error.nativeError.name == 'error') {
                    response.errorMessage = { "user_key_error": error.nativeError.detail };
                    return response;
                }
            }
        }
    }

    async login(payload) {

        let response = {
            'statusCode': 200,
            'message': 'success',
            'data': undefined
        };

        const { User } = this.server.models();
        try {
            var result = await User.query().first().where(payload);
            response.message = result ? "success" : "Invalid username or password";
            response.data = result;
            return response;
        } catch (error) {
            console.log(error);
            if (error.nativeError) {
                if (error.nativeError.name == 'error') {
                    response.errorMessage = { "user_key_error": error.nativeError.detail };
                    return response;
                }
            }
        }
    }
};