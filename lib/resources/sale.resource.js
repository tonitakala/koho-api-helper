'use strict';

const Resource = require('../resource');

/**
 * @typedef {Object} SaleProductProperties
 * @property {number} [id] Row ID - Pass ID if you update row, leave empty to add row
 * @property {string} name
 * @property {number} count
 * @property {number} product_type_id Product ID
 * @property {number} [price]
 * @property {string} [description]
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
 * @typedef {Object} SaleProperties
 * @property {number} id Sale ID
 * @property {string} name Sale name
 * @property {number} customer_id Customer name
 * @property {SaleProductProperties[]} products
 * @property {any} [_] Other properties. Please consult Koho customer service
 */

/**
 * @constructor
 * @name Sale
 * @param {SaleProperties} properties
 * @param {KohoApiHelper} helper
 */

module.exports = class Sale extends Resource {
  constructor (properties, helper) {
    super(properties, helper, 'sales');
  }

  _updateInterceptor(properties) {
    // Rename template_links array for update request (legacy naming?)
    if (properties.products && properties.products.length) {
      properties.products_attributes = properties.products;

      delete properties.products;
    }
  }
}