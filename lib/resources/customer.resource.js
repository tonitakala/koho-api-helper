'use strict';

const Resource = require('../resource');

/**
 * @typedef {Object} CustomerProperties
 * @property {number} id Customer ID
 * @property {string} name Customer name
 * @property {string} [description] Customer description
 * @property {number} [number] Customer number
 * @property {string} [code] Customer code (external number)
 * @property {string} [organization_id] Organization ID / Business ID
 * @property {number} [customer_category_id] Customer category ID
 * @property {Boolean} [archived] Is customer archived
 * @property {string} [invoice_language] Two-letter invoice language (FI, SE, EN)
 * @property {string} [invoice_name] Invoicing address name
 * @property {string} [address] Invoicing address
 * @property {string} [address_extra] Invoicing address second row (c/o)
 * @property {string} [zip_code] Invoicing address zip code
 * @property {string} [city] Invoicing city
 * @property {string} [region] Invoicing region
 * @property {string} [country=FI] Customer two-letter country code
 * @property {string} [delivery_name] Invoicing address name
 * @property {string} [delivery_address] Invoicing address
 * @property {string} [delivery_address_extra] Invoicing address second row (c/o)
 * @property {string} [delivery_zip_code] Invoicing address zip code
 * @property {string} [delivery_city] Invoicing city
 * @property {string} [delivery_region] Invoicing region
 * @property {string} [delivery_country=FI] Customer two-letter country code
 * @property {string} [website] Customer website
 * @property {string} [phone] Customer phone
 * @property {string} [email] Customer email
 * @property {string} [created_at] Customer created at (ISO 8601) [cannot be modified]
 * @property {string} [updated_at] Customer updated at (ISO 8601) [cannot be modified]
 * @property {string} [archived_at] Customer archived at (ISO 8601) [cannot be modified]
 * @property {string} [ovt_identifier] Customer OVT identifier
 * @property {string} [electronic_invoicing_intermediary] Invoicing intermediary (see: https://verkkolaskuosoite.fi/)
 * @property {string} [web_invoice_address] Customer e-invoice address
 * @property {string} [default_invoice_delivery_method] Invoicing delivery method (depends of active integrations)
 * @property {string} [default_invoice_template_id] Default invoice template id in Koho (PDF-invoice)
 * @property {string} [accounting_software_delivery_method] Accounting software delivery method (depends of active integrations)
 * @property {string} [default_our_reference] Our reference field (invoicing)
 * @property {string} [default_your_reference] Your reference field (invoicing)
 * @property {string} [accounting_account_number] Sales accounting account number [setter]
 * @property {string} [accounting_target_number] Cost center number 1 [setter]
 * @property {string} [accounting_target_2_number] Cost center number 2 [setter]
 * @property {string} [accounting_target_3_number] Cost center number 3 [setter]
 * @property {string} [accounting_target_4_number] Cost center number 4 [setter]
 * @property {number} [accounting_target_id] Cost center ID 1
 * @property {number} [accounting_target_2_id] Cost center ID 2
 * @property {number} [accounting_target_3_id] Cost center ID 3
 * @property {number} [accounting_target_4_id] Cost center ID 4
 * @property {string} [set_category_by_name] Set customer category by category name [setter]
 * @property {object} [custom_parameters] Company specific custom parameters. Please consult Koho customer service
 * @property {Person[]} [persons] Customer contact persons
 * @property {object[]} [employees] Customer responsible employees
 * @property {string} [archived_at]
 * @property {Boolean} zero_vat True if customer has VAT 0%
 * @property {string} [posting_group] Fivaldi posting group without prefix zeros
 * @property {any} [_] Other properties. Please consult Koho customer service
 */

/**
 * @constructor
 * @name Customer
 * @param {CustomerProperties} properties
 * @param {KohoApiHelper} helper
 */

module.exports = class Customer extends Resource {
  constructor (properties, helper) {
    super(properties, helper, 'customers');

    /*if (properties.persons && properties.persons.length) {
      this.properties.persons = properties.persons.map((person) => new Person(person, helper));
    }*/
  }

  _updateInterceptor(properties) {

    // rename persons to persons_attributes and remove access tokens
    if (properties.persons) {
      if (properties.persons.length) {
        properties.persons_attributes = properties.persons.map((person) => {
          if (person.customer_access_tokens) {
            delete person.customer_access_tokens;
          }

          return person;
        });
      }

      delete properties.persons;
    }

    // Rename employees array for update request
    if (properties.employees) {
      if (properties.employees.length) {
        properties.responsibilities_attributes = properties.employees;
      }

      delete properties.employees;
    }

  }

  /**
   * @name archive
   * @function
   * @memberof Customer#
   * @returns {Promise|void}
   */

  async archive() {
    return await super.update({ archived : true });
  }

  /**
   * @name activate
   * @function
   * @memberof Customer#
   * @returns {Promise|void}
   */

  async activate() {
    return await super.update({ archived : false });
  }

  /**
   * Get all customer's invoices
   * @name getInvoices
   * @function
   * @memberof Customer#
   * @returns {Promise|Invoice[]}
   */

  async getInvoices() {
    return await this._helper.invoices.getByCustomerId(this.id);
  }

  /**
   * @name update
   * @function
   * @memberof Customer#
   * @param {CustomerProperties} properties
   * @returns {Promise|void}
   */
}