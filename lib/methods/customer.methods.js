'use strict';

const Methods = require('../methods');
const Customer = require('../resources/customer.resource');

module.exports = class CustomerMethods extends Methods {
  constructor (helper) {
    super(helper, 'customers', Customer);
  }

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias customers.getAll
   * @returns {Promise|Customer[]}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias customers.getById
   * @param {number} id
   * @returns {Promise|Customer}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias customers.updateById
   * @param {number} id
   * @param {CustomerProperties} properties
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias customers.deleteById
   * @param {number} id
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias customers.create
   * @param {CustomerProperties} properties
   * @returns {Promise|Customer}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias customers.getByName
   * @param {string} name
   * @returns {Promise|Customer[]}
   */

   async getByName(name) {
    const result = await this.request(this._uri, 'GET', null, { name });
    const resources = result.data.map(r => new Customer(r, this._helper));

    return resources;
   }

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias customers.getByNumber
   * @param {number} number
   * @returns {Promise|Customer[]}
   */

  async getByNumber(number) {
    const result = await this.request(this._uri, 'GET', null, { number });
    const resources = result.data.map(r => new Customer(r, this._helper));

    return resources;
   }
}