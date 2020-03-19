const Person = require('./person');

/**
 * Customer properties
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
 * Customer instance
 * @constructor
 * @param {CustomerProperties} properties Any customer properties to instantiate Class with
 * @param {KohoApiHelper} helper KohoApiHelper instance
 */

const Customer = function(properties, helper) {
  this.properties = properties;

  if (properties.persons && properties.persons.length) {
    this.properties.persons = properties.persons.map((person) => new Person(person, helper));
  }

  if (typeof properties !== 'object' || properties === null) {
    throw 'Incorrect properties in resource initialization';
  }

  if (typeof helper !== 'object' || helper === null) {
    throw 'Incorrect helper in resource initialization';
  }

  if ( ! properties.id) {
    throw 'Cannot instantiate without customer id';
  }

  /**
   * Update customer
   * @name update
   * @function
   * @memberof Customer#
   * @param {CustomerProperties} updatedProperties Updated properties
   * @returns {Promise|void}
   */

  this.update = async (updatedProperties) => {
    this.properties = { ...properties, ...updatedProperties };

    return await helper.customers.update(this.properties);
  }

  /**
   * Archive customer
   * @name archive
   * @function
   * @memberof Customer#
   * @returns {Promise|void}
   */

  this.archive = async () => {
    this.properties.archived = true;

    return await helper.customers.update(this.properties);
  }

  /**
   * Activate customer
   * @name activate
   * @function
   * @memberof Customer#
   * @returns {Promise|void}
   */

  this.activate = async () => {
    this.properties.archived = false;

    return await helper.customers.update(this.properties);
  }

  return new Proxy(this, {
    get : function (instance, name) {
      return Object.hasOwnProperty.call(instance.properties, name) ? instance.properties[name] : instance[name];
    }
  });
}

module.exports = Customer;