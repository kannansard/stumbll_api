'use strict';

const Joi = require('@hapi/joi');
const { Model } = require('./helpers');

module.exports = class Login_With_Info extends Model {

    static get tableName() {

        return 'login_with_info';
    }

    static get joiSchema() {

        return Joi.object({
            login_with_info_Id: Joi.number().integer().greater(0),
            loginWithId: Joi.number().integer(),
            userId: Joi.number().integer(),
            accessToken: Joi.string(),
            loginWithUserId: Joi.string(),
            email: Joi.string(),
            name: Joi.string(),
            photoUrl: Joi.string().optional().allow(null),
            expirationTime: Joi.number().optional().allow(null),
            lastRefreshTime: Joi.number().optional().allow(null),
            dataAccessExpirationTime: Joi.number().optional().allow(null),
            updatedAt: Joi.date()
        });
    }

};