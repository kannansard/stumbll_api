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
            if(result){
                 result = await User.query().first().where(payload);
            }
            response.message = result ? "Success" : "Failed"
            response.data = result;
            return response;
        } catch (error) {
            console.log(error);
            if (error.nativeError) {
                    var errorMessage=error.nativeError.sqlMessage;
                    if(error.nativeError.errno==1062 && errorMessage.indexOf("user_name") != -1){
                        errorMessage ="User name already exists";
                    }
                    else if(error.nativeError.errno==1062 && errorMessage.indexOf("email") != -1){
                        errorMessage ="Email already exists";
                    }
                    response.statusCode = error.nativeError.errno,
                    response.message =  errorMessage;
                    response.error =  "Bad Request";
                    return response;
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
            response.statusCode = result? 200:500;
            return response;
        } catch (error) {
            console.log(error);
            if (error.nativeError) {
                    response.message = error.nativeError.sqlMessage;
                    response.statusCode = error.nativeError.errno,
                    response.error =  "Bad Request";
                    return response;
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
            response.statusCode = result? 200:500;
            return response;
        } catch (error) {
            console.log(error);
            if (error.nativeError) {
                    response.message = error.nativeError.sqlMessage;
                    response.statusCode = error.nativeError.errno,
                    response.error =  "Bad Request";
                    return response;
            }
        }
    }
};