'use strict';

const Methods = require('../methods');
const Employee = require('../resources/employee.resource');

module.exports = class EmployeeMethods extends Methods {
  constructor (helper) {
    super(helper, 'employees', Employee);
  }

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias employees.getAll
   * @returns {Promise|Employee[]}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias employees.getById
   * @param {number} id
   * @returns {Promise|Employee}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias employees.updateById
   * @param {number} id
   * @param {EmployeeProperties} properties
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias employees.deleteById
   * @param {number} id
   * @returns {Promise|void}
   */

  /**
   * @function
   * @memberof KohoApiHelper#
   * @alias employees.create
   * @param {EmployeeProperties} properties
   * @returns {Promise|Employee}
   */
}