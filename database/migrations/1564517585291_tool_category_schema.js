'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ToolCategorySchema extends Schema {
  up () {
    this.create('tool_categories', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.text('description').notNullable()
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
    this.drop('tool_categories')
  }
}

module.exports = ToolCategorySchema
