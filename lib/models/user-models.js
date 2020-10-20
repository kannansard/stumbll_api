'use strict';

const Joi = require('@hapi/joi');
const { Model } = require('./helpers');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            user_id: Joi.number().integer().greater(0),
            user_name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string(),
            login_with_id: Joi.number().integer(),
            verification_code: Joi.number().integer(),
            is_active: Joi.number().integer(),
            created_at: Joi.date(),
            updated_at: Joi.date()
        });
    }

};