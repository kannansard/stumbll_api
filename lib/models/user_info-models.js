'use strict';

const Joi = require('@hapi/joi');
const { Model } = require('./helpers');

module.exports = class User_Info extends Model {

    static get tableName() {

        return 'user_info';
    }

    static get joiSchema() {

        return Joi.object({
            user_info_id: Joi.number().integer().greater(0),
            user_id: Joi.number().integer(),
            first_name: Joi.string(),
            last_name: Joi.string(),
            profile_uri: Joi.string(),
            dob: Joi.date(),
            phone_number: Joi.string(),
            identify_yourself_id: Joi.number().integer(),
            updated_at: Joi.date()
        });
    }

};