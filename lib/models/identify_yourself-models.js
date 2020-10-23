'use strict';

const Joi = require('@hapi/joi');
const { Model } = require('./helpers');

module.exports = class Identify_Yourself extends Model {

    static get tableName() {

        return 'identify_yourself';
    }

    static get joiSchema() {

        return Joi.object({
            identify_yourself_id: Joi.number().integer().greater(0),
            name: Joi.string().max(512),
        });
    }

};