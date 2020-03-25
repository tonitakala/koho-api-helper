'use strict';

const Resource = require('../resource');

/**
 * @typedef {Object} EmployeeProperties
 * @property {number} id Employee ID (company specific)
 * @property {number} user_id Employee User ID
 * @property {string} name
 * @property {string} email
 * @property {string} username
 * @property {string} [code] Payroll code
 * @property {string} [team_name] Team name
 * @property {number} [hourly_cost] Hourly cost
 * @property {number} [profile_template_id] Profile ID
 * @property {string} [profile_name] Profile name
 * @property {Boolean} active
 * @property {EmployeeGroup[]} [groups] Employee groups (Erikoisryhmät)
 * @property {string} [accounting_target_number] Cost center number 1
 * @property {string} [accounting_target_2_number] Cost center number 2
 * @property {string} [accounting_target_3_number] Cost center number 3
 * @property {string} [accounting_target_4_number] Cost center number 4
 * @property {number} [accounting_target_id] Cost center ID [setter]
 * @property {any} [_] Other properties. Please consult Koho customer service
 */

/**
 * @typedef {Object} EmployeeGroup
 * @property {number} id
 * @property {string} name
 */

/**
 * @constructor
 * @name Employee
 * @param {EmployeeProperties} properties
 * @param {KohoApiHelper} helper
 */

module.exports = class Employee extends Resource {
  constructor (properties, helper) {
    super(properties, helper, 'employees');

    // Populate groups array with group id and name
    this.groups = [];

    for (let i = 0; i < this.group_ids.length; i++) {
      this.groups.push({
        id : this.group_ids[i],
        name : this.group_names[i]
      });
    }

    // Delete original group_ids and group_names parameters that come from api
    delete this.group_ids;
    delete this.group_names;
  }

  _updateInterceptor(properties) {
    // Update groups by ids, not group object
    if (properties.groups !== undefined) {
      properties.group_ids = properties.groups.map(group => group.id);

      delete properties.groups;
    }

    // Update user profile by profile id
    if (properties.profile_template_id !== undefined) {
      properties.set_profile_id = properties.profile_template_id;
    }

    delete properties.profile_name;
    delete properties.profile_template_id;

    // If ID is set we override target number with the id
    if (properties.accounting_target_id === undefined) {

      // Target number is not removed if number is null, therefore set id to null if we want to remove it
      if (properties.accounting_target_number === null) {
        properties.accounting_target_id = null;
      } else {
        properties.set_accounting_target_number = properties.accounting_target_number;
      }
    }

    // Setters not available in Koho API
    // properties.set_accounting_target_2_number = properties.accounting_target_2_number;
    // properties.set_accounting_target_3_number = properties.accounting_target_3_number;
    // properties.set_accounting_target_4_number = properties.accounting_target_4_number;

    // Cannot be sent with update request
    delete properties.accounting_target_number;
    delete properties.accounting_target_2_number;
    delete properties.accounting_target_3_number;
    delete properties.accounting_target_4_number;
  }

  /**
   * @name archive
   * @function
   * @memberof Employee#
   * @returns {Promise|void}
   */

  async archive() {
    return await super.update({ active : false });
  }

  /**
   * @name activate
   * @function
   * @memberof Employee#
   * @returns {Promise|void}
   */

  async activate() {
    return await super.update({ active : true });
  }

  /**
   * @name update
   * @function
   * @memberof Employee#
   * @param {EmployeeProperties} properties
   * @returns {Promise|void}
   */
}