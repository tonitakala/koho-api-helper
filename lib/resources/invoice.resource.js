'use strict';

const Resource = require('../resource');

/**
 * @typedef {Object} InvoiceProductProperties
 * @property {number} [id] Row ID - Pass ID if you update row, leave empty to add row
 * @property {string} name
 * @property {string} [description]
 * @property {number} count
 * @property {boolean} monthly
 * @property {number} product_type_id Product ID
 * @property {number} [price]
 * @property {number} [vat]
 * @property {string} [cost]
 * @property {string} [code]
 * @property {number} [invoice_position]
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
 * @typedef {Object} InvoiceProperties
 * @property {number} id
 * @property {string} name
 * @property {number} number
 * @property {string} [description]
 * @property {number} contract_id
 * @property {number} customer_id
 * @property {string} due_date YYYY-MM-DD
 * @property {string} status unapproved, approved, sent, paid
 * @property {boolean} sent
 * @property {string} [created_at] (ISO 8601) [cannot be modified]
 * @property {string} [updated_at] (ISO 8601) [cannot be modified]
 * @property {string} billing_date YYYY-MM-DD
 * @property {string} [term_start] YYYY-MM-DD
 * @property {string} [term_end] YYYY-MM-DD
 * @property {string} [approved] YYYY-MM-DD
 * @property {string} [paid] YYYY-MM-DD
 * @property {number} [payment_term]
 * @property {string} [our_reference]
 * @property {string} [your_reference]
 * @property {string} [free_text_before_lines]
 * @property {string} [free_text_after_lines]
 * @property {string} [delivery_method]
 * @property {number} [paid_net_amount]
 * @property {number} gross_amount
 * @property {number} net_amount
 * @property {number} [refund_to_id]
 * @property {number} [project_id]
 * @property {InvoiceProductProperties[]} products
 * @property {Object[]} work_sessions A whole lot of stuff here
 * @property {any} [_] Other properties. Please consult Koho customer service
 */

/**
 * @constructor
 * @name Invoice
 * @param {InvoiceProperties} properties
 * @param {KohoApiHelper} helper
 */

module.exports = class Invoice extends Resource {
  constructor (properties, helper) {
    super(properties, helper, 'invoices');
  }

  _updateInterceptor(properties) {

  }

  /**
   * @name update
   * @function
   * @memberof Invoice#
   * @param {InvoiceProperties} properties
   * @returns {Promise|void}
   */
}