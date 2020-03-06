const apiCustomers = require('./api-methods/customers');
const apiProjects = require('./api-methods/projects');

// Default API endpoints
const CUSTOMERS_ENDPOINT = 'https://suite-beta.koho-online.com/api/customers';
const PROJECTS_ENDPOINT = 'https://suite-beta.koho-online.com/api/projects';


/**
 * Options for Koho Api Helper
 * @typedef {Object} KohoApiHelperOptions
 * @property {string} token Company API Token in Koho Sales
 * @property {number} companyId Company ID in Koho Sales
 * @property {Object} [endpoints] API endpoints to be used (for example override urls for development)
 * @property {string} [endpoints.customers] Default: https://suite-beta.koho-online.com/api/customers
 * @property {string} [endpoints.projects] Default: https://suite-beta.koho-online.com/api/projects
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

  /***
   * Customer related API Helpers
   * @type {Object}
   * @name customers
   * @alias KohoApiHelper.customers
   * @memberof KohoApiHelper#
   */

  this.customers = apiCustomers(this);

  this.projects = apiProjects(this);

  return this;
}

module.exports = KohoApiHelper;