'use strict';

const Resource = require('../resource');

/**
 * @typedef {Object} PersonProperties
 * @property {number} id Person ID
 * @property {number} customer_id Customer ID
 * @property {string} [first_name]
 * @property {string} [last_name]
 * @property {string} [description]
 * @property {string} [email]
 * @property {string} [phone]
 * @property {string} [role] Titteli
 * @property {string} [position] Rooli
 * @property {Boolean} [archived]
 * @property {PersonAccessTokenProperties[]} customer_access_tokens Customer Portal access tokens
 * @property {any} [_] Other properties. Please consult Koho customer service
 */

/**
 * @typedef {Object} PersonAccessTokenProperties
 * @property {number} id Access token ID
 * @property {number} customer_id Customer ID
 * @property {number} user_id
 * @property {number} person_id
 * @property {string} email
 * @property {Boolean} is_valid
 * @property {Boolean} admin
 * @property {Object} settings
 * @property {string} created_at
 * @property {string} updated_at
 * @property {any} [_] Other properties. Please consult Koho customer service
 */

/**
 * @constructor
 * @name Person
 * @param {PersonProperties} properties
 * @param {KohoApiHelper} helper
 */

module.exports = class Person extends Resource {
  constructor (properties, helper) {
    super(properties, helper, 'persons');
  }

  _updateInterceptor(properties) {
    delete properties.customer_access_tokens;
  }

  /**
   * @name archive
   * @function
   * @memberof Person#
   * @returns {Promise|void}
   */

  async archive() {
    return await super.update({ archived : true });
  }

  /**
   * @name activate
   * @function
   * @memberof Person#
   * @returns {Promise|void}
   */

  async activate() {
    return await super.update({ archived : false });
  }

  /**
   * @name update
   * @function
   * @memberof Person#
   * @param {PersonProperties} properties
   * @returns {Promise|void}
   */
}