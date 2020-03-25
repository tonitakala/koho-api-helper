'use strict';

const Methods = require('../methods');
const Contract = require('../resources/contract.resource');

module.exports = class ContractMethods extends Methods {
  constructor (helper) {
    super(helper, 'contracts', Contract);
  }

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias contracts.getAll
   * @returns {Promise|Contract[]}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias contracts.getById
   * @param {number} id
   * @returns {Promise|Contract}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias contracts.updateById
   * @param {number} id
   * @param {ContractProperties} properties
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias contracts.deleteById
   * @param {number} id
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias contracts.create
   * @param {ContractProperties} properties
   * @returns {Promise|Contract}
   */
}