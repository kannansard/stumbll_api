'use strict';

exports.up = async (knex) => {
    await knex.schema.createTable('users', (t) => {
        t.increments('user_id').primary();
        t.string('user_name').notNullable().unique();
        t.string('email').notNullable().unique();
        t.binary('password');
        t.integer('login_with_id');
        t.integer('is_active');
        t.datetime('createdAt');
        t.datetime('updatedAt');
    });

};

exports.down = async (knex) => {
    await knex.schema.dropTable('Users');

};
