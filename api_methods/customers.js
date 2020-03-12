const axios = require('axios');
const Customer = require('../api_resources/customer');

module.exports = function(helper) {

  /**
   * Get all customers
   * @memberof KohoApiHelper#
   * @alias customers.getAll
   * @returns {Promise|Array<Customer>} Array containing customers
   */

  this.getAll = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(helper.options.endpoints.customers, {
          params : {
            company_id : helper.options.companyId,
            token      : helper.options.token
          }
        });

        const customers = result.data.map(customer => new Customer(customer, helper));

        resolve(customers);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Get customer by id
   * @memberof KohoApiHelper#
   * @alias customers.getById
   * @params {number} customerId Customer ID
   * @returns {Promise|Customer} Customer
   */

  this.getById = async (customerId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(`${helper.options.endpoints.customers}/${customerId}`, {
          params : {
            company_id : helper.options.companyId,
            token      : helper.options.token
          }
        });

        const customer = new Customer(result.data, helper);

        resolve(customer);
      } catch (e) {
        reject(e);
      }
    });
  }


  /**
   * Update customer
   * @memberof KohoApiHelper#
   * @alias customers.update
   * @param {Customer} customer
   * @returns {Promise|void}
   */

  this.update = async (customer) => {
    return new Promise(async (resolve, reject) => {
      try {

        // Rename persons array for update request and remove customer access tokens if it has zero length
        if (customer.persons) {
          if (customer.persons.length) {
            customer.persons_attributes = customer.persons.map((person) => {
              if (person.customer_access_tokens) {
                delete person.customer_access_tokens;
              }

              return person;
            });
          }

          delete customer.persons;
        }

        // Rename employees array for update request
        if (customer.employees) {
          if (customer.employees.length) {
            customer.responsibilities_attributes = customer.employees;
          }

          delete customer.employees;
        }

        if ( ! customer.id) {
          return reject('Cannot update customer: No customer.id specified');
        }

        const result = await axios.put(`${helper.options.endpoints.customers}/${customer.id}`,
          {
            customer : customer
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
   * Create customer
   * @memberof KohoApiHelper#
   * @alias customers.create
   * @param {CustomerProperties} customer Customer properties
   * @returns {Promise|Customer}
   */

  this.create = async (customer) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (customer.id) {
          return reject('Cannot create customer: customer.id was specified in properties');
        }

        const result = await axios.post(helper.options.endpoints.customers,
          {
            customer : customer
          }, {
            params : {
              company_id : helper.options.companyId,
              token      : helper.options.token
            }
          }
        );

        const customerId = result.data.id;
        const customerCreated = await this.getById(customerId);

        resolve(customerCreated);
      } catch (e) {
        reject(e);
      }
    });
  }


  return this;
}