'use strict';

const Resource = require('../resource');

/**
 * @typedef {Object} ProductProperties
 * @property {number} id Product ID
 * @property {string} name Product name
 * @property {string} [description] Product description
 * @property {number} price Price
 * @property {number} [gross_price] Gross price
 * @property {number} vat VAT percent
 * @property {number} [cost] Cost
 * @property {string} [code] Product code
 * @property {boolean} monthly Is product contract product
 * @property {number} [product_category_id] Product category ID
 * @property {string} unit_of_measurement Number of measurement (default: pc)
 * @property {Object} [translation_hash] Translation hash
 * @property {object} [translation_hash.LANG] LANG (SE or EN) language translations (includes name and description)
 * @property {any} [_] Other properties. Please consult Koho customer service
 */

/**
 * @constructor
 * @name Product
 * @param {ProductProperties} properties
 * @param {KohoApiHelper} helper
 */

module.exports = class Product extends Resource {
  constructor (properties, helper) {
    super(properties, helper, 'products');
  }

  _updateInterceptor(properties) {

  }

  /**
   * @name archive
   * @function
   * @memberof Product#
   * @returns {Promise|void}
   */

  async archive() {
    return await super.update({ active : false });
  }

  /**
   * @name activate
   * @function
   * @memberof Product#
   * @returns {Promise|void}
   */

  async activate() {
    return await super.update({ active : true });
  }

  /**
   * @name update
   * @function
   * @memberof Product#
   * @param {ProductProperties} properties
   * @returns {Promise|void}
   */
}