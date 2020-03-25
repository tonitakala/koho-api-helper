'use strict';

const Resource = require('../resource');

/**
 * @typedef {Object} ProjectProperties
 * @property {number} id Project ID
 * @property {string} name Project name
 * @property {string} [start_date] Start date (YYYY-MM-DD)
 * @property {string} [end_date] End date (YYYY-MM-DD)
 * @property {string} [customer_id] Customer ID
 * @property {boolean} [active] Status
 * @property {string} [description] Project description
 * @property {array} [templates] Linked templates (template.id and template.name)
 * @property {number} [plan_id] Project plan ID
 * @property {any} [_] Other properties. Please consult Koho customer service
 */

/**
 * @constructor
 * @name Project
 * @param {ProjectProperties} properties
 * @param {KohoApiHelper} helper
 */

module.exports = class Project extends Resource {
  constructor (properties, helper) {
    super(properties, helper, 'projects');
  }

  _updateInterceptor(properties) {
    // Rename template_links array for update request (legacy naming?)
    if (properties.template_links && properties.template_links.length) {
      properties.template_links_attributes = properties.template_links;

      delete properties.template_links;
    }
  }

  /**
   * @name archive
   * @function
   * @memberof Project#
   * @returns {Promise|void}
   */

  async archive() {
    return await super.update({ active : false });
  }

  /**
   * @name activate
   * @function
   * @memberof Project#
   * @returns {Promise|void}
   */

  async activate() {
    return await super.update({ active : true });
  }

  /**
   * @name update
   * @function
   * @memberof Project#
   * @param {ProjectProperties} properties
   * @returns {Promise|void}
   */
}