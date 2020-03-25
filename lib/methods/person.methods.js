'use strict';

const Methods = require('../methods');
const Person = require('../resources/person.resource');

module.exports = class PersonMethods extends Methods {
  constructor (helper) {
    super(helper, 'customer/persons', Person);
  }

  _validateProperties(properties) {
    if (!properties.customer_id) {
      throw new Error('Missing customer_id for person');
    }
  }

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias persons.getAll
   * @returns {Promise|Person[]}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias persons.getById
   * @param {number} id
   * @returns {Promise|Person}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias persons.updateById
   * @param {number} id
   * @param {PersonProperties} properties
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias persons.deleteById
   * @param {number} id
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias persons.create
   * @param {PersonProperties} properties
   * @returns {Promise|Person}
   */
}