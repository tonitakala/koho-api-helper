'use strict';

const Methods = require('../methods');
const Sale = require('../resources/sale.resource');

module.exports = class SaleMethods extends Methods {
  constructor (helper) {
    super(helper, 'sales', Sale);
  }

  _validateProperties(properties) {
    if (!properties.products_attributes) {
      throw new Error('Missing products for sale');
    }
  }

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias sales.getAll
   * @returns {Promise|Sale[]}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias sales.getById
   * @param {number} id
   * @returns {Promise|Sale}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias sales.updateById
   * @param {number} id
   * @param {SaleProperties} properties
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias sales.deleteById
   * @param {number} id
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias sales.create
   * @param {PropectProperties} properties
   * @param {number} customerId Customer Id
   * @returns {Promise|Sale}
   */

  async create(properties, customerId) {
    if (customerId) {
      properties.customer_id = customerId;
    }

    properties.products_attributes = properties.products;
    delete properties.products;

    return await super.create(properties);
  }
}