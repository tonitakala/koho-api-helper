'use strict';

const Methods = require('../methods');
const Invoice = require('../resources/invoice.resource');

module.exports = class InvoiceMethods extends Methods {
  constructor (helper) {
    super(helper, 'invoices', Invoice);
  }

  _validateProperties(properties) {

  }

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias invoices.getAll
   * @returns {Promise|Invoice[]}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias invoices.getById
   * @param {number} id
   * @returns {Promise|Invoice}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias invoices.updateById
   * @param {number} id
   * @param {InvoiceProperties} properties
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias invoices.deleteById
   * @param {number} id
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias invoices.create
   * @param {InvoiceProperties} properties
   * @returns {Promise|Invoice}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias invoices.getByCustomerId
   * @param {number} customerId
   * @returns {Promise|Invoice[]}
   */

  async getByCustomerId(customerId) {
    const result = await this.request(this._uri, 'GET', null, { customer_id : customerId });
    const invoices = result.data.map(r => new Invoice(r, this._helper));

    return invoices;
  }

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias invoices.getByContractId
   * @param {number} contractId
   * @returns {Promise|Invoice[]}
   */

  async getByContractId(contractId) {
    throw new Error('Not implemented in Koho API');

    const result = await this.request(this._uri, 'GET', null, { contract_id : contractId });
    const invoices = result.data.map(r => new Invoice(r, this._helper));

    return invoices;
  }
}