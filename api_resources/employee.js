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
 * Employee instance
 * @constructor
 * @param {EmployeeProperties} properties
 * @param {KohoApiHelper} helper
 */

const Employee = function(properties, helper) {
  this.properties = properties;

  if (typeof properties !== 'object' || properties === null) {
    throw 'Incorrect properties in resource initialization';
  }

  if (typeof helper !== 'object' || helper === null) {
    throw 'Incorrect helper in resource initialization';
  }

  if ( ! properties.id) {
    throw 'Cannot instantiate without employee id';
  }

  // Populate groups array with group id and name
  this.properties.groups = [];

  for (let i = 0; i < this.properties.group_ids.length; i++) {
    this.properties.groups.push({
      id : properties.group_ids[i],
      name : properties.group_names[i]
    });
  }

  // Delete original group_ids and group_names parameters that come from api
  delete this.properties.group_ids;
  delete this.properties.group_names;

  /**
   * @name update
   * @function
   * @memberof Employee#
   * @param {EmployeeProperties} updatedProperties Updated properties
   * @returns {Promise|void}
   */

  this.update = async (updatedProperties) => {
    this.properties = { ...properties, ...updatedProperties };

    return await helper.employees.update(this.properties);
  }

  /**
   * Archive employee
   * @name archive
   * @function
   * @memberof Employee#
   * @returns {Promise|void}
   */

  this.archive = async () => {
    this.properties.active = false;

    return await helper.employees.update(this.properties);
  }

  /**
   * Activate employee
   * @name activate
   * @function
   * @memberof Employee#
   * @returns {Promise|void}
   */

  this.activate = async () => {
    this.properties.active = true;

    return await helper.employees.update(this.properties);
  }

  return new Proxy(this, {
    get : function (instance, name) {
      return Object.hasOwnProperty.call(instance.properties, name) ? instance.properties[name] : instance[name];
    }
  });
}

module.exports = Employee;