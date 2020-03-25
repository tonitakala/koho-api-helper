'use strict';

const Methods = require('../methods');
const Product = require('../resources/product.resource');

module.exports = class ProductMethods extends Methods {
  constructor (helper) {
    super(helper, 'product_types', Product);
  }

  _validateProperties(properties) {

  }

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias products.getAll
   * @returns {Promise|Product[]}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias products.getById
   * @param {number} id
   * @returns {Promise|Product}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias products.updateById
   * @param {number} id
   * @param {ProductProperties} properties
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias products.deleteById
   * @param {number} id
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias products.create
   * @param {ProductProperties} properties
   * @returns {Promise|Product}
   */
}