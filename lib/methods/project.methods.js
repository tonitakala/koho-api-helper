'use strict';

const Methods = require('../methods');
const Project = require('../resources/project.resource');

module.exports = class ProjectMethods extends Methods {
  constructor (helper) {
    super(helper, 'projects', Project);
  }

  _validateProperties(properties) {
    if (!properties.customer_id) {
      throw new Error('Missing customer_id for project');
    }

    if (!properties.name) {
      throw new Error('Missing name for project');
    }
  }

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias projects.getAll
   * @returns {Promise|Project[]}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias projects.getById
   * @param {number} id
   * @returns {Promise|Project}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias projects.updateById
   * @param {number} id
   * @param {ProjectProperties} properties
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias projects.deleteById
   * @param {number} id
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias projects.create
   * @param {PropectProperties} properties
   * @param {number} templateId Project template ID
   * @returns {Promise|Person}
   */

  async create(properties, templateId) {
    if (templateId) {
      properties.template_links_attributes = [{ template_id : templateId }];
    }

    return await super.create(properties);
  }

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias projects.getByCustomerId
   * @param {number} customerId
   * @returns {Promise|Project[]}
   */

  async getByCustomerId(customerId) {
    const result = await this.request(`${this._uri}/find_by_customer/${customerId}`);
    const projects = result.data.map(r => new Project(r, this._helper));

    return projects;
  }
}