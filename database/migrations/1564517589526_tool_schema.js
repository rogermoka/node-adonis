'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ToolSchema extends Schema {
  up () {
    this.create('tools', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('link').notNullable()
      table
        .integer('tool_category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tool_categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('tools')
  }
}

module.exports = ToolSchema
