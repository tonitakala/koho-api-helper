'use strict';

const Resource = require('../resource');

/**
 * @typedef {Object} ContractProductProperties
 * @property {number} [id] Row ID - Pass ID if you update row, leave empty to add row
 * @property {string} name
 * @property {number} count
 * @property {boolean} monthly
 * @property {number} product_type_id Product ID
 * @property {number} [price]
 * @property {number} [period_price]
 * @property {string} [description]
 * @property {number} [term_start]
 * @property {number} [term_end]
 * @property {number} [vat]
 * @property {string} [cost]
 * @property {string} [code]
 * @property {number} [discount_percentage]
 * @property {Object} [custom_parameters]
 * @property {number} [accounting_account_id]
 * @property {number} [accounting_target_id]
 * @property {string} [accounting_account_number] Getter
 * @property {string} [accounting_target_number] Getter
 * @property {number} [gross_total] Getter
 * @property {number} [total_count] Getter
 * @property {number} [net_total] Getter
 * @property {any} [_] Other properties. Please consult Koho customer service
 */

/**
 * @typedef {Object} ContractProperties
 * @property {number} id
 * @property {string} name
 * @property {string} [description]
 * @property {string} start_date YYYY-MM-DD
 * @property {string} [end_date] YYYY-MM-DD
 * @property {number} customer_id
 * @property {string} [created_at] (ISO 8601) [cannot be modified]
 * @property {string} [updated_at] (ISO 8601) [cannot be modified]
 * @property {number} billing_interval Between 1 and 12
 * @property {number} [payment_term]
 * @property {number} [billing_day]
 * @property {number} [accounting_target_id]
 * @property {string} billing_mode upfront / afterwards
 * @property {number} billing_offset Invoice generation offset
 * @property {string} [free_text_before_lines]
 * @property {string} [free_text_after_lines]
 * @property {string} [our_reference] Invoice: our reference
 * @property {string} [your_reference] Invoice: your reference
 * @property {number} offer_id Related offer ID
 * @property {boolean} confirmed_by_manager
 * @property {ContractProductProperties[]} products
 * @property {any} [_] Other properties. Please consult Koho customer service
 */

/**
 * @constructor
 * @name Contract
 * @param {ContractProperties} properties
 * @param {KohoApiHelper} helper
 */

module.exports = class Contract extends Resource {
  constructor (properties, helper) {
    super(properties, helper, 'contracts');
  }

  _updateInterceptor(properties) {
    if (properties.verification_level) {
      properties.acceptance_attributes = properties.acceptance_attributes || {};
      properties.acceptance_attributes.verification_level = properties.verification_level;

      delete properties.verification_level;
    }

    if (properties.products) {
      if (properties.products.length) {
        // We need to clean up some properties from the object
        properties.products_attributes = properties.products.map((product, index) => {
          delete product.total_count;
          delete product.net_total;
          delete product.gross_total;
          delete product.accounting_account_number;
          delete product.accounting_target_number;

          if ( ! product.product_type_id) {
            throw new Error(`product_type_id missing for contract.products[${index}]`);
          }

          if ( ! product.monthly === undefined) {
            throw new Error(`monthly missing for contract.products[${index}]`);
          }

          if ( ! product.count) {
            throw new Error(`count missing for contract.products[${index}]`);
          }

          return product;
        });
      }

      delete properties.products;
    }
  }

  /**
   * @name update
   * @function
   * @memberof Contract#
   * @param {ContractProperties} properties
   * @returns {Promise|void}
   */
}