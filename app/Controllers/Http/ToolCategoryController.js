'use strict'

const ToolCategory = use('App/Models/ToolCategory')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with toolcategories
 */
class ToolCategoryController {
  /**
   * Show a list of all toolcategories.
   * GET toolcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const { page } = request.get()

    const toolcategories = await ToolCategory.query()
      .with('user')
      .paginate(page)

    return toolcategories
  }

  /**
   * Create/save a new toolcategory.
   * POST toolcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request, response }) {
    const data = request.only(['name', 'description'])

    const toolcategory = await ToolCategory.create({ ...data, user_id: auth.user.id })

    return toolcategory
  }

  /**
   * Display a single toolcategory.
   * GET toolcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const toolcategory = await ToolCategory.findOrFail(params.id)

    await toolcategory.load('user')

    return toolcategory
  }

  /**
   * Update toolcategory details.
   * PUT or PATCH toolcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const toolcategory = await ToolCategory.findOrFail(params.id)
    const data = request.only(['name', 'description'])

    toolcategory.merge(data)

    await toolcategory.save()

    return toolcategory
  }

  /**
   * Delete a toolcategory with id.
   * DELETE toolcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const toolcategory = await ToolCategory.findOrFail(params.id)

    await toolcategory.delete()
  }
}

module.exports = ToolCategoryController
