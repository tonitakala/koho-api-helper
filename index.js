const apiCustomers = require('./api_methods/customers');
const apiProjects = require('./api_methods/projects');
const apiProducts = require('./api_methods/products');
const apiContracts = require('./api_methods/contracts');
const apiPersons = require('./api_methods/persons');
const apiEmployees = require('./api_methods/employees');

// Default API endpoints
const CUSTOMERS_ENDPOINT = 'https://suite-beta.koho-online.com/api/customers';
const PROJECTS_ENDPOINT = 'https://suite-beta.koho-online.com/api/projects';
const PRODUCTS_ENDPOINT = 'https://suite-beta.koho-online.com/api/product_types';
const CONTRACTS_ENDPOINT = 'https://suite-beta.koho-online.com/api/contracts';
const PERSONS_ENDPOINT = 'https://suite-beta.koho-online.com/api/customer/persons';
const EMPLOYEES_ENDPOINT = 'https://suite-beta.koho-online.com/api/employees';

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
 * @property {string} [endpoints.persons] Default: https://suite-beta.koho-online.com/api/customer/persons
 * @property {string} [endpoints.employees] Default: https://suite-beta.koho-online.com/api/employees
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
  this.options.endpoints.persons = this.options.endpoints.persons || PERSONS_ENDPOINT;
  this.options.endpoints.employees = this.options.endpoints.employees || EMPLOYEES_ENDPOINT;

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
  this.persons = new apiPersons(this);
  this.employees = new apiEmployees(this);

  return this;
}

module.exports = KohoApiHelper;