const axios = require('axios');
const Employee = require('../api_resources/employee');

module.exports = function(helper) {

  /**
   * @memberof KohoApiHelper#
   * @alias employees.getAll
   * @returns {Promise|Array<Employee>}
   */

  this.getAll = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(helper.options.endpoints.employees, {
          params : {
            company_id : helper.options.companyId,
            token      : helper.options.token
          }
        });

        const employees = result.data.map(employee => new Employee(employee, helper));

        resolve(employees);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * @memberof KohoApiHelper#
   * @alias employees.getById
   * @params {number} employeeId
   * @returns {Promise|Employee}
   */

  this.getById = async (employeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(`${helper.options.endpoints.employees}/${employeeId}`, {
          params : {
            company_id : helper.options.companyId,
            token      : helper.options.token
          }
        });

        const employee = new Employee(result.data, helper);

        resolve(employee);
      } catch (e) {
        reject(e);
      }
    });
  }


  /**
   * @memberof KohoApiHelper#
   * @alias employees.update
   * @param {Employee} employee
   * @returns {Promise|void}
   */

  this.update = async (_employee) => {
    return new Promise(async (resolve, reject) => {
      try {
        const employee = { ..._employee };

        if ( ! employee.id) {
          return reject('Cannot update employee: No employee.id specified');
        }

        // Update groups by ids, not group object
        employee.group_ids = employee.groups.map(group => group.id);
        delete employee.groups;

        // Update user profile by profile id
        employee.set_profile_id = employee.profile_template_id;
        delete employee.profile_name;
        delete employee.profile_template_id;

        // If ID is set we override target number with the id
        if (employee.accounting_target_id === undefined) {

          // Target number is not removed if number is null, therefore set id to null if we want to remove it
          if (employee.accounting_target_number === null) {
            employee.accounting_target_id = null;
          } else {
            employee.set_accounting_target_number = employee.accounting_target_number;
          }
        }

        // Setters not available in Koho API
        // employee.set_accounting_target_2_number = employee.accounting_target_2_number;
        // employee.set_accounting_target_3_number = employee.accounting_target_3_number;
        // employee.set_accounting_target_4_number = employee.accounting_target_4_number;

        // Cannot be sent with update request
        delete employee.accounting_target_number;
        delete employee.accounting_target_2_number;
        delete employee.accounting_target_3_number;
        delete employee.accounting_target_4_number;

        const result = await axios.put(`${helper.options.endpoints.employees}/${employee.id}`,
          {
            employee : employee
          }, {
            params : {
              company_id : helper.options.companyId,
              token      : helper.options.token
            }
          }
        );

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * @memberof KohoApiHelper#
   * @alias employees.create
   * @param {EmployeeProperties} employee
   * @returns {Promise|Employee}
   */

  this.create = async (employee) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (employee.id) {
          return reject('Cannot create employee: employee.id was specified in properties');
        }

        if ( ! employee.email) {
          return reject('Cannot create employee: employee.email was not specified in properties');
        }

        const result = await axios.post(helper.options.endpoints.employees,
          {
            employee : employee
          }, {
            params : {
              company_id : helper.options.companyId,
              token      : helper.options.token
            }
          }
        );

        const employeeId = result.data.id;
        const employeeCreated = await this.getById(employeeId);

        resolve(employeeCreated);
      } catch (e) {
        reject(e);
      }
    });
  }


  return this;
}