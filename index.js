'use strict';

const EmployeeMethods = require('./lib/methods/employee.methods');
const CustomerMethods = require('./lib/methods/customer.methods');
const PersonMethods = require('./lib/methods/person.methods');
const ContractMethods = require('./lib/methods/contract.methods');
const ProductMethods = require('./lib/methods/product.methods');
const ProjectMethods = require('./lib/methods/project.methods');
const InvoiceMethods = require('./lib/methods/invoice.methods');
const SaleMethods = require('./lib/methods/sale.methods');

/**
 * Options for Koho Api Helper
 * @typedef {Object} KohoApiHelperOptions
 * @property {string} token Company (or Enterprise) API Token in Koho Sales
 * @property {number} [companyId] Company ID in Koho Sales
 * @property {number} [enterpriseId] Enterprise ID in Koho Sales
 * @property {string} [url] API URL (default: https://suite-beta.koho-online.com/api)
 */

 /**
 * Instantiate KohoApiHelper
 * @constructor
 * @name KohoApiHelper
 * @param {KohoApiHelperOptions} options
 */

module.exports = class KohoApiHelper {
  constructor(options) {
    this.options = options || {};

    if ( ! options.token) {
      throw 'No API token specified';
    }

    if ( ! options.companyId && ! options.enterpriseId) {
      throw 'No Company ID or enterpriseId specified';
    }

    if (! options.url) {
      this.options.url = 'https://suite-beta.koho-online.com/api';
    }

    this.employees = new EmployeeMethods(this);
    this.customers = new CustomerMethods(this);
    this.persons = new PersonMethods(this);
    this.contracts = new ContractMethods(this);
    this.products = new ProductMethods(this);
    this.projects = new ProjectMethods(this);
    this.invoices = new InvoiceMethods(this);
    this.sales = new SaleMethods(this);
  }
}