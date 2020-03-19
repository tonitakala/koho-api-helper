const axios = require('axios');
const Person = require('../api_resources/person');

module.exports = function(helper) {

  /**
   * @memberof KohoApiHelper#
   * @alias persons.getAll
   * @returns {Promise|Array<Person>}
   */

  this.getAll = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(helper.options.endpoints.persons, {
          params : {
            company_id : helper.options.companyId,
            token      : helper.options.token
          }
        });

        const persons = result.data.map(person => new Person(person, helper));

        resolve(persons);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * @memberof KohoApiHelper#
   * @alias persons.getById
   * @params {number} personId
   * @returns {Promise|Person}
   */

  this.getById = async (personId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(`${helper.options.endpoints.persons}/${personId}`, {
          params : {
            company_id : helper.options.companyId,
            token      : helper.options.token
          }
        });

        const person = new Person(result.data, helper);

        resolve(person);
      } catch (e) {
        reject(e);
      }
    });
  }


  /**
   * @memberof KohoApiHelper#
   * @alias persons.update
   * @param {PersonProperties} person
   * @returns {Promise|void}
   */

  this.update = async (person) => {
    return new Promise(async (resolve, reject) => {
      try {

        // Remove customer access tokens if it has zero length
        delete person.customer_access_tokens;

        if ( ! person.id) {
          return reject('Cannot update person: No person.id specified');
        }

        const result = await axios.put(`${helper.options.endpoints.persons}/${person.id}`,
          {
            person : person
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
   * @alias persons.create
   * @param {PersonProperties} person
   * @returns {Promise|Person}
   */

  this.create = async (person) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (person.id) {
          return reject('Cannot create person: person.id was specified in properties');
        }

        if ( ! person.customer_id) {
          return reject('Cannot create person: person.customer_id was not specified in properties');
        }

        const result = await axios.post(helper.options.endpoints.persons,
          {
            person : person
          }, {
            params : {
              company_id : helper.options.companyId,
              token      : helper.options.token
            }
          }
        );

        const personId = result.data.id;
        const personCreated = await this.getById(personId);

        resolve(personCreated);
      } catch (e) {
        reject(e);
      }
    });
  }


  return this;
}