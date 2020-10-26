'use strict';

const Schmervice = require('schmervice');
const Boom = require('@hapi/boom');
const Moment = require('moment');
const Xss = require('xss');

const commonResponse = {
    'statusCode': 200,
    'message': 'Success',
    'data': undefined
}



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
                        error.nativeError.errno =409;
                        errorMessage ="User name already exists";
                    }
                    else if(error.nativeError.errno==1062 && errorMessage.indexOf("email") != -1){
                        errorMessage ="Email already exists";
                        error.nativeError.errno =409;
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

    async userUpdate(data,payload) {

        let response = {
            'statusCode': 200,
            'message': 'success',
            'data': undefined
        };

        const { User } = this.server.models();
        try {
       
            var result = await User.query().patch(data).where(payload);
            response.message = result ? "success" : "Data not exist";
            response.data = result;
            response.statusCode = result? 200:500;
            return response;
        } catch (error) {
            console.log(error);
            if (error.nativeError) {
                    response.statusCode = error.nativeError.errno,
                    response.message =  error.nativeError.sqlMessage;
                    response.error =  "Bad Request";
                    return response;
            }
        }
    }

    async tellusPost(payload) {

        let response = {
            'statusCode': 200,
            'message': 'Success',
            'data': undefined
        };
        const { User_Info } = this.server.models();
        try {
            var result = await User_Info.query().insert(payload);
            response.message = result ? "Success" : "Failed"
            response.data = result;
            return response;
        } catch (error) {
            console.log(error);
            if (error.nativeError) {
                    response.statusCode = error.nativeError.errno,
                    response.message =  error.nativeError.sqlMessage;
                    response.error =  "Bad Request";
                    return response;
            }
        }
    }


    async identifyYourselfGet() {

        let response = {
            'statusCode': 200,
            'message': 'Success',
            'data': undefined
        };
        const { Identify_Yourself } = this.server.models();
        try {
            var result = await Identify_Yourself.query();
            response.message = result ? "Success" : "Failed"
            response.data = result;
            return response;
        } catch (error) {
            console.log(error);
            if (error.nativeError) {
                    response.statusCode = error.nativeError.errno,
                    response.message =  error.nativeError.sqlMessage;
                    response.error =  "Bad Request";
                    return response;
            }
        }
    }

    async UserEmailValidation(payload) {

        let response = {
            'statusCode': 200,
            'message': 'success',
            'data': undefined
        };

        const { User } = this.server.models();
        try {
            var result = await User.query().first().where(payload);
            response.message = result ? "Failed" : "Success";
            response.data = result;
            response.statusCode = result? 409:200;
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

    async userInfoInsertUpdate(payload,loginWithUserId) {

        const { Login_With_Info,User } = this.server.models();
        try {
            var defaultResult = await Login_With_Info.query().where(loginWithUserId);
            if(defaultResult && defaultResult.length > 0){
                var userWithpayload = JSON.parse(Xss(JSON.stringify(defaultResult[0])));
                const setUserValue ={user_name:payload.name,email:payload.email,login_with_id:payload.loginWithId}
                const userId ={user_id:userWithpayload.userId}
                var userResult = await User.query().patch(setUserValue).where(userId);
                if(userResult){
                    var LoginWithResult = await Login_With_Info.query().patch(payload).where(loginWithUserId);
                    if(LoginWithResult){
                        var userResult = await User.query().where(userId);
                        if(userResult)
                        {
                            const returnResult ={user_id:userWithpayload.userId, user_name:payload.name,email:payload.email,login_with_id:payload.loginWithId,accessToken:payload.accessToken}
                            commonResponse.message = userResult ? "Success" : "Failed"
                            commonResponse.data = returnResult;
                            commonResponse.statusCode = userResult? 200:500;
                            return commonResponse;
                        }
                        else{
                            return this.returnResponse(userResult);
                        }
                    }
                    else{
                        return this.returnResponse(LoginWithResult);
                    }
                }
                else{
                    return this.returnResponse(userResult);
                }
            }
            else{
                const setValue ={user_name:payload.name,email:payload.email,login_with_id:payload.loginWithId}
                var result = await User.query().insert(setValue);
                console.log(result);
                if(result){
                    const userResult = await User.query().first().where(setValue);
                    if(userResult){
                        var userPayload = JSON.parse(Xss(JSON.stringify(userResult)));
                        payload.userId = userPayload.user_id;
                        var userInfoResult = await Login_With_Info.query().insert(payload);
                        if(userInfoResult)
                        {
                            const returnResult ={user_id:userPayload.user_id, user_name:payload.name,email:payload.email,login_with_id:payload.loginWithId,accessToken:payload.accessToken}
                            commonResponse.message = userInfoResult ? "Success" : "Failed"
                            commonResponse.data = returnResult;
                            commonResponse.statusCode = result? 200:500;
                        }
                        else{
                            return  this.returnResponse(userResult);
                        }
                    }
                    else{
                        return this.returnResponse(userResult);
                    }
                }
                else{
                    return this.returnResponse(result);
                }
             return commonResponse;
            }
        } catch (error) {
            console.log(error);
            if (error.nativeError) {
                   commonResponse.statusCode = error.nativeError.errno,
                   commonResponse.message =  error.nativeError.sqlMessage;
                   commonResponse.error =  "Bad Request1";
                    return commonResponse;
            }
        }
    }

     returnResponse(result) {
        commonResponse.message = "Failed"
        commonResponse.data = result;
        commonResponse.statusCode =500;
        return commonResponse;
    }
};