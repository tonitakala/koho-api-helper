const apiCustomers = require('./api-methods/customers');
const apiProjects = require('./api-methods/projects');
const apiProducts = require('./api-methods/products');
const apiContracts = require('./api-methods/contracts');


// Default API endpoints
const CUSTOMERS_ENDPOINT = 'https://suite-beta.koho-online.com/api/customers';
const PROJECTS_ENDPOINT = 'https://suite-beta.koho-online.com/api/projects';
const PRODUCTS_ENDPOINT = 'https://suite-beta.koho-online.com/api/product_types';
const CONTRACTS_ENDPOINT = 'https://suite-beta.koho-online.com/api/contracts';


/**
 * Options for Koho Api Helper
 * @typedef {Object} KohoApiHelperOptions
 * @property {string} token Company API Token in Koho Sales
 * @property {number} companyId Company ID in Koho Sales
 * @property {Object} [endpoints] API endpoints to be used (for example override urls for development)
 * @property {string} [endpoints.customers] Default: https://suite-beta.koho-online.com/api/customers
 * @property {string} [endpoints.projects] Default: https://suite-beta.koho-online.com/api/projects
 * @property {string} [endpoints.products] Default: https://suite-beta.koho-online.com/api/products
 * @property {string} [endpoints.contracts] Default: https://suite-beta.koho-online.com/api/contracts
 */

 /**
 * Instantiate KohoApiHelper
 * @constructor
 * @param {KohoApiHelperOptions} options
 */

const KohoApiHelper = function(options) {
  this.options = options || {};

  if ( ! options.token) {
    throw 'No API token specified';
  }

  if ( ! options.companyId) {
    throw 'No Company ID specified';
  }

  this.options.endpoints = this.options.endpoints || {};

  this.options.endpoints.customers = this.options.endpoints.customers || CUSTOMERS_ENDPOINT;
  this.options.endpoints.projects = this.options.endpoints.projects || PROJECTS_ENDPOINT;
  this.options.endpoints.products = this.options.endpoints.products || PRODUCTS_ENDPOINT;
  this.options.endpoints.contracts = this.options.endpoints.contracts || CONTRACTS_ENDPOINT;

  /***
   * Customer related API Helpers
   * @type {Object}
   * @name customers
   * @alias KohoApiHelper.customers
   * @memberof KohoApiHelper#
   */

  this.customers = new apiCustomers(this);
  this.projects = new apiProjects(this);
  this.products = new apiProducts(this);
  this.contracts = new apiContracts(this);

  return this;
}

module.exports = KohoApiHelper;