'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tool extends Model {
  toolCategory () {
    return this.belongsTo('App/Models/ToolCategory')
  }
}

module.exports = Tool
