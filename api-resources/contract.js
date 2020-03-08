/**
 * Product properties
 * @typedef {Object} ContractProductProperties
 * @property {number} [id] Row ID - Pass ID if you update row, leave empty to add row
 * @property {string} name
 * @property {number} count
 * @property {boolean} monthly
 * @property {number} product_type_id Product ID
 * @property {number} [price]
 * @property {number} [period_price]
 * @property {string} [description]
 * @property {number} [start_date]
 * @property {number} [end_date]
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
 * @param {ContractProperties} properties Any properties to instantiate Class with
 * @param {KohoApiHelper} helper KohoApiHelper instance
 */

const Contract = function(properties, helper) {
  this.properties = properties;

  if (typeof properties !== 'object' || properties === null) {
    throw 'Incorrect properties in resource initialization';
  }

  if (typeof helper !== 'object' || helper === null) {
    throw 'Incorrect helper in resource initialization';
  }

  if ( ! properties.id) {
    throw 'Cannot instantiate without contract id';
  }

  /**
   * @name update
   * @function
   * @memberof Contract#
   * @param {ContractProperties} updatedProperties Updated properties
   * @returns {Promise|void}
   */

  this.update = async (updatedProperties) => {
    this.properties = { ...properties, ...updatedProperties };

    return await helper.contracts.update(this.properties);
  }

  /**
   * @name addProducts
   * @function
   * @memberof Contract#
   * @param {ContractProductProperties[]}
   * @returns {Promise|void}
   */

  this.addProducts = async (productsToAdd) => {

    //return await helper.contracts.update(this.properties);
  }

  return new Proxy(this, {
    get : function (instance, name) {
      return Object.hasOwnProperty.call(instance.properties, name) ? instance.properties[name] : instance[name];
    }
  });
}

module.exports = Contract;